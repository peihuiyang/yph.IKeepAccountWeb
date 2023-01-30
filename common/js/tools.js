export default {
    // 获取当前日期并格式化
    formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return [year, month, day].map(this.formatNumber).join('-');
    },
	formatDate01(year,month,day) {
	    return [year, month, day].map(this.formatNumber).join('-');
	},
    //获取当前时间并格式化
    formatTime(date) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return [hour, minute, second].map(this.formatNumber1).join(':');
    },
    //获取当前月份并格式化
    formatMonth(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        return [year, month].map(this.formatNumber).join('-');
    },
    formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    formatNumber1(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    //获取当天日期
    nowDate(date){
        let day = date.getDate();
        return day;
    },
      
    //将数字格式化为带两个小数位
    numberFormat(value) {
        var v = parseFloat(value);//强转Double，毕竟有可能返回是String类型的数字
        return v.toFixed(2);
    },
    //判断是否为纯数字
    isNum(value){
        var  regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var  regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(value) || regNeg.test(value)) 
        {
          return  true;
        }
        else  
        {
          return  false;
        }
    }
}