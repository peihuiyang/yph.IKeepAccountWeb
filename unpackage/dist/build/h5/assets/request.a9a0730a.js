import{h as a,j as t,s as e,k as o}from"./index.eda1eb19.js";import{t as i}from"./tools.7dae34ab.js";var s={getMonthBillCount(s){var r=a("user_info");const c=a("month_income_cache"),d=a("month_paymoney_cache");(c<=0||d<=0||s)&&t({url:"/api/ika/v1/accountrecord/statistics",method:"POST",timeout:3e3,header:{Authorization:r.token},data:{keepTime:i.formatDate(new Date),timeQueryType:1},success:a=>{1===a.data.status?(e("month_income_cache",a.data.data.statisticsItem[0].incomeMoney),e("month_paymoney_cache",a.data.data.statisticsItem[0].payMoney)):o({title:a.data.message,icon:"error",duration:2e3})},fail:a=>{o({title:a.errMsg,icon:"fail",duration:2e3})}})},getPurpose(){t({url:"/api/ika/v1/sysdic/getcache?type=2",method:"GET",timeout:3e3,success:a=>{console.log(a.data),1===a.data.status?e("purpose_data",a.data.data):o({title:"请求账单类型："+a.data.message,icon:"error",duration:2e3})},fail:a=>{o({title:"请求账单类型："+a.errMsg,icon:"fail",duration:2e3})}})},getPayType(){t({url:"/api/ika/v1/sysdic/getcache?type=1",method:"GET",timeout:3e3,success:a=>{1===a.data.status?e("paytype_data",a.data.data):o({title:"请求支付方式："+a.data.message,icon:"error",duration:2e3})},fail:a=>{o({title:"请求支付方式："+a.errMsg,icon:"fail",duration:2e3})}})}};export{s as r};
