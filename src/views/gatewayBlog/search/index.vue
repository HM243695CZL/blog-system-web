<template>
	<div class='blog-search-container'>
		<header class='search-head'>
			<el-row :gutter='20'>
				<el-col :span='24' :xs='24'>
					<div class='search-bar flex flex-space-between flex-align-center'>
						<el-input size='small' v-model='keywords' placeholder='请输入关键字'></el-input>
						<el-button size='small' type='primary' @click='clickSearchBtn'>
							搜索
						</el-button>
						<el-button size='small' type='default' @click='clickCancel'>取消</el-button>
					</div>
				</el-col>
			</el-row>
		</header>
		<el-row :gutter='20'>
			<el-col :span='24' :xs='24'>
				<div class='info-box'>
					<div class='total-tip' v-if='dataList.length'>共{{dataList.length}}条</div>
					<BlogInfoList v-if='dataList.length' :data-list='dataList' />
					<div class='no-data' v-else>暂无数据</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import BlogInfoList from '/@/components/BlogInfoList/index.vue';
import { postAction } from '/@/api/common';
import { getListByContentApi } from '/@/api/blog/blogGateway';
import { StatusEnum } from '/@/common/status.enum';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'gatewaySearch',
	components: {
		BlogInfoList
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			keywords: '',
			dataList: [],
			timer: null as any
		});
		const clickSearchBtn = () => {
			if (state.timer) {
				clearInterval(state.timer);
			}
			state.timer = setTimeout(() => {
				postAction(getListByContentApi, {
					content: state.keywords
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.dataList = res.data;
					}
				})
			}, 100);
		};
		const clickCancel = () => {
			router.back();
		};
		return {
			...toRefs(state),
			clickSearchBtn,
			clickCancel
		}
	}
});
</script>

<style scoped lang='scss'>
	.blog-search-container{
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		.search-head{
			position: sticky;
			top: 0;
			z-index: 999;
			background: #fff;
			border-bottom: 1px solid #f1f1f1;
			.search-bar{
				padding: 17px;
				height: 60px;
				.el-button{
					margin-left: 15px;
				}
			}
		}
		.info-box{
			padding: 20px;
			background: #fff;
			.total-tip{
				text-align: center;
				font-size: 12px;
				color: #ccc;
				margin-bottom: 15px;
			}

		}
		.no-data{
			text-align: center;
			padding: 15px 0;
			color: #ccc;
		}
	}
</style>
