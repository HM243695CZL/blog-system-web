<template>
	<div class='type-container'>
		<BlogHeader />
		<div class='type-content base-width'>
			<TypeTag :data-list='typeList'
							 :current-map='currentTypeMap'
							 :page-info='pageInfo'
							 :blog-list='blogList'
							 :title='"分类"'
							 @clickTag='clickTag'
							 @changePageSize='changePageSize'
							 @changePageIndex='changePageIndex'
			/>
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
import TypeTag from '../component/typeTag.vue';

export default defineComponent({
	name: 'gatewayType',
	components: {
		BlogHeader,
		TypeTag
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
		}
	}
</style>
