<template>
	<div class='blog-info-list-container'>
		<div class='info flex flex-space-between flex-align-center' v-for='item in props.dataList' :key='item.id'>
			<div class='content'>
				<div class='title' @click='clickBlogTitle(item.id)'>{{item.title}}</div>
				<div class='summary'>{{item.summary}}</div>
				<div class='content-footer flex flex-space-between flex-align-center'>
					<div class='publish-date flex flex-start flex-align-center'>
						<el-icon><ele-Clock /></el-icon>{{(item.updateTime || '').slice(0, 10)}}
						<el-icon class='view-icon'><ele-View /></el-icon>{{item.views || 0}}
					</div>
					<div class='tag-box text-over'>
						<el-tag size='small'>{{item.typeName}}</el-tag>
						<el-tag size='small' v-if='item.tagsName'>{{item.tagsName}}</el-tag>
					</div>
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
	@import "../../theme/media/index.scss";
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
						flex: 1;
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
					.tag-box{
						.el-tag{
							margin-left: 10px;
						}
					}
					@media screen and (max-width: $xs){
						.tag-box{
							display: none;
						}
					}
				}
			}
			.img{
				flex: 1;
				img{
					border-radius: 5px;
					width: 100%;
					height: auto;
				}
			}
		}
	}
</style>
