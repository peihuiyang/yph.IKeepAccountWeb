"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_mylogin = require("../../common/js/mylogin.js");
var common_js_request = require("../../common/js/request.js");
require("../../common/js/tools.js");
const _sfc_main = {
  data() {
    return {
      userInfo: common_vendor.index.getStorageSync("user_info"),
      hostUrl: "http://106.13.10.198:8040",
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      noticetext: "",
      incomecount: 0,
      paycount: 0,
      accountFormData: {
        money: 0,
        reType: 1,
        keepTime: "",
        remark: "",
        planId: "",
        payType: "",
        purpose: ""
      },
      reTypes: [{
        text: "\u6536\u5165",
        value: 0
      }, {
        text: "\u652F\u51FA",
        value: 1
      }],
      planIdRange: [],
      purposeRange: [],
      payTypeRange: [],
      rules: {
        keepTime: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u65E5\u671F"
          }]
        },
        purpose: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u8D26\u5355\u5206\u7C7B"
          }]
        },
        payType: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F"
          }]
        },
        money: {
          rules: [{
            format: "number",
            errorMessage: "\u91D1\u989D\u53EA\u80FD\u8F93\u5165\u6570\u5B57"
          }]
        },
        remark: {
          rules: [{
            required: true,
            errorMessage: "\u5907\u6CE8\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        }
      }
    };
  },
  onLoad() {
    this.noticetext = "\u6B22\u8FCE\u6765\u5230\u4EB2\u5BC6\u8BB0";
    this.getBillCount(false);
  },
  onReady() {
    this.getPurpose();
    this.getPayType();
  },
  methods: {
    selectCount() {
      common_vendor.index.navigateTo({
        url: "/pages/index/monthbill/monthbill"
      });
    },
    getPurpose() {
      var that = this;
      const purpose = common_vendor.index.getStorageSync("purpose_data");
      if (purpose === null || purpose === "") {
        console.log(purpose);
        common_vendor.index.request({
          url: "http://106.13.10.198:8040/api/ika/v1/sysdic/getcache?type=2",
          method: "GET",
          timeout: 3e3,
          success: (res) => {
            console.log(res.data);
            if (res.data.status === 1) {
              common_vendor.index.setStorageSync("purpose_data", res.data.data);
              that.purposeRange = purpose;
            }
          }
        });
      } else {
        that.purposeRange = purpose;
      }
    },
    getPayType() {
      var that = this;
      const PayType = common_vendor.index.getStorageSync("paytype_data");
      if (PayType === null || PayType === "") {
        common_vendor.index.request({
          url: "http://106.13.10.198:8040/api/ika/v1/sysdic/getcache?type=1",
          method: "GET",
          timeout: 3e3,
          success: (res) => {
            if (res.data.status === 1) {
              common_vendor.index.setStorageSync("paytype_data", res.data.data);
              that.payTypeRange = PayType;
            }
          }
        });
      } else {
        that.payTypeRange = PayType;
      }
    },
    addBill() {
      var that = this;
      if (!common_js_mylogin.mylogin.checkLogin(false)) {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "exception",
          duration: 2e3
        });
        return;
      }
      that.$refs.popup.open();
    },
    submitAccount(ref) {
      var that = this;
      that.$refs[ref].validate().then((res) => {
        console.log(that.accountFormData);
        common_vendor.index.request({
          url: that.hostUrl + "/api/ika/v1/accountrecord/add",
          method: "POST",
          timeout: 3e3,
          header: {
            "Authorization": that.userInfo.token
          },
          data: that.accountFormData,
          success: (res2) => {
            if (res2.data.status === 1) {
              common_vendor.index.showToast({
                title: res2.data.message,
                icon: "success",
                duration: 1e3
              });
              that.$refs.popup.close();
              that.getBillCount(true);
            } else {
              common_vendor.index.showToast({
                title: res2.data.message,
                icon: "error",
                duration: 2e3
              });
            }
          },
          fail: (res2) => {
            common_vendor.index.showToast({
              title: res2.errMsg,
              icon: "fail",
              duration: 2e3
            });
          }
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err[0].errorMessage,
          icon: "fail",
          duration: 2e3
        });
      });
    },
    changeDate(e) {
      this.accountFormData.keepTime = e;
    },
    getPlanData() {
      var that = this;
      common_vendor.index.request({
        url: that.hostUrl + "/api/ika/v1/plan/getnotfinish",
        method: "GET",
        timeout: 3e3,
        header: {
          "Authorization": that.userInfo.token
        },
        success: (res) => {
          if (res.data.status === 1) {
            that.planIdRange = res.data.data;
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
    },
    changePlanId(e) {
      this.accountFormData.planId = e;
    },
    getBillCount(noUseCache) {
      var that = this;
      if (!common_js_mylogin.mylogin.checkLogin(false)) {
        return;
      }
      common_js_request.request.getMonthBillCount(noUseCache);
      const month_income_cache = common_vendor.index.getStorageSync("month_income_cache");
      const month_paymoney_cache = common_vendor.index.getStorageSync("month_paymoney_cache");
      that.incomecount = month_income_cache;
      that.paycount = month_paymoney_cache;
    }
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_notice_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.noticetext
  }, $data.noticetext ? {
    b: common_vendor.p({
      scrollable: true,
      single: true,
      text: $data.noticetext
    })
  } : {}, {
    c: $data.indicatorDots,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.t($data.incomecount),
    h: common_vendor.t($data.paycount),
    i: common_vendor.o((...args) => $options.selectCount && $options.selectCount(...args)),
    j: common_vendor.o((...args) => $options.addBill && $options.addBill(...args)),
    k: common_vendor.o(($event) => $data.accountFormData.money = $event),
    l: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $data.accountFormData.money
    }),
    m: common_vendor.p({
      label: "\u91D1\u989D",
      required: true,
      name: "money"
    }),
    n: common_vendor.o(($event) => $data.accountFormData.reType = $event),
    o: common_vendor.p({
      mode: "button",
      localdata: $data.reTypes,
      modelValue: $data.accountFormData.reType
    }),
    p: common_vendor.p({
      label: "\u6536\u652F",
      required: true
    }),
    q: common_vendor.o($options.changeDate),
    r: common_vendor.o(($event) => $data.accountFormData.keepTime = $event),
    s: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      modelValue: $data.accountFormData.keepTime
    }),
    t: common_vendor.p({
      label: "\u65E5\u671F",
      required: true,
      name: "keepTime"
    }),
    v: common_vendor.o(($event) => $data.accountFormData.purpose = $event),
    w: common_vendor.p({
      localdata: $data.purposeRange,
      modelValue: $data.accountFormData.purpose
    }),
    x: common_vendor.p({
      label: "\u8D26\u5355\u5206\u7C7B",
      required: true,
      name: "purpose"
    }),
    y: common_vendor.o(($event) => $data.accountFormData.payType = $event),
    z: common_vendor.p({
      localdata: $data.payTypeRange,
      modelValue: $data.accountFormData.payType
    }),
    A: common_vendor.p({
      label: "\u652F\u4ED8\u65B9\u5F0F",
      required: true,
      name: "payType"
    }),
    B: common_vendor.o($options.getPlanData),
    C: common_vendor.o($options.changePlanId),
    D: common_vendor.o(($event) => $data.accountFormData.planId = $event),
    E: common_vendor.p({
      localdata: $data.planIdRange,
      modelValue: $data.accountFormData.planId
    }),
    F: common_vendor.p({
      label: "\u8BA1\u5212",
      name: "planId"
    }),
    G: common_vendor.o(($event) => $data.accountFormData.remark = $event),
    H: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8",
      modelValue: $data.accountFormData.remark
    }),
    I: common_vendor.p({
      label: "\u5907\u6CE8",
      required: true,
      name: "remark"
    }),
    J: common_vendor.sr("valiForm", "30ee232c-2,30ee232c-1"),
    K: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.accountFormData
    }),
    L: common_vendor.o(($event) => $options.submitAccount("valiForm")),
    M: common_vendor.sr("popup", "30ee232c-1"),
    N: common_vendor.p({
      type: "left",
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
