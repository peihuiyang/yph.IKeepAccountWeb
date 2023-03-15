<template>
	<view>
		<uni-calendar
		    :insert="true"
		    :lunar="true" 
		    :start-date="'1980-1-1'"
		    :end-date="'2050-5-20'"
		    @change="changeDate" @monthSwitch="changeMonth"
		     />
	</view>
	<!-- 统计卡 -->		
	<view>
		<uni-grid class="uni_grid" :column="4" :show-border="false" :highlight="true" :square="false">
			<uni-grid-item :index="1" :key="1">
				<view class="grid-item-box">
					<image class="gridimage" src="../../../static/images/icon/income.png" mode="aspectFill" />
					<text class="gridtext">当月收入</text>
					<text class="gridtext2">{{monthincomecount}}</text>
				</view>
			</uni-grid-item>
			<uni-grid-item :index="2" :key="2">
				<view class="grid-item-box">
					<image class="gridimage" src="../../../static/images/icon/pay.png" mode="aspectFill" />
					<text class="gridtext">当月支出</text>
					<text class="gridtext3">{{monthpaycount}}</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" :index="3" :key="3">
					<image class="gridimage" src="../../../static/images/icon/income.png" mode="aspectFill" />
					<text class="gridtext">当日收入</text>
					<text class="gridtext2">{{dayincomecount}}</text>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view class="grid-item-box" :index="4" :key="4">
					<image class="gridimage" src="../../../static/images/icon/pay.png" mode="aspectFill" />
					<text class="gridtext">当日支出</text>
					<text class="gridtext3">{{daypaycount}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
	<!-- 账单列表 -->
	<view>
		<view class="data_empty" v-if="isDataEmpty">
			<fui-empty class="fui_empty" src="../../../static/images/image/img_data_3x.png" title="暂无数据" descr="请在首页先添加账单！">
			</fui-empty>
		</view>
		<!-- 卡片 -->
		<view v-else v-for="item in billDatas">
			<view class="billcard">
				<view class="billneirong">
					<view class="billtitle"><text>{{item.remark}}</text></view>
					<view class="billtypename"><text>{{item.purpose_Desc}}</text></view>
					<view class="billtime"><text>{{item.keepTime.substring(0,10)}}</text></view>
					<view :class="item.reType === 0 ?'billprice':'billprice1'">
						<text>{{item.reType === 1 ?'-':''}}{{item.money}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tools from "../../../common/js/tools.js";
	import fuiEmpty from "../../../components/firstui/fui-empty/fui-empty.vue";
	
	export default {
		components: {
			fuiEmpty
		},
		data() {
			return {
				userInfo: uni.getStorageSync('user_info'),
				isDataEmpty:true,
				monthincomecount: 0,
				monthpaycount: 0,
				dayincomecount: 0,
				daypaycount: 0,
				billDatas:[],
				queryBill: {
				  pageIndex: 1,
				  pageSize: 100,
				  // uId: '',
				  // payType: '',
				  // purpose: '',
				  // planId: '',
				  year: new Date().getFullYear(),
				  month: new Date().getMonth() + 1,
				  reType: 2,
				  startTime: tools.formatDate(new Date()),
				  endTime: tools.formatDate(new Date()),
				  remark:''
				},
			}
		},
		// 初始化加载
		onLoad(){
			var that = this;
			that.monthCount("",true);
			let day = tools.formatDate(new Date());
			that.dayBillCount(day);
			that.queryBill.startTime = day;
			that.queryBill.endTime = day;
			that.getBillData();
		},
		methods: {
			// 日期改变
			changeDate(e){
				var that = this;
				console.log(e);
				that.dayBillCount(e.fulldate);
				that.queryBill.startTime = e.fulldate;
				that.queryBill.endTime = e.fulldate;
				that.queryBill.month = e.month;
				that.queryBill.year = e.year;
				that.getBillData();
			},
			// 月度统计
			monthCount(month,isNow){
				var that = this;
				if(isNow){
					const month_income_cache = uni.getStorageSync('month_income_cache');
					const month_paymoney_cache = uni.getStorageSync('month_paymoney_cache');
					that.monthincomecount = month_income_cache;
					that.monthpaycount = month_paymoney_cache;
				}
				else{
					that.$myapi.baseRequest('/api/ika/v1/accountrecord/statistics', 'POST',that.userInfo.token,
						{
							keepTime:month,
							timeQueryType:1
						}).then(res=>{
							if(res.data.status === 1){
								that.monthincomecount = res.data.data.statisticsItem[0].incomeMoney;
								that.monthpaycount = res.data.data.statisticsItem[0].payMoney;
							}
							else{	
								uni.showToast({
									title: res.data.message,
									icon: 'error',
									duration: 2000
								})						
							}
						}).catch(error=>{
							uni.showToast({
								title: res.errMsg,
								icon: 'fail',
								duration: 2000
							});				
						});
				}
			},
			// 月份改变
			changeMonth(e){
				var month =[e.year, e.month,1].map(tools.formatNumber).join('-');
				this.monthCount(month,false);
			},
			// 日期统计
			dayBillCount(day){
				var that = this;
				that.$myapi.baseRequest('/api/ika/v1/accountrecord/statistics', 'POST',that.userInfo.token,
					{
						keepTime:day,
						timeQueryType:0
					}).then(res=>{
						if(res.data.status === 1){
							that.dayincomecount = res.data.data.statisticsItem[0].incomeMoney;
							that.daypaycount = res.data.data.statisticsItem[0].payMoney;
						}
						else{	
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
					}).catch(error=>{
						uni.showToast({
							title: res.errMsg,
							icon: 'fail',
							duration: 2000
						});				
					});
			},
			// 获取每日账单列表
			getBillData(){
				var that = this;
				that.queryBill.pageIndex = 1;
				uni.showLoading({
					title: '数据获取中……'
				});
				that.$myapi.baseRequest('/api/ika/v1/accountrecord/findbypage', 'POST',that.userInfo.token,
					that.queryBill).then(res=>{
						uni.hideLoading();
						if(res.data.status === 1){
							that.billDatas = [],
							that.isDataEmpty = false;
							that.billDatas = res.data.data.accounts;
						}
						else{	
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								duration: 2000
							});
							that.billDatas = [],
							that.isDataEmpty = true;
						}
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title: res.errMsg,
							icon: 'fail',
							duration: 2000
						});	
						that.billDatas = [],
						that.isDataEmpty = true;		
					});
			},
		}
	}
</script>

<style>
	.uni_grid{
		background-color: white;
	}
	.gridimage {
		width: 25px;
		height: 25px;
	}

	.gridtext {
		font-size: 10px;
		margin-top: 2px;
	}
	.gridtext2{
		font-size: 15px;
		margin-top: 5px;
		color: #00FFFF;
	}
	.gridtext3{
		font-size: 15px;
		margin-top: 5px;
		color: indianred;
	}
	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	/* 列表 */
	.data_empty{
		height: 600rpx;
	}
	.fui_empty{
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.billcard {
		height: 200rpx;
		background-color: white;
		//box-shadow: 0 0 5px #666666;
	}
	
	.billneirong {
		margin-top: 10rpx;
		margin-left: 50rpx;
		width: 650rpx;
		margin-right: 50rpx;
	}
	
	.billtitle {
		font-size: 40rpx;
	}
	
	.billtypename {
		font-size: 30rpx;
		margin-top: 15px;
		color: #666666;
	}
	
	.billtime {
		font-size: 30rpx;
		margin-top: 15rpx;
		color: #666666;
	}
	
	.billprice {
		width: 100%;
		font-size: 40rpx;
		margin-top: -145rpx;
		text-align: right;
		margin-right: 30rpx;
		color: #00FFFF;
	}
	.billprice1 {
		width: 100%;
		font-size: 40rpx;
		margin-top: -145rpx;
		text-align: right;
		margin-right: 30rpx;
		color: red;
	}
</style>
