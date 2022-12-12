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
		</vxe-table>
		<PaginationCommon
			:page-info='pageInfo'
			@changePageSize='changePageSize'
			@changePageIndex='changePageIndex'
		/>
		<TypeModal
			ref='modalFormRef'
			@refreshList="getDataList"
		/>
	</div>
</template>

<script lang='ts'>
import CommonTop from '/@/components/CommonTop/index.vue';
import PaginationCommon from '/@/components/PaginationCommon/index.vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { deleteBlogTypeApi, getBlogTypePageApi } from '/@/api/blog/type';
import { getConfigApi } from '/@/api/system/form-designer';
import useCrud from '/@/hooks/useCrud';
import { postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';
import TypeModal from './component/typeModal.vue';

export default {
	name: 'blogType',
	components: {
		CommonTop,
		PaginationCommon,
		TypeModal
	},
	setup() {
		const blogTypeRef = ref();
		const state = reactive({
			uris: {
				page: getBlogTypePageApi,
				delete: deleteBlogTypeApi
			},
			formConfig: {}
		});
		const getFormConfig = () => {
			postAction(getConfigApi, {
				key: 'BlogTypeKey'
			}).then(res => {
				if (res.state === StatusEnum.SUCCESS) {
					state.formConfig = res.data.config;
				}
			})
		}
		const {
			tableRef,
			modalFormRef,
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
