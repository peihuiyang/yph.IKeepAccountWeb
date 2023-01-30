"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_mylogin = require("../../common/js/mylogin.js");
const _sfc_main = {
  data() {
    const userInfo = common_vendor.index.getStorageSync("user_info");
    return {
      userInfo,
      title: "\u4E2A\u4EBA\u4E2D\u5FC3",
      userName: userInfo === "" ? "" : userInfo.uName,
      userPhone: userInfo === "" ? "" : userInfo.phone
    };
  },
  onLoad() {
  },
  methods: {
    getUserInfo() {
      if (common_js_mylogin.mylogin.checkLogin(true)) {
        common_vendor.index.redirectTo({
          url: "/pages/mime/userinfo/userinfo"
        });
      }
    },
    cleanCache() {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u662F\u5426\u6E05\u9664\u7F13\u5B58",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.clearStorage();
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.userName),
    b: common_vendor.t($data.userPhone),
    c: common_vendor.o(($event) => $options.getUserInfo()),
    d: common_vendor.o((...args) => $options.cleanCache && $options.cleanCache(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/mime/mime.vue"]]);
wx.createPage(MiniProgramPage);
