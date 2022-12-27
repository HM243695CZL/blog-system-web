<template>
	<div class='blog-info-list-container'>
		<div class='info flex flex-space-between flex-align-center' v-for='item in props.dataList' :key='item.id'>
			<div class='content'>
				<div class='title' @click='clickBlogTitle(item.id)'>{{item.title}}</div>
				<div class='summary'>{{item.summary}}</div>
				<div class='content-footer flex flex-space-between flex-align-center'>
					<div class='publish-date flex flex-start flex-align-center'>
						<el-icon><ele-Clock /></el-icon>{{(item.addTime || '').slice(0, 10)}}
						<el-icon class='view-icon'><ele-View /></el-icon>{{item.views}}
					</div>
					<el-tag size='small'>{{item.typeName}}</el-tag>
				</div>
			</div>
			<div class='img'>
				<img :src='item.pictureUrl' alt=''>
			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>

	import { useRouter } from 'vue-router';

	const router = useRouter();
	const props = defineProps({
		dataList: {
			type: Array,
			required: true
		}
	});
	const clickBlogTitle = (id: number) => {
		router.push({
			path: '/gateway/info/' + id
		});
	}
</script>

<style scoped lang='scss'>
	.blog-info-list-container{
		.info{
			padding-bottom: 20px;
			border-bottom: 1px dashed #ccc;
			padding-top: 20px;
			&:first-child{
				padding-top: 0;
			}
			.content{
				flex: 3;
				padding-right: 20px;
				.title{
					color: #373737;
					font-size: 20px;
					font-weight: 700;
					cursor: pointer;
				}
				.summary{
					padding: 10px 0;
				}
				.content-footer{
					.publish-date{
						color: #ccc;
						width: 140px;
						.el-icon{
							margin-right: 5px;
						}
						.view-icon{
							margin-left: 8px;
							margin-right: 5px;
						}
					}
				}
			}
			.img{
				flex: 1;
				img{
					width: 100%;
					height: auto;
				}
			}
		}
	}
</style>
