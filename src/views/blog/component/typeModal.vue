<template>
	<div class='type-modal-container'>
		<el-dialog :append-to-body='false'
							 :close-on-click-modal='false'
							 :title='state.title'
							 v-model='state.isShowDialog' width='600px'>
			<template #footer>
				<div class='dialog-footer'>
					<el-button @click='closeDialog'>取 消</el-button>
					<el-button type='primary' @click='clickConfirm'>确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts' setup>
	import { reactive } from 'vue';

	const emits = defineEmits([
		'refreshList'
	]);

	const state = reactive({
		isShowDialog: false,
		title: '新增分类'
	});
	const openDialog = () => {
		state.isShowDialog = true;
	};
	const closeDialog = () => {
		state.isShowDialog = false;
	};
	const clickConfirm = () => {

	};
	defineExpose({
		openDialog
	});
</script>

<style scoped>

</style>
