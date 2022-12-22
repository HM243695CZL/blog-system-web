<template>
	<div class='type-container'>
		<BlogHeader />
		<div class='type-content base-width'>
			<el-row :gutter='20'>
				<el-col :span='24' :xs='24'>
					<el-card shadow='never'>
						<template #header>
							<div class="card-header flex flex-space-between flex-align-center">
								<div class='card-header-left'>分类</div>
								<div class='card-header-right'>
									共<span>2</span>个
								</div>
							</div>
						</template>
					</el-card>
				</el-col>
			</el-row>
		</div>
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
	.type-container{
		width: 100%;
		height: 100%;
		background: var(--el-color-white);
		overflow-y: auto;
		.type-content{
			margin: 30px auto;
			.card-header{
				.card-header-left{
					color: #00b5ad;
					font-weight: 700;
					font-size: 18px;
				}
				.card-header-right{
					span{
						color: #f2711c;
						font-size: 22px;
					}
				}
			}
		}
	}
</style>
