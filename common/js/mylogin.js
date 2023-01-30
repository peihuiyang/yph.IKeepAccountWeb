export default {
    checkLogin(isNavigateTo){
		const userInfo = uni.getStorageSync('user_info');
		if(userInfo === null || userInfo === "")
		{
			if(isNavigateTo){
				uni.navigateTo({
					url: '/pages/userlogin/userlogin'
				});	
			}
			return false;
		}
		return true;
	}
}