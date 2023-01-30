"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_tools = require("../../common/js/tools.js");
const fuiEmpty = () => "../../components/firstui/fui-empty/fui-empty.js";
const _sfc_main = {
  components: {
    fuiEmpty
  },
  data() {
    return {
      userInfo: common_vendor.index.getStorageSync("user_info"),
      hostUrl: "http://106.13.10.198:8040",
      isDataEmpty: true,
      swiperightoptions: [{
        text: "\u4FEE\u6539",
        style: {
          backgroundColor: "#007aff"
        }
      }, {
        text: "\u5220\u9664",
        style: {
          backgroundColor: "#dd524d"
        }
      }],
      plandaterange: [Date.now(), Date.now() + 5e8],
      queryBill: {
        pageIndex: 1,
        pageSize: 10,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        reType: 2,
        startTime: common_js_tools.tools.formatDate01(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        endTime: common_js_tools.tools.formatDate(new Date()),
        remark: ""
      },
      reTypes: [
        {
          text: "\u5168\u90E8",
          value: 2
        },
        {
          text: "\u6536\u5165",
          value: 0
        },
        {
          text: "\u652F\u51FA",
          value: 1
        }
      ],
      billDatas: []
    };
  },
  onLoad() {
    this.showData();
  },
  methods: {
    swipeBindClick(e, item) {
      console.log("\u70B9\u51FB\u4E86" + (e.position === "left" ? "\u5DE6\u4FA7" : "\u53F3\u4FA7") + e.content.text + "\u6309\u94AE");
      console.log(item.remark);
    },
    showData() {
      this.barRightClick();
      console.log(this.billDatas.length);
      if (this.billDatas.length > 0) {
        this.isDataEmpty = false;
      }
    },
    barLeftClick() {
      var that = this;
      that.$refs.popup.open();
    },
    changeDate(e) {
      this.queryBill.startTime = e[0];
      this.queryBill.endTime = e[1];
      this.queryBill.year = new Date(e[0]).getFullYear();
      this.queryBill.month = new Date(e[0]).getMonth() + 1;
    },
    barRightClick() {
      var that = this;
      that.queryBill.pageIndex = 1;
      console.log(that.queryBill);
      common_vendor.index.request({
        url: that.hostUrl + "/api/ika/v1/accountrecord/findbypage",
        method: "POST",
        timeout: 3e3,
        header: {
          "Authorization": that.userInfo.token
        },
        data: that.queryBill,
        success: (res) => {
          if (res.data.status === 1) {
            that.billDatas = [], that.isDataEmpty = false;
            that.billDatas = res.data.data.accounts;
            that.$refs.popup.close();
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_fui_empty = common_vendor.resolveComponent("fui-empty");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_nav_bar2 + _component_fui_empty + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_nav_bar + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_data_checkbox + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    b: $data.queryBill.remark,
    c: common_vendor.o(($event) => $data.queryBill.remark = $event.detail.value),
    d: common_vendor.o($options.barLeftClick),
    e: common_vendor.o($options.barRightClick),
    f: common_vendor.p({
      leftText: "\u6309\u6761\u4EF6",
      leftIcon: "arrowdown",
      rightText: "\u641C\u7D22",
      rightIcon: "search"
    }),
    g: $data.isDataEmpty
  }, $data.isDataEmpty ? {
    h: common_vendor.p({
      src: "../../static/images/image/img_data_3x.png",
      title: "\u6682\u65E0\u6570\u636E",
      descr: "\u8BF7\u5728\u9996\u9875\u5148\u6DFB\u52A0\u8D26\u5355\uFF01"
    })
  } : {
    i: common_vendor.f($data.billDatas, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.remark),
        b: common_vendor.t(item.purpose_Desc),
        c: common_vendor.t(item.keepTime.substring(0, 10)),
        d: common_vendor.t(item.reType === 1 ? "-" : ""),
        e: common_vendor.t(item.money),
        f: common_vendor.n(item.reType === 0 ? "billprice" : "billprice1"),
        g: item.id,
        h: common_vendor.o(($event) => $options.swipeBindClick($event, item), item.id),
        i: "9f18af38-4-" + i0 + "," + ("9f18af38-3-" + i0),
        j: "9f18af38-3-" + i0
      };
    }),
    j: common_vendor.p({
      ["right-options"]: $data.swiperightoptions,
      show: "none",
      ["auto-close"]: true
    })
  }, {
    k: common_vendor.o(($event) => $data.queryBill.reType = $event),
    l: common_vendor.p({
      mode: "button",
      localdata: $data.reTypes,
      modelValue: $data.queryBill.reType
    }),
    m: common_vendor.p({
      label: "\u6536\u652F"
    }),
    n: common_vendor.o($options.changeDate),
    o: common_vendor.o(($event) => $data.plandaterange = $event),
    p: common_vendor.p({
      type: "daterange",
      modelValue: $data.plandaterange
    }),
    q: common_vendor.p({
      label: "\u65E5\u671F",
      name: "dateform"
    }),
    r: common_vendor.p({
      modelValue: $data.queryBill,
      name: "queryBill"
    }),
    s: common_vendor.o((...args) => $options.barRightClick && $options.barRightClick(...args)),
    t: common_vendor.sr("popup", "9f18af38-5"),
    v: common_vendor.p({
      type: "center",
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/bill/bill.vue"]]);
wx.createPage(MiniProgramPage);
