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
								<div class='title' @click='clickBlogTitle(item.id)'>{{item.title}}</div>
								<div class='summary'>{{item.summary}}</div>
								<div class='content-footer flex flex-space-between flex-align-center'>
									<div class='publish-date flex flex-start flex-align-center'>
										<el-icon><ele-Clock /></el-icon>{{(item.addTime || '').slice(0, 10)}}
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
					<el-card shadow='never' class='tag-card'>
						<template #header>
							<div class="card-header card-header-tag flex flex-space-between flex-align-center">
								<div class='card-header-left'>标签</div>
								<div class='card-header-right'>
									更多
								</div>
							</div>
						</template>
						<div class='tag-list flex flex-start flex-align-center'>
							<div class='hl-tag tag-item' v-for='item in tagList.slice(0, 10)' :key='item.id'>
								{{item.name}} <span>{{item.number}}</span>
							</div>
						</div>
					</el-card>
					<el-card shadow='never' class='recommend-card'>
						<template #header>
							<div class="card-header card-header-tag flex flex-space-between flex-align-center">
								<div class='card-header-left'>最新推荐</div>
							</div>
						</template>
						<div class='recommend-list'>
							<div class='list-item' v-for='item in recommendBlogList' :key='item.id'>
								{{item.title}}
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
import { getBlogListApi, getGatewayTypeListApi, getGatewayTagListApi } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';
import PaginationCommon from '/@/components/PaginationCommon/index.vue';
import { PageEntity } from '/@/common/page.entity';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'gatewayHome',
	components: {
		BlogHeader,
		PaginationCommon
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			blogList: [],
			typeList: [],
			tagList: [],
			pageInfo: new PageEntity(),
			recommendBlogList: []
		});
		const getBlogList = () => {
			postAction(getBlogListApi, {
				pageIndex: state.pageInfo.pageIndex,
				pageSize: state.pageInfo.pageSize,
				state: true
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
			getAction(getGatewayTypeListApi, '', false).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.typeList = res.data;
				}
			});
		};
		const getTagList = () => {
			getAction(getGatewayTagListApi, '', false).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.tagList = res.data;
				}
			});
		};
		const getRecommendBlogList = () => {
			postAction(getBlogListApi, {
				pageIndex: 1,
				pageSize: 10,
				state: true,
				isRecommend: true
			}, false).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.recommendBlogList = res.data.list;
				}
			})
		};
		const clickBlogTitle = (id: number) => {
			router.push({
				path: '/gateway/info/' + id
			});
		}
		onMounted(() => {
			getBlogList();
			getTypeList();
			getTagList();
			getRecommendBlogList();
		});
		return {
			...toRefs(state),
			changePageSize,
			changePageIndex,
			clickBlogTitle
		}
	}
});
</script>

<style scoped lang='scss'>
	.blog-home-container{
		width: 100%;
		height: 100%;
		background: var(--el-color-white);
		overflow-y: auto;
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
			.tag-card{
				margin-top: 20px;
				.tag-list{
					.tag-item{
						margin-right: 10px;
						font-weight: 700;
						cursor: pointer;
						span{
							margin-left: 10px;
						}
					}
				}
			}
			.recommend-card{
				margin-top: 20px;
				.recommend-list{
					.list-item{
						padding: 10px 5px;
						color: #333;
						border-bottom: 1px solid #ccc;
						cursor: pointer;
						&:first-child{
							padding-top: 0;
						}
						&:hover{
							color: #00b5ad;
						}
					}
				}
			}
		}
	}
</style>
