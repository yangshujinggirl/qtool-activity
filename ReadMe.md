1：项目开发：
	1）每一个活动都需重建新的分支
	2）在package.js里修改actName（例如："actName": "childrensDay"）
	3）目录：.js文件要对应同名html文件。具体可以看src目录。


2：QtoolsAppH5调原生方法:

参数params:JSON字符串格式；
	var params = JSON.stringify({});
window.Qtools.[method](params/null);
小程序path: 'pages/welcome/welcome?scene=4_29_123'（29/门店id，123/用户id）;


1. 获取accessToken;
	method: getAccessToken;
	js回调名：showAccessToken；

		调用window.Qtools.getAccessToken(null);
		调用js回调函数，接收iOS返回的token；

		var token;
		window.Qtools.getAccessToken(null);//不直接返回字符串，需要用回调接收；
		function showAccessToken(accessToken) {
			token = accessToken;
		}

2. 调用原生分享页面

	 {"method": "share", "shareUrl": "hhtps:www.baidu.com", "title":"分享文本的 title", "detailTitle": "分享的详细文本", "imageUrl": "图片地址"}

	 如果是链接是需要完整的https的链接（iOS 这边的分享需要是 https的）
3. 生成图片并分享
	window.Qtools.goPosterShare(null)

4. 分享到小程序
	method: goShareApplte
	参数 (都是非空的)
	params = {
		title: String
		desc: String
		imageUrl: 'String	(完整链接或者公司阿里云上的非完整链接都行)'
		webpageUrl: String
		path: 'pages/welcome/welcome?scene=4_29_123'
	}

	window.Qtools.goShareApplte(JSON.stringify({
		imageUrl: 'https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png',
		title: '邀请你一起逛明星妈妈都在用的Qtools！',
		path: 'pages/welcome/welcome?scene=4_29_123',
		webpageUrl:'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
	}));

5. 分享方法 （分享弹框是h5的原生只提供分享方法）
	method: goShareWx;

	params = {
		index: Number 0 - 微信好友 1 - 朋友圈
		isPic: Number 0 - 分享图片链接  1 - 分享图片
		imageUrl: String?
		title: String
		shareUrl: String?
		detailTitle: String?
	}

	window.Qtools.goShareWx(JSON.stringify({
		index:1,
		isPic: 1,
	}));

6. 原生登录方法
	method: goLogin;
	window.Qtools.goLogin(null)

7. 调用拨打电话
	method: goTelePhone
	{phoneNum: String}

8. copy文本
	method: goCopy
	{text: String}

9. web截屏分享到朋友圈
	method: goScreen

10. 跳转到 tab 页
	method: goTab;
	{index: Number}
	Number:
	 0 - 首页
	 1 - 购物袋
	 2 - 订单
	 3 - 我的  
	 （1、2需要登录后才能调用跳转）

11. 跳转特殊页面
	method: goWebPage
	{ num: Number }

	1、跳转某个品牌详情页
	{
		num: 0
		id: Number		品牌id
		name: String		name: 品牌名
	}

	2、上新尖货
	num: 1

	3、热卖爆款
	num: 2

	4、保税专区
	num: 3

	5、品牌馆
	num: 4

	6、banner详情
	num: 5
	bannerId: Number
	bannerName: String

	7、商品详情
	num: 6
	pdSpuId: Number

	8、商品分类页面
	{
		num: 7
		id: Number	分类 id
		name: String	分类名
	}

	9、兑换确认页
	{
		num: 8
		presentId: Number 兑换商品的 id
		mainPicUrl: String
		name: String		商品名称
		valueQty: Number 兑换所需货币数
	}

	10、兑换详情页
	{
		num: 9
		type: Number 1 - 实体商品 2 - 优惠券
		presentId: Number? 商品Id
		couponCode: String?	代金券CODE
	}

	12.	//优惠券使用页
	window.Qtools.goCouponUseStyle(JSON.stringify({
		linkInfoType: linkInfoType,
		linkInfo: linkInfo,
	}));

Q掌柜h5分享方法
	imageUrl = 'https://qcampfile.oss-cn-shanghai.aliyuncs.com/activity_share.png'
	{
	 method: share
	 type 1 小程序 2微信好友分享
	 title: String
	 desc: String
	 webpageUrl: 'https://qtoolsapp-hd.qtoolsbaby.cn/download/'
	 path: 'pages/welcome/welcome?scene=4_29_123'
	 imageUrl: 小程序的分享图片
	 shareImageUrl: 分享到朋友圈或者微信好友的图片链接
	 isPic: Int  0 -分享图片链接 1 -朋友圈分享图片
	}
