"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_js_tools = require("../../../common/js/tools.js");
const fuiEmpty = () => "../../../components/firstui/fui-empty/fui-empty.js";
const _sfc_main = {
  components: {
    fuiEmpty
  },
  data() {
    return {
      userInfo: common_vendor.index.getStorageSync("user_info"),
      hostUrl: "http://106.13.10.198:8040",
      isDataEmpty: true,
      monthincomecount: 0,
      monthpaycount: 0,
      dayincomecount: 0,
      daypaycount: 0,
      billDatas: [],
      queryBill: {
        pageIndex: 1,
        pageSize: 10,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        reType: 2,
        startTime: common_js_tools.tools.formatDate(new Date()),
        endTime: common_js_tools.tools.formatDate(new Date()),
        remark: ""
      }
    };
  },
  onLoad() {
    var that = this;
    that.monthCount("", true);
    that.dayBillCount(new Date());
  },
  methods: {
    changeDate(e) {
      var that = this;
      that.dayBillCount(e.fulldate);
      that.queryBill.startTime = e.fulldate;
      that.queryBill.endTime = e.fulldate;
      that.getBiillData();
    },
    monthCount(month, isNow) {
      var that = this;
      if (isNow) {
        const month_income_cache = common_vendor.index.getStorageSync("month_income_cache");
        const month_paymoney_cache = common_vendor.index.getStorageSync("month_paymoney_cache");
        that.monthincomecount = month_income_cache;
        that.monthpaycount = month_paymoney_cache;
      } else {
        common_vendor.index.request({
          url: that.hostUrl + "/api/ika/v1/accountrecord/statistics",
          method: "POST",
          timeout: 3e3,
          header: {
            "Authorization": that.userInfo.token
          },
          data: {
            keepTime: month,
            timeQueryType: 1
          },
          success: (res) => {
            if (res.data.status === 1) {
              that.monthincomecount = res.data.data.statisticsItem[0].incomeMoney;
              that.monthpaycount = res.data.data.statisticsItem[0].payMoney;
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
    },
    changeMonth(e) {
      var month = [e.year, e.month, 1].map(common_js_tools.tools.formatNumber).join("-");
      console.log(month);
      this.monthCount(month, false);
    },
    dayBillCount(day) {
      var that = this;
      console.log(day);
      common_vendor.index.request({
        url: that.hostUrl + "/api/ika/v1/accountrecord/statistics",
        method: "POST",
        timeout: 3e3,
        header: {
          "Authorization": that.userInfo.token
        },
        data: {
          keepTime: day,
          timeQueryType: 0
        },
        success: (res) => {
          if (res.data.status === 1) {
            that.dayincomecount = res.data.data.statisticsItem[0].incomeMoney;
            that.daypaycount = res.data.data.statisticsItem[0].payMoney;
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
    getBiillData() {
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
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _component_fui_empty = common_vendor.resolveComponent("fui-empty");
  (_easycom_uni_calendar2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _component_fui_empty)();
}
const _easycom_uni_calendar = () => "../../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.changeDate),
    b: common_vendor.o($options.changeMonth),
    c: common_vendor.p({
      insert: true,
      lunar: true,
      ["start-date"]: "1980-1-1",
      ["end-date"]: "2050-5-20"
    }),
    d: common_vendor.t($data.monthincomecount),
    e: common_vendor.p({
      index: 1
    }),
    f: common_vendor.t($data.monthpaycount),
    g: common_vendor.p({
      index: 2
    }),
    h: common_vendor.t($data.dayincomecount),
    i: common_vendor.t($data.daypaycount),
    j: common_vendor.p({
      column: 4,
      ["show-border"]: false,
      highlight: true,
      square: false
    }),
    k: $data.isDataEmpty
  }, $data.isDataEmpty ? {
    l: common_vendor.p({
      src: "../../../static/images/image/img_data_3x.png",
      title: "\u6682\u65E0\u6570\u636E",
      descr: "\u8BF7\u5728\u9996\u9875\u5148\u6DFB\u52A0\u8D26\u5355\uFF01"
    })
  } : {
    m: common_vendor.f($data.billDatas, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.remark),
        b: common_vendor.t(item.purpose_Desc),
        c: common_vendor.t(item.keepTime.substring(0, 10)),
        d: common_vendor.t(item.reType === 1 ? "-" : ""),
        e: common_vendor.t(item.money),
        f: common_vendor.n(item.reType === 0 ? "billprice" : "billprice1")
      };
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/index/monthbill/monthbill.vue"]]);
wx.createPage(MiniProgramPage);
