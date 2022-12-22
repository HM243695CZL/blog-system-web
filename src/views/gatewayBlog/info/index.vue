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
				<div class='comment-title' v-if='state.commentList.length > 0'>评论</div>
				<div class='comment-list' v-if='state.commentList.length > 0'>
					<div class='list-item flex flex-start flex-align-start' v-for='item in state.commentList' :key='item.id'>
						<div class='circle'></div>
						<div class='comment-detail'>
							<div class='name'>
								{{item.name}}
								<span>{{(item.addTime || '').slice(0, 16)}}</span>
							</div>
							<div class='content'>{{item.content}}</div>
							<div class='reply' @click='clickReply(item, 0, "")'>回复</div>
							<div class='children flex flex-start flex-align-start' v-for='ele in item.children' :key='ele.id'>
								<div class='circle'></div>
								<div class='comment-detail'>
									<div class='name'>
										{{ele.name}}
										<span>{{(ele.addTime || '').slice(0, 16)}}</span>
									</div>
									<div class='content'>{{ele.content}}</div>
									<div class='reply' @click='clickReply(item, 1, ele)'>回复</div>
									<div class='children flex flex-start flex-align-start' v-for='e in ele.children' :key='e.id'>
										<div class='circle'></div>
										<div class='comment-detail'>
											<div class='name'>
												{{e.name}}
												<span>{{(e.addTime || '').slice(0, 16)}}</span>
											</div>
											<div class='content'>{{e.content}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class='start-comment' @click='clickStartComment'>开始评论</div>
				<div class='comment' v-if='state.commentFlag'>
					<el-input v-model='state.content' placeholder='请输入评论' type='textarea' :rows='5' resize='none'></el-input>
					<div class='user-comment flex flex-start flex-align-center'>
						<el-input class='w240' v-model='state.name' placeholder='姓名' size='small'></el-input>
						<el-input class='w240' v-model='state.email' placeholder='邮箱' size='small'></el-input>
						<el-button size='small' type='primary' @click='clickComment'>确定</el-button>
						<el-button size='small' type='default' @click='clickCancel'>取消</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { getAction, postAction } from '/@/api/common';
import { getGatewayBlogInfoApi, createCommentApi, getCommentByBlogIdApi } from '/@/api/blog/blogGateway';
	import { StatusEnum } from '/@/common/status.enum';
	import BlogHeader from '/@/components/BlogHeader/index.vue';
	import MdEditor from '/@/components/Editor/MdEditor.vue';
import { ElMessage } from 'element-plus';

	const route = useRoute();

	const state = reactive({
		id: '' as any,
		content: '',
		name: '',
		email: '',
		parentId: '',
		blogMap: {},
		commentList: [],
		commentFlag: false
	});

	// 获取博客详情
	const getBlogInfo = () => {
		getAction(getGatewayBlogInfoApi + '/' + state.id, '').then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				state.blogMap = res.data;
			}
		})
	};

	// 获取博客的评论信息
	const getComment = () => {
		getAction(getCommentByBlogIdApi + '/' + state.id, '').then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				const arr = [] as any;
				res.data.map(item => {
					if (!item.parentId) {
						arr.push(item);
					}
					const children = res.data.filter(data => {
						return data.parentId === item.id
					});
					if (!children.length) return;
					item.children = children;
				});
				state.commentList = arr;
			}
		})
	}

	// 点击开始评论
	const clickStartComment = () => {
		state.commentFlag = true;
		resetInputVal();
		state.parentId = '';
	}

	// 点击回复
	const clickReply = (data, level, ele) => {
		state.commentFlag = true;
		resetInputVal();
		state.parentId = data.id;
		if (level === 1) {
			state.content = '@' + ele.name + ': ';
		} else {
			state.content = '@' + data.name + ': ';
		}
	}

	// 初始化表单
	const resetInputVal = () => {
		state.content = '';
		state.name = '';
		state.email = '';
	}

	// 点击取消
	const clickCancel = () => {
		state.commentFlag = false;
	}

	// 点击确定
	const clickComment = () => {
		const validMap = {
			content: state.content,
			name: state.name,
			email: state.email,
			blogId: state.id,
			parentId: state.parentId
		};
		const messageMap = {
			content: '评论内容不能为空',
			name: '姓名不能为空',
			email: '邮箱不能为空'
		}
		let flag = false;
		for (const o in messageMap) {
			if (!validMap[o]) {
				flag = true;
				ElMessage.error(messageMap[o])
			}
		}
		if (flag) return false;
		postAction(createCommentApi, validMap).then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				ElMessage.success(res.message);
				resetInputVal();
				clickCancel();
				getComment();
			}
		})
	};

	onMounted(() => {
		state.id = route.params.id;
		getBlogInfo();
		getComment();
	})
</script>

<style scoped lang='scss'>
	.blog-info-container{
		width: 100%;
		height: 100%;
		overflow-y: auto;
		.info-content{
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
				height: 550px;
				border: 1px solid #f5f5f5;
				img{
					width: 100%;
					height: 100%;
				}
			}
			@media (max-width: 766px){
				.head-img{
					height: 200px;
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
				.comment-title{
					margin-top: 30px;
					font-weight: 700;
					font-size: 20px;
					padding: 8px 0;
					border-bottom: 1px solid #f5f5f5;
				}
				.comment-list{
					padding: 20px 0;
					.list-item{
						padding-top: 15px;
						.circle{
							width: 30px;
							height: 30px;
							border-radius: 50%;
							border: 1px solid #ccc;
							margin-right: 10px;
							background: url("https://hl-mall-tiny.oss-cn-chengdu.aliyuncs.com/hlmall/images/20221219/2018e9ac91ec37d9aaf437a1fd5d7070.png");
							background-size: 30px 30px;
						}
						.comment-detail{
							flex: 1;
							.name{
								font-weight: 700;
								padding-bottom: 8px;
								span{
									margin-left: 10px;
									color: #aaa;
									font-weight: 400;
								}
							}
							.reply{
								width: 50px;
								padding-top: 10px;
								color: #aaa;
								cursor: pointer;
								&:hover{
									color: #00b5ad;
								}
							}
							.children{
								padding: 20px 5px;
								background: #f1f1f1;
							}
						}
					}
				}
				.start-comment{
					cursor: pointer;
					margin: 20px 0;
					width: 100px;
					text-align: center;
					padding: 8px 15px;
					background: #00b5ad;
					color: #fff;
					border-radius: 5px;
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
