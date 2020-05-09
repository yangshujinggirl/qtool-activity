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
        fileDomain:'',
        productList: [
          {
            invitationActId:'1',
            oldUserId:'1',
            gainRecord:{
              userPresentId:'1',
              presentId:'1',
              pic:'https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png',
              name:'Lansinoh兰思诺 Lansinoh兰思诺 羊毛脂膏40ml 新手妈妈必备好用产品很好用的羊毛脂膏40ml 新手妈妈必备好用产品很好用的',
              createTime:'2020-04-20',
            }
          },
          {
            invitationActId:'2',
            oldUserId:'1',
            gainRecord:{
              userPresentId:'2',
              presentId:'1',
              pic:'https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png',
              name:'Lansinoh兰思诺 羊毛脂膏40ml 新手妈妈必备好用产品很好用的',
              createTime:'2020-04-20',
            }
          },
        ],
        accesstoken:'',
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
        getData: function () {
          var vm = this;
          vm.isLoading = true
          vm.accesstoken = "e7b68e06a21678b7e9cf04079a07db4e"
          $.ajax({
            url:'/invitation/exchange/search',
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
              vm.isLoading = false
            }
          })
        }
      }
  })
});
