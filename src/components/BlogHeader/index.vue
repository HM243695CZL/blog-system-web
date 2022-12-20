<template>
	<div class='blog-header-container'>
		<header class='header-top-bar'>
			<div class='header-bar base-width'>
				<div class='top-bar-list'>
					<div :class='["list-item", item.path === state.currentTab ? "active" : ""]'
							 @click='clickTopBar(item)'
							 v-for='item in state.topBarList' :key='item.path'>
						<i class='el-icon'>
							<component :is='item.icon'></component>
						</i>
						{{item.text}}
					</div>
				</div>
				<div class='search-box'>
					<el-input size='small' v-model='state.keywords' placeholder='搜索关键字'>
						<template #append>
							<el-icon>
								<ele-Search />
							</el-icon>
						</template>
					</el-input>
					<div class='login-btn' @click='clickLogin'>登录后台</div>
				</div>
			</div>
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
					.list-item{
						margin: 0 5px;
						padding: 10px 20px;
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
