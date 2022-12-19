<template>
	<div class='blog-home-container'>
		<BlogHeader />
		<div class='home-content base-width'>
			<el-row :gutter='20'>
				<el-col :span='16'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header card-header-blog flex flex-space-between flex-align-center">
								<div class='card-header-left'>博客</div>
								<div class='card-header-right'>
									共<span>{{pageInfo.totalRecords}}</span>篇
								</div>
							</div>
						</template>
						<div class='info flex flex-space-between flex-align-center' v-for='item in blogList' :key='item.id'>
							<div class='content'>
								<div class='title'>{{item.title}}</div>
								<div class='summary'>{{item.summary}}</div>
								<div class='content-footer flex flex-space-between flex-align-center'>
									<div class='publish-date flex flex-start flex-align-center'>
										<el-icon><ele-Clock /></el-icon>{{item.addTime.slice(0, 10)}}
										<el-icon class='view-icon'><ele-View /></el-icon>{{item.views}}
									</div>
									<el-tag>{{item.typeName}}</el-tag>
								</div>
							</div>
							<div class='img'>
								<img :src='item.pictureUrl' alt=''>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span='8'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header card-header-classify flex flex-space-between flex-align-center">
								<div class='card-header-left'>分类</div>
								<div class='card-header-right'>
									更多
								</div>
							</div>
						</template>
						<div class='type-list'>
							<div class='list-item flex flex-space-between flex-align-center' v-for='item in typeList.slice(0, 6)' :key='item.id'>
								{{item.name}}
								<div class='type-number hl-tag'>{{item.number}}</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<PaginationCommon
				:page-info='pageInfo'
				@changePageSize='changePageSize'
				@changePageIndex='changePageIndex'
			/>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue'
import { postAction, getAction } from '/@/api/common';
import { getBlogListApi, getGatewayTypeList } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';
import PaginationCommon from '/@/components/PaginationCommon/index.vue';
import { PageEntity } from '/@/common/page.entity';

export default defineComponent({
	name: 'gatewayHome',
	components: {
		BlogHeader,
		PaginationCommon
	},
	setup() {
		const state = reactive({
			blogList: [],
			typeList: [],
			pageInfo: new PageEntity()
		});
		const getBlogList = () => {
			postAction(getBlogListApi, {
				pageIndex: state.pageInfo.pageIndex,
				pageSize: state.pageInfo.pageSize
			}, false).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.blogList = res.data.list;
					state.pageInfo.totalRecords = res.data.total;
				}
			})
		}
		const changePageSize = (size: number) => {
			state.pageInfo.pageSize = size;
			state.pageInfo.pageIndex = 1;
			getBlogList();
		};
		const changePageIndex = (index: number) => {
			state.pageInfo.pageIndex = index;
			getBlogList();
		};
		const getTypeList = () => {
			getAction(getGatewayTypeList, '', false).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.typeList = res.data;
				}
			});
		};
		onMounted(() => {
			getBlogList();
			getTypeList();
		});
		return {
			...toRefs(state),
			changePageSize,
			changePageIndex
		}
	}
});
</script>

<style scoped lang='scss'>
	.blog-home-container{
		width: 100%;
		height: 100%;
		background: var(--el-color-white);
		.home-content{
			margin: 30px auto;
			.card-header-blog{
				.card-header-left{
					color: #00b5ad;
					font-weight: 700;
					font-size: 18px;
				}
				.card-header-right{
					span{
						color: #f2711c;
						font-size: 22px;
					}
				}
			}
			.info{
				padding-bottom: 20px;
				border-bottom: 1px dashed #ccc;
				padding-top: 20px;
				&:first-child{
					padding-top: 0;
				}
				.content{
					flex: 1;
					padding-right: 20px;
					.title{
						color: #373737;
						font-size: 20px;
						font-weight: 700;
						cursor: pointer;
					}
					.summary{
						padding: 10px 0;
					}
					.content-footer{
						.publish-date{
							.el-icon{
								margin-right: 5px;
							}
							.view-icon{
								margin-left: 20px;
								margin-right: 5px;
							}
						}
					}
				}
				.img{
					width: 180px;
					height: 100px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.type-list{
				border: 1px dashed #ccc;
				border-radius: 5px;
				.list-item{
					padding: 10px;
					border-bottom: 1px solid #ccc;
					&:last-child{
						border: none;
					}
					&:hover{
						background: #f5f5f5;
						cursor: pointer;
					}
				}
			}
			.hl-tag{
				background: #fff;
				border: 1px solid #00b5ad;
				color: #00b5ad;
				padding: 5px 12px;
				border-radius: 3px;
				position: relative;
				&::before{
					content: '';
					background: #fff;
					border-color: #00b5ad;
					border-width: 0 0 1px 1px;
					border-style: solid;
					position: absolute;
					width: 8px;
					height: 8px;
					transform: translateX(-50%) translateY(-50%) rotate(45deg);
					top: 50%;
					left: -1px;
					z-index: 2;
				}
			}
		}
	}
</style>
