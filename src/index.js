import rem from '../common/javascript/rem.js';
import Vue from 'vue';
import '../common/stylesheet/reset.scss';// 导入reset.scss
import './index/index.scss';
import showToast from 'show-toast';

rem(100,1);
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
        isLoading:false,
        visibleRule:false,
        shareText:''
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
          var imgUrl = "https://qcampfile.oss-cn-shanghai.aliyuncs.com/qtoolsapp/marchActivity/marchActivity_share.png";
          window.Qtools.goShareApplte(JSON.stringify({
          	imageUrl: imgUrl,
            title: vm.shareTitle,
          	path: `pages/pageActivity/inviteUser/inviteUser?spShopId=${vm.userInfo.spShopId}&oldUserId=${vm.userInfo.userId}`,
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
        goRuleModal:function(value) {
          this.visibleRule = value;
        },
        goGiftPage: function () {
          window.location.href = './exchange.html';
        },
        getData: function () {
            var vm = this;
            // vm.accesstoken = "fc447ab53ba6c78bce03d410aa28ad80"
            $.ajax({
              url: '/invitation/user/search?accesstoken='+vm.accesstoken,
              type: 'GET',
              dataType:'json',
              success:function(res) {
                vm.isLoading = false;
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let userList = res.data.userList?res.data.userList:[];
                userList.length>0&&userList.map((el)=> {
                  el.mobile = el.mobile&&el.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                  return el;
                })
                let topHalfData = userList.slice(0,4);
                let botHalfData = userList.slice(4);
                vm.userList = topHalfData;
                vm.botHalfData = botHalfData;
                vm.totalBadges = res.data.totalBadges;
                vm.userId = res.data.userId;
                vm.shareText = res.data.shareStepTip;
                vm.shareTitle = res.data.shareTitle;
              },
              error: function (err) {
                vm.isLoading = false;
                showToast({
                  str:err.responseJSON.errorMsg,
                  time: 2000,
                  position: 'middle'
                })
                // window.Qtools.goLogin(null)
              }
            })
        },
        getUserInfo: function () {
            var vm = this;
            vm.isLoading = true
            // vm.accesstoken = "fc447ab53ba6c78bce03d410aa28ad80"
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
                // window.Qtools.goLogin(null)
              }
            })
        },
      }
  })
});
