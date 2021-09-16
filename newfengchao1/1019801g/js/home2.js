// flagView是ajax发请求埋点显示哪个页面的参数
var flagView = '';
// kewwordname是丰巢那边的关键字
// urlSearch用于判断有没有key_word那个参数，如果没有不让程序报错
var urlSearch = window.location.search;
if (urlSearch.indexOf('key_word') > -1) {
    // eslint-disable-next-line
    fc.query.key_word.then((res)=>{
        var keywordname = res;
        switch (true) {
            case keywordname.indexOf('北斗') > -1:
                // 展示北斗
                flagView = 'beidou';
                break;
            case keywordname.indexOf('卫星') > -1:
                // 展示卫星
                flagView = 'weixing';
                break;
            case keywordname.indexOf('地铁') > -1:
                // 展示地铁
                flagView = 'subway';
                break;
            case keywordname.indexOf('公交') > -1:
                // 展示公交
                flagView = 'bus';
                break;
            default:
                // 这个是默认途径，让index落地页显示
                flagView = 'index';
        };
        // boxname 是放页面，用于页面显示隐藏的大盒子
        var boxname = '.' + flagView + 'box';
        if (flagView !== 'index') {
            $('.main').css({'display': 'none'});
            $(boxname).css({'display': 'block'});
        } else {
            // $('.main').css({'display': 'block'});
            $('.main').css({'visibility': 'visible'});
        }
    });
} else {
    // 如果地址栏没有参数的情况下展示index落地页
    $('.main').css({'visibility': 'visible'});
    flagView = 'index';
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
objData.planId = fc.query.plan_id ? fc.query.plan_id :'';
// 单元id
// eslint-disable-next-line
objData.unitId = fc.query.unit_id ? fc.query.unit_id :'';
// 创意id
// eslint-disable-next-line
objData.ideaId = fc.query.idea_id ? fc.query.idea_id :'';
// 关键词id
// eslint-disable-next-line
objData.wordId = fc.query.word_id ? fc.query.word_id :'';
// 账户id
// eslint-disable-next-line
objData.userId = fc.query.user_id ? fc.query.user_id :'';
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
$('.down-apk').on('click', function () {
    if (clickNum === 0) {
        statistics('click');
    };
    clickNum++;
    if (isAndroid) {
        window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801g.apk';
    }
});
// 统计机型，浏览器，位置，的函数
function  statistics(eventType) {
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
    function setInfo(city) {
        $.ajax({
            type: 'GET',
            async: false,
            url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&flag_download=' + flag_download + '&flag_view=' +  flagView + '&user_id=' + objData.userId,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            success: (res) => {
                console.log(190);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}