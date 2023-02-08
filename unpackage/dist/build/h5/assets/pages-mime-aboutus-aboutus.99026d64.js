import{o as e,a as t,w as s,A as i,f as a,t as l,b as n,g as o,c,r as d,d as h,n as r,e as u,u as p,i as m,k as f,q as g,F as _}from"./index.4e9e22c6.js";import{_ as y,r as v}from"./uni-app.es.4dca259d.js";import{_ as C}from"./uni-icons.f3e1d0b6.js";import{_ as b}from"./uni-section.bc31a967.js";var w=y({name:"uni-tooltip",data:()=>({}),props:{content:{type:String,default:""},placement:{type:String,default:"bottom"}}},[["render",function(c,d,h,r,u,p){const m=o;return e(),t(m,{class:"uni-tooltip"},{default:s((()=>[i(c.$slots,"default",{},void 0,!0),h.content||c.$slots.content?(e(),t(m,{key:0,class:"uni-tooltip-popup"},{default:s((()=>[i(c.$slots,"content",{},(()=>[a(l(h.content),1)]),!0)])),_:3})):n("",!0)])),_:3})}],["__scopeId","data-v-47a5ab23"]]);var S=y({name:"uniCollapseItem",props:{title:{type:String,default:""},name:{type:[Number,String],default:""},disabled:{type:Boolean,default:!1},showAnimation:{type:Boolean,default:!0},open:{type:Boolean,default:!1},thumb:{type:String,default:""},titleBorder:{type:String,default:"auto"},border:{type:Boolean,default:!0},showArrow:{type:Boolean,default:!0}},data:()=>({isOpen:!1,isheight:null,height:0,elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,nameSync:0}),watch:{open(e){this.isOpen=e,this.onClick(e,"init")}},updated(e){this.$nextTick((()=>{this.init(!0)}))},created(){this.collapse=this.getCollapse(),this.oldHeight=0,this.onClick(this.open,"init")},unmounted(){this.__isUnmounted=!0,this.uninstall()},mounted(){this.collapse&&(""!==this.name?this.nameSync=this.name:this.nameSync=this.collapse.childrens.length+"",-1===this.collapse.names.indexOf(this.nameSync)?this.collapse.names.push(this.nameSync):console.warn(`name 值 ${this.nameSync} 重复`),-1===this.collapse.childrens.indexOf(this)&&this.collapse.childrens.push(this),this.init())},methods:{init(e){this.getCollapseHeight(e)},uninstall(){this.collapse&&(this.collapse.childrens.forEach(((e,t)=>{e===this&&this.collapse.childrens.splice(t,1)})),this.collapse.names.forEach(((e,t)=>{e===this.nameSync&&this.collapse.names.splice(t,1)})))},onClick(e,t){this.disabled||(this.isOpen=e,this.isOpen&&this.collapse&&this.collapse.setAccordion(this),"init"!==t&&this.collapse.onChange(e,this))},getCollapseHeight(e,t=0){c().in(this).select(`#${this.elId}`).fields({size:!0},(s=>{if(!(t>=10)){if(!s)return t++,void this.getCollapseHeight(!1,t);this.height=s.height,this.isheight=!0,e||this.onClick(this.isOpen,"init")}})).exec()},getNvueHwight(e){dom.getComponentRect(this.$refs["collapse--hook"],(t=>{if(t&&t.result&&t.size){if(this.height=t.size.height,this.isheight=!0,e)return;this.onClick(this.open,"init")}}))},getCollapse(e="uniCollapse"){let t=this.$parent,s=t.$options.name;for(;s!==e;){if(t=t.$parent,!t)return!1;s=t.$options.name}return t}}},[["render",function(c,f,g,_,y,b){const w=p,S=m,O=o,$=v(d("uni-icons"),C);return e(),t(O,{class:"uni-collapse-item"},{default:s((()=>[h(O,{onClick:f[0]||(f[0]=e=>b.onClick(!y.isOpen)),class:r(["uni-collapse-item__title",{"is-open":y.isOpen&&"auto"===g.titleBorder,"uni-collapse-item-border":"none"!==g.titleBorder}])},{default:s((()=>[h(O,{class:"uni-collapse-item__title-wrap"},{default:s((()=>[i(c.$slots,"title",{},(()=>[h(O,{class:r(["uni-collapse-item__title-box",{"is-disabled":g.disabled}])},{default:s((()=>[g.thumb?(e(),t(w,{key:0,src:g.thumb,class:"uni-collapse-item__title-img"},null,8,["src"])):n("",!0),h(S,{class:"uni-collapse-item__title-text"},{default:s((()=>[a(l(g.title),1)])),_:1})])),_:1},8,["class"])]),!0)])),_:3}),g.showArrow?(e(),t(O,{key:0,class:r([{"uni-collapse-item__title-arrow-active":y.isOpen,"uni-collapse-item--animation":!0===g.showAnimation},"uni-collapse-item__title-arrow"])},{default:s((()=>[h($,{color:g.disabled?"#ddd":"#bbb",size:"14",type:"bottom"},null,8,["color"])])),_:1},8,["class"])):n("",!0)])),_:3},8,["class"]),h(O,{class:r(["uni-collapse-item__wrap",{"is--transition":g.showAnimation}]),style:u({height:(y.isOpen?y.height:0)+"px"})},{default:s((()=>[h(O,{id:y.elId,ref:"collapse--hook",class:r(["uni-collapse-item__wrap-content",{open:y.isheight,"uni-collapse-item--border":g.border&&y.isOpen}])},{default:s((()=>[i(c.$slots,"default",{},void 0,!0)])),_:3},8,["id","class"])])),_:3},8,["class","style"])])),_:3})}],["__scopeId","data-v-36ca74ac"]]);var O=y({name:"uniCollapse",emits:["change","activeItem","input","update:modelValue"],props:{value:{type:[String,Array],default:""},modelValue:{type:[String,Array],default:""},accordion:{type:[Boolean,String],default:!1}},data:()=>({}),computed:{dataValue(){let e="string"==typeof this.value&&""===this.value||Array.isArray(this.value)&&0===this.value.length;"string"==typeof this.modelValue&&""===this.modelValue||Array.isArray(this.modelValue)&&this.modelValue.length;return e?this.modelValue:this.value}},watch:{dataValue(e){this.setOpen(e)}},created(){this.childrens=[],this.names=[]},mounted(){this.$nextTick((()=>{this.setOpen(this.dataValue)}))},methods:{setOpen(e){let t="string"==typeof e,s=Array.isArray(e);this.childrens.forEach(((i,a)=>{if(t&&e===i.nameSync){if(!this.accordion)return void console.warn("accordion 属性为 false ,v-model 类型应该为 array");i.isOpen=!0}s&&e.forEach((e=>{if(e===i.nameSync){if(this.accordion)return void console.warn("accordion 属性为 true ,v-model 类型应该为 string");i.isOpen=!0}}))})),this.emit(e)},setAccordion(e){this.accordion&&this.childrens.forEach(((t,s)=>{e!==t&&(t.isOpen=!1)}))},resize(){this.childrens.forEach(((e,t)=>{e.getCollapseHeight()}))},onChange(e,t){let s=[];this.accordion?s=e?t.nameSync:"":this.childrens.forEach(((e,t)=>{e.isOpen&&s.push(e.nameSync)})),this.$emit("change",s),this.emit(s)},emit(e){this.$emit("input",e),this.$emit("update:modelValue",e)}}},[["render",function(a,l,n,c,d,h){const r=o;return e(),t(r,{class:"uni-collapse"},{default:s((()=>[i(a.$slots,"default",{},void 0,!0)])),_:3})}],["__scopeId","data-v-4adfd6e6"]]);var $=y({data:()=>({nowversion:"",releasemsg:"",accordionVal:"0"}),onLoad(){this.nowversion="v1.0.1",this.releasemsg="2023-02-08\n由YPH最后修改发布。"},methods:{functionChange(e){console.log(e)},msgFind:function(){f({title:this.releasemsg,duration:5e3})}}},[["render",function(t,i,n,c,r,u){const f=p,y=v(d("uni-tooltip"),w),C=o,$=m,k=v(d("uni-collapse-item"),S),V=v(d("uni-collapse"),O),A=v(d("uni-section"),b);return e(),g(_,null,[h(C,null,{default:s((()=>[h(C,{class:"logo_head"},{default:s((()=>[h(C,{class:"logo_css"},{default:s((()=>[h(y,{content:"亲密记 BillManage"},{default:s((()=>[h(f,{src:"/assets/logo.1c9b85e9.jpg",class:"logo"})])),_:1}),h(C,{class:"shadow"})])),_:1})])),_:1}),h(C,{class:"logo_content",onClick:u.msgFind},{default:s((()=>[h(C,{class:"text2"},{default:s((()=>[a(l(r.nowversion),1)])),_:1}),h(C,{class:"shadow1"})])),_:1},8,["onClick"])])),_:1}),h(C,null,{default:s((()=>[h(A,{title:"功能介绍",type:"line"},{default:s((()=>[h(V,{accordion:"",modelValue:r.accordionVal,"onUpdate:modelValue":i[0]||(i[0]=e=>r.accordionVal=e),onChange:u.functionChange},{default:s((()=>[h(k,{title:"记账"},{default:s((()=>[h(C,{class:"content"},{default:s((()=>[h($,{class:"text"},{default:s((()=>[a("包含账单的增删改查，目前查询主要根据账单日期来并进行相关的统计。")])),_:1})])),_:1})])),_:1}),h(k,{title:"计划"},{default:s((()=>[h(C,{class:"content"},{default:s((()=>[h($,{class:"text"},{default:s((()=>[a("包含计划的增删改查，在计划详情页可查看计划进度，会定时获取实时更新。")])),_:1})])),_:1})])),_:1}),h(k,{title:"关系绑定"},{default:s((()=>[h(C,{class:"content"},{default:s((()=>[h($,{class:"text"},{default:s((()=>[a("用户绑定关系后，可以查看对应用户的账单统计和相关计划。")])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue","onChange"])])),_:1})])),_:1})],64)}],["__scopeId","data-v-6a6ed73c"]]);export{$ as default};
