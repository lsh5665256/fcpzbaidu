var u = navigator.userAgent;
var before = u.indexOf('(');
// console.log(before);
var after = u.indexOf(')');
// console.log(after);
var phoneInfo = u.slice(before + 1, after);
var before = u.indexOf('(');
var after = u.indexOf(')');
var phoneInfo = u.slice(before + 1, after);
var app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isAndroid) {
	$(".content a").attr('href','https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk'); 
    $('.content a').css({'background':'url(../img/andr.jpg) no-repeat 0.25rem center','background-size':'0.35rem 0.4rem'});        			 
    window.onload=function(){        
//      	$("#tan").click();
        window.location.href='https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk';
    }
}else if (isIOS) {
	$('.content a').attr('href','itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
    $('.content a').css({'background':'url(../img/app.jpg) no-repeat 0.25rem center','background-size':'0.325rem 0.3625rem'}); 
    window.onload=function(){
//         $("#tan").click();
       window.location.href='itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
    }  
}
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i].indexOf(needle) > 0) {
            return i;
        } 
    }
    return -1;
};
var liulanqi = null;
var device_type = navigator.userAgent;
if (device_type.indexOf('HuaweiBrowser') > -1) {
    liulanqi = 'HuaweiBrowser';
} else if (device_type.indexOf('MiuiBrowser') > -1) {
    liulanqi = 'MiuiBrowser';
} else if (device_type.indexOf('QQBrowser') > -1) {
    liulanqi = 'QQBrowser';
} else if (device_type.indexOf('UCBrowser') > -1) {
    liulanqi = 'UCBrowser';
} else if (device_type.indexOf('VivoBrowser') > -1) {
    liulanqi = 'VivoBrowser';
} else if (device_type.indexOf('baiduboxapp') > -1) {
    liulanqi = 'baiduboxapp';
} else if (device_type.indexOf('Safari') > -1) {
    liulanqi = 'Safari';
} else if (device_type.indexOf('HeyTapBrowser') > -1) {
    liulanqi = 'HeyTapBrowser';
} else {
    liulanqi = 'qita';
}
var md = new MobileDetect(device_type);
var os = md.os();
var model = '';
// if (os === 'iOS') {
//     os = md.os() + md.version('iPhone');
//     model = md.mobile();
// } else if (os === 'AndroidOS') {
//     os = md.os() + md.version('Android');
//     var sss = device_type.split(';');
//     var i = sss.contains('Build/');
//     if (i > -1) {
//         model = sss[i].substring(0, sss[i].indexOf('Build/'));
//     }
// }
// var sHref = window.location.href;
//     if (sHref.indexOf('?') > -1){
//         var args = sHref.split('?');
//         var arr = args[1].split('&');
//     for (var i = 0;i< arr.length;i++){
//         var arg = arr[i].split('=');
//         if (objData.hasOwnProperty(arg[0])) {
//             objData[arg[0]] = arg[1];
//         }
//     }
// }
var flag_view = null;
var flag_diaoqi = 0;
var duna = os;
var xitong = null;
if (duna.indexOf('Android') > -1) {
    xitong = 2;
} else {
    xitong = 1;
}
$('.content a').on('click', function () {
    var clipboard = new ClipboardJS('.down-apk');
    // var clipboard = new Clipboard// var clipboard = new ClipboardJS('.down-apk')('#down-apk');
    // var dukouling = '^PINZHUAN01^';
    // var clipboard = new ClipboardJS('#down-apk', {
    //     text: function () {
    //         return dukouling;
    //     }
    // });
    // // 复制成功的回调
    // clipboard.on('success', function (e) {
    //     e.clearSelection();
    //     console.log('copy成功');
    // });
    // clipboard.on('error', function (e) {
    //     console.error('Action:', e.action);
    //     console.error('Trigger:', e.trigger);
    //     console.log('copy失败');
    // });
    statistics('click');
});
statistics('show')
// 判断微信浏览器
    function is_weixin() {
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
    if (isWeixin) {
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
var city = '';
    // 统计机型，浏览器，位置，的函数
async function statistics(event_type) {
    function getData() {
        return new Promise((resolve)=> {
            $.ajax({
                type: 'GET',
                async: false,
                url: 'http://api.map.baidu.com/location/ip?ak=a1GMyGLfyC5UiSGAucCGASgOHAFrTGdQ&ip=' + returnCitySN.cip + '&coor=bd09ll',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: (res) => {
                    city = res.content.address_detail.city;
                    resolve(city);
                },
                error: (err) => {
                    city = [];
                    resolve(city);
                    // console.log(err)
                }
            })
        });
    }
    city = await getData();
    $.ajax({
        type: 'GET',
        async: false,
        url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=pinzhuan&event_type=' + event_type + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: (res) => {
        },
        error: (err) => {
        }
    })
    if (event_type === 'click') {
        async function getData2() {
            return new Promise((resolve)=> {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
                    data: {
                        'activity_id': '627',
                        'url': encodeURIComponent('http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=pinzhuan&event_type=' + event_type + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city),
                        'source': 'download_page'
                    },
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: (res) => {
                        resolve(res.data.token);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            })
        }
        // var dukouling = await getData2();
        // dukouling =
        // console.log(dukouling,123456)
    }
    return new Promise((resolve,reject)=>{
        resolve();
    })
}