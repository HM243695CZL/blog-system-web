<template>
	<div class='type-tag-container'>
		<el-row :gutter='20'>
			<el-col :span='24' :xs='24'>
				<el-card shadow='never'>
					<template #header>
						<div class="card-header flex flex-space-between flex-align-center">
							<div class='card-header-left'>{{props.title}}</div>
							<div class='card-header-right'>
								共<span>{{ props.dataList.length }}</span>个
							</div>
						</div>
					</template>
					<div class='tag-list flex flex-start flex-align-start'>
						<div :class='["tag-item", "hl-tag", props.currentMap.id === item.id ? "active" : ""]'
								 @click='clickTag(item)'
								 v-for='item in props.dataList' :key='item.id'>
							{{item.name}} <span class='tag-number'>{{item.number}}</span>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter='20'>
			<el-col :span='24' :xs='24'>
				<el-card shadow='never'>
					<h3>专栏简介：</h3>
					<div class='desc'>{{props.currentMap.desc}}</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter='20'>
			<el-col :span='24' :xs='24'>
				<el-card shadow='never' v-if='props.blogList.length > 0'>
					<BlogInfoList :data-list='props.blogList' />
					<div class='page-bar'>
						<el-pagination background layout="prev, pager, next"
													 hide-on-single-page
													 small
													 @size-change='changePageSize'
													 @current-change='changePageIndex'
													 :total="props.pageInfo.totalRecords" />
					</div>
				</el-card>
				<div class='no-data' v-else>暂无数据</div>
			</el-col>
		</el-row>
	</div>
</template>

<script lang='ts' setup>
	import BlogInfoList from '/@/components/BlogInfoList/index.vue';
	const props = defineProps({
		dataList: {
			type: Array,
			required: true
		},
		currentMap: {
			type: Object,
			required: true
		},
		pageInfo: {
			type: Object,
			required: true
		},
		blogList: {
			type: Array,
			required: true
		},
		title: {
			type: String
		}
	});

	const emits = defineEmits([
		'clickTag', 'changePageSize', 'changePageIndex'
	]);

	const clickTag = data => {
		emits('clickTag', data);
	};

	const changePageSize = size => {
		emits('changePageSize', size);
	};

	const changePageIndex = index => {
		emits('changePageIndex', index);
	}

</script>

<style scoped lang='scss'>
	.type-tag-container{
		.el-row{
			margin-bottom: 20px;
		}
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
		.tag-list{
			flex-wrap: wrap;
			.tag-item{
				color: #999;
				border-color: #999;
				cursor: pointer;
				margin-bottom: 15px;
				&:before{
					color: #999;
					border-color: #999;
				}
				&.active{
					color: #00b5ad;
					border-color: #00b5ad;
				}
			}
			.tag-number{
				background: #f2711c;
				color: #fff;
				display: inline-block;
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				border-radius: 50%;
			}
		}
		.desc{
			padding-top: 15px;
			font-size: 18px;
			color: #00b5ad;
		}
		.page-bar{
			padding: 15px 0;
		}
		.no-data{
			text-align: center;
			padding: 15px 0;
		}
	}
</style>
