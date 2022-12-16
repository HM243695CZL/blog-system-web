<template>
	<div class='tag-container'>
		<BlogHeader />
		tag-container
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import BlogHeader from '/@/components/BlogHeader/index.vue'

export default defineComponent({
	name: 'gatewayTag',
	components: {
		BlogHeader
	}
});
</script>

<style scoped lang='scss'>

</style>
