<template>
	<div class='blog-info-container'>
		<BlogHeader />
		<div class='info-content base-width'>
			<div class='head-date flex flex-start flex-align-center'>
				<el-icon>
					<ele-Clock />
				</el-icon>
				{{(state.blogMap.addTime || '').slice(0, 10)}}
				<el-icon class='view-icon'>
					<ele-View />
				</el-icon>
				{{state.blogMap.views}}
			</div>
			<div class='head-img'>
				<img :src='state.blogMap.pictureUrl' alt=''>
			</div>
			<div class='content-info'>
				<div class='info-title'>{{state.blogMap.title}}</div>
				<div class='content-type-tag flex flex-space-between flex-align-start'>
					<div class='type-tag'>
						<div class='type flex flex-start flex-align-center'>
							专栏：<div class='hl-tag'>{{state.blogMap.typeName}}</div>
						</div>
						<div class='tag flex flex-start flex-align-center'>
							标签：<div class='hl-tag'>{{state.blogMap.tagsName}}</div>
						</div>
					</div>
					<div class='original'>原创</div>
				</div>
				<div class='md-content'>
					<MdEditor
						:mode='"preview"'
						:content='state.blogMap.content' />
				</div>
				<div v-if='state.blogMap.isAppreciation' class='appreciation flex flex-space-center flex-align-center'>
					<div class='appreciation-btn'>赞赏</div>
				</div>
				<div class='comment'>
					<el-input v-model='state.comment' placeholder='请输入评论' type='textarea' :rows='5' resize='none'></el-input>
					<div class='user-comment flex flex-start flex-align-center'>
						<el-input class='w240' v-model='state.name' placeholder='姓名'>
							<template #prepend>
								<el-icon>
									<ele-UserFilled />
								</el-icon>
							</template>
						</el-input>
						<el-input class='w240' v-model='state.email' placeholder='邮箱'>
							<template #prepend>
								<el-icon>
									<ele-Message />
								</el-icon>
							</template>
						</el-input>
						<el-button type='primary'>评论</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { getAction } from '/@/api/common';
	import { getGatewayBlogInfoApi } from '/@/api/blog/blogGateway';
	import { StatusEnum } from '/@/common/status.enum';
	import BlogHeader from '/@/components/BlogHeader/index.vue';
	import MdEditor from '/@/components/Editor/MdEditor.vue';

	const route = useRoute();

	const state = reactive({
		id: '' as any,
		comment: '',
		name: '',
		email: '',
		blogMap: {}
	});

	const getBlogInfo = () => {
		getAction(getGatewayBlogInfoApi + '/' + state.id, '').then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				state.blogMap = res.data;
			}
		})
	}
	onMounted(() => {
		state.id = route.params.id;
		getBlogInfo();
	})
</script>

<style scoped lang='scss'>
	.blog-info-container{
		width: 100%;
		height: 100%;
		overflow-y: auto;
		.info-content{
			width: 60%;
			margin: 0 auto;
			background: var(--el-color-white);
			padding: 15px;
			.head-date{
				padding-bottom: 10px;
				.el-icon{
					margin-right: 5px;
				}
				.view-icon{
					margin-left: 20px;
					margin-right: 5px;
				}
			}
			.head-img{
				padding: 10px;
				height: 480px;
				border: 1px solid #f5f5f5;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.content-info{
				.info-title{
					font-weight: 700;
					padding: 10px 0;
					font-size: 20px;
					text-align: center;
				}
				.content-type-tag{
					padding-top: 30px;
					.type-tag{
						flex: 1;
						.type{
							padding: 10px 0;
						}
						.tag{
							padding: 10px 0;
						}
					}
					.original{
						padding: 5px 20px;
						border: 1px solid #00b5ad;
						color: #00b5ad;
						border-radius: 5px;
					}
				}
				.md-content{
					border: 1px solid #f2f2f2;
				}
				.appreciation{
					padding: 10px 0;
					.appreciation-btn{
						text-align: center;
						padding: 5px 12px;
						border-radius: 5px;
						width: 80px;
						background: #f2711c;
						color: #fff;
						cursor: pointer;
					}
				}
				.comment{
					margin-top: 10px;
					.user-comment{
						margin-top: 10px;
						.el-input{
							margin-right: 20px;
						}
					}
				}
			}
		}
	}
</style>
