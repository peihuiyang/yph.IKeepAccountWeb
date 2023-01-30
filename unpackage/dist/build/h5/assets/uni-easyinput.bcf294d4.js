import{_ as e}from"./uni-icons.67cc16ba.js";import{r as t,o as s,a as o,w as i,d as l,y as a,b as r,n,e as c,m as u,F as h,z as d,I as p,g as f}from"./index.eda1eb19.js";import{_ as m,r as y}from"./uni-app.es.a5116263.js";function g(e){let t="";for(let s in e){t+=`${s}:${e[s]};`}return t}var x=m({name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm","clear","eyes","change"],model:{prop:"modelValue",event:"update:modelValue"},options:{virtualHost:!0},inject:{form:{from:"uniForm",default:null},formItem:{from:"uniFormItem",default:null}},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:{type:String,default:" "},placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:24},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},primaryColor:{type:String,default:"#2979ff"},styles:{type:Object,default:()=>({color:"#333",disableColor:"#F7F6F6",borderColor:"#e5e5e5"})},errorMessage:{type:[String,Boolean],default:""}},data:()=>({focused:!1,val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1,focusShow:!1,localMsg:""}),computed:{isVal(){const e=this.val;return!(!e&&0!==e)},msg(){return this.localMsg||this.errorMessage},inputMaxlength(){return Number(this.maxlength)},boxStyle(){return`color:${this.inputBorder&&this.msg?"#e43d33":this.styles.color};`},inputContentClass(){return function(e){let t="";for(let s in e)e[s]&&(t+=`${s} `);return t}({"is-input-border":this.inputBorder,"is-input-error-border":this.inputBorder&&this.msg,"is-textarea":"textarea"===this.type,"is-disabled":this.disabled})},inputContentStyle(){const e=this.focusShow?this.primaryColor:this.styles.borderColor;return g({"border-color":(this.inputBorder&&this.msg?"#dd524d":e)||"#e5e5e5","background-color":this.disabled?this.styles.disableColor:this.styles.backgroundColor})},inputStyle(){return g({"padding-right":"password"===this.type||this.clearable||this.prefixIcon?"":"10px","padding-left":this.prefixIcon?"":"10px"})}},watch:{value(e){this.val=e},modelValue(e){this.val=e},focus(e){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))}},created(){this.init(),this.form&&this.formItem&&this.$watch("formItem.errMsg",(e=>{this.localMsg=e}))},mounted(){this.$nextTick((()=>{this.focused=this.focus,this.focusShow=this.focus}))},methods:{init(){this.value||0===this.value?this.val=this.value:this.modelValue||0===this.modelValue?this.val=this.modelValue:this.val=null},onClickIcon(e){this.$emit("iconClick",e)},onEyes(){this.showPassword=!this.showPassword,this.$emit("eyes",this.showPassword)},onInput(e){let t=e.detail.value;this.trim&&("boolean"==typeof this.trim&&this.trim&&(t=this.trimStr(t)),"string"==typeof this.trim&&(t=this.trimStr(t,this.trim))),this.errMsg&&(this.errMsg=""),this.val=t,this.$emit("input",t),this.$emit("update:modelValue",t)},onFocus(){this.$nextTick((()=>{this.focused=!0})),this.$emit("focus",null)},_Focus(e){this.focusShow=!0,this.$emit("focus",e)},onBlur(){this.focused=!1,this.$emit("focus",null)},_Blur(e){if(e.detail.value,this.focusShow=!1,this.$emit("blur",e),this.$emit("change",this.val),this.form&&this.formItem){const{validateTrigger:e}=this.form;"blur"===e&&this.formItem.onFieldChange()}},onConfirm(e){this.$emit("confirm",this.val),this.$emit("change",this.val)},onClear(e){this.val="",this.$emit("input",""),this.$emit("update:modelValue",""),this.$emit("clear")},trimStr:(e,t="both")=>"both"===t?e.trim():"left"===t?e.trimLeft():"right"===t?e.trimRight():"start"===t?e.trimStart():"end"===t?e.trimEnd():"all"===t?e.replace(/\s+/g,""):e}},[["render",function(m,g,x,b,S,C){const w=y(t("uni-icons"),e),I=d,v=p,k=f;return s(),o(k,{class:n(["uni-easyinput",{"uni-easyinput-error":C.msg}]),style:c(C.boxStyle)},{default:i((()=>[l(k,{class:n(["uni-easyinput__content",C.inputContentClass]),style:c(C.inputContentStyle)},{default:i((()=>[a(m.$slots,"prefixIcon",{},(()=>[x.prefixIcon?(s(),o(w,{key:0,class:"content-clear-icon",type:x.prefixIcon,color:"#c0c4cc",onClick:g[0]||(g[0]=e=>C.onClickIcon("prefix")),size:"22"},null,8,["type"])):r("",!0)]),!0),"textarea"===x.type?(s(),o(I,{key:0,class:n(["uni-easyinput__content-textarea",{"input-padding":x.inputBorder}]),name:x.name,value:S.val,placeholder:x.placeholder,placeholderStyle:x.placeholderStyle,disabled:x.disabled,"placeholder-class":"uni-easyinput__placeholder-class",maxlength:C.inputMaxlength,focus:S.focused,autoHeight:x.autoHeight,onInput:C.onInput,onBlur:C._Blur,onFocus:C._Focus,onConfirm:C.onConfirm},null,8,["class","name","value","placeholder","placeholderStyle","disabled","maxlength","focus","autoHeight","onInput","onBlur","onFocus","onConfirm"])):(s(),o(v,{key:1,type:"password"===x.type?"text":x.type,class:"uni-easyinput__content-input",style:c(C.inputStyle),name:x.name,value:S.val,password:!S.showPassword&&"password"===x.type,placeholder:x.placeholder,placeholderStyle:x.placeholderStyle,"placeholder-class":"uni-easyinput__placeholder-class",disabled:x.disabled,maxlength:C.inputMaxlength,focus:S.focused,confirmType:x.confirmType,onFocus:C._Focus,onBlur:C._Blur,onInput:C.onInput,onConfirm:C.onConfirm},null,8,["type","style","name","value","password","placeholder","placeholderStyle","disabled","maxlength","focus","confirmType","onFocus","onBlur","onInput","onConfirm"])),"password"===x.type&&x.passwordIcon?(s(),u(h,{key:2},[C.isVal?(s(),o(w,{key:0,class:n(["content-clear-icon",{"is-textarea-icon":"textarea"===x.type}]),type:S.showPassword?"eye-slash-filled":"eye-filled",size:22,color:S.focusShow?x.primaryColor:"#c0c4cc",onClick:C.onEyes},null,8,["class","type","color","onClick"])):r("",!0)],64)):x.suffixIcon||m.$slots.suffixIcon?a(m.$slots,"suffixIcon",{key:3},(()=>[x.suffixIcon?(s(),o(w,{key:0,class:"content-clear-icon",type:x.suffixIcon,color:"#c0c4cc",onClick:g[1]||(g[1]=e=>C.onClickIcon("suffix")),size:"22"},null,8,["type"])):r("",!0)]),!0):(s(),u(h,{key:4},[x.clearable&&C.isVal&&!x.disabled&&"textarea"!==x.type?(s(),o(w,{key:0,class:n(["content-clear-icon",{"is-textarea-icon":"textarea"===x.type}]),type:"clear",size:x.clearSize,color:C.msg?"#dd524d":S.focusShow?x.primaryColor:"#c0c4cc",onClick:C.onClear},null,8,["class","size","color","onClick"])):r("",!0)],64)),a(m.$slots,"right",{},void 0,!0)])),_:3},8,["class","style"])])),_:3},8,["class","style"])}],["__scopeId","data-v-692f3c4f"]]);export{x as _};
