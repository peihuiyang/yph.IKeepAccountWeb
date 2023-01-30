"use strict";
var common_vendor = require("../vendor.js");
var common_js_tools = require("./tools.js");
var request = {
  getMonthBillCount(noUseCache) {
    var userInfo = common_vendor.index.getStorageSync("user_info");
    var hostUrl = "http://106.13.10.198:8040";
    const month_income_cache = common_vendor.index.getStorageSync("month_income_cache");
    const month_paymoney_cache = common_vendor.index.getStorageSync("month_paymoney_cache");
    if (month_income_cache <= 0 || month_paymoney_cache <= 0 || noUseCache) {
      common_vendor.index.request({
        url: hostUrl + "/api/ika/v1/accountrecord/statistics",
        method: "POST",
        timeout: 3e3,
        header: {
          "Authorization": userInfo.token
        },
        data: {
          keepTime: common_js_tools.tools.formatDate(new Date()),
          timeQueryType: 1
        },
        success: (res) => {
          if (res.data.status === 1) {
            common_vendor.index.setStorageSync("month_income_cache", res.data.data.statisticsItem[0].incomeMoney);
            common_vendor.index.setStorageSync("month_paymoney_cache", res.data.data.statisticsItem[0].payMoney);
          } else {
            common_vendor.index.showToast({
              title: res.data.message,
              icon: "error",
              duration: 2e3
            });
          }
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "fail",
            duration: 2e3
          });
        }
      });
    }
  }
};
exports.request = request;
