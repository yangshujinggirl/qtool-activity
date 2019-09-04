
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './bossShare/index.scss';
import rem from '../common/javascript/rem.js';
import { getSearchParts } from '../common/javascript/utils';
import Vue from 'vue';

rem(100,1);

const titleMap = {
  0:"邀请你一起逛明星妈妈都在用的Qtools！",
  1:"亲爱的，找小众轻奢母婴好物，就上Qtools",
  2:"推荐！他们家的母婴选品颜值超高，件件是潮流款"
}
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
        var imageUrl = "https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png";
        if(this.isClick) {
          var index = Math.floor(Math.random()*3);
          window.Qtools.share(JSON.stringify({
            type:1,
            title:titleMap[index],
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/',
            path:'pages/home/home?spShopId='+vm.spshopid,
            imageUrl,
            isPic:1,
            copyText:'Qtools全球母婴狂欢节来啦！'
          }))
        }
      }
    }
  })
});
