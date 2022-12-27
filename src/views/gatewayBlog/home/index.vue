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
									共<span>{{pageInfo.totalRecords}}</span>篇
								</div>
							</div>
						</template>
						<BlogInfoList :data-list='blogList' />
					</el-card>
					<div class='page-bar'>
						<el-pagination background layout="prev, pager, next"
													 hide-on-single-page
													 small
													 @changePageSize='changePageSize'
													 @changePageIndex='changePageIndex'
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
								<div class='card-header-left'>
									<el-icon color='#f2711c'>
										<ele-CollectionTag />
									</el-icon>
									标签
								</div>
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
								<div class='card-header-left'>
									<el-icon color='#f2711c'>
										<ele-TakeawayBox />
									</el-icon>
									最新推荐
								</div>
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

export default defineComponent({
	name: 'gatewayHome',
	components: {
		BlogHeader,
		BlogInfoList
	},
	setup() {
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
		onMounted(() => {
			getBlogList();
			getTypeList();
			getTagList();
			getRecommendBlogList();
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
			.page-bar{
				padding-bottom: 20px;
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
