!function(s){function e(e){for(var t,r,a=e[0],c=e[1],u=e[2],l=0,d=[];l<a.length;l++)r=a[l],o[r]&&d.push(o[r][0]),o[r]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(s[t]=c[t]);for(j&&j(e);d.length;)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var s,e=0;e<i.length;e++){for(var n=i[e],t=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(t=!1)}t&&(i.splice(e--,1),s=r(r.s=n[0]))}return s}var t={},o={3:0},i=[];function r(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=s,r.c=t,r.d=function(s,e,n){r.o(s,e)||Object.defineProperty(s,e,{enumerable:!0,get:n})},r.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},r.t=function(s,e){if(1&e&&(s=r(s)),8&e)return s;if(4&e&&"object"==typeof s&&s&&s.__esModule)return s;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:s}),2&e&&"string"!=typeof s)for(var t in s)r.d(n,t,function(e){return s[e]}.bind(null,t));return n},r.n=function(s){var e=s&&s.__esModule?function(){return s.default}:function(){return s};return r.d(e,"a",e),e},r.o=function(s,e){return Object.prototype.hasOwnProperty.call(s,e)},r.p="./";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var j=c;i.push([134,1,0]),n()}({134:function(s,e,n){"use strict";(function(s){var e=o(n(0)),t=o(n(131));function o(s){return s&&s.__esModule?s:{default:s}}n(141),n(146),(0,o(n(2)).default)(100,1),s(document).ready(function(){new t.default({el:"#root",data:{productList:[],couponList:[],totalBadges:100,visibleOne:!1,visibleTwo:!1,visibleThr:!1,visibleCover:!1,currentItem:{},user:"",accesstoken:"",fileDomain:""},created:function(){var s=this;window.showAccessToken=function(e){s.showAccessToken(e)},this.getAccessToken()},mounted:function(){var s=this;setTimeout(function(){s.getData()})},methods:{getAccessToken:function(){var s=window.Qtools.getAccessToken(null);this.accesstoken=s},showAccessToken:function(s){this.accesstoken=s},goExchange:function(s,e){1!=s?(console.log(e),this.currentItem=e,this.visibleOne=!0,this.visibleCover=!0):window.Qtools.goWebPage(JSON.stringify({num:8,presentId:e.pdSpuActiveId,mainPicUrl:e.picUrl,name:e.name,valueQty:e.valueQty}))},confirmExchange:function(s){this.exchangeApi()},exchangeApi:function(){var e=this,n={accesstoken:e.accesstoken,couponId:e.currentItem.couponId,couponCode:e.currentItem.couponCode,valueQty:e.currentItem.valueQty};n=JSON.stringify(n),s.ajax({url:"/invitation/exchange/coupon/save",type:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},data:n,dataType:"json",success:function(s){e.visibleOne=!1,"1"!=s.data.giveCouponCode?e.visibleTwo=!0:e.visibleThr=!0},err:function(s){console.log(s),e.visibleOne=!1}})},goExchangeDetail:function(s){var e=s.type,n={num:9,type:e,presentId:1==e?s.pdSpuActiveId:s.couponId};window.Qtools.goWebPage(JSON.stringify(n))},goUseCoupon:function(s){console.log("去使用"),this.onCancel("visibleThr"),window.Qtools.goTab(JSON.stringify({index:0}))},onCancel:function(s){this[s]=!1,this.visibleCover=!1,"visibleTwo"==s&&window.location.reload()},goGiftPage:function(){window.location.href="./exchange.html"},getData:function(){var n=this;s.ajax({url:"/invitation/exchange/search?accesstoken="+n.accesstoken,type:"GET",dataType:"json",success:function(s){var t=s.data.couponList?s.data.couponList:[];0<t.length&&s.data.couponList.map(function(s,n){return s.couponValidDate=(0,e.default)(s.couponValidDate).format("YYYY-MM-DD")}),n.couponList=t,n.productList=s.data.productList?s.data.productList:[],n.user=s.data.user,n.fileDomain=s.fileDomain},err:function(s){window.Qtools.goLogin(null)}})}}})})}).call(this,n(1))},136:function(s,e,n){var t={"./af":4,"./af.js":4,"./ar":5,"./ar-dz":6,"./ar-dz.js":6,"./ar-kw":7,"./ar-kw.js":7,"./ar-ly":8,"./ar-ly.js":8,"./ar-ma":9,"./ar-ma.js":9,"./ar-sa":10,"./ar-sa.js":10,"./ar-tn":11,"./ar-tn.js":11,"./ar.js":5,"./az":12,"./az.js":12,"./be":13,"./be.js":13,"./bg":14,"./bg.js":14,"./bm":15,"./bm.js":15,"./bn":16,"./bn.js":16,"./bo":17,"./bo.js":17,"./br":18,"./br.js":18,"./bs":19,"./bs.js":19,"./ca":20,"./ca.js":20,"./cs":21,"./cs.js":21,"./cv":22,"./cv.js":22,"./cy":23,"./cy.js":23,"./da":24,"./da.js":24,"./de":25,"./de-at":26,"./de-at.js":26,"./de-ch":27,"./de-ch.js":27,"./de.js":25,"./dv":28,"./dv.js":28,"./el":29,"./el.js":29,"./en-SG":30,"./en-SG.js":30,"./en-au":31,"./en-au.js":31,"./en-ca":32,"./en-ca.js":32,"./en-gb":33,"./en-gb.js":33,"./en-ie":34,"./en-ie.js":34,"./en-il":35,"./en-il.js":35,"./en-nz":36,"./en-nz.js":36,"./eo":37,"./eo.js":37,"./es":38,"./es-do":39,"./es-do.js":39,"./es-us":40,"./es-us.js":40,"./es.js":38,"./et":41,"./et.js":41,"./eu":42,"./eu.js":42,"./fa":43,"./fa.js":43,"./fi":44,"./fi.js":44,"./fo":45,"./fo.js":45,"./fr":46,"./fr-ca":47,"./fr-ca.js":47,"./fr-ch":48,"./fr-ch.js":48,"./fr.js":46,"./fy":49,"./fy.js":49,"./ga":50,"./ga.js":50,"./gd":51,"./gd.js":51,"./gl":52,"./gl.js":52,"./gom-latn":53,"./gom-latn.js":53,"./gu":54,"./gu.js":54,"./he":55,"./he.js":55,"./hi":56,"./hi.js":56,"./hr":57,"./hr.js":57,"./hu":58,"./hu.js":58,"./hy-am":59,"./hy-am.js":59,"./id":60,"./id.js":60,"./is":61,"./is.js":61,"./it":62,"./it-ch":63,"./it-ch.js":63,"./it.js":62,"./ja":64,"./ja.js":64,"./jv":65,"./jv.js":65,"./ka":66,"./ka.js":66,"./kk":67,"./kk.js":67,"./km":68,"./km.js":68,"./kn":69,"./kn.js":69,"./ko":70,"./ko.js":70,"./ku":71,"./ku.js":71,"./ky":72,"./ky.js":72,"./lb":73,"./lb.js":73,"./lo":74,"./lo.js":74,"./lt":75,"./lt.js":75,"./lv":76,"./lv.js":76,"./me":77,"./me.js":77,"./mi":78,"./mi.js":78,"./mk":79,"./mk.js":79,"./ml":80,"./ml.js":80,"./mn":81,"./mn.js":81,"./mr":82,"./mr.js":82,"./ms":83,"./ms-my":84,"./ms-my.js":84,"./ms.js":83,"./mt":85,"./mt.js":85,"./my":86,"./my.js":86,"./nb":87,"./nb.js":87,"./ne":88,"./ne.js":88,"./nl":89,"./nl-be":90,"./nl-be.js":90,"./nl.js":89,"./nn":91,"./nn.js":91,"./pa-in":92,"./pa-in.js":92,"./pl":93,"./pl.js":93,"./pt":94,"./pt-br":95,"./pt-br.js":95,"./pt.js":94,"./ro":96,"./ro.js":96,"./ru":97,"./ru.js":97,"./sd":98,"./sd.js":98,"./se":99,"./se.js":99,"./si":100,"./si.js":100,"./sk":101,"./sk.js":101,"./sl":102,"./sl.js":102,"./sq":103,"./sq.js":103,"./sr":104,"./sr-cyrl":105,"./sr-cyrl.js":105,"./sr.js":104,"./ss":106,"./ss.js":106,"./sv":107,"./sv.js":107,"./sw":108,"./sw.js":108,"./ta":109,"./ta.js":109,"./te":110,"./te.js":110,"./tet":111,"./tet.js":111,"./tg":112,"./tg.js":112,"./th":113,"./th.js":113,"./tl-ph":114,"./tl-ph.js":114,"./tlh":115,"./tlh.js":115,"./tr":116,"./tr.js":116,"./tzl":117,"./tzl.js":117,"./tzm":118,"./tzm-latn":119,"./tzm-latn.js":119,"./tzm.js":118,"./ug-cn":120,"./ug-cn.js":120,"./uk":121,"./uk.js":121,"./ur":122,"./ur.js":122,"./uz":123,"./uz-latn":124,"./uz-latn.js":124,"./uz.js":123,"./vi":125,"./vi.js":125,"./x-pseudo":126,"./x-pseudo.js":126,"./yo":127,"./yo.js":127,"./zh-cn":128,"./zh-cn.js":128,"./zh-hk":129,"./zh-hk.js":129,"./zh-tw":130,"./zh-tw.js":130};function o(s){var e=i(s);return n(e)}function i(s){if(n.o(t,s))return t[s];var e=new Error("Cannot find module '"+s+"'");throw e.code="MODULE_NOT_FOUND",e}o.keys=function(){return Object.keys(t)},o.resolve=i,(s.exports=o).id=136},146:function(s,e){}});