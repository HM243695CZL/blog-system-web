<template>
	<div class='blog-type-container h100' ref='blogTypeRef'>
		<CommonTop
			@clickSearch="clickSearch"
			@clickReset="clickReset"
			@clickAdd="clickAdd"
		>
			<template #left>
				<el-form-item label="专栏名称">
					<el-input v-model="searchParams.name" placeholder="请输入专栏名称" clearable></el-input>
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
			<vxe-column title='专栏名称' field='name' />
			<vxe-column title='专栏简介' field='desc' />
			<vxe-column title='博客数量' field='number' />
			<vxe-column title='添加时间' field='addTime' />
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
			<FormCreate
				ref='formCreateRef'
				:form-config='formConfig'
			/>
		</CommonModal>
	</div>
</template>

<script lang='ts'>
import CommonTop from '/@/components/CommonTop/index.vue';
import CommonModal from '/@/components/CommonModal/index.vue';
import FormCreate from '/@/components/FormCreate/index.vue';
import PaginationCommon from '/@/components/PaginationCommon/index.vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { createBlogTypeApi, deleteBlogTypeApi,
	getBlogTypePageApi, updateBlogTypeApi, viewBlogTypeApi
} from '/@/api/blog/type';
import { getConfigApi } from '/@/api/system/form-designer';
import useCrud from '/@/hooks/useCrud';
import { postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';

export default {
	name: 'blogType',
	components: {
		CommonTop,
		CommonModal,
		PaginationCommon,
		FormCreate
	},
	setup() {
		const blogTypeRef = ref();
		const state = reactive({
			uris: {
				page: getBlogTypePageApi,
				delete: deleteBlogTypeApi
			},
			formConfig: {},
			configObj: {
				title: '分类',
				createPath: createBlogTypeApi,
				updatePath: updateBlogTypeApi,
				viewPath: viewBlogTypeApi
			}
		});
		const getFormConfig = () => {
			postAction(getConfigApi, {
				key: 'BlogTypeKey'
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.formConfig = JSON.parse(res.data.config);
				}
			})
		}
		const {
			tableRef,
			modalFormRef,
			formCreateRef,
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
			uris: state.uris,
			parentRef: blogTypeRef
		});
		onMounted(() => {
			getFormConfig();
		});
		return {
			blogTypeRef,
			...toRefs(state),

			tableRef,
			modalFormRef,
			formCreateRef,
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
	.blog-type-container{
		padding: 20px;
		overflow: auto;
	}
</style>
