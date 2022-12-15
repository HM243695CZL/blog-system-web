<template>
	<el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
		<el-form-item label="标题" prop="title">
			<el-input v-model="state.ruleForm.title" placeholder="请输入标题" clearable>
				<template #append>
					<el-select v-model='state.ruleForm.property' class='w120'>
						<el-option label='原创' value='1'></el-option>
						<el-option label='转载' value='2'></el-option>
						<el-option label='翻译' value='3'></el-option>
					</el-select>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item label='摘要' prop='summary'>
			<el-input type='textarea' :rows='3' v-model='state.ruleForm.summary'
								show-word-limit
								resize='none'
								maxlength='100' placeholder='请输入摘要' clearable></el-input>
		</el-form-item>
		<el-form-item label='详情' prop='content'>
			<MdEditor :content='state.ruleForm.content' @editorBlur='editorBlur' />
		</el-form-item>
		<el-row>
			<el-col>
				<el-form-item label='专栏' prop='type'>
					<el-select v-model='state.ruleForm.type' placeholder='请选择专栏'>

					</el-select>
				</el-form-item>
			</el-col>
			<el-col></el-col>
		</el-row>
	</el-form>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import MdEditor from '/@/components/Editor/MdEditor.vue';

	const props = defineProps({
		typeList: {
			type: Array,
			required: true
		},
		tagList: {
			type: Array,
			required: true
		}
	});
	const formRef = ref();

	const state = reactive({
		ruleForm: {
			title: '',
			property: '1',
			summary: '',
			content: `::: tip
  你可以点击 toolbar 中的 tip 来快速插入
:::`,
			type: '',
			tags: ''
		},
		rules: {
			title: [
				{ required: true, message: '标题不能为空', trigger: 'blur' }
			]
		},
	});
	const editorBlur = text => {
		console.log(text);
	};
	defineExpose({
		formRef
	})
</script>
