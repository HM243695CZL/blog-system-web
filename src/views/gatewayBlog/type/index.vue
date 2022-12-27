<template>
	<div class='type-container'>
		<BlogHeader />
		<div class='type-content base-width'>
			<el-row :gutter='20'>
				<el-col :span='24' :xs='24'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header flex flex-space-between flex-align-center">
								<div class='card-header-left'>分类</div>
								<div class='card-header-right'>
									共<span>{{ typeList.length }}</span>个
								</div>
							</div>
						</template>
						<div class='tag-list flex flex-start flex-align-start'>
							<div :class='["tag-item", "hl-tag", currentTypeMap.id === item.id ? "active" : ""]'
									 @click='clickTag(item)'
									 v-for='item in typeList' :key='item.id'>
								{{item.name}} <span class='tag-number'>{{item.number}}</span>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<el-row :gutter='20'>
				<el-col :span='24' :xs='24'>
					<el-card shadow='never'>
						<h3>专栏简介：</h3>
						<div class='desc'>{{currentTypeMap.desc}}</div>
					</el-card>
				</el-col>
			</el-row>
			<el-row :gutter='20'>
				<el-col :span='24' :xs='24'>
					<el-card shadow='never'>
						<BlogInfoList :data-list='blogList' />
						<div class='page-bar'>
							<el-pagination background layout="prev, pager, next"
														 hide-on-single-page
														 small
														 @changePageSize='changePageSize'
														 @changePageIndex='changePageIndex'
														 :total="pageInfo.totalRecords" />
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue';
import { getBlogListApi, getGatewayTypeListApi } from '/@/api/blog/blogGateway';
import { getAction, postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';
import { PageEntity } from '/@/common/page.entity';
import BlogInfoList from '/@/components/BlogInfoList/index.vue';

export default defineComponent({
	name: 'gatewayType',
	components: {
		BlogHeader,
		BlogInfoList
	},
	setup() {
		const state = reactive({
			typeList: [],
			currentTypeMap: {} as any,
			pageInfo: new PageEntity(),
			blogList: []
		});
		const getTypeList = () => {
			getAction(getGatewayTypeListApi, '').then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.typeList = res.data;
					if (state.typeList.length) {
						state.currentTypeMap = state.typeList[0];
						getBlogList();
					}
				}
			});
		};
		const getBlogList = () => {
			postAction(getBlogListApi, {
				state: true,
				typeId: state.currentTypeMap.id,
				pageIndex: state.pageInfo.pageIndex,
				pageSize: state.pageInfo.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.blogList = res.data.list;
					state.pageInfo.totalRecords = res.data.total;
				}
			});
		};
		const clickTag = data => {
			if (data.id === state.currentTypeMap.id) return false;
			state.currentTypeMap = data;
		};
		const changePageSize = (size: number) => {
			state.pageInfo.pageSize = size;
			state.pageInfo.pageIndex = 1;
			getBlogList();
		};
		const changePageIndex = (index: number) => {
			state.pageInfo.pageIndex = index;
			getBlogList();
		};
		onMounted(() => {
			getTypeList();
		});
		return {
			...toRefs(state),
			clickTag,
			changePageSize,
			changePageIndex
		}
	}
});
</script>

<style scoped lang='scss'>
	.type-container{
		width: 100%;
		height: 100%;
		background: var(--el-color-white);
		overflow-y: auto;
		.type-content{
			margin: 30px auto;
			.el-row{
				margin-bottom: 20px;
			}
			.card-header{
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
			.tag-list{
				flex-wrap: wrap;
				.tag-item{
					color: #999;
					border-color: #999;
					cursor: pointer;
					margin-bottom: 15px;
					&:before{
						color: #999;
						border-color: #999;
					}
					&.active{
						color: #00b5ad;
						border-color: #00b5ad;
					}
				}
				.tag-number{
					background: #f2711c;
					color: #fff;
					display: inline-block;
					width: 20px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					border-radius: 50%;
				}
			}
			.desc{
				padding-top: 15px;
				font-size: 18px;
				color: #00b5ad;
			}
			.page-bar{
				padding: 15px 0;
			}
		}
	}
</style>
