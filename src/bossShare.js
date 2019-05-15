
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './bossShare/index.scss';
import rem from '../common/javascript/rem.js';
import { getSearchParts } from '../common/javascript/utils';
import Vue from 'vue';

rem(100,1);

const titleMap = {
  0:"520领Qtools好礼，快来看看都有啥",
  1:"全球母婴狂欢节，呼唤闺蜜一起血拼",
  2:"妈妈们，这可能是今年最低价的，进口母婴好物！",
  3:"母婴节快到了，买点好的犒劳当妈的自己",
  4:"进口母婴囤货季，Qtools邀请你和闺蜜一起血拼！",
}
$(document).ready(function() {
  new Vue({
    el:'#root',
    data:{
      isClick:false,
      spshopid:null,
      isStart:false
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
          var index = Math.floor(Math.random()*5);
          window.Qtools.share(JSON.stringify({
            type:1,
            title:titleMap[index],
            webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/',
            path:'pages/welcome/welcome?scene=0_'+vm.spshopid,
            imageUrl,
            isPic:1,
            copyText:'Qtools全球母婴狂欢节来啦！'
          }))
        }
      }
    }
  })
});
