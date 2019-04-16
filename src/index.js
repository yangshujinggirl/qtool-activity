import rem from '../common/javascript/rem.js';

import { isAndroidOrIos, primaryHandler, getSearchParts } from '../common/javascript/utils';
import Vue from 'vue'
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './index/index.scss';

rem(100,1);

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
      data: {
        userList:[],
        totalBadges:0,
        visible:null,
        accesstoken:'',
        testAccessToken:'',
        userInfo:{}
      },
      created() {
        this.getAccessToken();
        window['showAccessToken'] = (getAccessToken) => {
          this.showAccessToken(getAccessToken)
        };
      },
      mounted() {
        let vm = this;
        setTimeout(function(){
          vm.getData();
          vm.getUserInfo()
        });
      },
      methods: {
        goLogin:function() {
          window.Qtools.goLogin(null)
        },
        goTab:function() {
          window.Qtools.goTab(JSON.stringify({
            index:0
          }))
        },
        getAccessToken:function() {
          let accesstoken = window.Qtools.getAccessToken(null);
          this.accesstoken = accesstoken;
        },
        showAccessToken:function(accesstoken) {
          this.accesstoken = accesstoken;
        },
        goShareApplte: function () {
          var index = Math.floor(Math.random()*4);
          var imgUrl = "http://v5.apph5.testin.qtoolsbaby.net:81/imgs/activity_share.png";
          window.Qtools.goShareApplte(JSON.stringify({
          	// imageUrl: 'http://pic15.nipic.com/20110813/1993003_205156492136_2.jpg',
          	imageUrl: imgUrl,
            title: titleMap[index],
          	path: 'pages/welcome/welcome?scene=4_'+this.userInfo.spshopid+'_'+this.userInfo.userId,
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
          }));
        },
        goShareWx: function () {
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
        getData: function () {
            var vm = this;
            $.ajax({
              url: '/invitation/user/search?accesstoken='+vm.accesstoken,
              type: 'GET',
              dataType:'json',
              success:function(res) {
                vm.userList = res.data.userList;
                vm.totalBadges = res.data.totalBadges;
                vm.userId = res.data.userId;
                vm.loading = true;
              },
              error: function (err) {
                window.Qtools.goLogin(null)
              }
            })
        },
        getUserInfo: function () {
            var vm = this;
            $.ajax({
              url: '/invitation/h5ShareCode?accesstoken='+vm.accesstoken,
              type: 'GET',
              dataType:'json',
              success:function(res) {
                var fileDomain = res.fileDomain;
                vm.userInfo = {...res.data,...{fileDomain}};
              },
              error: function (err) {
                // alert(err.code)
                window.Qtools.goLogin(null)
              }
            })
        },
      }
  })
});
