<template>
	<div class='type-container'>
		<BlogHeader />
		type-container
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue'

export default defineComponent({
	name: 'gatewayType',
	components: {
		BlogHeader
	}
});
</script>

<style scoped lang='scss'>

</style>
