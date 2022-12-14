<template>
	<div class='blog-type-container h100' ref='blogTagRef'>
		<CommonTop
			@clickSearch="clickSearch"
			@clickReset="clickReset"
			@clickAdd="clickAdd"
		>
			<template #left>
				<el-form-item label="标签名称">
					<el-input v-model="searchParams.name" placeholder="请输入标签名称" clearable></el-input>
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
			<vxe-column title='标签名称' field='name' />
			<vxe-column title='博客数量' field='number' />
			<vxe-column title='更新时间' field='updateTime' />
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
import { createTagApi, deleteTagApi,
	getTagPageApi, updateTagApi, viewTagApi } from '/@/api/blog/tag';
import useCrud from '/@/hooks/useCrud';
import { postAction } from '/@/api/common';
import { getConfigApi } from '/@/api/system/form-designer';
import { StatusEnum } from '/@/common/status.enum';

export default {
	name: 'blogTag',
	components: {
		CommonTop,
		CommonModal,
		PaginationCommon,
		FormCreate
	},
	setup() {
		const blogTagRef = ref();
		const state = reactive({
			uris: {
				page: getTagPageApi,
				delete: deleteTagApi
			},
			formConfig: {},
			configObj: {
				title: '标签',
				createPath: createTagApi,
				updatePath: updateTagApi,
				viewPath: viewTagApi
			}
		});
		const getFormConfig = () => {
			postAction(getConfigApi, {
				key: 'BlogTagKey'
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
			parentRef: blogTagRef
		});
		onMounted(() => {
			getFormConfig();
		});
		return {
			blogTagRef,
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
