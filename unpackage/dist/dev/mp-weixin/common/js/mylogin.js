"use strict";
var common_vendor = require("../vendor.js");
var mylogin = {
  checkLogin(isNavigateTo) {
    const userInfo = common_vendor.index.getStorageSync("user_info");
    if (userInfo === null || userInfo === "") {
      if (isNavigateTo) {
        common_vendor.index.navigateTo({
          url: "/pages/userlogin/userlogin"
        });
      }
      return false;
    }
    return true;
  }
};
exports.mylogin = mylogin;
