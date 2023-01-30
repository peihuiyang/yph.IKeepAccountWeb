<template>
	<!-- 搜索栏 -->
	<view class="box-bg">
		<uni-nav-bar class="nav_bar" leftText="按条件" leftIcon="arrowdown" rightText="搜索" rightIcon="search" 
			@clickLeft="barLeftClick" @clickRight="barRightClick">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" class="nav-bar-input" type="text" 
						placeholder="输入备注搜索" v-model="queryBill.remark"/>
			</view>
		</uni-nav-bar>
	</view>
	<!-- 列表 -->
	<scroll-view show-scrollbar="false">
		<view class="data_empty" v-if="isDataEmpty">
			<fui-empty class="fui_empty" src="../../static/images/image/img_data_3x.png" title="暂无数据" descr="请在首页先添加账单！">
			</fui-empty>
		</view>
		<!-- 卡片 -->
		<view v-else>
			<view v-for="item in billDatas">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="swiperightoptions" show="none" :auto-close="true"
						:key="item.id" @click="swipeBindClick($event,item)">
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
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<uni-load-more color="#007AFF" :status="loadStatus" iconType="auto" :content-text="moreContentText" @clickLoadMore="clickLoadMore"/>
		</view>
	</scroll-view>
	
	<!-- 条件弹出框 -->
	<view>
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="add-account-form">
				<uni-forms :modelValue="queryBill" name="queryBill">
					<uni-forms-item label="收支">
						<uni-data-checkbox mode="button" v-model="queryBill.reType" :localdata="reTypes" />
					</uni-forms-item>
					<uni-forms-item label="日期" name="dateform">
						<uni-datetime-picker v-model="plandaterange" type="daterange" @change="changeDate" />
					</uni-forms-item>
				</uni-forms>
				<button class="form-btn" type="primary" @click="barRightClick">搜索</button>
			</view>
		</uni-popup>
	</view>
	<!-- 修改账单 -->
	<view>
		<uni-popup ref="billpopup" type="right" background-color="#fff">
			<view class="add-account-form">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="accountFormData">
					<uni-forms-item label="金额" required name="money">
						<uni-easyinput v-model="accountFormData.money" placeholder="请输入金额" />
					</uni-forms-item>
					<uni-forms-item label="收支" required>
						<uni-data-checkbox mode="button" v-model="accountFormData.reType" :localdata="billReTypes" />
					</uni-forms-item>
					<uni-forms-item label="日期" required name="keepTime">
						<uni-datetime-picker type="date" :clear-icon="false" v-model="accountFormData.keepTime" @change="changeBillDate" />
					</uni-forms-item>
					<uni-forms-item label="账单分类" required name="purpose">
						<uni-data-select :localdata="purposeRange" v-model="accountFormData.purpose"/>
					</uni-forms-item>
					<uni-forms-item label="支付方式" required name="payType">
						<uni-data-select :localdata="payTypeRange" v-model="accountFormData.payType"/>
					</uni-forms-item>
					<uni-forms-item label="计划" name="planId">
						<uni-data-select v-model="accountFormData.planId" :localdata="planIdRange" 
							@change="changePlanId"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="备注" required name="remark">
						<uni-easyinput type="textarea" v-model="accountFormData.remark" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
				<button class="form-btn" type="primary" @click="submitAccount('valiForm')">提交</button>
			</view>
		</uni-popup>
	</view>
	<!-- 悬浮按钮 -->
	<view>
		<uni-fab v-if="showFabBtn" :content="content" horizontal="right" vertical="bottom"
			 @trigger="fabtrigger">
		</uni-fab>
	</view>
</template>

<script>
	import fuiEmpty from "../../components/firstui/fui-empty/fui-empty.vue";
	import tools from "../../common/js/tools.js";
	import request from "../../common/js/request.js";	
	export default {
		components: {
			fuiEmpty
		},
		data() {
			return {
				userInfo: uni.getStorageSync('user_info'),
				isDataEmpty:true,
				swiperightoptions:[{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					}, {
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
					}
				}],
				plandaterange:[Date.now(), Date.now() + 500000000],
				queryBill: {
				  pageIndex: 1,
				  pageSize: 10,
				  // uId: '',
				  // payType: '',
				  // purpose: '',
				  // planId: '',
				  year: new Date().getFullYear(),
				  month: new Date().getMonth() + 1,
				  reType: 2,
				  startTime: tools.formatDate01(new Date().getFullYear(),new Date().getMonth() + 1,1),
				  endTime: tools.formatDate(new Date()),
				  remark:''
				},
				reTypes:[{
						text: '全部',
						value: 2
					},
					{
						text: '收入',
						value: 0
					},{
						text: '支出',
						value: 1
				}],
				billDatas:[],
				loadStatus: 'more',
				moreContentText: {
					contentdown: '加载更多',
					contentrefresh: '加载中',
					contentnomore: '我是有底线的'
				},
				// 修改账单表单
				accountFormData:{
					id:'',
					money:0,
					reType:1,
					keepTime:'',
					remark:'',
					planId:'',
					payType:'',
					purpose:''
				},
				billReTypes:[{
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
				},
				content: [{
					iconPath: '/static/images/icon/backtop.png',
					selectedIconPath: '/static/images/icon/backtop.png',
					text: '置顶',
					active: false
				}],
				showFabBtn:false
			}
		},
		onLoad(){
			this.showData();
		},
		onPageScroll(e) {
			if(e.scrollTop >= 880){
				this.showFabBtn = true;
			}
			else{
				this.showFabBtn = false;
			}
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.showData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 滑块点击事件
			swipeBindClick(e,item){
				if(e.content.text === '修改'){
					this.modifyBill(item);
				}
				else if(e.content.text === '删除'){
					this.deleteBill(item.id);
				}
			},
			fabtrigger(e){
				if(e.item.text === '置顶'){
					this.backTop();
				}
			},
			backTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:100
				})
			},
			// 加载更多
			clickLoadMore(e) {
				var that = this;
				if(e.detail.status === 'more'){
					that.loadStatus = 'loading';
					that.queryBill.pageIndex = that.queryBill.pageIndex + 1;
					console.log(that.queryBill);
					that.searchBill(that.queryBill.pageIndex);
				}
			},
			// 修改点击事件
			modifyBill(bill){
				var that = this;
				that.accountFormData = {
					id: bill.id,
					money: bill.money,
					reType: bill.reType,
					keepTime: bill.keepTime.substring(0,10),
					remark: bill.remark,
					planId: bill.planId,
					payType: bill.payType,
					purpose: bill.purpose
				};
				that.getPurpose();
				that.getPayType();
				that.getPlanData();
				that.$refs.billpopup.open();
			},
			// 删除按钮点击事件
			deleteBill(id){
				var that = this;
				uni.request({
				    url: '/api/ika/v1/accountrecord/delete?id=' + id , 
					method: "DELETE",
					timeout:3000,
					header:{
						"Authorization":that.userInfo.token
					},
				    success: (res) => {
						if(res.data.status === 1){
							uni.showToast({
								title: res.data.message,
								icon: 'success',
								duration: 2000
							});
							that.showData();
							request.getMonthBillCount(true);
						}
						else{	
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
				    },
					fail:(res)=>{
						uni.showToast({
							title: res.errMsg,
							icon: 'fail',
							duration: 2000
						});							
					}
				});
			},
			showData(){
				this.barRightClick();
				if(this.billDatas.length > 0){
					this.isDataEmpty = false;
				}
			},
			// 点击条件筛选
			barLeftClick(){
				var that = this;
				that.$refs.popup.open();
			},
			changeDate(e){
				this.queryBill.startTime = e[0];
				this.queryBill.endTime = e[1];
				this.queryBill.year = new Date(e[0]).getFullYear();
				this.queryBill.month = new Date(e[0]).getMonth() + 1;
			},
			// 搜索
			barRightClick(){
				this.searchBill(1);
			},
			// 查询账单
			searchBill(indexPage){
				var that = this;
				that.queryBill.pageIndex = indexPage;
				uni.request({
				    url: '/api/ika/v1/accountrecord/findbypage', 
					method: "POST",
					timeout:3000,
					header:{
						"Authorization":that.userInfo.token
					},
					data: that.queryBill,
				    success: (res) => {
						if(res.data.status === 1){
							// 保存到列表
							if(indexPage === 1){
								that.billDatas = [];
								that.billDatas = res.data.data.accounts;
							}
							else{
								res.data.data.accounts.forEach((bill, i) => {
								    that.billDatas.push(bill);
								});
							}
							// 处理一些状态值
							if(res.data.data.totalNum > 0){
								that.isDataEmpty = false;								
							}
							if(res.data.data.pageSize * res.data.data.pageIndex >= res.data.data.totalNum){
								that.loadStatus = 'no-more';
							}
							else{
								that.loadStatus = 'more';
							}
							that.$refs.popup.close();
						}
						else{	
							uni.showToast({
								title: res.data.message,
								icon: 'error',
								duration: 2000
							});
							that.loadStatus = 'more';
						}
				    },
					fail:(res)=>{
						uni.showToast({
							title: res.errMsg,
							icon: 'fail',
							duration: 2000
						});	
						that.loadStatus = 'more';						
					}
				});
			},
			// 修改账单系列事件
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
			// 提交账单
			submitAccount(ref) {
				var that = this;
				that.$refs[ref].validate().then(res => {
					uni.showLoading({
						title: '数据上传中……'
					});
					uni.request({
					    url: '/api/ika/v1/accountrecord/modify', 
						method: "POST",
						timeout:3000,
						header:{
							"Authorization":that.userInfo.token
						},
						data: that.accountFormData,
					    success: (res) => {
							uni.hideLoading();
							if(res.data.status === 1){	
								uni.showToast({
									title: res.data.message,
									icon: 'success',
									duration: 1000
								});
								that.$refs.billpopup.close();
								that.showData();
								request.getMonthBillCount(true);
							}
							else{	
								uni.showToast({
									title: res.data.message,
									icon: 'error',
									duration: 2000
								})						
							}
					    },
						fail:(res)=>{
							uni.hideLoading();
							uni.showToast({
								title: res.errMsg,
								icon: 'fail',
								duration: 2000
							});							
						}
					});
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'fail',
						duration: 2000
					})
				})
			},
			changeBillDate(e){
				this.accountFormData.keepTime = e;
			},
			// 获取账单
			getPlanData(){
				var that = this;
				uni.request({
				    url: '/api/ika/v1/plan/getnotfinish', 
					method: "GET",
					timeout:3000,
					header:{
						"Authorization":that.userInfo.token
					},
				    success: (res) => {
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
				    },
					fail:(res)=>{
						uni.showToast({
							title: res.errMsg,
							icon: 'fail',
							duration: 2000
						})
					}
				});
			},
			changePlanId(e){
				this.accountFormData.planId = e;
			},
		}
	}
</script>

<style lang="scss">
	.data_empty{
		height: 600rpx;
	}
	.fui_empty{
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/* 导航栏 */
	$nav-height: 30px;
		.box-bg {
			background-color: #F5F5F5;
			//padding: 5px 0;
			box-shadow: 0 0 5px #666666;
		}
	
		.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			//width: 500rpx;
			flex: 1;
			background-color: #f8f8f8;
			height: $nav-height;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: $nav-height;
		}
	
		.input-uni-icon {
			line-height: $nav-height;
		}
	
		.nav-bar-input {
			height: $nav-height;
			line-height: $nav-height;
			/* #ifdef APP-PLUS-NVUE */
			//width: 370rpx;
			/* #endif */
			padding: 0 5px;
			font-size: 12px;
			background-color: #f8f8f8;
		}
	.add-account-form {
		padding: 10px;
		background-color: #fff;
	}
	.form-btn{
		width: 300rpx;
	}
	/* 账单卡片 */
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
