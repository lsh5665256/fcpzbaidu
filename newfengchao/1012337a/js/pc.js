/* eslint-disable */
//判断是pc还是手机
var ispcorphone= browserRedirect();
if (ispcorphone === 'phone') {
    window.location.href = 'http://map.baidu.com/zt/qudao/newfengchao/1012337a/html/slide.html';
} else{
    var viewHeight = $(window).height();
// 针对小屏幕手机做的处理
    if (viewHeight < 580) {
        $('.close').css('bottom', '-9%');
    }
    // 一进入页面让安装了百度地图app的去调起地图
    // iframeCallup('baidumap://map');
    var partner = 'pinzhuan';
    var flagView = 'pinzhuan_pc';
    var tokenUrl = null;
    var flagDownload = 0;
    const a1 = document.querySelector('.a1');
    var nowTime = new Date().getTime();
    // 获取手机浏览器信息
    var u = navigator.userAgent;
    var before = u.indexOf('(');
    var after = u.indexOf(')');
    // 浏览器用于传给后端用户使用的什么浏览器
    var liulanqi = '';
    var phoneInfo = u.slice(before + 1, after);
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // 系统是往后端传的参数，2是安卓，1是ios
    var xitong = 0;
    var wayView = Math.random();
    var dukouling = '4:/^PINZHUAN01^';
    // 判断是ios且是safire浏览器
    var isSafire = isIOS && (u.indexOf('QQBrowser') === -1 && u.indexOf('UCBrowser') === -1 && u.indexOf('baiduboxapp') === -1);
    switch (true) {
        case u.indexOf('baiduboxapp') > -1:
            liulanqi = 'baiduboxapp';
            break;
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
        case u.indexOf('HeyTapBrowser') > -1:
            liulanqi = 'HeyTapBrowser';
            break;
        case u.indexOf('SogouMSE')>-1:
            liulanqi = 'SogouMobileBrowser';
            break;
        case isSafire:
            liulanqi = 'Safari';
            break;
        default:
            liulanqi = 'pc';
    }
    // clickNum用来记录下载按钮的点击次数，只有第一次点击的时候统计
    var clickNum = 0;
    // closeClick用于记录第一个红包页面的关闭按钮点击次数，防止页面不点下载一直弹出红包死循环
    var closeClick = 0;
    // red2click用于"开"多次被点击统计到，原则上开不会多次点击，这里是双重保险
    var red2click = 0;
    // 判断随机数改变度口令

    // if (goWay > 0.5 && liulanqi === 'baiduboxapp') {
    //     // 大于0.5,且是手百就走新的js文件提供的方法(uad调起)
    //     flagDownload = 'pinzhuan02';
    //     $('.a1').attr('data-clipboard-text', '4:/^PINZHUAN02^');
    // }
    // if (goWay < 0.5 && liulanqi === 'baiduboxapp') {
    //     // 小于0.5，且是手百走原来的方法
    //     flagDownload = 'pinzhuan01';
    //     $('.a1').attr('data-clipboard-text', '4:/^PINZHUAN01^')
    // }
    $('.down-apk').on('click', function () {
        if (clickNum === 0) {
            statistics('click');
        }
        alert("手机扫码下载，百度地图APP")
        // eslint-disable-next-line
        clickNum++;
    });
    statistics('show');
    // 用于统计的函数
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
                url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=pinzhuan&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&flag_view=' +  flagView+ '&flag_download=' + flagDownload,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: (res) => {
                    // console.log(190);
                },
                error: (err) => {
                    // console.log(err);
                }
            });
        }
    }
    // 复制的方法
    function textCopy(data){
        var f=document.createElement("form");
        f.id="copy-"+Date.parse(new Date());
        f.onsubmit=function(){return false};
        f.style="opacity: 0;height: 1px;width: 1px;overflow: hidden;position:fixed;top: -1;left: -1;z-index: -1;"
        // bca-disable-line
        f.innerHTML=`<button onclick='story.select();document.execCommand("Copy");'></button>
        <textarea name="story">${data}</textarea>`;
        document.body.appendChild(f);
        document.querySelector(`#${f.id}>button`).click();  
        document.body.removeChild(document.getElementById(f.id));
    }
}

// 判断是pc还是移动端的方法
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  //   document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return "phone"
    } else {
      // document.writeln("pc");
      return "pc"
    }
}