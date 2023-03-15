<template>
	<view class="container">
		<view class="ui-all">
			<!-- <view class="avatar" @tap="avatarChoose">
				<view  class="imgAvatar">
					<view class="iavatar" :style="'background: url('+avater+') no-repeat center/cover #eeeeee;'"></view>
				</view>
				<text v-if="avater">修改头像</text>
				<text v-if="!avater">授权微信</text>
				<button v-if="!avater" open-type="getUserInfo" @tap="getUserInfo" class="getInfo"></button>
			</view> -->
			<view class="ui-list">
				<text>用户名</text>
				<input type="text" :placeholder="value" :value="nickName" @input="bindnickName" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>手机号</text>
				<input type="tel" disable="true" :placeholder="value" :value="mobile" @input="bindmobile" placeholder-class="place" />
<!-- 				<button v-if="!mobile" open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="getInfo bun">授权手机号</button>
 -->			</view>
			<view class="ui-list">
				<text>邮箱</text>
				<input type="text" :placeholder="value" :value="email" @input="bindEmail" placeholder-class="place" />
			</view>
			<view class="ui-list right">
				<text>性别</text>
				<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
					<view class="picker">
						{{sex[index].name}}
					</view>
				</picker>
			</view>
			<!-- <view class="ui-list right">
				<text>常住地</text>
				<picker @change="bindRegionChange" mode='region'>
					<view class="picker">
						{{region[0]}} {{region[1]}} {{region[2]}}
					</view>
				</picker>
			</view> -->
			<view class="ui-list right">
				<text>生日</text>
				<picker mode="date" :value="date" @change="bindDateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="ui-list">
				<text>个人介绍</text>
				<textarea :placeholder="value" placeholder-class="place" :value="description" @input="binddescription"></textarea>
			</view>
			<button class="save" @tap="savaInfo">保 存 修 改</button>
		</view>
	
	</view>
	<!-- 悬浮按钮 -->
	<view>
		<uni-fab :content="fabcontent" horizontal="right" vertical="bottom"
			 @trigger="fabtrigger" :pattern="fabPattern">
		</uni-fab>
	</view>
	<!-- 修改密码 -->
	<view>
		<uni-popup ref="popup" type="top" background-color="#fff">
			<view class="modify_view">
				<uni-easyinput
				  class="hj-input" v-model="passnew" type="password" @focus="PassWordFocusBorderStyle"
				  @blur="PassWordBlurBorderStyle" :styles="inputColorConfigToPassWord"
				   placeholder="请输入密码"></uni-easyinput>
				<uni-easyinput
				  class="hj-input" v-model="pascheck" type="password" @focus="PassWordFocusBorderStyle"
				  @blur="PassWordBlurBorderStyle" :styles="inputColorConfigToPassWord"
				   placeholder="请确认密码"></uni-easyinput>   
				<button class="form-btn" type="primary" @click="modifyTruePass">确 认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '请填写',
				sex: [{
					id: 0,
					name: '男'
				}, {
					id: 1,
					name: '女'
				}, {
					id: 2,
					name: '不明'
				}],
				index: 0,
				//region: ['请填写'],
				date: '请填写',
				avater: '',
				description: '',
				url: '',
				nickName: '',
				mobile: '',
				headimg: '',
				email:'',
				fabcontent:[{
					iconPath: '/static/images/icon/modifypwd.png',
					selectedIconPath: '/static/images/icon/modifypwd.png',
					text: '改密',
					active: false
				},{
					iconPath: '/static/images/icon/loginout.png',
					selectedIconPath: '/static/images/icon/loginout.png',
					text: '退登',
					active: false
				}],
				fabPattern:{
					backgroundColor: '#fff',
					buttonColor: '#000000',
					iconColor: '#fff'
				},
				userInfo: uni.getStorageSync('user_info'),
				// 输入框边框颜色默认值
				colorDefault:'#b4b4b4',
				// 输入框边框聚焦值
				colorFocusColor:'#66ffff',
				// 输入框颜色配置
				inputColorConfigToUserName: {
				  color: "#000000",
				  disableColor: "#eee",
				  borderColor: "#b4b4b4",
				},
				// 输入框颜色配置
				inputColorConfigToPassWord: {
				  color: "#000000",
				  disableColor: "#eee",
				  borderColor: "#b4b4b4",
				},
				passnew:'',
				pascheck:''
			}
		},
		onLoad(){
			this.getUserInfo01();
		},
		methods: {
			fabtrigger(e){
				if(e.item.text === '改密'){
					this.modifyPassword();
				}
				else if(e.item.text === '退登'){
					this.loginOut();
				}
			},
			// 修改密码
			modifyPassword(){
				this.$refs.popup.open();
			},
			// 退出登录
			loginOut(){
				var that = this;
				uni.showModal({
					title: '敬告',
					content: '是否退出登录',
					success: function (res) {
						if (res.confirm) {
							that.loginOutCf();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			modifyTruePass(){
				var that = this;
				if(that.passnew != that.pascheck){
					uni.showToast({
						title: '密码不正确',
						duration: 2000
					});	
				}
				else{
					uni.showLoading({
						title: '修改中……'
					});
					that.$myapi.baseRequest('/api/ika/v1/user/modifypass', 'POST',that.userInfo.token,
						{
							name: that.userInfo.id,
							password: that.passnew
						}).then(res=>{
							uni.hideLoading();
							if(res.data.status === 1){	
								uni.showToast({
									title: '修改密码成功',
									icon: 'success',
									duration: 2000
								})	
								that.$refs.popup.close();
							}
							else{
								uni.showToast({
									title: '修改用户密码：' + res.data.message,
									icon: 'error',
									duration: 2000
								})						
							}
						}).catch(error=>{
							uni.hideLoading();
							uni.showToast({
								title: '修改用户密码：' + res.errMsg,
								icon: 'fail',
								duration: 2000
							});	
						});
				}
			},
			// 退出登录
			loginOutCf(){
				var that = this;
				uni.showLoading({
					title: '退出退录中……'
				});
				that.$myapi.baseRequest('/api/ika/v1/user/loginout', 'GET',that.userInfo.token,
					{}).then(res=>{
						uni.hideLoading();
						if(res.data.status === 1){	
							uni.clearStorageSync();
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
						else{
							uni.showToast({
								title: '退登失败：' + res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title: '退登异常：' + res.errMsg,
							icon: 'fail',
							duration: 2000
						});		
					});
			},
			// 输入框聚焦变换边框样式
			UserNamePassWrodFocusBorderStyle(){
				this.inputColorConfigToUserName.borderColor = this.colorFocusColor;
			},
			PassWordFocusBorderStyle(){
				this.inputColorConfigToPassWord.borderColor = this.colorFocusColor;
			},
			// 输入框失去焦点变换边框样式
			UserNamePassWrodBlurBorderStyle(){
			  this.inputColorConfigToUserName.borderColor
			  = this.colorDefault;
			},
			PassWordBlurBorderStyle(){
			  this.inputColorConfigToPassWord.borderColor
			  = this.colorDefault;
			},
			// 获取用户信息
			getUserInfo01(){
				var that = this;
				var userInfo = uni.getStorageSync('user_info');
				uni.showLoading({
					title: '获取中……'
				});
				that.$myapi.baseRequest('/api/ika/v1/user/findbyid', 'GET',that.userInfo.token,
					{}).then(res=>{
						uni.hideLoading();
						if(res.data.status === 1){	
							that.nickName = res.data.data.uName;
							that.mobile = res.data.data.phone;
							that.email = res.data.data.email;
							that.date = res.data.data.birthday.substring(0,10);
							that.index = res.data.data.gender;
							that.description = res.data.data.introduction;
						}
						else{
							uni.showToast({
								title: '请求用户信息：' + res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title: '请求用户信息：' + res.errMsg,
							icon: 'fail',
							duration: 2000
						});	
					});
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
			},
			bindRegionChange(e) {
				this.region = e.detail.value;
			},
			bindDateChange(e) {
				this.date = e.detail.value;
			},
			bindnickName(e) {
				this.nickName = e.detail.value;
			},
			bindmobile(e) {
				this.mobile = e.detail.value;
			},
			binddescription(e) {
				this.description = e.detail.value;
			},
			bindEmail(e) {
				this.email = e.detail.value;
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						that.imgUpload(res.tempFilePaths);
						const tempFilePaths = res.tempFilePaths;
					}
				});
			},
			getUserInfo () {
				  uni.getUserProfile({
			      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			      success: (res) => {
			       console.log(res);
				   uni.showToast({
							   title: '已授权',
							   icon: 'none',
							   duration: 2000
							   }) 
			      }
			    })
			},
			getphonenumber(e){
				if(e.detail.iv){
					console.log(e.detail.iv) //传后台解密换取手机号
					uni.showToast({
						title: '已授权',
						icon: 'none',
						duration: 2000
					}) 
				}
			},
			// 保存修改
			savaInfo() {
				const userInfo = uni.getStorageSync('user_info');
				let that = this;
				let nickname = that.nickName;
				//let headimg = that.headimg;
				let gender = that.index;
				let mobile = that.mobile;
				let email = that.email;
				let birthday = that.date;
				let description = that.description;
				let updata = {
					"id":userInfo.id,
					"weixinId":userInfo.weixinId,
				};
				if (!nickname) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.uName = nickname;
				// if (!headimg) {
				// 	headimg = that.avater;
				// }
				//updata.headimg = headimg;
				updata.gender = gender;
				updata.email = email;
				if (that.isPoneAvailable(mobile)) {
					updata.phone = mobile;
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// if (region.length == 1) {
				// 	uni.showToast({
				// 		title: '请选择常住地',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// } else {
				// 	updata.province = region[0];
				// 	updata.city = region[1];
				// 	updata.area = region[2];
				// }
				if (birthday == "0000-00-00") {
					uni.showToast({
						title: '请选择生日',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.birthday = birthday;
				updata.introduction = description;
				that.updata(updata);
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			async updata(datas) {
				var that = this;
				uni.showLoading({
					title: '修改中……'
				});
				that.$myapi.baseRequest('/api/ika/v1/user/modify', 'POST',that.userInfo.token,
					datas).then(res=>{
						uni.hideLoading();
						if(res.data.status === 1){	
							uni.showToast({
								title: '修改成功',
								icon: 'success',
								duration: 2000
							})	
							
						}
						else{
							uni.showToast({
								title: '修改用户信息：' + res.data.message,
								icon: 'error',
								duration: 2000
							})						
						}
					}).catch(error=>{
						uni.hideLoading();
						uni.showToast({
							title: '修改用户信息：' + res.errMsg,
							icon: 'fail',
							duration: 2000
						});	
					});
			},
			imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						Authorization: uni.getStorageSync('token')
					},
					url:'/api/upload/image', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					formData: {
						type: 'user_headimg'
					},
					success: function(res) {
						var data = JSON.parse(res.data);
						data = data.data;
						that.avater = that.url + data.img;
			
						that.headimg = that.url + data.img;
			
						
					},
					fail: function(error) {
						console.log(error);
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.is-input-border{
	  border-radius: 7px !important;
	}
	.uni-easyinput__content{
	  min-height: 39px !important;
	}
	.hj-input {
	  margin-top: 15rpx;
	  margin-bottom: 15rpx;
	  width: 400rpx;
	}
	.hj-input:nth-child(2) {
	  margin-top: 35rpx;
	}
	.modify_view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 40rpx;
		box-shadow: 9px 9px 6px #e3e3e3
	}
	.form-btn{
		width: 200rpx;
		margin-bottom: 30rpx;
	}
	.container {
		display: block;
	}

	.ui-all {
		padding: 20rpx 40rpx;

		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}

			&:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 85rpx;
				right: 0;
			}
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			text {
				color: #4a4a4a;
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150rpx;
			}

			input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}
			button{
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;
				&::after{
					display: none;
				}
			}
			picker {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30rpx;
				left: 150rpx;
			}

			textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.right:after {
			content: ' ';
			width: 20rpx;
			height: 20rpx;
			border-top: solid 1px #030303;
			border-right: solid 1px #030303;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			/* IE 9 */
			-moz-transform: rotate(45deg);
			/* Firefox */
			-webkit-transform: rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(45deg);
			position: absolute;
			top: 40rpx;
			right: 0;
		}

		.save {
			background: #030303;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
			width: 50%;
		}
	}
</style>

