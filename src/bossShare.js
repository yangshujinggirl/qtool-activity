
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './bossShare/index.scss';
import rem from '../common/javascript/rem.js';
import { getSearchParts } from '../common/javascript/utils';
import Vue from 'vue';

rem(100,1);

$(document).ready(function() {
  new Vue({
    el:'#root',
    data:{
      isClick:false,
      spshopid:null,
      isStart:true
    },
    created() {
      this.spshopid = getSearchParts('spshopid');
    },
    mounted() {
      this.initPage()
    },
    methods: {
      initPage:function() {
        let vm = this;
        if(vm.spshopid=='320') {
          vm.isClick = true;
        } else if(vm.isStart) {
          vm.isClick = true;
        } else {
          vm.isClick = false;
        }
      },
      goShare:function() {
        let vm  = this;
        var imageUrl = "https://qcampfile.oss-cn-shanghai.aliyuncs.com/marchActivity_share.png";
        if(this.isClick) {
          window.Qtools.share(JSON.stringify({
            type:1,
            title:'喜欢这个礼物好久了，快帮我助力吧，一起免费兑好礼~爱你哟！',
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/',
            path:'pages/home/home?spShopId='+vm.spshopid,
            imageUrl,
            isPic:1,
            copyText:'亲爱的，找小众轻奢母婴好物，就上Qtools'
          }))
        }
      }
    }
  })
});
