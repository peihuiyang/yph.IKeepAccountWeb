"use strict";var e=require("../vendor.js"),n={checkLogin(n){const r=e.index.getStorageSync("user_info");return null!==r&&""!==r||(n&&e.index.navigateTo({url:"/pages/userlogin/userlogin"}),!1)}};exports.mylogin=n;
