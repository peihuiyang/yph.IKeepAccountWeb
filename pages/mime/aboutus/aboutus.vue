<template>
	<view>
		<view class="logo_head">
		  <view class="logo_css">
			  <uni-tooltip content="亲密记 BillManage">
				  <image src="../../../static/images/image/logo.jpg" class="logo"></image>
			  </uni-tooltip>
				<view class="shadow"></view>
		  </view>
		</view>
		<view class="logo_content" @click="msgFind">
		  <view class="text2">{{nowversion}}</view>
		  <view class="shadow1"></view>
		</view>
	</view>
	<view>
		<uni-section title="功能介绍" type="line">
			<uni-collapse  accordion v-model="accordionVal" @change="functionChange">
				<uni-collapse-item title="记账">
					<view class="content">
						<text class="text">包含账单的增删改查，目前查询主要根据账单日期来并进行相关的统计。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="计划">
					<view class="content">
						<text class="text">包含计划的增删改查，在计划详情页可查看计划进度，会定时获取实时更新。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="关系绑定">
					<view class="content">
						<text class="text">用户绑定关系后，可以查看对应用户的账单统计和相关计划。</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowversion:'',      //最新版本
				releasemsg:'',     //发布信息
				// 功能介绍默认
				accordionVal:'0'
			}
		},
		onLoad(){
			var that = this;
			that.nowversion = 'v1.0.1';
			that.releasemsg = '2023-02-08\n由YPH最后修改发布。';
		},
		methods: {
			functionChange(e) {
				console.log(e);
			},
			//查看发布时间
			msgFind:function(){
			    var that = this;
			    uni.showToast({
			    	title: that.releasemsg,
			    	duration: 5000
			    });
			},
		}
	}
</script>

<style>
.content {
	padding: 15px;
}
.logo_head{
  display:flex;
  align-items: center;
  justify-content: center;
  height:  360rpx;
  width: 100%
}
.logo_css{
  position:relative;
  height: 200rpx;
  width: 300rpx;
}
.logo{
  margin-left: 50rpx;
  height: 200rpx;
  width: 200rpx;
  border-radius: 40rpx;
}
.shadow{
  background-color:  #f6f6f6;
  margin-left: 25rpx;
  bottom: 50rpx;
  width: 250rpx;
  height: 6rpx;
  box-shadow: 0rpx -10rpx 40rpx #888888;
  
}
.logo_content{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100rpx;
  margin-bottom: 20rpx;
}
.shadow1{
  background-color:  #f6f6f6;
  margin-left: 25rpx;
  bottom: 50rpx;
  width: 250rpx;
  height: 6rpx;
  box-shadow: 0rpx -10rpx 40rpx #888888;
}
.text2{
  text-align: center;
  font-size: 34rpx;
  width: 100%;
  color: #00FFFF;
}
</style>
