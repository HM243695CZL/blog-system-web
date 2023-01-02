<template>
	<div class='blog-header-container'>
		<header class='header-top-bar'>
			<el-row class='header-bar base-width' :gutter='20'>
				<el-col class='top-bar-list ' :span='12' :xs='24'>
					<div :class='["list-item", item.path === state.currentTab ? "active" : ""]'
							 @click='clickTopBar(item)'
							 v-for='item in state.topBarList' :key='item.path'>
						<i class='el-icon'>
							<component :is='item.icon'></component>
						</i>
						{{item.text}}
					</div>
					<div class='login-btn-mobile hidden-sm-and-up' @click='clickLogin'>登录</div>
				</el-col>
				<el-col class='search-box hidden-xs-only' :span='12'>
					<el-input size='small' v-model='state.keywords' clearable placeholder='搜索关键字' @input='changeKeywords'>
						<template #append>
							<el-icon @click='clickKeywords'>
								<ele-Search />
							</el-icon>
						</template>
					</el-input>
					<div class='content-list' v-if='state.contentList.length'>
						<div class='total-tip'>共{{state.contentList.length}}条</div>
						<div class='list-item text-over' v-for='item in state.contentList' :key='item.blogInfoId' @click='clickBlogTitle(item.blogInfoId)'>
							<el-tag type='success'>{{item.tagsName}}</el-tag>{{item.title}}
						</div>
					</div>
					<div class='login-btn' @click='clickLogin'>登录后台</div>
				</el-col>
			</el-row>
		</header>
		<div class='mobile-search hidden-sm-and-up'>
			<el-icon @click='clickSearch'>
				<ele-Search />
			</el-icon>
		</div>
	</div>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { postAction } from '/@/api/common';
import { getListByContentApi } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';

const route = useRoute();
const router = useRouter();
const state = reactive({
	topBarList: [
		{ text: '博客首页', path: '/gateway/home', icon: 'ele-House'},
		{ text: '分类', path: '/gateway/type', icon: 'ele-Memo'},
		{ text: '专栏', path: '/gateway/tag', icon: 'ele-CollectionTag'},
	],
	keywords: '',
	currentTab: '',
	contentList: [],
	timer: null as any
});
onMounted(() => {
	state.currentTab = route.path;
});
const clickTopBar = data => {
	router.push(data.path);
}
const clickLogin = () => {
	router.push('/login');
};
const getContentList = () => {
	postAction(getListByContentApi, {
		content: state.keywords
	}, false).then(res => {
		if (res.status === StatusEnum.SUCCESS) {
			state.contentList = res.data;
		}
	});
};
const changeKeywords = () => {
	if (state.timer) {
		clearInterval(state.timer);
	}
	state.timer = setTimeout(() => {
		if (state.keywords) {
			getContentList();
		} else {
			state.contentList = [];
		}
	}, 100);
};
const clickKeywords = () => {
	if (state.keywords) {
		getContentList();
	}
};
const clickBlogTitle = (id: number) => {
	router.push({
		path: '/gateway/info/' + id
	});
};
const clickSearch = () => {
	router.push({
		path: '/gateway/search'
	})
}
</script>

<style scoped lang='scss'>
	.blog-header-container{
		position: sticky;
		top: 0;
		z-index: 999;
		.header-top-bar{
			background-color: #1b1c1d;
			.header-bar{
				margin: 0 auto;
				height: 60px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.top-bar-list{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #fff;
					position: relative;
					.list-item{
						margin: 0 5px;
						padding: 5px 12px;
						cursor: pointer;
						border-radius: 5px;
						display: flex;
						align-items: center;
						&.active{
							background: rgba(255, 255, 255, .15);
						}
						&:hover{
							background: rgba(255, 255, 255, .08);
						}
						.el-icon{
							font-size: 20px;
							margin-right: 5px;
						}
					}
					.login-btn-mobile{
						position: absolute;
						top: 7px;
						right: -5px;
						color: #00b5ad;
					}
				}
				.search-box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					.content-list{
						position: absolute;
						top: 35px;
						left: 9px;
						background: #fff;
						padding: 12px;
						border-radius: 0 0 5px 5px;
						box-shadow: 0 0 15px #ccc;
						width: 70%;
						max-height: 382px;
						overflow-y: scroll;
						.total-tip{
							text-align: center;
							font-size: 12px;
							color: #ccc;
						}
						.list-item{
							padding: 8px 0;
							border-bottom: 1px dashed #ccc;
							cursor: pointer;
							.el-tag{
								margin-right: 10px;
							}
							&:hover{
								color: #00b5ad;
							}
							&:last-child{
								border: none;
							}
						}
					}
					.el-icon{
						cursor: pointer;
						&:hover{
							color: #00b5ad;
						}
					}
					.login-btn{
						margin-left: 30px;
						width: 135px;
						border-radius: 5px;
						color: rgba(255, 255, 255, .8);
						text-align: center;
						cursor: pointer;
						padding: 10px 20px;
						box-sizing: border-box;
						&:hover{
							color: #fff;
							background: rgba(255, 255, 255, .08);
						}
					}
				}
			}
		}
	}
	.mobile-search{
		position: fixed;
		top: 42%;
		right: 20px;
		.el-icon{
			font-size: 25px;
			color: #00b5ad;
		}
	}
</style>
