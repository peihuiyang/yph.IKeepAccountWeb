"use strict";var t=require("../../../../common/vendor.js"),e=require("./i18n/index.js");const{t:i}=t.initVueI18n(e.messages),s={name:"UniDatetimePicker",components:{},data:()=>({indicatorStyle:"height: 50px;",visible:!1,fixNvueBug:{},dateShow:!0,timeShow:!0,title:"日期和时间",time:"",year:1920,month:0,day:0,hour:0,minute:0,second:0,startYear:1920,startMonth:1,startDay:1,startHour:0,startMinute:0,startSecond:0,endYear:2120,endMonth:12,endDay:31,endHour:23,endMinute:59,endSecond:59}),props:{type:{type:String,default:"datetime"},value:{type:[String,Number],default:""},modelValue:{type:[String,Number],default:""},start:{type:[Number,String],default:""},end:{type:[Number,String],default:""},returnType:{type:String,default:"string"},disabled:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0},hideSecond:{type:[Boolean,String],default:!1}},watch:{modelValue:{handler(t,e){t?(this.parseValue(this.fixIosDateFormat(t)),this.initTime(!1)):(this.time="",this.parseValue(Date.now()))},immediate:!0},type:{handler(t){"date"===t?(this.dateShow=!0,this.timeShow=!1,this.title="日期"):"time"===t?(this.dateShow=!1,this.timeShow=!0,this.title="时间"):(this.dateShow=!0,this.timeShow=!0,this.title="日期和时间")},immediate:!0},start:{handler(t){this.parseDatetimeRange(this.fixIosDateFormat(t),"start")},immediate:!0},end:{handler(t){this.parseDatetimeRange(this.fixIosDateFormat(t),"end")},immediate:!0},months(t){this.checkValue("month",this.month,t)},days(t){this.checkValue("day",this.day,t)},hours(t){this.checkValue("hour",this.hour,t)},minutes(t){this.checkValue("minute",this.minute,t)},seconds(t){this.checkValue("second",this.second,t)}},computed:{years(){return this.getCurrentRange("year")},months(){return this.getCurrentRange("month")},days(){return this.getCurrentRange("day")},hours(){return this.getCurrentRange("hour")},minutes(){return this.getCurrentRange("minute")},seconds(){return this.getCurrentRange("second")},ymd(){return[this.year-this.minYear,this.month-this.minMonth,this.day-this.minDay]},hms(){return[this.hour-this.minHour,this.minute-this.minMinute,this.second-this.minSecond]},currentDateIsStart(){return this.year===this.startYear&&this.month===this.startMonth&&this.day===this.startDay},currentDateIsEnd(){return this.year===this.endYear&&this.month===this.endMonth&&this.day===this.endDay},minYear(){return this.startYear},maxYear(){return this.endYear},minMonth(){return this.year===this.startYear?this.startMonth:1},maxMonth(){return this.year===this.endYear?this.endMonth:12},minDay(){return this.year===this.startYear&&this.month===this.startMonth?this.startDay:1},maxDay(){return this.year===this.endYear&&this.month===this.endMonth?this.endDay:this.daysInMonth(this.year,this.month)},minHour(){return"datetime"===this.type?this.currentDateIsStart?this.startHour:0:"time"===this.type?this.startHour:void 0},maxHour(){return"datetime"===this.type?this.currentDateIsEnd?this.endHour:23:"time"===this.type?this.endHour:void 0},minMinute(){return"datetime"===this.type?this.currentDateIsStart&&this.hour===this.startHour?this.startMinute:0:"time"===this.type?this.hour===this.startHour?this.startMinute:0:void 0},maxMinute(){return"datetime"===this.type?this.currentDateIsEnd&&this.hour===this.endHour?this.endMinute:59:"time"===this.type?this.hour===this.endHour?this.endMinute:59:void 0},minSecond(){return"datetime"===this.type?this.currentDateIsStart&&this.hour===this.startHour&&this.minute===this.startMinute?this.startSecond:0:"time"===this.type?this.hour===this.startHour&&this.minute===this.startMinute?this.startSecond:0:void 0},maxSecond(){return"datetime"===this.type?this.currentDateIsEnd&&this.hour===this.endHour&&this.minute===this.endMinute?this.endSecond:59:"time"===this.type?this.hour===this.endHour&&this.minute===this.endMinute?this.endSecond:59:void 0},selectTimeText:()=>i("uni-datetime-picker.selectTime"),okText:()=>i("uni-datetime-picker.ok"),clearText:()=>i("uni-datetime-picker.clear"),cancelText:()=>i("uni-datetime-picker.cancel")},mounted(){},methods:{lessThanTen:t=>t<10?"0"+t:t,parseTimeType(t){if(t){let e=t.split(":");this.hour=Number(e[0]),this.minute=Number(e[1]),this.second=Number(e[2])}},initPickerValue(t){let e=null;t?e=this.compareValueWithStartAndEnd(t,this.start,this.end):(e=Date.now(),e=this.compareValueWithStartAndEnd(e,this.start,this.end)),this.parseValue(e)},compareValueWithStartAndEnd(t,e,i){let s=null;return t=this.superTimeStamp(t),e=this.superTimeStamp(e),i=this.superTimeStamp(i),s=e&&i?t<e?new Date(e):t>i?new Date(i):new Date(t):e&&!i?e<=t?new Date(t):new Date(e):!e&&i?t<=i?new Date(t):new Date(i):new Date(t),s},superTimeStamp(t){let e="";if("time"===this.type&&t&&"string"==typeof t){const t=new Date;e=t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()+" "}return Number(t)&&NaN!==typeof t&&(t=parseInt(t),e=0),this.createTimeStamp(e+t)},parseValue(t){if(t){if("time"===this.type&&"string"==typeof t)this.parseTimeType(t);else{let e=null;e=new Date(t),"time"!==this.type&&(this.year=e.getFullYear(),this.month=e.getMonth()+1,this.day=e.getDate()),"date"!==this.type&&(this.hour=e.getHours(),this.minute=e.getMinutes(),this.second=e.getSeconds())}this.hideSecond&&(this.second=0)}},parseDatetimeRange(t,e){if(!t)return"start"===e&&(this.startYear=1920,this.startMonth=1,this.startDay=1,this.startHour=0,this.startMinute=0,this.startSecond=0),void("end"===e&&(this.endYear=2120,this.endMonth=12,this.endDay=31,this.endHour=23,this.endMinute=59,this.endSecond=59));if("time"===this.type){const i=t.split(":");this[e+"Hour"]=Number(i[0]),this[e+"Minute"]=Number(i[1]),this[e+"Second"]=Number(i[2])}else{if(!t)return void("start"===e?this.startYear=this.year-60:this.endYear=this.year+60);Number(t)&&NaN!==Number(t)&&(t=parseInt(t));const i=/[0-9]:[0-9]/;"datetime"!==this.type||"end"!==e||"string"!=typeof t||i.test(t)||(t+=" 23:59:59");const s=new Date(t);this[e+"Year"]=s.getFullYear(),this[e+"Month"]=s.getMonth()+1,this[e+"Day"]=s.getDate(),"datetime"===this.type&&(this[e+"Hour"]=s.getHours(),this[e+"Minute"]=s.getMinutes(),this[e+"Second"]=s.getSeconds())}},getCurrentRange(t){const e=[];for(let i=this["min"+this.capitalize(t)];i<=this["max"+this.capitalize(t)];i++)e.push(i);return e},capitalize:t=>t.charAt(0).toUpperCase()+t.slice(1),checkValue(t,e,i){-1===i.indexOf(e)&&(this[t]=i[0])},daysInMonth:(t,e)=>new Date(t,e,0).getDate(),fixIosDateFormat:t=>("string"==typeof t&&(t=t.replace(/-/g,"/")),t),createTimeStamp(t){if(t)return"number"==typeof t?t:(t=t.replace(/-/g,"/"),"date"===this.type&&(t+=" 00:00:00"),Date.parse(t))},createDomSting(){const t=this.year+"-"+this.lessThanTen(this.month)+"-"+this.lessThanTen(this.day);let e=this.lessThanTen(this.hour)+":"+this.lessThanTen(this.minute);return this.hideSecond||(e=e+":"+this.lessThanTen(this.second)),"date"===this.type?t:"time"===this.type?e:t+" "+e},initTime(t=!0){this.time=this.createDomSting(),t&&("timestamp"===this.returnType&&"time"!==this.type?(this.$emit("change",this.createTimeStamp(this.time)),this.$emit("input",this.createTimeStamp(this.time)),this.$emit("update:modelValue",this.createTimeStamp(this.time))):(this.$emit("change",this.time),this.$emit("input",this.time),this.$emit("update:modelValue",this.time)))},bindDateChange(t){const e=t.detail.value;this.year=this.years[e[0]],this.month=this.months[e[1]],this.day=this.days[e[2]]},bindTimeChange(t){const e=t.detail.value;this.hour=this.hours[e[0]],this.minute=this.minutes[e[1]],this.second=this.seconds[e[2]]},initTimePicker(){if(this.disabled)return;const t=this.fixIosDateFormat(this.value);this.initPickerValue(t),this.visible=!this.visible},tiggerTimePicker(t){this.visible=!this.visible},clearTime(){this.time="",this.$emit("change",this.time),this.$emit("input",this.time),this.$emit("update:modelValue",this.time),this.tiggerTimePicker()},setTime(){this.initTime(),this.tiggerTimePicker()}}};var h=t._export_sfc(s,[["render",function(e,i,s,h,n,r){return t.e({a:t.t(n.time),b:!n.time},n.time?{}:{c:t.t(r.selectTimeText)},{d:s.disabled?1:"",e:s.border?1:"",f:t.o(((...t)=>r.initTimePicker&&r.initTimePicker(...t))),g:n.visible},n.visible?{h:t.o(((...t)=>r.tiggerTimePicker&&r.tiggerTimePicker(...t)))}:{},{i:n.visible},n.visible?t.e({j:t.t(r.selectTimeText),k:n.dateShow},n.dateShow?{l:t.f(r.years,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i}))),m:t.f(r.months,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i}))),n:t.f(r.days,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i}))),o:n.indicatorStyle,p:r.ymd,q:t.o(((...t)=>r.bindDateChange&&r.bindDateChange(...t)))}:{},{r:n.timeShow},n.timeShow?t.e({s:t.f(r.hours,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i}))),t:t.f(r.minutes,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i}))),v:!s.hideSecond},s.hideSecond?{}:{w:t.f(r.seconds,((e,i,s)=>({a:t.t(r.lessThanTen(e)),b:i})))},{x:t.n(s.hideSecond?"time-hide-second":""),y:n.indicatorStyle,z:r.hms,A:t.o(((...t)=>r.bindTimeChange&&r.bindTimeChange(...t))),B:t.n(s.hideSecond?"sign-center":"sign-left"),C:!s.hideSecond},(s.hideSecond,{})):{},{D:t.t(r.clearText),E:t.o(((...t)=>r.clearTime&&r.clearTime(...t))),F:t.t(r.cancelText),G:t.o(((...t)=>r.tiggerTimePicker&&r.tiggerTimePicker(...t))),H:t.t(r.okText),I:t.o(((...t)=>r.setTime&&r.setTime(...t))),J:t.n(n.dateShow&&n.timeShow?"":"fix-nvue-height"),K:t.s(n.fixNvueBug)}):{})}]]);qa.createComponent(h);
