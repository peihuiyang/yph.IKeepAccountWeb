"use strict";var t=require("../../../../common/vendor.js");const e={name:"UniTag",emits:["click"],props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[Boolean,String],default:!1},inverted:{type:[Boolean,String],default:!1},circle:{type:[Boolean,String],default:!1},mark:{type:[Boolean,String],default:!1},customStyle:{type:String,default:""}},computed:{classes(){const{type:t,disabled:e,inverted:i,circle:n,mark:a,size:r,isTrue:l}=this;return["uni-tag--"+t,"uni-tag--"+r,l(e)?"uni-tag--disabled":"",l(i)?"uni-tag--"+t+"--inverted":"",l(n)?"uni-tag--circle":"",l(a)?"uni-tag--mark":"",l(i)?"uni-tag--inverted uni-tag-text--"+t:"","small"===r?"uni-tag-text--small":""].join(" ")}},methods:{isTrue:t=>!0===t||"true"===t,onClick(){this.isTrue(this.disabled)||this.$emit("click")}}};var i=t._export_sfc(e,[["render",function(e,i,n,a,r,l){return t.e({a:n.text},n.text?{b:t.t(n.text),c:t.n(l.classes),d:t.s(n.customStyle),e:t.o(((...t)=>l.onClick&&l.onClick(...t)))}:{})}]]);qa.createComponent(i);
