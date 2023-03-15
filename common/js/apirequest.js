// 微信小程序、APP
//const apiUrl = 'http://106.13.10.198:8080/TT';
// H5
const apiUrl = '';
const baseRequest = (url, method,token, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: apiUrl+url,
            method: method,
            data: params,
			timeout:3000,
            header: {
                'Authorization': token
            }
        }).then((response)=>{
            resolve(response);
        }).catch(error => {
            //弹出消息提示
            uni.showToast({
                icon: 'none',
                title: '服务器错误！',
                duration: 2000
            })
            // let [err, res] = error;
            // reject(err);
        });
    })
};

export default{
    baseRequest
}