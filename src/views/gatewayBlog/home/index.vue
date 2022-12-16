<template>
	<div class='blog-home-container'>
		<BlogHeader />
		<div class='home-content base-width'>
			博客首页
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
import { postAction } from '/@/api/common';
import { getBlogListApi } from '/@/api/blog/blogGateway';
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

		};
		const changePageIndex = (index: number) => {

		};
		onMounted(() => {
			getBlogList();
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
			margin: 0 auto;
		}
	}
</style>
