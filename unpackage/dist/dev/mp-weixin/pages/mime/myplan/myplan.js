"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_js_mylogin = require("../../../common/js/mylogin.js");
const _sfc_main = {
  data() {
    return {
      userInfo: common_vendor.index.getStorageSync("user_info"),
      items: ["\u6708\u8BA1\u5212", "\u5468\u8BA1\u5212", "\u5E74\u8BA1\u5212"],
      current: 0,
      plans: [],
      pageIndex: 1,
      numTotal: 5,
      pageSize: 5,
      horizontal: "right",
      vertical: "bottom",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007aFF",
        iconColor: "#fff"
      },
      plandaterange: [Date.now(), Date.now() + 5e8],
      planTypes: [{
        text: "\u6708\u8BA1\u5212",
        value: 0
      }, {
        text: "\u5468\u8BA1\u5212",
        value: 1
      }, {
        text: "\u5E74\u8BA1\u5212",
        value: 2
      }],
      reTypes: [{
        text: "\u6536\u5165",
        value: 0
      }, {
        text: "\u652F\u51FA",
        value: 1
      }],
      parentIdRange: [],
      planFormData: {
        name: "",
        amountMoney: "",
        remark: "",
        planType: 0,
        reType: 0,
        startTime: "",
        endTime: "",
        parentId: ""
      },
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "\u8BA1\u5212\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        amountMoney: {
          rules: [{
            format: "number",
            errorMessage: "\u91D1\u989D\u53EA\u80FD\u8F93\u5165\u6570\u5B57"
          }]
        }
      }
    };
  },
  onLoad() {
    common_js_mylogin.mylogin.checkLogin(true);
    this.getPlanPage(1);
  },
  methods: {
    fabClick() {
      this.$refs.popup.open();
      this.planFormData.startTime = this.plandaterange[0];
      this.planFormData.endTime = this.plandaterange[1];
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        this.getPlanPage(1);
      }
    },
    changePage(e) {
      this.getPlanPage(e.current);
    },
    getPlanPage(pageIndex) {
      var that = this;
      that.plans = [];
      common_vendor.index.request({
        url: "http://106.13.10.198:8040/api/ika/v1/plan/findbypage",
        method: "POST",
        timeout: 3e3,
        header: {
          "Authorization": that.userInfo.token
        },
        data: {
          uId: that.userInfo.id,
          pageIndex,
          pageSize: 5,
          planType: that.current
        },
        success: (res) => {
          if (res.data.status === 1) {
            that.numTotal = res.data.data.totalNum;
            var planList = res.data.data.planList;
            for (var i = 0; i < planList.length; i++) {
              that.plans.push(planList[i]);
            }
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
    submitPlan(ref) {
      var that = this;
      that.$refs[ref].validate().then((res) => {
        common_vendor.index.request({
          url: "http://106.13.10.198:8040/api/ika/v1/plan/add",
          method: "POST",
          timeout: 3e3,
          header: {
            "Authorization": that.userInfo.token
          },
          data: that.planFormData,
          success: (res2) => {
            console.log(res2.data);
            if (res2.data.status === 1) {
              common_vendor.index.showToast({
                title: res2.data.message,
                icon: "success",
                duration: 1e3
              });
              that.$refs.popup.close();
              that.getPlanPage(1);
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
        console.log("err", err);
      });
    },
    selectPlanDate(e) {
      this.planFormData.startTime = e[0];
      this.planFormData.endTime = e[1];
    },
    getParentData() {
      var that = this;
      common_vendor.index.request({
        url: "http://106.13.10.198:8040/api/ika/v1/plan/getnotfinish",
        method: "GET",
        timeout: 3e3,
        header: {
          "Authorization": that.userInfo.token
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.status === 1) {
            that.parentIdRange = res.data.data;
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
    changeParentId(e) {
      this.planFormData.parentId = e;
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_segmented_control2 + _easycom_uni_tag2 + _easycom_uni_card2 + _easycom_uni_pagination2 + _easycom_uni_fab2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_tag + _easycom_uni_card + _easycom_uni_pagination + _easycom_uni_fab + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items
    }),
    c: $data.current === 0
  }, $data.current === 0 ? {
    d: common_vendor.f($data.plans, (item, k0, i0) => {
      return {
        a: "7d6189af-2-" + i0 + "," + ("7d6189af-1-" + i0),
        b: common_vendor.p({
          mark: true,
          text: item.amountMoney,
          type: item.reType === 0 ? "primary" : "error",
          size: "mini"
        }),
        c: common_vendor.t(item.remark),
        d: "7d6189af-1-" + i0,
        e: common_vendor.p({
          title: item.name,
          ["sub-title"]: item.code,
          extra: item.reType_Desc
        })
      };
    }),
    e: common_vendor.o($options.changePage),
    f: common_vendor.p({
      ["show-icon"]: true,
      title: "\u5206\u9875",
      total: $data.numTotal,
      current: $data.pageIndex,
      pageSize: $data.pageSize
    })
  } : {}, {
    g: $data.current === 1
  }, $data.current === 1 ? {
    h: common_vendor.f($data.plans, (item, k0, i0) => {
      return {
        a: "7d6189af-5-" + i0 + "," + ("7d6189af-4-" + i0),
        b: common_vendor.p({
          mark: true,
          text: item.amountMoney,
          type: item.reType === 0 ? "primary" : "error",
          size: "mini"
        }),
        c: common_vendor.t(item.remark),
        d: "7d6189af-4-" + i0,
        e: common_vendor.p({
          title: item.name,
          ["sub-title"]: item.code,
          extra: item.reType_Desc
        })
      };
    }),
    i: common_vendor.o($options.changePage),
    j: common_vendor.p({
      ["show-icon"]: true,
      title: "\u5206\u9875",
      total: $data.numTotal,
      current: $data.pageIndex,
      pageSize: $data.pageSize
    })
  } : {}, {
    k: $data.current === 2
  }, $data.current === 2 ? {
    l: common_vendor.f($data.plans, (item, k0, i0) => {
      return {
        a: "7d6189af-8-" + i0 + "," + ("7d6189af-7-" + i0),
        b: common_vendor.p({
          mark: true,
          text: item.amountMoney,
          type: item.reType === 0 ? "primary" : "error",
          size: "mini"
        }),
        c: common_vendor.t(item.remark),
        d: "7d6189af-7-" + i0,
        e: common_vendor.p({
          title: item.name,
          ["sub-title"]: item.code,
          extra: item.reType_Desc
        })
      };
    }),
    m: common_vendor.o($options.changePage),
    n: common_vendor.p({
      ["show-icon"]: true,
      title: "\u5206\u9875",
      total: $data.numTotal,
      current: $data.pageIndex,
      pageSize: $data.pageSize
    })
  } : {}, {
    o: common_vendor.sr("fab", "7d6189af-10"),
    p: common_vendor.o($options.fabClick),
    q: common_vendor.p({
      pattern: $data.pattern,
      horizontal: $data.horizontal,
      popMenu: "true",
      vertical: $data.vertical
    }),
    r: common_vendor.o(($event) => $data.planFormData.name = $event),
    s: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u8BA1\u5212\u540D",
      modelValue: $data.planFormData.name
    }),
    t: common_vendor.p({
      label: "\u8BA1\u5212\u540D",
      required: true,
      name: "name"
    }),
    v: common_vendor.o(($event) => $data.planFormData.reType = $event),
    w: common_vendor.p({
      mode: "button",
      localdata: $data.reTypes,
      modelValue: $data.planFormData.reType
    }),
    x: common_vendor.p({
      label: "\u6536\u652F",
      required: true
    }),
    y: common_vendor.o(($event) => $data.planFormData.planType = $event),
    z: common_vendor.p({
      mode: "button",
      localdata: $data.planTypes,
      modelValue: $data.planFormData.planType
    }),
    A: common_vendor.p({
      label: "\u8BA1\u5212\u7C7B\u578B",
      required: true
    }),
    B: common_vendor.o(($event) => $data.planFormData.amountMoney = $event),
    C: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $data.planFormData.amountMoney
    }),
    D: common_vendor.p({
      label: "\u91D1\u989D",
      required: true,
      name: "amountMoney"
    }),
    E: common_vendor.o($options.selectPlanDate),
    F: common_vendor.o(($event) => $data.plandaterange = $event),
    G: common_vendor.p({
      type: "daterange",
      modelValue: $data.plandaterange
    }),
    H: common_vendor.p({
      label: "\u65E5\u671F",
      required: true,
      name: "dateform"
    }),
    I: common_vendor.o($options.getParentData),
    J: common_vendor.o($options.changeParentId),
    K: common_vendor.o(($event) => $data.planFormData.parentId = $event),
    L: common_vendor.p({
      localdata: $data.parentIdRange,
      modelValue: $data.planFormData.parentId
    }),
    M: common_vendor.p({
      label: "\u7236\u7EA7",
      name: "parentId"
    }),
    N: common_vendor.o(($event) => $data.planFormData.remark = $event),
    O: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8",
      modelValue: $data.planFormData.remark
    }),
    P: common_vendor.p({
      label: "\u5907\u6CE8",
      name: "remark"
    }),
    Q: common_vendor.sr("valiForm", "7d6189af-12,7d6189af-11"),
    R: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.planFormData
    }),
    S: common_vendor.o(($event) => $options.submitPlan("valiForm")),
    T: common_vendor.sr("popup", "7d6189af-11"),
    U: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/MyProject/01Web/IntimateKAccounts/IKeepAccountWeb/pages/mime/myplan/myplan.vue"]]);
wx.createPage(MiniProgramPage);
