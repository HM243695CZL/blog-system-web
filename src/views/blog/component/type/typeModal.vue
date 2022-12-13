<template>
	<div class='type-modal-container'>
		<el-dialog :append-to-body='false'
							 :close-on-click-modal='false'
							 :title='state.title'
							 v-model='state.isShowDialog' width='600px'>
			<form-create v-model="state.value" :rule="props.formConfig"
									 :option='state.options'
									 v-model:api="state.fApi"/>
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

	const props = defineProps({
		formConfig: {
			type: Object,
			required: true
		}
	});

	const emits = defineEmits([
		'refreshList'
	]);

	const state = reactive({
		isShowDialog: false,
		title: '新增分类',
		fApi: {} as any,
		value: {},
		options: {
			submitBtn: false
		}
	});
	const openDialog = () => {
		state.isShowDialog = true;
	};
	const closeDialog = () => {
		state.isShowDialog = false;
	};
	const clickConfirm = () => {
		state.fApi.submit(formData => {
			console.log(formData);
		})
	};
	defineExpose({
		openDialog
	});
</script>

<style scoped>

</style>
