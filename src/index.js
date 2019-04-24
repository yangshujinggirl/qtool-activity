import rem from '../common/javascript/rem.js';
import Vue from 'vue';
import '../common/stylesheet/reset.scss';// 导入reset.scss
import './index/index.scss';
import showToast from 'show-toast';

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
        botHalfData:[],
        totalBadges:0,
        visible:null,
        accesstoken:'',
        testAccessToken:'',
        userInfo:{},
        isUp:false,
        isLoading:false
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
          vm.getUserInfo();
          vm.getData();
        });
      },
      methods: {
        valdateStatus:function() {
          if(this.userInfo.spShopId&&this.userInfo.userId) {
            return true;
          } else {
            return false;
          }
        },
        toggleList:function() {
          let isUp = this.isUp;
          this.isUp = !isUp;
        },
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
          if(!this.valdateStatus()) {
            showToast({
              str: "网络开小差了，重新打开页面试试",
              time: 2000,
              position: 'middle'
            })
            return;
          }
          const vm = this;
          var index = Math.floor(Math.random()*4);
          var imgUrl = "https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png";
          window.Qtools.goShareApplte(JSON.stringify({
          	imageUrl: imgUrl,
            title: titleMap[index],
          	path: 'pages/welcome/welcome?scene=4_'+vm.userInfo.spShopId+'_'+vm.userInfo.userId,
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
          if(!this.valdateStatus()) {
            showToast({
              str: "网络开小差了，重新打开页面试试",
              time: 2000,
              position: 'middle'
            })
            return;
          }
          this.visible = value;
        },
        goGiftPage: function () {
          window.location.href = './exchange.html?accesstoken='+this.accesstoken;
        },
        getData: function () {
            var vm = this;
            vm.accesstoken = "2d61f518afc2aca2f6e18251315c1ccd"
            $.ajax({
              url: '/invitation/user/search?accesstoken='+vm.accesstoken,
              type: 'GET',
              dataType:'json',
              success:function(res) {
                vm.isLoading = false
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let topHalfData = res.data.userList.slice(0,4);
                let botHalfData = res.data.userList.slice(4);
                vm.userList = topHalfData;
                vm.botHalfData = botHalfData;
                vm.totalBadges = res.data.totalBadges;
                vm.userId = res.data.userId;
              },
              error: function (err) {
                vm.isLoading = false;
                window.Qtools.goLogin(null)
              }
            })
        },
        getUserInfo: function () {
            var vm = this;
            vm.isLoading = true
            // vm.accesstoken = "bc5f5dc949c3a9c8c5bf43102aa36f07"
            $.ajax({
              url: '/invitation/h5ShareCode?accesstoken='+vm.accesstoken,
              type: 'GET',
              dataType:'json',
              success:function(res) {
                if(res.code == '401') {
                  vm.isLoading = false
                  window.Qtools.goLogin(null);
                  return;
                }
                var fileDomain = res.fileDomain;
                vm.userInfo = {...res.data,...{fileDomain}};
              },
              error: function (err) {
                vm.isLoading = false;
                window.Qtools.goLogin(null)
              }
            })
        },
      }
  })
});
