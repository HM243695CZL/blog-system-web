<template>
	<div class='tag-container'>
		<BlogHeader />
		<div class='tag-content base-width'>
			<TypeTag :data-list='tagList'
							 :current-map='currentTagMap'
							 :page-info='pageInfo'
							 :blog-list='blogList'
							 :title='"标签"'
							 @clickTag='clickTag'
							 @changePageSize='changePageSize'
							 @changePageIndex='changePageIndex'
			/>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue'
import { PageEntity } from '/@/common/page.entity';
import TypeTag from '../component/typeTag.vue';
import { getAction, postAction } from '/@/api/common';
import { getBlogListApi, getGatewayTagListApi } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';

export default defineComponent({
	name: 'gatewayTag',
	components: {
		BlogHeader,
		TypeTag
	},
	setup() {
		const state = reactive({
			tagList: [],
			currentTagMap: {} as any,
			pageInfo: new PageEntity(),
			blogList: []
		});
		const getTagList = () => {
			getAction(getGatewayTagListApi, '').then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.tagList = res.data;
					if (state.tagList.length) {
						state.currentTagMap = state.tagList[0];
						getBlogList();
					}
				}
			})
		};
		const getBlogList = () => {
			postAction(getBlogListApi, {
				state: true,
				tagId: state.currentTagMap.id,
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
			if (data.id === state.currentTagMap.id) return false;
			state.currentTagMap = data;
			getBlogList();
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
			getTagList();
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
	.tag-container{
		width: 100%;
		height: 100%;
		background: var(--el-color-white);
		overflow-y: auto;
		.tag-content{
			margin: 30px auto;
		}
	}
</style>
