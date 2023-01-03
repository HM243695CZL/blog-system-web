<template>
	<div class='blog-home-container'>
		<BlogHeader />
		<div class='home-content base-width'>
			<el-row :gutter='20'>
				<el-col :span='16' :xs='24'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header card-header-blog flex flex-space-between flex-align-center">
								<div class='card-header-left'>博客</div>
								<div class='card-header-right'>
									共<span class='number'>{{pageInfo.totalRecords}}</span>篇
								</div>
							</div>
						</template>
						<BlogInfoList :data-list='blogList' />
					</el-card>
					<div class='page-bar'>
						<el-pagination background layout="prev, pager, next"
													 hide-on-single-page
													 small
													 @size-change='changePageSize'
													 @current-change='changePageIndex'
													 :total="pageInfo.totalRecords" />
					</div>
				</el-col>
				<el-col :span='8' :xs='24'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header card-header-classify flex flex-space-between flex-align-center">
								<div class='card-header-left'>
									<el-icon color='#f2711c'>
										<ele-Suitcase />
									</el-icon>
									分类
								</div>
								<div class='card-header-right'>
									<span class='more' @click='clickMore("type")'>更多</span>
								</div>
							</div>
						</template>
						<div class='type-list'>
							<div class='list-item flex flex-space-between flex-align-center'
									 @click='clickTypeItem(item.id)'
									 v-for='item in typeList.slice(0, 6)' :key='item.id'>
								{{item.name}}
								<div class='type-number hl-tag'>{{item.number}}</div>
							</div>
						</div>
					</el-card>
					<el-card shadow='never' class='tag-card'>
						<template #header>
							<div class="card-header card-header-tag flex flex-space-between flex-align-center">
								<div class='card-header-left'>
									<el-icon color='#f2711c'>
										<ele-CollectionTag />
									</el-icon>
									标签
								</div>
								<div class='card-header-right'>
									<span class='more' @click='clickMore("tag")'>更多</span>
								</div>
							</div>
						</template>
						<div class='tag-list flex flex-start flex-align-center'>
							<div class='hl-tag tag-item' v-for='item in tagList.slice(0, 10)' :key='item.id' @click='clickTagItem(item.id)'>
								{{item.name}} <span>{{item.number}}</span>
							</div>
						</div>
					</el-card>
					<el-card shadow='never' class='recommend-card'>
						<template #header>
							<div class="card-header card-header-tag flex flex-space-between flex-align-center">
								<div class='card-header-left'>
									<el-icon color='#f2711c'>
										<ele-TakeawayBox />
									</el-icon>
									最新推荐
								</div>
							</div>
						</template>
						<div class='recommend-list'>
							<div class='list-item' @click='clickBlogTitle(item.blogInfoId)' v-for='(item, index) in recommendBlogList' :key='item.blogInfoId'>
								{{index + 1}}、{{item.title}}
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue'
import { postAction, getAction } from '/@/api/common';
import { getBlogListApi, getGatewayTypeListApi, getGatewayTagListApi } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';
import { PageEntity } from '/@/common/page.entity';
import BlogInfoList from '/@/components/BlogInfoList/index.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'gatewayHome',
	components: {
		BlogHeader,
		BlogInfoList
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
		};
		const clickTypeItem = (id: number) => {
			router.push({
				path: '/gateway/type',
				query: {
					id
				}
			});
		};
		const clickTagItem = (id: number) => {
			router.push({
				path: '/gateway/tag',
				query: {
					id
				}
			})
		};
		const clickMore = mode => {
			router.push({
				path: '/gateway/' + mode
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
			clickBlogTitle,
			clickTypeItem,
			clickTagItem,
			clickMore
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
			.card-header-blog, .card-header-classify, .card-header-tag{
				.card-header-left{
					color: #00b5ad;
					font-weight: 700;
					font-size: 18px;
				}
				.card-header-right{
					.more{
						cursor: pointer;
						font-size: 12px;
						&:hover{
							color: #00b5ad;
						}
					}
					.number{
						color: #f2711c;
						font-size: 22px;
					}
				}
			}
			.page-bar{
				padding: 20px 0;
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
					flex-wrap: wrap;
					.tag-item{
						margin-right: 10px;
						font-weight: 700;
						cursor: pointer;
						margin-bottom: 10px;
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
