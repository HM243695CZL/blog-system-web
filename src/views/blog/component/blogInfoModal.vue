<template>
	<el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
		<el-form-item label="标题" prop="title">
			<el-input v-model="state.ruleForm.title" placeholder="请输入标题" clearable></el-input>
		</el-form-item>
		<el-form-item label='详情' prop='content'>
			<MdEditor :content='state.content' @editorBlur='editorBlur' />
		</el-form-item>
	</el-form>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import MdEditor from '/@/components/Editor/MdEditor.vue';

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
		content: `::: tip
  你可以点击 toolbar 中的 tip 来快速插入
:::`
	});
	const editorBlur = text => {
		console.log(text);
	};
	defineExpose({
		formRef
	})
</script>
