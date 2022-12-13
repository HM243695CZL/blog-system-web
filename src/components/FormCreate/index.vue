<template>
	<div class='form-create-container'>
		<form-create v-model="state.value" :rule="props.formConfig"
								 :option='state.options'
								 v-model:api="state.fApi"/>
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
	const state = reactive({
		value: {},
		fApi: {},
		options: {}
	});
</script>
