<template>
	<el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
		<el-form-item label="标题" prop="title">
			<el-input v-model="state.ruleForm.title" placeholder="请输入标题" clearable>
				<template #append>
					<el-select v-model='state.ruleForm.property' class='w120'>
						<el-option label='原创' :value='1'></el-option>
						<el-option label='转载' :value='2'></el-option>
						<el-option label='翻译' :value='3'></el-option>
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
		<el-row :gutter='20'>
			<el-col :span='12'>
				<el-form-item label='专栏' prop='type'>
					<el-select v-model='state.ruleForm.type' class='w100' placeholder='请选择专栏' filterable>
						<el-option v-for='item in props.typeList' :key='item.id' :label='item.name' :value='item.id'></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span='12'>
				<el-form-item label='标签' prop='tags'>
					<el-select v-model='state.ruleForm.tags' class='w100' placeholder='请选择标签' filterable>
						<el-option v-for='item in props.tagList' :key='item.id' :label='item.name' :value='item.id'></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter='20'>
			<el-col :span='12'>
				<el-form-item label='首图' prop='pictureUrl'>
					<SingleUpload :source-url='state.ruleForm.pictureUrl' @changeSourceUrl='changePictureUrl' />
				</el-form-item>
			</el-col>
			<el-col :span='12'>
				<el-form-item label='博客状态' prop='state'>
					<el-checkbox v-model="state.ruleForm.state" label="直接发布" />
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter='20'>
			<el-col :span='2'>
				<el-form-item prop='isRecommend'>
					<el-checkbox v-model="state.ruleForm.isRecommend" label="推荐" />
				</el-form-item>
			</el-col>
			<el-col :span='2'>
				<el-form-item prop='isReprint'>
					<el-checkbox v-model="state.ruleForm.isReprint" label="转载声明" />
				</el-form-item>
			</el-col>
			<el-col :span='2'>
				<el-form-item prop='isAppreciation'>
					<el-checkbox v-model="state.ruleForm.isAppreciation" label="赞赏" />
				</el-form-item>
			</el-col>
			<el-col :span='2'>
				<el-form-item prop='isComment'>
					<el-checkbox v-model="state.ruleForm.isComment" label="留言" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import MdEditor from '/@/components/Editor/MdEditor.vue';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';

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
			property: 1,
			summary: '',
			content: '',
			type: '',
			tags: '',
			pictureUrl: '',
			isRecommend: '',
			isReprint: '',
			isAppreciation: '',
			isComment: '',
			state: true
		},
		rules: {
			title: [
				{ required: true, message: '标题不能为空', trigger: 'blur' }
			]
		},
	});
	const editorBlur = text => {
		state.ruleForm.content = text;
	};
	const changePictureUrl = (url: string) => {
		state.ruleForm.pictureUrl = url;
	};
	defineExpose({
		formRef,
		state
	})
</script>
<style lang='scss' scoped>
	.el-row{
		margin-bottom: 15px;
	}
</style>
