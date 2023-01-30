"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      colorDefault: "#b4b4b4",
      colorFocusColor: "#66ffff",
      inputColorConfigToUserName: {
        color: "#000000",
        disableColor: "#eee",
        borderColor: "#b4b4b4"
      },
      inputColorConfigToPassWord: {
        color: "#000000",
        disableColor: "#eee",
        borderColor: "#b4b4b4"
      },
      user: "",
      pass: "",
      messageText: ""
    };
  },
  onLoad() {
  },
  methods: {
    UserNamePassWrodFocusBorderStyle() {
      this.inputColorConfigToUserName.borderColor = this.colorFocusColor;
    },
    PassWordFocusBorderStyle() {
      this.inputColorConfigToPassWord.borderColor = this.colorFocusColor;
    },
    UserNamePassWrodBlurBorderStyle() {
      this.inputColorConfigToUserName.borderColor = this.colorDefault;
    },
    PassWordBlurBorderStyle() {
      this.inputColorConfigToPassWord.borderColor = this.colorDefault;
    },
    userlogin() {
      var that = this;
      common_vendor.index.request({
        url: "http://106.13.10.198:8040/api/ika/v1/user/login",
        method: "POST",
        timeout: 100,
        data: {
          name: that.user,
          password: that.pass
        },
        success: (res) => {
          if (res.data.status === 1) {
            common_vendor.index.setStorageSync("user_info", res.data.data);
            common_vendor.index.switchTab({
              url: "/pages/mime/mime"
            });
          } else {
            that.messageText = res.data.message;
            that.$refs.popup.open();
          }
        },
        fail: (res) => {
          console.log(res);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.UserNamePassWrodFocusBorderStyle),
    b: common_vendor.o($options.UserNamePassWrodBlurBorderStyle),
    c: common_vendor.o(($event) => $data.user = $event),
    d: common_vendor.p({
      focus: true,
      maxlength: "30",
      trim: true,
      styles: $data.inputColorConfigToUserName,
      placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7/\u624B\u673A\u53F7",
      modelValue: $data.user
    }),
    e: common_vendor.o($options.PassWordFocusBorderStyle),
    f: common_vendor.o($options.PassWordBlurBorderStyle),
    g: common_vendor.o(($event) => $data.pass = $event),
    h: common_vendor.p({
      type: "password",
      styles: $data.inputColorConfigToPassWord,
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.pass
    }),
    i: common_vendor.o((...args) => $options.userlogin && $options.userlogin(...args)),
    j: common_vendor.t($data.messageText),
    k: common_vendor.p({
      type: "success",
      duration: 2e3
    }),
    l: common_vendor.sr("popup", "9f827278-2"),
    m: common_vendor.p({
      type: "message"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f827278"], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/userlogin/userlogin.vue"]]);
wx.createPage(MiniProgramPage);
