//判断是ios 还是 andr   
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isAndroid) {
	$(".content a").attr('href','https://downpack.baidu.com/baidumap_AndroidPhone_1012337j.apk');
    $('.content a').css({'background':'url(../img/andr.jpg) no-repeat 0.25rem center','background-size':'0.35rem 0.4rem'});
} else if (isIOS) {
	$('.content a').attr('href','itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
    $('.content a').css({'background':'url(../img/app.jpg) no-repeat 0.25rem center','background-size':'0.325rem 0.3625rem'});
}
$('.content a').on('click', function () {
    if (isAndroid) {
        $.ajax({
            type: 'GET',
            url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=click&os=2',
            dataType: 'jsonp',
            jsonpCallback: 'callback'
        });
        var ifr = document.createElement('iframe');
        var userAgent = navigator.userAgent;
        // 判断是不是小米手机并进入他自己的应用商店
        if (userAgent.indexOf('MI' || 'Mi' || 'Redmi') > -1) {
            ifr.src = 'mimarket://details?id=com.baidu.BaiduMap&back=true&enable_tieba_native_open=1';
        // 判断是不是华为手机并进入他自己的应用商店
        } else if (userAgent.indexOf('HUAWEI' || 'HONOR') > -1) {
            ifr.src = 'appmarket://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1';
        // 判断是不是oppo手机并进入他自己的应用商店
        } else if (userAgent.indexOf('OPPO') > -1) {
            ifr.src = 'oppomarket://details?packagename=com.baidu.BaiduMap&enable_tieba_native_open=1';
        // 判断是不是vivo手机并进入他自己的应用商店
        } else if (userAgent.indexOf('vivo' || 'VIVO') > -1) {
            ifr.src = 'vivomarket://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1';
        // 判断是不是三星手机并进入他自己的应用商店
        } else if (userAgent.indexOf('SAMSUNG' || 'SM-') > -1) {
            ifr.src = 'samsungapps://ProductDetail/com.baidu.BaiduMap?enable_tieba_native_open=1';
        // 如果是其他手机或者杂牌机去通用的商店
        } else {
            ifr.src = 'market://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1';
        }
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    } else if (isIOS) {
        $.ajax({
            type: 'GET',
            url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=click&os=1',
            dataType: 'jsonp',
            jsonpCallback: 'callback'
        });
    }
});
// 判断微信浏览器
function is_weixin () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
var isWeixin = is_weixin();
var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
var weixinTip = $('<div id="weixinTip"><p><img src="../img/live_weixin.png" alt="微信打开"/></p></div>');
if(isWeixin){
    $("body").append(weixinTip);
}
$("#weixinTip").css({
    "position":"fixed",
    "left":"0",
    "top":"0",
    "height":winHeight,
    "width":"100%",
    "z-index":"1000",
    "background-color":"rgba(0,0,0,0.8)",
    "filter":"alpha(opacity=80)",
});
$("#weixinTip p").css({
    "text-align":"center",
    "margin-top":"10%",
    "padding-left":"5%",
    "padding-right":"5%"
});