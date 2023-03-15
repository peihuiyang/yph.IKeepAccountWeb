<template>
	<view class="chart_section">
		<view v-if="useRate > 0">
			<uni-section class="section_c" title="计划进度" :sub-title="planText" type="line"></uni-section>
			<l-echart style="height: 360px;" ref="chart" @finished="init"></l-echart>				
		</view>
		<view>
			<uni-section class="section_c" title="计划内容" type="line"></uni-section>
			<uni-card v-bind:title="planitem.name" :sub-title="planitem.code" :extra="(planitem.reType === 0 ? '+':'-') + planitem.amountMoney">
				<text class="uni-card-head"> 1. 计划时间: </text><text class="uni-card-body">{{planTime}}</text>
				<text class="uni-card-head"> 2. 计划类型: </text><text class="uni-card-body">{{planType}}</text>
				<text class="uni-card-head"> 3. 备注: </text><text class="uni-card-body">{{planitem.remark}}</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import LEchart from '../../../../components/lime-echart/components/l-echart/l-echart.vue';
	import * as echarts from 'echarts';
	export default {
		components:{
			LEchart
		},
		data() {
			return {
				userInfo: uni.getStorageSync('user_info'),
				planId:'',
				options:{},
				planText:'',
				// 已完成百分比
				useRate:0,
				planTime:'\n',
				planType:'\n',
				planitem:{}
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.planId = option.id;
			this.getPlanMoney(option.id);
			// 图表配置
			this.options = {
				series: [{
					type: 'gauge',
					startAngle: 90,
					endAngle: -270,
					pointer: {
						show: false
					},
					progress: {
						show: true,
						overlap: false,
						roundCap: true,
						clip: false,
						itemStyle: {
							// borderWidth: 1,
							// borderColor: '#464646'
						}
					},
					axisLine: {
						lineStyle: {
							width: 40
						}
					},
					splitLine: {
						show: false,
						distance: 0,
						length: 10
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false,
						distance: 50
					},
					data: [
						{
						value: 20,
						detail: {
						offsetCenter: ['0%', '0%']
						}
					}],
					detail: {
						// width: 50,
						// height: 14,
						fontSize: 24,
						//color: 'auto',
						// borderColor: 'auto',
						// borderRadius: 20,
						// borderWidth: 1,
						formatter: '{value}%'
					}
				}]
			};
		},
		onReady(option){
			setInterval(() => {
				if(this.planId !== ''){
					console.log(this.planId);
					this.getPlanMoney(this.planId);	
					this.init();
				}
			}, 30000);
		},
		methods: {
			// 获取计划详情
			getPlanMoney(id){
				var that = this;
				uni.showLoading({
					title: '获取计划详情中……'
				});
				that.$myapi.baseRequest('/api/ika/v1/plan/getbyid?id=' + id, 'GET',that.userInfo.token,
					{}).then(res=>{
						uni.hideLoading();
						if(res.data.status === 1){	
							that.useRate = res.data.data.recordMoney / res.data.data.amountMoney;
							that.planText = '计划金额：' + res.data.data.amountMoney + '元，已完成金额：' + res.data.data.recordMoney + '元';
							that.planitem = res.data.data;
							that.planTime = res.data.data.startTime.substring(0,10) + '~' + res.data.data.endTime.substring(0,10) + '\n';
							that.planType = res.data.data.planType_Desc + '\n';
						}
						else{
							uni.showToast({
								title: '请求计划详情：' + res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title: '请求计划详情：' + res.errMsg,
							icon: 'fail',
							duration: 2000
						});		
					});
			},
			// 初始化表格
			init() {
				var that = this;
			    that.$refs.chart.init(echarts, chart => {
					that.options.series[0].pointer.show = false;
					that.options.series[0].data[0].value = (that.useRate * 100).toFixed(2) - 0;
					chart.setOption(that.options, true);
				});
			}
		}
	}
</script>

<style>
	.chart_section{
		height: 780px;
		background: white;
		width: 90%;
		margin-left: 5%;
		border-radius: 30px;
	}
	.section_c {
		margin-bottom: 10px;
	}
	.uni-card-head{
		margin-top: 10px;
		font-size: 14px;
		color: #C85555;
	}
	.uni-card-body{
		margin-top: 10px;
		margin-left: 10px;
		color: black;
	}
</style>
