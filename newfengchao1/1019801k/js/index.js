// if(location.href.indexOf("#reloaded")==-1){
//     location.href=location.href+"#reloaded";
//     location.reload();
// }
let url = window.location.href;
// flagView是ajax发请求埋点显示哪个页面的参数
var flagView = null;
// index是index.html,或者weixing.html前面的字符串
var index = null;
let urlArr = url.split('/');
// console.log(urlArr)
for (var i = 0; i < urlArr.length; i++) {
    // console.log(i,"waimian",urlArr[i])
    if (urlArr[i].indexOf('.html') > -1) {
        // console.log(i,"limian",urlArr[i])
        var hIndex = urlArr[i].indexOf('.html');
        index = urlArr[i].substr(0, hIndex);
        // console.log(index)
    }
}
// box这个变量是旧的卫星或存放其他div的一个名字
var box = '.' + index + 'wrap';
var newbox = '.' + index + 'newrap';
if (index !== 'index') {
    var suijiView = Math.random();
    if (suijiView <= 0.33) {
        // 让index页面隐藏掉同时新卫星隐藏掉,展示旧的卫星
        flagView = index + '_old';
        $('.main').css({'display': 'none'});
        $(newbox).css({'display': 'none'});
        $(box).css({'display': 'block'});
    } else if (suijiView > 0.33 && suijiView <= 0.66) {
        // 让旧的卫星隐藏掉，index页面隐藏掉，展示新的卫星落地页
        flagView = index + '_new';
        $('.main').css({'display': 'none'});
        $(box).css({'display': 'none'});
        $(newbox).css({'display': 'block'});
    } else {
        // 显示index
        flagView = index + '_index';
        $('.main').css({'visibility': 'visible'});
        $(box).css({'display': 'none'});
        $(newbox).css({'display': 'none'});
    }
}
// phoneInfo为截取出的机型字符串传给后端让后端获取机型
var u = navigator.userAgent;
var before = u.indexOf('(');
var after = u.indexOf(')');
var phoneInfo = u.slice(before + 1, after);
// console.log(phoneInfo);
var app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i].indexOf(needle) > 0)
            return i;
    }
    return -1;
}
// 传给后端的什么浏览器字段
var liulanqi = null;
var device_type = navigator.userAgent;
if (device_type.indexOf('HuaweiBrowser') > -1) {
    liulanqi = 'HuaweiBrowser'
} else if (device_type.indexOf('MiuiBrowser') > -1) {
    liulanqi = 'MiuiBrowser'
} else if (device_type.indexOf('QQBrowser') > -1) {
    liulanqi = 'QQBrowser'
} else if (device_type.indexOf('UCBrowser') > -1) {
    liulanqi = 'UCBrowser'
} else if (device_type.indexOf('VivoBrowser') > -1) {
    liulanqi = 'VivoBrowser'
} else if (device_type.indexOf('baiduboxapp') > -1) {
    liulanqi = 'baiduboxapp'
} else if (device_type.indexOf('Safari') > -1) {
    liulanqi = 'Safari'
} else if (device_type.indexOf('HeyTapBrowser') > -1) {
    liulanqi = 'HeyTapBrowser'
} else {
    liulanqi = 'qita'
}
// eslint-disable-next-line
var md = new MobileDetect(device_type);
var os = md.os(); //获取系统 
var model = "";
// 下载逻辑接口的参数，目前弃用
var flag_download = null;
var sHref = window.location.href;
var objData = {
    // 计划id
    plan_id: '',
    // 单元id
    unit_id: '',
    // 创意id
    idea_id: '',
    // 关键词id
    word_id: ''
};
if (sHref.indexOf('?') > -1) {
        var args = sHref.split('?');
        var arr = args[1].split('&');
    for(var i = 0;i< arr.length;i++){
        var arg = arr[i].split('=');
        if (objData.hasOwnProperty(arg[0])) {
            objData[arg[0]] = arg[1];
        }
    }  
}

// var flag_diaoqi = 0;
var duna = os
// 系统位传给后端的安卓或者ios系统
var xitong = null;
if(duna.indexOf('Android') > -1) {
    xitong = 2
}else{
    xitong = 1
}
    statistics('show')
// if (isAndroid) {
//     // $(".content a").attr('href','https://downpack.baidu.com/baidumap_AndroidPhone_1012337j.apk');
//     // $('.content a').css({ 'background': 'url(../img/andr.jpg) no-repeat 0.25rem center', 'background-size': '0.35rem 0.4rem' });
// } else if (isIOS) {
//     $('.content a').attr('href', 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
//     // $('.content a').css({ 'background': 'url(../img/app.jpg) no-repeat 0.25rem center', 'background-size': '0.325rem 0.3625rem' });
//     window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
// }
if (isIOS) {
    $('.content a').attr('href', 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
    window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
}
// clickNum用来记录下载按钮的点击次数，只有第一次点击的时候统计
var clickNum = 0;
$('.down-apk').on('click', function () {
    if (clickNum === 0) {
        statistics('click');
    }
    clickNum++;
    if (isAndroid) {
        window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801k.apk';
    }
});
// 判断微信浏览器
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
            url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&plan_id=' + objData.plan_id + '&unit_id=' + objData.unit_id + '&idea_id=' + objData.idea_id + '&word_id=' + objData.word_id + '&flag_download=' + flag_download + '&flag_view=' +  flagView,
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