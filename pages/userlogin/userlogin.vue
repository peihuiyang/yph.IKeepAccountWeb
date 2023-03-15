<template>
	<view class="page">
		<view class="top-background-raduis"> </view>
		<view class="login-box">
			<view class="login-card-title">
				<view class="uni-padding-wrap uni-common-mt login-card-title-content">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
				</view>
				
			</view>
			<!-- 登录列表 -->
			<view class="login-card-input" v-if="current === 0">
				<!-- 输入框头部图标 -->
				<uni-easyinput class="hj-input" v-model="user" focus maxlength="30"
				  :trim="true" @focus="UserNamePassWrodFocusBorderStyle"
				  :styles="inputColorConfigToUserName" @blur="UserNamePassWrodBlurBorderStyle"
				  placeholder="请输入账号/手机号"></uni-easyinput>
				<!-- 输入框头部图标 -->
				<uni-easyinput
				  class="hj-input" v-model="pass" type="password" @focus="PassWordFocusBorderStyle"
				  @blur="PassWordBlurBorderStyle" :styles="inputColorConfigToPassWord"
				   placeholder="请输入密码"></uni-easyinput>
				   
				<view class="slider-content" style="box-shadow: none;">
					<view class="slider-container" :style="{backgroundColor:sliderBlockBg,touchAction: 'none'}">
						<view class="" style="height: 100%;font-size: 26rpx;color: #000;text-align: center;line-height: 60rpx;">
							{{value==100?successText:initText}}
						</view>
						<view class="front" :style="{width: value+'%',backgroundColor:forntBg}">
							
						</view>
						<view class="slider-block" :style="{left:!value?'0':'calc('+value+'% - '+sliderBlockWidth+'rpx)',width:sliderBlockWidth+'rpx'}">
							-->
						</view>
						<slider :value="value" @change="sliderChange" :disabled="disabled" activeColor="transparent" @changing="changing" block-color="transparent" :block-size="35" backgroundColor="transparent" 
							style="position: absolute;top:6rpx;left: 0;z-index: 5;width: 88%;" />
					</view>
				</view>
			</view>
			<!-- 注册列表 -->
			<view class="login-card-input" v-if="current === 1">
				<!-- 输入框头部图标 -->
				<uni-easyinput class="hj-input" v-model="user" focus maxlength="30"
				  :trim="true" @focus="UserNamePassWrodFocusBorderStyle"
				  :styles="inputColorConfigToUserName" @blur="UserNamePassWrodBlurBorderStyle"
				  placeholder="请输入手机号"></uni-easyinput>
				<!-- 输入框头部图标 -->
				<uni-easyinput
				  class="hj-input" v-model="pass" type="password" @focus="PassWordFocusBorderStyle"
				  @blur="PassWordBlurBorderStyle" :styles="inputColorConfigToPassWord"
				   placeholder="请输入密码"></uni-easyinput>
				   
				<view class="slider-content">
					<view class="slider-container" :style="{backgroundColor:sliderBlockBg,touchAction: 'none'}">
						<view style="height: 100%;font-size: 26rpx;color: #000;text-align: center;line-height: 60rpx;">
							{{value==100?successText:initText}}
						</view>
						<view class="front" :style="{width: value+'%',backgroundColor:forntBg}">
							
						</view>
						<view class="slider-block" :style="{left:!value?'0':'calc('+value+'% - '+sliderBlockWidth+'rpx)',width:sliderBlockWidth+'rpx'}">
							>>
						</view>
						<slider :value="value" @change="sliderChange" :disabled="disabled" activeColor="transparent" @changing="changing" block-color="transparent" :block-size="35" backgroundColor="transparent" 
							style="position: absolute;top:6rpx;left: 0;z-index: 5;width: 88%;" />
					</view>
				</view>
			</view>
			<view class="login-card-loginIn">
				<button class="login-card-loginIn-btn" :disabled="isCheckSlider" plain="true" @click="userclick"> {{current===0?'登 录':'注 册'}}</button>
			</view>
			<view class="login-bottom-info" v-if="current === 0"> 忘记密码</view>
		</view>
		<view class="bottom-message"> 登录/注册代表你已信任该应用 </view>
	</view>
	<uni-popup ref="popup" type="message">
		<uni-popup-message :type="popupMessageType" :duration="2000">
			<text style="font-size: 10rpx;">{{messageText}}</text>
		</uni-popup-message>
	</uni-popup>
</template>

 
<script>
export default {
  components: {
	    
	},
  data() {
    return {
		userInfo: uni.getStorageSync('user_info'),
		items: ['登录', '注册'],
		current: 0,
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
      user: "",
	  pass: "",
	  messageText:"",
	  popupMessageType:'success',
	  value:0,
	  disabled:false,
	  initText:'右滑验证',
	  successText:'验证成功',
	  sliderBlockBg:'#dae2d0',
	  forntBg:'#66ffff',
	  sliderBlockWidth:80,
	  reset:true,
	  isCheckSlider:true,
    };
  },
  onLoad() {},
  methods: {
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
	onClickItem(e) {
		if (this.current !== e.currentIndex) {
			this.current = e.currentIndex;
		}
	},
	userclick(){
		if(this.current === 0){
			this.userlogin();
		}
		else{
			this.userregister();
		}
	},
	// 登录
	userlogin(){
		var that = this;
		that.$myapi.baseRequest('/api/ika/v1/user/login', 'POST',that.userInfo.token,
			{
				name: that.user,
				password:that.pass
			}).then(res=>{
				that.value=0;
				if(res.data.status === 1){
					that.messageText = res.data.message;
					that.$refs.popup.open();
					uni.setStorageSync('user_info',res.data.data);
					uni.switchTab({
						url: '/pages/mime/mime'
					});
				}
				else{	
					that.messageText = res.data.message;
					that.popupMessageType = 'warn';
					that.$refs.popup.open()
				}
			}).catch(error=>{
				console.log(error);
			});
	},
	// 注册
	userregister(){
		var that = this;
		uni.showLoading({
			title: '注册中……'
		});
		that.$myapi.baseRequest('/api/ika/v1/user/add', 'POST',that.userInfo.token,
			{
				uName: that.user,
				password:that.pass,
				phone:that.user
			}).then(res=>{
				uni.hideLoading();
				if(res.data.status === 1){
					that.userlogin();
				}
				else{	
					that.messageText = res.data.message;
					that.popupMessageType = 'warn';
					that.$refs.popup.open()
				}
			}).catch(error=>{
				uni.hideLoading();
				that.messageText = '登录失败，请稍后再试(' + error.errMsg + ')';
				that.popupMessageType = 'error';
				that.$refs.popup.open()
			});
	},
	changing(e){		
		this.value=e.detail.value
	},
	sliderChange(e){
		var that = this;
		if(e.detail.value!=100){
			that.value=e.detail.value
			that.$nextTick(()=>{
				that.value=0;
				that.messageText = '校验失败';
				that.popupMessageType = 'error';
				that.$refs.popup.open();
			})
		}
		if(e.detail.value==100){
			that.value=100
			that.$emit('success') //验证成功触发组件通知
			if(!that.reset){
				that.disabled=true;
				return
			}
			that.isCheckSlider = false;
		}
	}
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.uni-common-mt {
		margin-top: 10px;
		margin-left: 5%;
		width: 90%;
	}

.page {
  position: relative;
  height: 100vh;
}
.top-background-raduis {
  height: 30%;
  background-color: #d8d8d8;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}
.is-input-border{
  border-radius: 7px !important;
}
.uni-easyinput__content{
  min-height: 39px !important;
}
.hj-input {
  margin-top: 15rpx;
}
.hj-input:nth-child(2) {
  margin-top: 35rpx;
}
.login-box {
  top: 20%;
  position: absolute;
  width: 80%;
  left: 10%;
  right: 10%;
  height: 700rpx;
  padding: 30rpx;
  background-color: white;
  border-radius: 40rpx;
  box-shadow: 9px 9px 6px #e3e3e3;
  .login-card-input {
    // background-color: violet;
    height: 50%;
    padding: 5rpx;
  }
  .login-card-title {
    height: 20%;
    // background-color: black;
    padding: 10rpx;
    display: flex;
    justify-content: center;
    .login-card-title-content {
      font-size: 1.2em;
      color: #66ccff;
      border-bottom: 3px solid #66ccff;
    }
  }
  .login-card-loginIn{
	  margin-top: 10rpx;
    height: 25%;
    display: flex;
    justify-content: center;
    padding: 10rpx;
    align-items: center;
    .login-card-loginIn-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #66ccff;
      width: 40%;
      font-size: 1.0em;
      height: 60%;
      border-radius: 40rpx;
      color: white;
	  //margin-left: 5%;
    }
  }
  .login-bottom-info{
	margin-top: 10rpx;
    height: 5%;
    display: flex;
    font-size: 0.7em;
    color: #66ccff;
    //justify-content: end;

  }
}
.bottom-message{
  position: absolute;
  height: 70rpx;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  overflow: hidden;
  color: #969898;
  bottom: 40rpx;
}
.slider-content{
	overflow: hidden;
	height: 60rpx;
	margin-top: 30rpx;
}

::v-deep .slider-container {
	position: relative;
	border: 2rpx solid #C0C0C0;
	height: 60rpx;
	border-radius: 8rpx;
	overflow: hidden;
	width: 100%;
	
	.uni-slider-thumb{
		box-shadow: none;
	}
	.slider-block{
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		color: #787878;
		line-height: 60rpx;
		background-color: #fff;
		text-align: center;
		max-width: 80rpx;
	}
	.front{
		height:100%;
		position:absolute;
		font-size: 20rpx;
		top:0;
		left:0;
		opacity:0.8;
	}
}
</style>