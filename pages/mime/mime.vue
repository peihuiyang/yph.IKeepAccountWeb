<template>
	<view class="header">
		<view class="uesr">
			<view class="top-xh">
				<view class="h2">
					个人中心
				</view>
			</view>
			<view class="fot-xh" @click="getUserInfo()">
				<view class="pic">
					<image src="../../static/images/image/touxiang.png" style="width: 130rpx;" mode="widthFix">
					</image>
				</view>
				<view class="txt">
					<view class="name">
						<view class="h3">
							{{userName}}
						</view>
						<view class="phone">
							{{userPhone}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--绑定关系-->
		<view class="relationship" @click="billStatistics">
			<view class="m-a1">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/images/icon/relationship.png" style="width: 76rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text class="s1">点击此处添加绑定关系</text>
						<text>和TA一起成长</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="ul-list1-xh">
			<view class="li">
				<navigator url="/pages/mime/myplan/myplan" hover-class="none">
					<view class="pic">
						<image src="../../static/images/icon/myplan.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>我的计划</text>
					</view>
				</navigator>
			</view>	
			<view class="li" @click="billStatistics">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/images/icon/tongji.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>账单统计</text>
					</view>
				</navigator>
			</view>		
			<view class="li">
				<navigator url="/pages/mime/aboutus/aboutus" hover-class="none">
					<view class="pic">
						<image src="../../static/images/icon/aboutus.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>关于我们</text>
					</view>
				</navigator>
			</view>		
			<view class="li" @click="cleanCache">
				<view class="pic">
					<image src="../../static/images/icon/clean.png" style="width: 35rpx;" mode="widthFix"></image>
				</view>
				<view class="txt">
					<text>清除缓存</text>
				</view>
			</view>		
		</view>
	</view>
	<view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popupMessageType" :duration="2000">
				<text style="font-size: 10rpx;">{{messageText}}</text>
			</uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import mylogin from "../../common/js/mylogin.js";
	export default {
		data() {
			// 判断是否已登录，否跳转登录页，是调整个人详情页
			const userInfo = uni.getStorageSync('user_info');
			return {
				userInfo: userInfo,
				title: '个人中心',
				userName:userInfo === "" ? "":userInfo.uName,
				userPhone:userInfo === "" ? "":userInfo.phone,
				popupMessageType:'success',
				messageText:'',
			}
		},
		onLoad() {
			
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				if(mylogin.checkLogin(true)){
					uni.navigateTo({
						url: '/pages/mime/userinfo/userinfo'
					});
				}
            },
			billStatistics(){
				var that = this;
				that.messageText = '该功能暂未开放，敬请期待！';
				that.popupMessageType = 'warn';
				that.$refs.popup.open()
			},
			// 清除缓存
			cleanCache(){
				uni.showModal({
					title: '提示',
					content: '是否清除缓存',
					success: function (res) {
						if (res.confirm) {
							uni.clearStorage();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("mime.css");
</style>
