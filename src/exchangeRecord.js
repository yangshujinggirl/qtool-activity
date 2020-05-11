import moment from 'moment';
import Vue from 'vue';
import '../common/stylesheet/reset.scss';// 导入reset.scss
import './exchangeRecord/index.scss';
import rem from '../common/javascript/rem.js';
rem(100,1);

$(document).ready(function() {
  new Vue({
      el: '#root',
      data: {
        isLoading:false,
        fileDomain:'',
        productList: [],
        accesstoken:'',
      },
      created() {
        window['showAccessToken'] = (getAccessToken) => {
          this.showAccessToken(getAccessToken)
        };
        this.getAccessToken();
      },
      mounted() {},
      methods: {
        getAccessToken:function() {
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
        //领取
        goDetail: function (value) {
          window.Qtools.goWebPage(JSON.stringify({
            num:9,
            userPresentId:value.userPresentId,
          }));
        },
        getData: function () {
          var vm = this;
          vm.isLoading = true
          // vm.accesstoken = "864fd07eadd9e1eaeb7fc8b923cd1be1"
          $.ajax({
            url:'/qtoolsApp/invitation/exchange/search',
            type: 'GET',
            dataType: 'json',
            data:{
              accesstoken:vm.accesstoken
            },
            success:function(res) {
              vm.isLoading = false
              let { data, code, fileDomain } =res;
              if(code == '401') {
                window.Qtools.goLogin(null);
                return;
              }
              let gainRecord = data.gainRecord?data.gainRecord:[];
              vm.productList = gainRecord;
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
        }
      }
  })
});
