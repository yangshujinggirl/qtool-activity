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
        visibleRule:false,
        visibleCover:false,
        visibleThr:false,
        visibleOne:false,
        visibleTwo:false,
        fileDomain:'',
        currentItem:{},
        userInfo:{},//信息
        broadcastList:[],//广播信息
        couponLeve:null,
        couponRule:['1','3','8'],
        couponList:[],//优惠券列表
        productList:[],//实物列表
        productLeve:null,
        productRule:['1','3','8'],
        inviteInfoList:[],//邀请列表
        lasteList:[],//前4条
        botHalfList:[],//所有
        totalBadges:0,
        visible:null,
        accesstoken:'',
        isUp:false,
        isLoading:false,
        visibleRule:false,
        shareText:''
      },
      created() {
        this.getAccessToken();
        window['showAccessToken'] = (getAccessToken) => {
          this.showAccessToken(getAccessToken);
        };
      },
      mounted() {},
      methods: {
        getAccessToken:function() {
          // this.accesstoken = '0da4925a9167a4433fb944cdb923d561';
          // this.getData();
          window.Qtools.getAccessToken(null);
        },
        showAccessToken:function(accesstoken) {
          if(accesstoken == '') {
            window.Qtools.goLogin(null);
          } else {
            this.accesstoken = accesstoken;
            this.getData();
          }
        },
        goShareApplte: function () {
          const vm = this;
          window.Qtools.goShareApplte(JSON.stringify({
            imageUrl: vm.userInfo.sharePic,
            title: vm.userInfo.shareTitle,
            path: `pages/pageActivity/newComer/newComer?B=${vm.userInfo.spShopId}&A=${vm.userInfo.oldUserId}&C=${vm.userInfo.invitationActId}`,
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
          }));
        },
        //图片分享
        goShareWx: function () {
          window.Qtools.goPosterShare(null);
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
        onCancel:function(key) {
          this[key] = false;
          this.visibleCover = false;
          if(key == 'visibleThr') {
            window.location.reload();
          }
        },
        //领取
        goExchange: function (value, giftType) {
          if(giftType == '2') {
            window.Qtools.goWebPage(JSON.stringify({
              num:8,
              presentId:value.presentId,
              mainPicUrl:value.pic,
              name:value.name,
            }));
            return;
          }
          this.currentItem = value;
          this.visibleOne = true;
          this.visibleCover = true;
        },
        //确定领取
        confirmExchange: function(value) {
           var vm = this;
           var data = {
             accesstoken:vm.accesstoken,
             invitationActId:vm.userInfo.invitationActId,
             presentId:vm.currentItem.presentId,
           };
           data = JSON.stringify(data);
           $.ajax({
             url: '/qtoolsApp/invitation/exchange/coupon',
             type: 'POST',
             headers:{
               "Content-Type":"application/json;charset=utf-8",
             },
             data:data,
             dataType:'json',
             success:function(res) {
               vm.visibleOne = false;
               let { data } =res;
               let gainResult = data.gainResult;
               if(gainResult != '1') {
                 vm.visibleTwo = true;
               } else {
                 vm.currentItem=data;
                 vm.visibleThr = true;
               }
             },
             err: function (err) {
               vm.visibleOne = false;
             }
           })
        },
        goUseCoupon: function(value) {
          this.onCancel('visibleThr')
          let vm =this;
          window.Qtools.goCouponUseStyle(JSON.stringify({
            linkInfoType: vm.currentItem.linkInfoType,
            linkInfo: vm.currentItem.linkInfo,
          }))
        },
        goRuleModal:function(value) {
          this.visibleRule = value;
          this.visibleCover = value;
        },
        goGiftPage: function () {
          window.location.href = './exchangeRecord.html';
        },
        getData: function () {
            var vm = this;
            vm.isLoading = true

            $.ajax({
              url: '/qtoolsApp/invitation/index',
              type: 'GET',
              dataType:'json',
              data:{ accesstoken: vm.accesstoken },
              success:function(res) {
                vm.isLoading = false;
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let { invitationActInfo, broadcastList, couponList, productList, inviteInfoList } =res.data;
                inviteInfoList = inviteInfoList?inviteInfoList:[];
                broadcastList = broadcastList?broadcastList:[];
                couponList = couponList?couponList:[];
                productList = productList?productList:[];
                couponList.map((el) => {
                  vm.couponRule = el.gainThreshold;
                })
                productList.map((el) => {
                  vm.productRule = el.gainThreshold;
                })
                broadcastList.map((el)=> {
                  el.mobile = el.mobile&&el.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                  return el;
                })
                inviteInfoList.map((el)=> {
                  el.mobile = el.mobile&&el.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                  return el;
                })
                let topHalfData = inviteInfoList.slice(0,4);
                let botHalfData = inviteInfoList.slice(4);
                if(invitationActInfo.inviteNum >= 8) {
                  vm.couponLeve = 2;
                } else if(invitationActInfo.inviteNum >= 3) {
                  vm.couponLeve = 1;
                } else if(invitationActInfo.inviteNum >= 1){
                  vm.couponLeve = 0;
                } else {
                  vm.couponLeve = null;
                }
                if(invitationActInfo.inviteOrderNum >= 6) {
                  vm.productLeve = 2;
                } else if(invitationActInfo.inviteOrderNum >= 3) {
                  vm.productLeve = 1;
                } else if(invitationActInfo.inviteOrderNum >= 1){
                  vm.productLeve = 0;
                } else {
                  vm.productLeve = null;
                }
                vm.inviteInfoList = inviteInfoList;
                vm.lasteList = topHalfData;
                vm.botHalfList = botHalfData;
                vm.userInfo = invitationActInfo;
                vm.broadcastList = broadcastList;
                vm.couponList = couponList;
                vm.productList = productList;
                vm.fileDomain = res.fileDomain;
              },
              error: function (err) {
                vm.isLoading = false;
                showToast({
                  str:err.responseJSON?err.responseJSON.errorMsg:'服务错误',
                  time: 2000,
                  position: 'middle'
                })
              }
            })
        },
      }
  })
});
