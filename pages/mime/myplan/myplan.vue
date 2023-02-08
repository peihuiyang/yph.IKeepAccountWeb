<template>
	<view class="uni-padding-wrap uni-common-mt">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view v-if="current === 0" class="card_list">
			<view v-for="item in plans">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="swiperightoptions" show="none" :auto-close="true"
						:key="item.id" @click="swipeBindClick($event,item)">
						<uni-card v-bind:title="item.name" :sub-title="item.code" :extra="item.reType_Desc" @dblclick="getPlanDetail(item.id)">
							<uni-tag :mark="true" :text="item.amountMoney" :type="item.reType === 0 ? 'primary':'error'" size="mini" />
							<text class="uni-card-body"> 备注: {{item.remark}}</text>
						</uni-card>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<uni-pagination class="cust_pagination" :show-icon="true" title="分页" :total="numTotal" :current="pageIndex"
				:pageSize="pageSize" @change="changePage"/>
		</view>
		<view v-if="current === 1" class="card_list">
			<view v-for="item in plans">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="swiperightoptions" show="none" :auto-close="true"
						:key="item.id" @click="swipeBindClick($event,item)">
						<uni-card v-bind:title="item.name" :sub-title="item.code" :extra="item.reType_Desc">
							<uni-tag :mark="true" :text="item.amountMoney" :type="item.reType === 0 ? 'primary':'error'" size="mini" />
							<text class="uni-card-body"> 备注: {{item.remark}}</text>
						</uni-card>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<uni-pagination class="cust_pagination" :show-icon="true" title="分页" :total="numTotal" :current="pageIndex"
				:pageSize="pageSize" @change="changePage"/>
		</view>
		<view v-if="current === 2" class="card_list">
			<view v-for="item in plans">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="swiperightoptions" show="none" :auto-close="true"
						:key="item.id" @click="swipeBindClick($event,item)">
						<uni-card v-bind:title="item.name" :sub-title="item.code" :extra="item.reType_Desc">
							<uni-tag :mark="true" :text="item.amountMoney" :type="item.reType === 0 ? 'primary':'error'" size="mini" />
							<text class="uni-card-body"> 备注: {{item.remark}}</text>
						</uni-card>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<uni-pagination class="cust_pagination" :show-icon="true" title="分页" :total="numTotal" :current="pageIndex"
				:pageSize="pageSize" @change="changePage"/>
		</view>
	</view>
	<!-- 添加悬浮按钮 -->
	<uni-fab class="myfab" ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="vertical"  @fabClick="fabClick" />
	<!-- 添加计划 -->
	<view>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="add-plan-form">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="planFormData">
					<uni-forms-item label="计划名" required name="name">
						<uni-easyinput v-model="planFormData.name" placeholder="请输入计划名" />
					</uni-forms-item>
					<uni-forms-item label="收支" required>
						<uni-data-checkbox mode="button" v-model="planFormData.reType" :localdata="reTypes" />
					</uni-forms-item>
					<uni-forms-item label="计划类型" required>
						<uni-data-checkbox mode="button" v-model="planFormData.planType" :localdata="planTypes" />
					</uni-forms-item>
					<uni-forms-item label="金额" required name="amountMoney">
						<uni-easyinput v-model="planFormData.amountMoney" placeholder="请输入金额" />
					</uni-forms-item>
					<uni-forms-item label="日期" required name="dateform">
						<uni-datetime-picker v-model="plandaterange" type="daterange" @change="selectPlanDate" />
					</uni-forms-item>
					<uni-forms-item label="父级" name="parentId">
						<uni-data-select v-model="planFormData.parentId" :localdata="parentIdRange" 
							@click="getParentData" @change="changeParentId"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="备注" name="remark">
						<uni-easyinput type="textarea" v-model="planFormData.remark" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
				<button class="form-btn" type="primary" @click="submitPlan('valiForm')">提交</button>
			</view>
		</uni-popup>
	</view>
	<!-- 修改计划 -->
	<view>
		<uni-popup ref="modifyPlan" type="left" background-color="#fff">
			<view class="add-plan-form">
				<uni-forms ref="valiModifyForm" :rules="rules" :modelValue="planModifyFormData">
					<uni-forms-item label="计划名" required name="name">
						<uni-easyinput v-model="planModifyFormData.name" placeholder="请输入计划名" />
					</uni-forms-item>
					<uni-forms-item label="收支" required>
						<uni-data-checkbox mode="button" v-model="planModifyFormData.reType" :localdata="reTypes" />
					</uni-forms-item>
					<uni-forms-item label="计划类型" required>
						<uni-data-checkbox mode="button" v-model="planModifyFormData.planType" :localdata="planTypes" />
					</uni-forms-item>
					<uni-forms-item label="金额" required name="amountMoney">
						<uni-easyinput v-model="planModifyFormData.amountMoney" placeholder="请输入金额" />
					</uni-forms-item>
					<uni-forms-item label="日期" required name="dateform">
						<uni-datetime-picker type="daterange" v-model="planModifyDateRange" @change="selectModifyPlanDate" />
					</uni-forms-item>
					<uni-forms-item label="父级" name="parentId">
						<uni-data-select v-model="planModifyFormData.parentId" :localdata="parentIdRange" 
							@change="changeModifyParentId"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="备注" name="remark">
						<uni-easyinput type="textarea" v-model="planModifyFormData.remark" placeholder="请输入备注" />
					</uni-forms-item>
				</uni-forms>
				<button class="form-btn" type="primary" @click="submitModifyPlan('valiModifyForm')">提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mylogin from "../../../common/js/mylogin.js";
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('user_info'),
				items: ['月计划', '周计划', '年计划'],
				current: 0,
				plans:[],
				pageIndex:1,
				numTotal:5,
				pageSize: 5,
				horizontal: 'right',
				vertical: 'bottom',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007aFF',
					iconColor: '#fff'
				},
				plandaterange:[Date.now(), Date.now() + 500000000],
				// 校验表单数据
				planTypes: [{
						text: '月计划',
						value: 0
					}, {
						text: '周计划',
						value: 1
					}, {
						text: '年计划',
						value: 2
					}],
				reTypes:[{
						text: '收入',
						value: 0
					},{
						text: '支出',
						value: 1
				}],
				// 父级计划
				parentIdRange:[],
				planFormData: {
					name: '',
					amountMoney: '',
					remark: '',
					planType:0,
					reType:0,
					startTime:'',
					endTime:'',
					parentId:''
				},
				planModifyFormData:{
					id:'',
					name: '',
					amountMoney: '',
					remark: '',
					planType:0,
					reType:0,
					startTime:'',
					endTime:'',
					parentId:''
				},
				planModifyDateRange:[],
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '计划不能为空'
						}]
					},
					amountMoney: {
						rules: [ {
								format: 'number',
								errorMessage: '金额只能输入数字'
						}]
					}
				},
				// 滑块配置
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
			}
		},
		onLoad(){
			mylogin.checkLogin(true);
			this.getPlanPage(1);
		},
		methods: {
			// 添加计划点击时间
			fabClick() {
				this.$refs.popup.open();
				this.planFormData.startTime = this.plandaterange[0];
				this.planFormData.endTime = this.plandaterange[1];	
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.getPlanPage(1);
				}
			},
			changePage(e){
				this.getPlanPage(e.current);
			},
			getPlanDetail(id){
				uni.navigateTo({
					url: 'plandetail/plandetail?id='+id
				});
			},
			// 获取分页计划
			getPlanPage(pageIndex){
				var that = this;
				uni.showLoading({
					title: '数据查询中……'
				});
				that.plans = [];
				uni.request({
				    url: '/api/ika/v1/plan/findbypage', 
					method: "POST",
					timeout:3000,
					header:{
						"Authorization":that.userInfo.token
					},
				    data: {
				        uId: that.userInfo.id,
						pageIndex:pageIndex,
						pageSize:5,
						planType:that.current
				    },
				    success: (res) => {
						uni.hideLoading();
						if(res.data.status === 1){	
							// 修改总条数和赋值列表
							that.numTotal = res.data.data.totalNum;
							var planList = res.data.data.planList;
							for(var i=0;i<planList.length;i++)
							{
								that.plans.push(planList[i]);
							}
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
						})	
					}
				});
			},
			// 提交计划
			submitPlan(ref) {
				var that = this;
				that.$refs[ref].validate().then(res => {
					uni.request({
					    url: '/api/ika/v1/plan/add', 
						method: "POST",
						timeout:3000,
						header:{
							"Authorization":that.userInfo.token
						},
						data: that.planFormData,
					    success: (res) => {
							if(res.data.status === 1){	
								uni.showToast({
									title: res.data.message,
									icon: 'success',
									duration: 1000
								});
								that.$refs.popup.close();
								that.getPlanPage(1);
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
				}).catch(err => {
					uni.showToast({
						title: err[0].errorMessage,
						icon: 'fail',
						duration: 2000
					})
					console.log('err', err);
				})
			},
			// 日期选择事件
			selectPlanDate(e){
				this.planFormData.startTime = e[0];
				this.planFormData.endTime = e[1];			
			},
			selectModifyPlanDate(e){
				this.planModifyFormData.startTime = e[0];
				this.planModifyFormData.endTime = e[1];	
			},
			// 获取父级计划
			getParentData(){
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
							that.parentIdRange = res.data.data;
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
			// 选项事件
			changeParentId(e){
				this.planFormData.parentId = e;
			},
			changeModifyParentId(e){
				this.planModifyFormData.parentId = e;
			},
			// 滑块点击事件
			swipeBindClick(e,item){
				if(e.content.text === '修改'){
					this.modifyPlan(item);
				}
				else if(e.content.text === '删除'){
					this.deletePlan(item.id);
				}
			},
			// 修改计划
			modifyPlan(item){
				var that = this;
				that.planModifyFormData = {
					id:item.id,
					name: item.name,
					amountMoney: item.amountMoney,
					remark: item.remark,
					planType:item.planType,
					reType:item.reType,
					startTime:item.startTime.substring(0,10),
					endTime:item.endTime.substring(0,10),
					parentId:item.parentId
				};
				that.planModifyDateRange = [];
				that.planModifyDateRange.push(that.planModifyFormData.startTime);
				that.planModifyDateRange.push(that.planModifyFormData.endTime);
				that.getParentData();
				that.$refs.modifyPlan.open();
			},
			// 提交计划修改
			submitModifyPlan(ref) {
				var that = this;
				that.$refs[ref].validate().then(res => {
					uni.showLoading({
						title: '数据修改中……'
					});
					uni.request({
					    url: '/api/ika/v1/plan/modify', 
						method: "POST",
						timeout:3000,
						header:{
							"Authorization":that.userInfo.token
						},
						data: that.planModifyFormData,
					    success: (res) => {
							uni.hideLoading();
							if(res.data.status === 1){	
								uni.showToast({
									title: res.data.message,
									icon: 'success',
									duration: 2000
								});
								that.$refs.modifyPlan.close();
								that.getPlanPage(1);
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
					console.log('err', err);
				})
			},
			// 删除计划
			deletePlan(id){
				var that = this;
				uni.request({
				    url: '/api/ika/v1/plan/delete?id=' + id , 
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
							this.getPlanPage(1);
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
			}
		}
	}
</script>

<style>
	.uni-common-mt {
		margin-top: 10px;
		margin-left: 5%;
		width: 90%;
	}

	.content {
		display: flex;
		height: 650px;
		width: 100%;
	}
	.card_list{
		width: 100%;
	}
	.uni-card-body{
		margin-left: 20rpx;
	}
	.content-text {
		font-size: 14px;
		color: #666;
	}
	.cust_pagination{
		margin-left: 5%;
		width: 90%;
	}
	.myfab{
		opacity: 0.8;
		text-shadow: 2px 3px 3px #aFcc00;
		box-shadow: 1px 2px 5px #000;
	}
	/* 添加计划弹出框样式 */
	.add-plan-form {
		padding: 10px;
		background-color: #fff;
	}
	.form-btn{
		width: 300rpx;
	}
</style>
