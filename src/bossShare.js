
// 导入reset.scss
import '../common/stylesheet/reset.scss';
import './bossShare/index.scss';
import rem from '../common/javascript/rem.js';
import { getSearchParts } from '../common/javascript/utils';

rem(100,1);

const titleMap = {
  0:"520领Qtools好礼，快来看看都有啥",
  1:"全球母婴狂欢节，邀请闺蜜一起领更多优惠",
  2:"妈妈们，这可能是今年最低价的，进口母婴好物！",
  3:"母婴节快到了，买点好的犒劳当妈的自己",
  4:"奶粉突然大降价，Qtools全球母婴狂欢节全是优惠！",
  5:"进口母婴囤货季，邀请闺蜜还能领好礼！",
}
$(document).ready(function() {
  document.getElementById('goShare').onclick=function() {
    var index = Math.floor(Math.random()*6);
    console.log(index)
    let spshopid = getSearchParts('spshopid');
    window.Qtools.share(JSON.stringify({
      type:1,
      title:titleMap[index],
      webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/',
      path:'pages/welcome/welcome?scene=0_'+spshopid,
      imageUrl:'/12345',
      isPic:1,
      copyText:'宝宝们，Qtools全球母婴狂欢节来啦，注册即可领取520大礼包，参与邀请闺蜜的活动，还有机会兑换精美礼品，数量有限，先到先得哦！'
    }))
  }
});
