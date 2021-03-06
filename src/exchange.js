// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './exchange/index.scss';
import rem from '../common/javascript/rem.js';
// import moment from 'moment';

import Vue from 'vue';

rem(100,1);

$(document).ready(function() {
  new Vue({
      el: '#root',
      data: {
        productList: [],
        couponList: [],
        totalBadges:100,
        visibleOne:false,
        visibleTwo:false,
        visibleThr:false,
        visibleCover:false,
        currentItem:{},
        user:'',
        accesstoken:'',
        fileDomain:''
      },
      created() {
        window['showAccessToken'] = (getAccessToken) => {
          this.showAccessToken(getAccessToken)
        };
        this.getAccessToken();
      },
      mounted() {
        let vm = this;
        setTimeout(function(){
          vm.getData();
        });
      },
      methods: {
        getAccessToken:function() {
          let accesstoken = window.Qtools.getAccessToken(null);
          this.accesstoken = accesstoken;
        },
        showAccessToken:function(accesstoken) {
          this.accesstoken = accesstoken;
        },
        goExchange: function (giftType,value) {
          if(giftType == 1) {
            window.Qtools.goWebPage(JSON.stringify({
              num:8,
              presentId:value.pdSpuActiveId,
              mainPicUrl:value.picUrl,
              name:value.name,
              valueQty:value.valueQty
            }));
            return;
          }
          console.log(value);
          this.currentItem = value;
          this.visibleOne = true;
          this.visibleCover = true;
        },
        confirmExchange: function (type) {
          this.exchangeApi();
        },
        exchangeApi:function() {
          var vm = this;
          var data = {
            accesstoken:vm.accesstoken,
            couponId:vm.currentItem.couponId,
            couponCode:vm.currentItem.couponCode,
            valueQty:vm.currentItem.valueQty
          };
          data = JSON.stringify(data);
          $.ajax({
            url: '/invitation/exchange/coupon/save',
            type: 'POST',
            headers:{
              "Content-Type":"application/json;charset=utf-8",
            },
            data:data,
            dataType:'json',
            success:function(res) {
              vm.visibleOne = false;
              let giveCouponCode = res.data.giveCouponCode;
              if(giveCouponCode != '1') {
                vm.visibleTwo = true;
              } else {
                vm.visibleThr = true;
              }
            },
            err: function (err) {
              console.log(err);
              vm.visibleOne = false;
            }
          })
        },
        goExchangeDetail: function (value) {
          let type = value.type;
          let presentId
          if(type == 1) {
            presentId = value.pdSpuActiveId;
          } else {
            presentId = value.couponId
          }
          let params = {
            num:9,
            type,
            presentId
          }
          window.Qtools.goWebPage(JSON.stringify(params));
        },
        goUseCoupon: function (type) {
          console.log('去使用');
          this.onCancel('visibleThr')
          window.Qtools.goTab(JSON.stringify({
            index:0,
          }));
        },
        onCancel:function(key) {
          this[key] = false;
          this.visibleCover = false;
          if(key == 'visibleTwo') {
            window.location.reload();
          }
        },
        goGiftPage: function () {
          window.location.href = './exchange.html';
        },
        getData: function () {
          var vm = this;
          // vm.accesstoken = "bc5f5dc949c3a9c8c5bf43102aa36f07"
          $.ajax({
            url:'/invitation/exchange/search?accesstoken='+vm.accesstoken,
            type: 'GET',
            dataType: 'json',
            success:function(res) {
              let couponList = res.data.couponList?res.data.couponList:[]
              // couponList.length>0&&res.data.couponList.map((el,index) => (
              //   el.couponValidDate = moment(el.couponValidDate).format('YYYY-MM-DD')
              // ))
              vm.couponList = couponList;
              vm.productList = res.data.productList?res.data.productList:[];
              vm.user = res.data.user;
              vm.fileDomain = res.fileDomain;
            },
            err: function (err) {
              window.Qtools.goLogin(null)
            }
          })
        }
      }
  })
});
