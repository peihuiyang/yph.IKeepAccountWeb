<template>
	<view>
		<uni-notice-bar scrollable single v-if="noticetext" :text="noticetext"></uni-notice-bar>
	</view>
	<!-- 轮播图 -->
	<view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<navigator url="/pages/mime/mime" hover-class="none">
					<view class="swiper-item">
						<image src="../../static/images/image/lunbo1.png"></image>
					</view>
				</navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="/pages/mime/myplan/myplan" hover-class="none">
					<view class="swiper-item">
						<image src="../../static/images/image/lunbo2.png"></image>
					</view>
				</navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="/pages/mime/mime" hover-class="none">
					<view class="swiper-item">
						<image src="../../static/images/image/lunbo3.png"></image>
					</view>
				</navigator>
			</swiper-item>
			</swiper>
	</view>
	<view class="container">
		<!-- 展示卡片 -->
		<view class="showcard">
			<!-- 卡片头部 -->
			<view class='cardhead'>
				<!-- 头部左分区 -->
				<view class='headblock'>
					<image class='cardicon' src='../../static/images/icon/income.png'></image>
					<text class='cardtext1'>本月收入</text>
					<text class='cardtext2'>￥ {{incomecount}}</text>
				</view>
				<view class='headline'></view>
				<!-- 头部右分区 -->
				<view class='headblock'>
					<image class='cardicon' src='../../static/images/icon/pay.png'></image>
					<text class='cardtext3'>本月支出</text>
					<text class='cardtext2'>￥ {{paycount}}</text>
				</view>
			</view>
			<!-- 分割线 -->
			<view class='cardline'></view>
			<!-- 查看所有数据栏 -->
			<view class="cardselect" @click='selectCount'>
			  <text class='counttext'>查看当月明细</text>
			  <image class='moreicon' src='../../static/images/icon/more.png'></image>
			</view>
			<!-- 分割线 -->
			<view class='cardline'></view>
			<!-- 按钮 -->
			<view class='cardbottom'>
			  <button class='cardbtn' @click="addBill">记一笔</button>
			</view>
		</view>
	</view>
	
	<!-- 添加账单 -->
	<view>
		<uni-popup ref="popup" type="left" background-color="#fff">
			<view class="add-account-form">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="accountFormData">
					<uni-forms-item label="金额" required name="money">
						<uni-easyinput v-model="accountFormData.money" placeholder="请输入金额" />
					</uni-forms-item>
					<uni-forms-item label="收支" required>
						<uni-data-checkbox mode="button" v-model="accountFormData.reType" :localdata="reTypes" />
					</uni-forms-item>
					<uni-forms-item label="日期" required name="keepTime">
						<uni-datetime-picker type="date" :clear-icon="false" v-model="accountFormData.keepTime" @change="changeDate" />
					</uni-forms-item>
					<uni-forms-item label="账单分类" required name="purpose">
						<uni-data-select :localdata="purposeRange" v-model="accountFormData.purpose"/>
					</uni-forms-item>
					<uni-forms-item label="支付方式" required name="payType">
						<uni-data-select :localdata="payTypeRange" v-model="accountFormData.payType"/>
					</uni-forms-item>
					<uni-forms-item label="计划" name="planId">
						<uni-data-select v-model="accountFormData.planId" :localdata="planIdRange" 
							@click="getPlanData" @change="changePlanId"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="备注" required name="remark">
						<uni-easyinput type="textarea" v-model="accountFormData.remark" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
				<button class="form-btn" type="primary" @click="submitAccount('valiForm')">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mylogin from "../../common/js/mylogin.js";
	import tools from "../../common/js/tools.js";
	import request from "../../common/js/request.js";
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('user_info'),
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				noticetext:'欢迎来到亲密记',
				incomecount: 0,
				paycount: 0,
				// 表单
				accountFormData:{
					money:0,
					reType:1,
					keepTime:'',
					remark:'',
					planId:'',
					payType:'',
					purpose:''
				},
				reTypes:[{
						text: '收入',
						value: 0
					},{
						text: '支出',
						value: 1
				}],
				planIdRange:[],
				purposeRange:[],
				payTypeRange:[],
				// 校验规则
				rules: {
					keepTime:{
						rules: [{
							required: true,
							errorMessage: '请选择日期'
						}]
					},
					purpose:{
						rules: [{
							required: true,
							errorMessage: '请选择账单分类'
						}]
					},
					payType:{
						rules: [{
							required: true,
							errorMessage: '请选择支付方式'
						}]
					},
					money: {
						rules: [ {
								format: 'number',
								errorMessage: '金额只能输入数字'
						}]
					},
					remark: {
						rules: [{
							required: true,
							errorMessage: '备注不能为空'
						}]
					}
				}
			}
		},
		onLoad(){
			this.getNotice();
			this.getBillCount(false);
			this.getPurpose();
			this.getPayType();
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.getPurpose();
			this.getPayType();
			this.getNotice();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1500);
			this.getBillCount(true);
		},
		methods: {
			// 获取通知信息
			getNotice(){
				var that = this;
				var notice_index  = uni.getStorageSync('notice_index');
				console.log(notice_index);
				if(notice_index>=10){
					that.$myapi.baseRequest('/api/ika/v1/sysdic/getnotice', 'GET',that.userInfo.token,
						{}).then(res=>{
							if(res.data.status === 1){
								uni.setStorageSync('notice_index',1);
								uni.setStorageSync('notice_msg',res.data.message);
								that.noticetext = res.data.message;
							}
							else{
								uni.showToast({
									title: '请求通知信息：' + res.data.message,
									icon: 'error',
									duration: 2000
								})						
							}
						}).catch(error=>{
							uni.showToast({
								title: '请求通知信息：' + res.errMsg,
								icon: 'fail',
								duration: 2000
							});			
						});
				}
				else{
					uni.setStorageSync('notice_index',notice_index + 1);
					that.noticetext = uni.getStorageSync('notice_msg');
				}
			},
			selectCount(){
				uni.navigateTo({
					url: '/pages/index/monthbill/monthbill'
				});
			},
			// 获取账单类型
			getPurpose(){
				var that = this;
				const purpose = uni.getStorageSync('purpose_data');
				if(purpose === null || purpose === ""){
					request.getPurpose();
					purpose = uni.getStorageSync('purpose_data');
				}
				that.purposeRange = purpose;
			},
			// 获取支付方式
			getPayType(){
				var that = this;
				const PayType = uni.getStorageSync('paytype_data');
				if(PayType === null || PayType === ""){
					request.getPayType();
					PayType = uni.getStorageSync('paytype_data');
				}
				that.payTypeRange = PayType;
			},
			// 添加账单按钮
			addBill(){
				var that = this;
				if(!mylogin.checkLogin(false)){
					uni.showToast({
						title: "请先登录",
						icon: 'exception',
						duration: 2000
					});
					return;				
				}
				that.$refs.popup.open();
			},
			// 提交账单
			submitAccount(ref) {
				var that = this;
				that.$refs[ref].validate().then(res => {
					that.$myapi.baseRequest('/api/ika/v1/accountrecord/add', 'POST',that.userInfo.token,
						that.accountFormData).then(res=>{
							if(res.data.status === 1){
								uni.showToast({
									title: res.data.message,
									icon: 'success',
									duration: 1000
								});
								that.$refs.popup.close();
								if(that.accountFormData.keepTime.substring(0,7) === tools.formatMonth(new Date())){
									that.getBillCount(true);
								}
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
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'fail',
						duration: 2000
					})
				})
			},
			changeDate(e){
				this.accountFormData.keepTime = e;
			},
			// 获取计划
			getPlanData(){
				var that = this;
				let plandate = that.accountFormData.keepTime;
				if(plandate === ''){
					plandate = tools.formatDate(new Date());
				}
				that.$myapi.baseRequest('/api/ika/v1/plan/getbydate?date=' + plandate, 'GET',that.userInfo.token,
					{}).then(res=>{
						if(res.data.status === 1){
							// 赋值选项列表
							that.planIdRange = res.data.data;
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
			changePlanId(e){
				this.accountFormData.planId = e;
			},
			// 获取账单统计
			getBillCount(noUseCache){
				var that = this;
				if(!mylogin.checkLogin(false)){
					return;				
				}
				uni.showLoading({
					title: '金额统计刷新中……'
				});
				let timeoutNum = 100;
				if(noUseCache){
					timeoutNum = 1000;
				}
				request.getMonthBillCount(noUseCache);
				
				setTimeout(()=>{
					const month_income_cache = uni.getStorageSync('month_income_cache');
					const month_paymoney_cache = uni.getStorageSync('month_paymoney_cache');
					that.incomecount = month_income_cache;
					that.paycount = month_paymoney_cache;
				},timeoutNum);
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
