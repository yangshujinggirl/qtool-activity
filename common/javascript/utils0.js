// module.exports = {
//   _key: function(key) {
//     return "qtl_" + key;
//   },
//   get: function(key) {
//     return sessionStorage.getItem(this._key(key));
//   },
//   set: function(key, val) {
//     return sessionStorage.setItem(this._key(key), val);
//   },
//   del: function(key) {
//     return sessionStorage.removeItem(this._key(key));
//   },
//   clear: function() {
//     return sessionStorage.clear();
//   },
//   isAndroidOrIos: function() {
//     var ua = navigator.userAgent;
//     return {
//       isApple: !!ua.match(/(ipad|iphone|mac)/i),
//       isAndroid: !!ua.match(/(android|Linux)/i),
//     }
//   },
//   isWechart: function() {
//     var ua = navigator.userAgent.toLowerCase();
//     if(ua.match(/MicroMessenger/i)=="micromessenger") {
//         return true;
//     } else {
//         return false;
//     }
//   },
//   primaryHandler: function(type,params){
//     let platform =  this.isAndroidOrIos();
//     let values;
//     if(params) {
//       values = Object.assign(params,{method:type});
//     } else {
//       values = {method:type};
//     }
//     console.log(values)
//     if(platform.isApple) {
//       window.webkit.messageHandlers.callBack.postMessage(values)
//     } else {
//       console.log(JSON.stringify(values))
//       window.android[type](JSON.stringify(values))
//     }
//   },
//   getSearchParts:function(key){
//     var url = window.location.href;
//     var arys = url.split('?');
//     var params = {};
//     for(var i=0; i<arys.length; i++) {
//       if(i>0) {
//         var pars = arys[i].split('&');
//         for(var j = 0; j< pars.length; j++) {
//           var arrs = pars[j].split('=');
//           params[arrs[0]] = arrs[1];
//         }
//       }
//     }
//     var value = params[key];
//     return value
//   },
// };
export function isAndroidOrIos(url) {
  var ua = navigator.userAgent;
  return {
    isApple: !!ua.match(/(ipad|iphone|mac)/i),
    isAndroid: !!ua.match(/(android|Linux)/i),
  }
}
export function primaryHandler(type,params) {
  let platform =  isAndroidOrIos();
  let values;
  if(params) {
    values = Object.assign(params,{method:type});
  } else {
    values = {method:type};
  }
  console.log(values)
  if(platform.isApple) {
    window.webkit.messageHandlers.callBack.postMessage(values)
  } else {
    console.log(JSON.stringify(values))
    window.android[type](JSON.stringify(values))
  }
}
export function getSearchParts(key) {
  var url = window.location.href;
  var arys = url.split('?');
  var params = {};
  for(var i=0; i<arys.length; i++) {
    if(i>0) {
      var pars = arys[i].split('&');
      for(var j = 0; j< pars.length; j++) {
        var arrs = pars[j].split('=');
        params[arrs[0]] = arrs[1];
      }
    }
  }
  var value = params[key];
  return value
}
