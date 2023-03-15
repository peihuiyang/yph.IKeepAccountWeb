<template>
  <view class="content">
    <ad-fullscreen-video adpid="126161110103" :loadnext="true" v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
      <button :disabled="loading" :loading="loading">显示广告</button>
      <view v-if="error">{{error}}</view>
    </ad-fullscreen-video>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onadload(e) {
			      console.log('广告数据加载成功');
			},
			onadclose(e) {
				console.log("onadclose",e);
			},
			onaderror(e) {
			    // 广告加载失败
			    console.log("onerror: ", e.detail);
			}
		}
	}
</script>

<style>

</style>
