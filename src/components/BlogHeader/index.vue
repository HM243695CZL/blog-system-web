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
					<el-input size='small' v-model='state.keywords' placeholder='搜索关键字'>
						<template #append>
							<el-icon>
								<ele-Search />
							</el-icon>
						</template>
					</el-input>
					<div class='login-btn' @click='clickLogin'>登录后台</div>
				</el-col>
			</el-row>
		</header>
	</div>
</template>

<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

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
</style>
