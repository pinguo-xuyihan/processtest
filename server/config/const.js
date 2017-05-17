var shRoot = '/Users/yaweiyihan/Desktop/code/casePlatform/server/sh/';
var outputRoot = '/Users/yaweiyihan/Desktop/code/phantom/';
var CaseConfig = {
	bannerAddP1: {
		shPath: shRoot + 'bannerAddP1.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerAddP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','点击效果(链接跳转)','上传背景图','标签','流量配置','支持设备',
			'添加特定渠道','添加精准化区域投放','添加精准化区域投放','添加精准化排除区域',
			'发布测试']
		}
	},
	bannerAddP2: {
		shPath: shRoot + 'bannerAddP2.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerAddP2.xml',
		caseInfo : {
			caseArr :['选择平台(Android)','填写标题','选择投放语言(英文)','语言面板出现',
			'选择配置类型(品牌广告)','选择客户端版本(定向版本投放)','发布时间(每日轮播)',
			'选择排除语言','优先级','点击效果(产品内跳转)','上传背景图','展示URL','点击URL',
			'发布测试']
		}
	},
	bannerAddP3: {
		shPath: shRoot + 'bannerAddP3.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerAddP3.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文,英文)','语言面板出现',
			'选择配置类型(MobVistal广告)','MobVistalID','FacebookID',
			'选择客户端版本(区间版本投放)','发布时间(即时投放)','优先级','发布测试']
		}
	},
	bannerAddP4: {
		shPath: shRoot + 'bannerAddP4.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerAddP4.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(全部语言)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','点击效果(自定义链接)','上传背景图','发布测试']
		}
	},
	bannerAddP5: {
		shPath: shRoot + 'bannerAddP5.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerAddP5.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文,英文,日语,泰语,韩语,印尼语,越南语)',
			'语言面板出现','选择配置类型(运营投放)',
			'选择客户端版本(区间版本投放)','发布时间(即时投放)','优先级','上传背景图',
			'添加精准化区域投放','添加精准化排除区域；','发布测试']
		}
	},
	bannerEditP1: {
		shPath: shRoot + 'bannerEditP1.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerEditP1.xml',
		caseInfo : {
			caseArr :['详情页数据是否加载(IOS)','标题是否和新增时一致','优先级是否一致',
			'跳转链接是否一致','标签是否一致','改变标题','改变上下架时间','改变优先级',
			'改变跳转链接','编辑测试','测试通过']
		}
	},
	bannerCopyP1: {
		shPath: shRoot + 'bannerCopyP1.sh',
		caseLogPath: outputRoot + 'M1/banner/bannerCopyP1.xml',
		caseInfo : {
			caseArr :['详情页数据是否加载(IOS)','标题是否和新增时一致','优先级是否一致',
			'跳转链接是否一致','标签是否一致']
		}
	},
	feedAddP1: {
		shPath: shRoot + 'feedAddP1.sh',
		caseLogPath: outputRoot + 'M1/feed/feedAddP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择模板类型(模板0)','选择投放策略(运营01轮播',
			'选择客户端版本(区间版本投放)','发布时间(即时投放)','发布账号主题'	,'选择投放标示','@对象填写',
			,'优先级','数据类型(单图)','上传图片','图片跳转链接 (打开app)','填写曝光数',
			'添加精准化区域投放','添加精准化排除区域','发布测试']
		}
	},
	feedAddP2: {
		shPath: shRoot + 'feedAddP2.sh',
		caseLogPath: outputRoot + 'M1/feed/feedAddP2.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择模板类型(模板0)','选择投放策略(运营01轮播',
			'选择客户端版本(区间版本投放)','发布时间(即时投放)','发布账号主题'	,'选择投放标示','@对象填写',
			,'优先级','数据类型(多图)','上传图片','图片跳转链接 (隐藏app)','填写曝光数',
			'添加精准化区域投放','添加精准化排除区域','发布测试']
		}
	},
	feedAddP3: {
		shPath: shRoot + 'feedAddP3.sh',
		caseLogPath: outputRoot + 'M1/feed/feedAddP3.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择模板类型(模板0)','选择投放策略(运营01轮播',
			'选择客户端版本(区间版本投放)','发布时间(即时投放)',
			,'优先级','数据类型(视频)','上传视频','启动单独配置','发布测试']
		}
	},
	feedCopyP1: {
		shPath: shRoot + 'feedCopyP1.sh',
		caseLogPath: outputRoot + 'M1/feed/feedCopyP1.xml',
		caseInfo : {
			caseArr :['详情页数据是否加载(IOS)','标题是否和新增时一致','优先级是否一致',
			'包名一致','链接一致','曝光数是否一致']
		}
	},
	feedEditP1: {
		shPath: shRoot + 'feedEditP1.sh',
		caseLogPath: outputRoot + 'M1/feed/feedEditP1.xml',
		caseInfo : {
			caseArr :['详情页数据是否加载(IOS)','标题是否和新增时一致','优先级是否一致',
			'包名一致','链接一致','曝光数是否一致']
		}
	},
	inAppAddP1: {
		shPath: shRoot + 'inAppAddP1.sh',
		caseLogPath: outputRoot + 'M2/inAppAddP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'有效内显示次数填写','选择弹窗位置','优先级','点击效果(链接跳转)',
			'填写标题文案','填写内容文案','填写内容文案','发布测试']
		}
	},
	fpEntry1AddP1: {
		shPath: shRoot + 'fpEntry1AddP1.sh',
		caseLogPath: outputRoot + 'M3/FpEntry1/fpEntry1AddP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','文案显示','默认文案','icon显示','icon显示','背景图显示',
			'上传背景图','点击效果(链接跳转)','发布测试']
		}
	},
	fpEntry1AddP2: {
		shPath: shRoot + 'fpEntry1AddP2.sh',
		caseLogPath: outputRoot + 'M3/FpEntry1/fpEntry1AddP2.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','文案显示','默认文案','icon显示','icon显示','背景图显示',
			'上传背景图','点击效果(链接跳转)','发布测试']
		}
	},
	fpEntry5AddP1: {
		shPath: shRoot + 'fpEntry5AddP1.sh',
		caseLogPath: outputRoot + 'M3/FpEntry5/fpEntry5AddP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','文案显示','默认文案','icon显示','icon显示','背景图显示',
			'上传背景图','点击效果(链接跳转)','发布测试']
		}
	},
	fpEntry5EditP1: {
		shPath: shRoot + 'fpEntry5EditP1.sh',
		caseLogPath: outputRoot + 'M3/FpEntry5/fpEntry5EditP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','文案显示','默认文案','icon显示','icon显示','背景图显示',
			'上传背景图','点击效果(链接跳转)','发布测试']
		}
	},
	fpEntry5CopyP1: {
		shPath: shRoot + 'fpEntry5CopyP1.sh',
		caseLogPath: outputRoot + 'M3/FpEntry5/fpEntry5CopyP1.xml',
		caseInfo : {
			caseArr :['选择平台(IOS)','填写标题','选择投放语言(中文)','语言面板出现',
			'选择配置类型(运营投放)','选择客户端版本(区间版本投放)','发布时间(即时投放)',
			'优先级','文案显示','默认文案','icon显示','icon显示','背景图显示',
			'上传背景图','点击效果(链接跳转)','发布测试']
		}
	}
};

module.exports = CaseConfig;