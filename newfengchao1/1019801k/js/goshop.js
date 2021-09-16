// $('.main').css({'visibility': 'visible'});
// flagView是ajax发请求埋点显示哪个页面的参数
var flagView = '';
 // 以下机型对应的商店scheme
var packageName = 'com.baidu.BaiduMap';
var appMarket = 'market://details?id=' + packageName + '&enable_tieba_native_open=1';
// 去商店正则匹配数组
var config = [
    // xiaomi
    {
        reg: /\(.*Android.*(MI|Mi|Redmi).*\)/,
        scheme: 'mimarket://details?id=' + packageName + '&back=true&enable_tieba_native_open=1'
    },
    // samsung
    {
        reg: /\(.*Android.*(SAMSUNG|SM-).*\)/i,
        scheme: 'samsungapps://ProductDetail/' + packageName + '?enable_tieba_native_open=1'
    },
    // huawei
    {
        reg: /\(.*Android.*(HUAWEI|HONOR).*\)/i,
        scheme: `appmarket://details?id=${packageName}&enable_tieba_native_open=1`
    },
    // oppo
    {
        reg: /\(.*Android.*OPPO.*\)/i,
        scheme: 'oppomarket://details?packagename=' + packageName + '&enable_tieba_native_open=1',
        downloadFirst: true
    },
    // vivo
    {
        reg: /\(.*Android.*(vivo|VIVO).*\)/i,
        scheme: 'vivomarket://details?id=' + packageName + '&enable_tieba_native_open=1'
    }
];
for (var i = 0, l = config.length; i < l; i++) {
    var item = config[i];
    if (item.reg.test(u)) {
        appMarket = item.scheme;
        break;
    }
}
// 去应用商店的方法
function iframeCallup(appMarket) {
    var ifr = document.createElement('iframe');
    ifr.src = appMarket;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    setTimeout(function () {
        window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801k.apk';
    }, 2000);
}
// phoneInfo 为截取出的机型字符串传给后端让后端获取机型
var u = navigator.userAgent;
var before = u.indexOf('(');
var after = u.indexOf(')');
var phoneInfo = u.slice(before + 1, after);
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
// eslint-disable-next-line
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// liulanqi为传给后端的什么浏览器字段
var liulanqi = '';
switch (true) {
    case u.indexOf('HuaweiBrowser') > -1:
        liulanqi = 'HuaweiBrowser';
        break;
    case u.indexOf('MiuiBrowser') > -1:
        liulanqi = 'MiuiBrowser';
        break;
    case u.indexOf('QQBrowser') > -1:
        liulanqi = 'QQBrowser';
        break;
    case u.indexOf('UCBrowser') > -1:
        liulanqi = 'UCBrowser';
        break;
    case u.indexOf('VivoBrowser') > -1:
        liulanqi = 'VivoBrowser';
        break;
    case u.indexOf('baiduboxapp') > -1:
        liulanqi = 'baiduboxapp';
        break;
    case u.indexOf('Safari') > -1:
        liulanqi = 'Safari';
        break;
    case u.indexOf('HeyTapBrowser') > -1:
        liulanqi = 'HeyTapBrowser';
        break;
    default:
        liulanqi = 'qita';
}
// objData是用来存放地址栏参数的对象
var objData = {};
// 下载逻辑接口的参数，目前弃用
var flag_download = '';
// 计划id
// eslint-disable-next-line
objData.planId = fc.query.plan_id ? fc.query.plan_id : '';
// 单元id
// eslint-disable-next-line
objData.unitId = fc.query.unit_id ? fc.query.unit_id : '';
// 创意id
// eslint-disable-next-line
objData.ideaId = fc.query.idea_id ? fc.query.idea_id : '';
// 关键词id
// eslint-disable-next-line
objData.wordId = fc.query.word_id ? fc.query.word_id : '';
// 账户id
// eslint-disable-next-line
objData.userId = fc.query.user_id ? fc.query.user_id : '';
// 系统位传给后端的安卓或者ios系统
var xitong = 0;
// 安卓为2，ios为1
if (isAndroid) {
    xitong = 2;
}
// 调用一次统计函数
statistics('show');
if (isIOS) {
    xitong = 1;
    $('.content a').attr('href', 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
    window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
}
var clickNum = 0;
// 声名一个变量，取随机数,小于0.5走原来的下载逻辑。大于0.5直跳商店
var goshopWay = Math.random();
if (goshopWay < 0.5) {
    flagView = 'fengchao03';
} else {
    flagView = 'fengchao04';
};
$('.down-apk').on('click', function () {
    if (clickNum === 0) {
        statistics('click');
    };
    clickNum++;
    if (isAndroid) {
        if (goshopWay < 0.5) {
            $('.content a').attr('href', 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801k.apk');
            // eslint-disable-next-line
            var clipboard = new ClipboardJS('.a1');
        } else {
            $('.a1').attr('data-clipboard-text', '^PINZHUAN04^');
            // eslint-disable-next-line
            var clipboard = new ClipboardJS('.a1');
            setTimeout(function () {
                iframeCallup(appMarket);
            }, 100);
        }
    }
});
// 统计机型，浏览器，位置，的函数
function statistics(eventType) {
    // 通过ak（外面的ajax来获取城市，里面的ajax用来埋点)
    $.ajax({
        type: 'GET',
        async: false,
        // eslint-disable-next-line
        url: 'http://api.map.baidu.com/location/ip?ak=a1GMyGLfyC5UiSGAucCGASgOHAFrTGdQ&ip=' + returnCitySN.cip + '&coor=bd09ll',
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: (res) => {
            // console.log(1);
            var city = res.content.address_detail.city;
            setInfo(city);
        },
        error: (err) => {
            let city = [];
            setInfo(city);
        }
    });
    // 用于封装统计请求的发送ajax函数
    // 节后解决跨域问题，将jsonp改为json
    function setInfo(city) {
        $.ajax({
            type: 'GET',
            // async: false,
            url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&flag_download=' + flag_download + '&flag_view=' +  flagView + '&user_id=' + objData.userId,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            success: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}