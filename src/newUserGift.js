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
        isShowBtn:true,
        couponList:[
          {
            couponId:'1',
            couponMoney:'5',
            couponFullAmount:'满199元使用',
            spuScope:'全部商品可用',
            receiveStatus:'0',
            couponValid:'领取后7天有效',
          },
          {
            couponId:'1',
            couponMoney:'15',
            couponFullAmount:'满299元使用',
            spuScope:'一般贸易品可用',
            receiveStatus:'0',
            couponValid:'领取后7天有效',
          },
          {
            couponId:'1',
            couponMoney:'35',
            couponFullAmount:'满199元使用',
            spuScope:'跨境商品可用',
            receiveStatus:'1',
            couponValid:'领取后7天有效',
          },
          {
            couponId:'1',
            couponMoney:'35',
            couponFullAmount:'满199元使用',
            spuScope:'全部商品可用',
            receiveStatus:'1',
            couponValid:'领取后7天有效',
          },
        ],
        productList:[
          {
            pdSpuId:'1',
            name:'奶瓶',
            mainPicUrl:'',
            showPrice:'1239',
            hiddenPrice:'2999',
            iconList:[
              {
                iconName:'新品'
              }
            ],
            sellingPoints:'卖点'
          }
        ]
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
        getData: function () {
            var vm = this;
            // vm.accesstoken = "fc447ab53ba6c78bce03d410aa28ad80"
            $.ajax({
              url: '/qtoolsApp/newUserGift/area',
              type: 'GET',
              dataType:'json',
              data:{ accesstoken: vm.accesstoken },
              success:function(res) {
                let { data } =res;
                let coupons = data.coupons?data.coupons:[];
                this.couponList = coupons;
              },
              error: function (err) {
                vm.isLoading = false;
                showToast({
                  str:err.responseJSON.errorMsg,
                  time: 2000,
                  position: 'middle'
                })
              }
            })
        },
        getProductData: function () {
            var vm = this;
            // vm.accesstoken = "fc447ab53ba6c78bce03d410aa28ad80"
            $.ajax({
              url: '/qtoolsApp/newUserGift/spus',
              type: 'GET',
              dataType:'json',
              data:{ accesstoken: vm.accesstoken },
              success:function(res) {
                let { data } =res;
                data = data?data:[];
                this.couponList = data;
              },
              error: function (err) {
                vm.isLoading = false;
                showToast({
                  str:err.responseJSON.errorMsg,
                  time: 2000,
                  position: 'middle'
                })
              }
            })
        },
      }
  })
});
