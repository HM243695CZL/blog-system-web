<template>
	<el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
		<el-form-item label="标题" prop="title">
			<el-input v-model="state.ruleForm.title" placeholder="请输入标题" clearable></el-input>
		</el-form-item>
	</el-form>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';

	const formRef = ref();

	const state = reactive({
		ruleForm: {
			title: ''
		},
		rules: {
			title: [
				{ required: true, message: '标题不能为空', trigger: 'blur' }
			]
		},
	});
	defineExpose({
		formRef
	})
</script>
