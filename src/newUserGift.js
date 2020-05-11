import rem from '../common/javascript/rem.js';
import Vue from 'vue';
import '../common/stylesheet/reset.scss';// 导入reset.scss
import './newUserGift/index.scss';
import showToast from 'show-toast';

rem(100,1);
//邀请

$(document).ready(function() {
  new Vue({
      el: '#root',
      data: {
        fileDomain:'',
        isLoading:false,
        isShowBtn:true,
        couponList:[],
        productList:[]
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
          vm.getProductData();
        });
      },
      methods: {
        goLogin:function() {
          window.Qtools.goLogin(null)
        },
        getAccessToken:function() {
          let accesstoken = window.Qtools.getAccessToken(null);
          this.accesstoken = accesstoken;
        },
        showAccessToken:function(accesstoken) {
          this.accesstoken = accesstoken;
        },
        goUseCoupon: function(value) {
          window.Qtools.goCouponUseStyle(JSON.stringify({
            linkInfoType: value.linkInfoType,
            linkInfo: value.linkInfo,
          }))
        },
        getCoupon:function() {
          var vm = this;
          // vm.accesstoken = "6dd6a873be5eec55c3fba2d0786c4e7b";
          $.ajax({
            url: '/qtoolsApp/coupons/voucherNewUserGiftCoupon',
            type: 'GET',
            dataType:'json',
            data:{ accessToken: vm.accesstoken },
            success:function(res) {
              if(res.code == '200') {
                showToast({
                  str:'领取成功',
                  time: 2000,
                  position: 'middle'
                })
                window.location.reload();
              } else if(res.code == '401') {
                window.Qtools.goLogin(null);
                return;
              }
            },
            error: function (err) {
              showToast({
                str:err.responseJSON?err.responseJSON.errorMsg:'服务错误',
                time: 2000,
                position: 'middle'
              })
            }
          })
        },
        getData: function () {
            var vm = this;
            vm.isLoading = true;
            // vm.accesstoken = "6dd6a873be5eec55c3fba2d0786c4e7b"
            $.ajax({
              url: '/qtoolsApp/newUserGift/area',
              type: 'GET',
              dataType:'json',
              data:{ accessToken: vm.accesstoken },
              success:function(res) {
                let { code, fileDomain,data } =res;
                vm.isLoading = false;
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let coupons = data.coupons?data.coupons:[];
                vm.couponList = coupons;
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
        getProductData: function () {
            var vm = this;
            vm.isLoading = true;
            // vm.accesstoken = "6dd6a873be5eec55c3fba2d0786c4e7b"
            $.ajax({
              url: '/qtoolsApp/newUserGift/spus',
              type: 'GET',
              dataType:'json',
              data:{ accessToken: vm.accesstoken },
              success:function(res) {
                vm.isLoading = false;
                let { code, fileDomain, data } =res;
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let list = data.list?data.list:[];
                list.map((el,index) => {
                  if(index<=2) {
                    el.iconPath = require(`./newUserGift/imgs/icon_gift${index}.png`);
                  }

                })
                vm.productList = list;
                vm.fileDomain = fileDomain;
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
