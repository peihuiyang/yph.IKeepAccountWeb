"use strict";
var tools = {
  formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return [year, month, day].map(this.formatNumber).join("-");
  },
  formatDate01(year, month, day) {
    return [year, month, day].map(this.formatNumber).join("-");
  },
  formatTime(date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [hour, minute, second].map(this.formatNumber1).join(":");
  },
  formatMonth(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return [year, month].map(this.formatNumber).join("-");
  },
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },
  formatNumber1(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },
  nowDate(date) {
    let day = date.getDate();
    return day;
  },
  numberFormat(value) {
    var v = parseFloat(value);
    return v.toFixed(2);
  },
  isNum(value) {
    var regPos = /^\d+(\.\d+)?$/;
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    if (regPos.test(value) || regNeg.test(value)) {
      return true;
    } else {
      return false;
    }
  }
};
exports.tools = tools;
