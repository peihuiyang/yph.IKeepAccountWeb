import tools from "../../common/js/tools.js";
import apirequest from "../../common/js/apirequest.js";

export default {
	// data() {
	// 	return {
	// 		userInfo: uni.getStorageSync('user_info'),
	// 		hostUrl:'http://106.13.10.198:8040',
	// 	}
	// },
	// 获取月度账单统计
	getMonthBillCount(noUseCache){
		var that = this;
		var userInfo = uni.getStorageSync('user_info');
		const month_income_cache = uni.getStorageSync('month_income_cache');
		const month_paymoney_cache = uni.getStorageSync('month_paymoney_cache');
		if((month_income_cache <= 0 || month_paymoney_cache <= 0) || noUseCache){
			apirequest.baseRequest('/api/ika/v1/accountrecord/statistics', 'POST',userInfo.token, 
				{
					keepTime:tools.formatDate(new Date()),
					timeQueryType:1
				})
				.then(res=>{
					if(res.data.status === 1){
						uni.setStorageSync('month_income_cache',res.data.data.statisticsItem[0].incomeMoney);
						uni.setStorageSync('month_paymoney_cache',res.data.data.statisticsItem[0].payMoney);
					}
					else{	
						uni.showToast({
							title: res.data.message,
							icon: 'error',
							duration: 2000
						})						
					}
				}).catch(error=>{
					console.log(error);
				});		
		}
	},
	// 获取账单类型
	getPurpose(){
		apirequest.baseRequest('/api/ika/v1/sysdic/getcache?type=2', 'GET',"",
			{}).then(res=>{
				if(res.data.status === 1){
					uni.setStorageSync('purpose_data',res.data.data);
				}
				else{
					uni.showToast({
						title: '请求账单类型：' + res.data.message,
						icon: 'error',
						duration: 2000
					})						
				}
			}).catch(res=>{
				uni.showToast({
					title: '请求账单类型：' + res.errMsg,
					icon: 'fail',
					duration: 2000
				});	
			});		
	},
	// 获取支付方式
	getPayType(){
		apirequest.baseRequest('/api/ika/v1/sysdic/getcache?type=1', 'GET',"",
			{}).then(res=>{
				if(res.data.status === 1){
					uni.setStorageSync('paytype_data',res.data.data);
				}
				else{
					uni.showToast({
						title: '请求支付方式：' + res.data.message,
						icon: 'error',
						duration: 2000
					})						
				}
			}).catch(res=>{
				uni.showToast({
					title: '请求支付方式：' + res.errMsg,
					icon: 'fail',
					duration: 2000
				});	
			});
	}
}