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
        userInfo:{},//信息
        broadcastList:[],//广播信息
        couponRule:['1','3','8'],
        couponActivity:1,
        couponList:[
          {
            presentId:'1',
            couponAmount:'10',
            couponDiscountStr:'满199元使用',
            couponValidStr:'领取后2天有效',
            gainStatus:'1',
            gainStatusStr:'不可领',
            gainThreshold:'1',
          },
          {
            presentId:'2',
            couponAmount:'15',
            couponDiscountStr:'满99元使用',
            couponValidStr:'领取后8天有效',
            gainStatus:'2',
            gainStatusStr:'可领取',
            gainThreshold:'1',
          },
          {
            presentId:'3',
            couponAmount:'20',
            couponDiscountStr:'满299元使用',
            couponValidStr:'领取后8天有效',
            gainStatus:'3',
            gainStatusStr:'已领取',
            gainThreshold:'1',
          },
        ],//优惠券列表
        productList:[
          {
            presentId:'1',
            pic:"https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png",
            remainQty:'10',
            warningQty:'2',
            gainStatus:'1',
            gainStatusStr:'不可领',
            gainThreshold:'1',
          },
          {
            presentId:'2',
            pic:"https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png",
            remainQty:'20',
            warningQty:'3',
            gainStatus:'2',
            gainStatusStr:'可领取',
            gainThreshold:'1',
          },
          {
            presentId:'1',
            pic:"https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png",
            remainQty:'10',
            warningQty:'2',
            gainStatus:'3',
            gainStatusStr:'已领取',
            gainThreshold:'1',
          },
        ],//实物列表
        productRule:['1','3','8'],
        productActivity:0,
        inviteInfoList:[],//邀请列表
        lasteList:[
          {
            mobile:'13562768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
          {
            mobile:'13562768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
          {
            mobile:'13562768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
        ],//前4条
        botHalfList:[
          {
            mobile:'13162768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
          {
            mobile:'13262768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
          {
            mobile:'13362768899',
            type:'1',
            recordTime:'2020-05-08 22:33',
          },
        ],//所有
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
          window.Qtools.goShareApplte(JSON.stringify({
          	imageUrl: vm.userInfo.sharePic,
            title: vm.userInfo.shareTitle,
          	path: `pages/pageActivity/inviteUser/inviteUser?spShopId=${vm.userInfo.spShopId}&oldUserId=${vm.userInfo.oldUserId}`,
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
          }));
        },
        goShareWx: function () {
          window.Qtools.goShareWx(JSON.stringify({
            index:1,
            isPic: 1,
          }));
        },
        goRuleModal:function(value) {
          this.visibleRule = value;
        },
        goGiftPage: function () {
          window.location.href = './exchangeRecord.html';
        },
        getData: function () {
            var vm = this;
            // vm.accesstoken = "fc447ab53ba6c78bce03d410aa28ad80"
            $.ajax({
              url: '/invitation/index',
              type: 'GET',
              dataType:'json',
              data:{ accesstoken: vm.accesstoken },
              success:function(res) {
                vm.isLoading = false;
                if(res.code == '401') {
                  window.Qtools.goLogin(null);
                  return;
                }
                let { invitationActInfo, broadcastList, couponList, productList, inviteInfoList } =res;
                inviteInfoList = inviteInfoList?inviteInfoList:[];
                broadcastList = broadcastList?broadcastList:[];
                couponList = couponList?couponList:[];
                productList = productList?productList:[];

                inviteInfoList.map((el)=> {
                  el.mobile = el.mobile&&el.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                  return el;
                })
                let topHalfData = inviteInfoList.slice(0,4);
                let botHalfData = inviteInfoList.slice(4);
                vm.inviteInfoList = inviteInfoList;
                vm.lasteList = topHalfData;
                vm.botHalfList = botHalfData;
                vm.userInfo = invitationActInfo;
                vm.broadcastList = broadcastList;
                vm.couponList = couponList;
                vm.productList = productList;
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
