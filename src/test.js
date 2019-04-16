
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './test/index.scss';
import rem from '../common/javascript/rem.js';
import { isAndroidOrIos, primaryHandler, getSearchParts } from '../common/javascript/utils';
import Vue from 'vue'

rem(100,1);
window.primaryHandler = primaryHandler;
const titleMap = {
  0:'邀请你一起逛明星妈妈都在用的Qtools！',
  1:'亲爱的，找小众轻奢母婴好物，就上Qtools',
  2:'推荐！他们家的母婴选品颜值超高，件件是网红潮流款',
  3:'小红书母婴热门推荐的好物，Qtools全都有',
}
//邀请
$(document).ready(function() {
  new Vue({
      el: '#root',
      data: {testAccessToken:''},
      created() {
        // this.getAccessToken();
      },
      mounted() {
        window['showAccessToken'] = (getAccessToken) => {
          this.showAccessToken(getAccessToken)
        };
        window['goUpdateData'] = (accesstoken) => {
          this.goUpdateData(accesstoken)
        };
      },
      updated() {
        console.log(12345)
      },
      methods: {
        goLogin:function() {
          window.Qtools.goLogin(null)
        },
        goTab:function(index) {
          window.Qtools.goTab(JSON.stringify({
            index
          }))
        },
        goExchange:function() {
          window.Qtools.goWebPage(JSON.stringify({
            num:8,
            presentId:1234,
            mainPicUrl:'banner.png',
            name:'我是兑换商品',
            valueQty:45,
          }))
        },
        goExchangeDetail:function() {
          window.Qtools.goWebPage(JSON.stringify({
            num:9,
            type:1,
            presentId:1234,
          }))
        },
        getAccessToken:function() {
          let accesstoken = window.Qtools.getAccessToken(null);
          this.testAccessToken = accesstoken;
        },
        showAccessToken:function(accesstoken) {
          this.accesstoken = accesstoken;
          this.testAccessToken = accesstoken;
        },
        goShareApplte: function () {
          var index = Math.floor(Math.random()*4);
          window.Qtools.goShareApplte(JSON.stringify({
            title: titleMap[index],
          	imageUrl: 'http://pic15.nipic.com/20110813/1993003_205156492136_2.jpg',
          	path: 'pages/welcome/welcome?scene=4_29_123',
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
          }));
        },
        goShareWx: function () {
          var index = Math.floor(Math.random()*4);
          window.Qtools.goShareWx(JSON.stringify({
            index:1,
            isPic: 1,
          }));
        },
        gosharePtP:function(value) {
          this.visible = value;
        },
        goGiftPage: function () {
          window.location.href = './exchange.html?accesstoken='+this.accesstoken;
        },
        goUpdateData:function(accesstoken) {
          window.location.reload();
        }
      }
  })
});
