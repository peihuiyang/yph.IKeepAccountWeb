<script>
	export default {
		onLaunch: function() {
			//console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			//console.log('App Launch')
			//app启动时打开启动广告页
			var w = plus.webview.open(
				'hybrid/html/advertise/advertise.html',
				'advertise', {
					top: 0,
					bottom: 0,
					zindex: 999
				},
				'fade-in',
				0
			);
			//设置定时器，4s后关闭启动广告页
			setTimeout(function() {
				plus.webview.close(w);
			}, 4000);
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
