<template>
	<div class='blog-info-container h100' ref='blogInfoRef'>
		<CommonTop
			@clickSearch="clickSearch"
			@clickReset="clickReset"
			@clickAdd="clickAdd"
		>
			<template #left>
				<el-form-item label="标题">
					<el-input v-model="searchParams.title" placeholder="请输入" clearable></el-input>
				</el-form-item>
			</template>
		</CommonTop>
		<vxe-table
			ref='tableRef'
			:row-config='{
				useKey: true,
				keyField: "id"
			}'
			:data='dataList'
			:max-height='tableHeight'
		>
			<vxe-column type='seq' title='序号' width='60' />
			<vxe-column title='标题' field='title' />
			<vxe-column title='分类' field='type' />
			<vxe-column title='更新时间' field='updateTime' />
			<vxe-column title='状态' field='state' />
			<vxe-column title="操作" width="200">
				<template #default="scope">
					<el-button size='small' type='default' @click="clickEdit(scope.row.id)">修改</el-button>
					<el-button size='small' type='danger' @click="clickDelete(scope.row.id)">删除</el-button>
				</template>
			</vxe-column>
		</vxe-table>
		<PaginationCommon
			:page-info='pageInfo'
			@changePageSize='changePageSize'
			@changePageIndex='changePageIndex'
		/>
		<CommonModal
			ref='modalFormRef'
			:title='configObj.title'
			:create-path='configObj.createPath'
			:update-path='configObj.updatePath'
			:view-path='configObj.viewPath'
			@refreshList='getDataList'
		>
			<BlogInfoModal ref='childRef' />
		</CommonModal>
	</div>
</template>

<script lang='ts'>
import CommonTop from '/@/components/CommonTop/index.vue';
import PaginationCommon from '/@/components/PaginationCommon/index.vue';
import CommonModal from '/@/components/CommonModal/index.vue';
import BlogInfoModal from './component/blogInfoModal.vue';
import { reactive, ref, toRefs } from 'vue';
import { createBlogInfoApi, deleteBlogInfoApi,
	getBlogInfoPageApi, updateBlogInfoApi, viewBlogInfoApi } from '/@/api/blog/blogInfo';
import useCrud from '/@/hooks/useCrud';
export default {
	name: 'blogInfo',
	components: {
		CommonTop,
		PaginationCommon,
		CommonModal,
		BlogInfoModal
	},
	setup() {
		const blogInfoRef = ref();
		const state = reactive({
			urls: {
				page: getBlogInfoPageApi,
				delete: deleteBlogInfoApi
			},
			configObj: {
				title: '博客',
				createPath: createBlogInfoApi,
				updatePath: updateBlogInfoApi,
				viewPath: viewBlogInfoApi
			},

		});
		const {
			tableRef,
			modalFormRef,
			childRef,
			pageInfo,
			dataList,
			tableHeight,
			searchParams,
			getDataList,
			clickAdd,
			clickEdit,
			clickSearch,
			clickReset,
			clickDelete,
			changePageIndex,
			changePageSize
		} = useCrud({
			uris: state.urls,
			parentRef: blogInfoRef
		});
		return {
			blogInfoRef,
			...toRefs(state),

			tableRef,
			modalFormRef,
			childRef,
			pageInfo,
			dataList,
			tableHeight,
			searchParams,
			getDataList,
			clickAdd,
			clickEdit,
			clickSearch,
			clickReset,
			clickDelete,
			changePageIndex,
			changePageSize
		}
	}
}
</script>

<style scoped lang='scss'>
	.blog-info-container{
		padding: 20px;
		overflow: auto;
	}
</style>