/* eslint-disable */

var ispcorphone= browserRedirect();
if (ispcorphone === 'pc') {
    $('body').css({'display': 'none'});
    window.location.href = 'http://map.baidu.com/zt/qudao/newfengchao/1012337a/html/pc.html';
} else {
    var viewHeight = $(window).height();
    var viewWidth = $(window).width();
    if (viewHeight < 680) {
        $('.iosmain1 .yinsi1').css('margin-top','-2.7rem');
    }
    if (viewHeight < 630) {
        $('.iosmain1 .chuxinggif').css('margin-top','-1.4rem');
        $('.iosmain1 .busgif').css('margin-top','-1.4rem');
        $('.iosmain1 .jiayougif').css('margin-top','-1.4rem');
        $('.iosmain1 .dachegif').css('margin-top','-1.4rem');
        $('.iosmain1 .yinsi1').css('margin-top','-2.9rem');

    }
    if (viewHeight > 680) {
        $('.anzhanwei').css('height','3.2rem')
    }

// 针对小屏幕手机做的处理
    if (viewHeight < 580) {
        // $('body').css('height','130%');
        $('.close').css('bottom', '-9%');
        // $('.yinsitop').css('bottom', '-8%');
        // $('.yinsibottom').css('bottom', '-5%');
    }
    // 一进入页面让安装了百度地图app的去调起地图
    // iframeCallup('baidumap://map');
    var partner = 'pinzhuan';
    iframeCallup('baidumap://map/show?src=pinzhuanhongbao');
    var flagView = '';
    var tokenUrl = null;
    var errNum = 0;
    var flagDownload = 0;
    // 针对于safire浏览器universalLink的链接
    var ulink = 'https://clientmap.baidu.com/map/maplink.php?openapi=' + encodeURIComponent('baidumap://map/show?src=pinzhuanhongbao') + '&cburl=' + encodeURIComponent('https://map.baidu.com/zt/client/index/?down=iphone&fr=webapp_callna');
    // 以下机型对应的商店scheme
    var packageName = 'com.baidu.BaiduMap';
    var appMarket = 'market://details?id=' + packageName + '&enable_tieba_native_open=1';
    var baiduid = getCookie('BAIDUID');
    var src = fc.query.src;
    console.log(src)
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
    // 去应用商店和去百度地图的方法
    function iframeCallup(appMarket) {
        var ifr = document.createElement('iframe');
        ifr.src = appMarket;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        if (appMarket !== 'baidumap://map/show?src=pinzhuanhongbao') {
            setTimeout(function () {
                window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk';
            }, 3000);
        }  
    }
    // 决定ab计划的随机数
    // var goWay = Math.random();
    // 获取.a1dom节点
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
    var urlSearch = window.location.search;
    var other = {};
    other.baiduid = baiduid;
    other.src = src;
    console.log(other)
    // 给后端传的other
    var otherfire = encodeURIComponent(JSON.stringify(other));
    console.log(otherfire)
    var wayView = Math.random();
    var swiper1 = new Swiper('.xinlunbo', {
        direction: 'vertical',
        pagination: {
            el: '.swiper-pagination'
        },
        paginationClickable: true,
        autoplay: {
            delay: 4000,
            stopOnLastSlide: true,
            disableOnInteraction: false,
        },
        // loop: true,
        autoplayDisableOnInteraction: false,
        spaceBetween: 80,
        hashnav: false,
        hashnavWatchState: true,
        on: {
            slideChange: function () {
                currentIndex = this.activeIndex;
            }
        }
    });
    flagView = "pinzhuan_210712";
    var dukouling = '4:/^PINZHUAN01^';
    // 判断是ios且是safire浏览器
    var isSafire = isIOS && (u.indexOf('QQBrowser') === -1 && u.indexOf('UCBrowser') === -1 && u.indexOf('baiduboxapp') === -1);
    if (isSafire && viewHeight <630) {
        $(".iosmain1").css('padding-top','1rem');
        $(".iosmain1 .swiper-container").css('margin-top','-.4rem');
        $(".iosmain1 .swiper-container").css('padding-top','1rem');
        $(".iosmain1 .download").css('bottom','1.6rem');
        $('.iosmain1 .yinsi1').css('margin-top','-3.4rem');
    }
    // 如果是ios且不是手百
    if (isIOS && liulanqi !== 'baiduboxapp') {
        $('.anmain1 .yinsi1').css('margin-top','-.5rem');
        $(".anmain1 .download").css('bottom','1.6rem');
        $(".anmain1").css('padding-top','1rem');
        $(".anmain1 .swiper-container").css('margin-top','-.4rem');
        $(".anmain1 .swiper-container").css('padding-top','1rem');
        $('.anmain1 .daohanggiftu').css('margin-top','-1.4rem');
         if (viewHeight < 630) {
            $('.anmain1 .yinsi1').css('margin-top','-3.1rem');
        }
    }
    // 是ios且是qq浏览器
    if (isIOS && u.indexOf('MQQBrowser') > -1) {
        $('.anmain1 .yinsi1').css('position','absolute');
        $('.anmain1 .yinsi1').css('bottom','-1.5%');
        $('.anmain1 .yinsi1').css('left',"13%");
        $('.anmain1 .yinsitop1').css('width',"90%");
        $('.anmain1 .yinsibottom1').css('width',"135%");
        $('.anmain1 .yinsibottom1').css('margin-left',"-15%");
    }
    if (isAndroid) {
        xitong = 2;
        if (urlSearch.indexOf('src') > -1) {
             // console.log("我有src")
            tokenUrl = window.location.href + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner+ '&os=Android&ch=1012337a';
        } else {
            // console.log("我没有src")
            tokenUrl = window.location.href + '?clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner+ '&os=Android&ch=1012337a' + '&src=';
        }
        // $('.content a').attr('href', 'https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk');
    } else if (isIOS) {
        // $('.yinsitop1').css('background-image','url(../img/pinzhuangif/iosbanbenhuise.png)')
        // $('.yinsitop .update').css('background-image','url(../img/yinsi/iosshijian.png)')
        xitong = 1;
        if (urlSearch.indexOf('src') > -1) {
            // 我有src
            tokenUrl = window.location.href + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1024743a';
        } else {
            // 我没src
            tokenUrl = window.location.href + '?clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1024743a' + '&src=';
        }
       
        // window.onlaod 是用来解决ios safire浏览器一进页面要做某些事情的操作
        // window.onload = function () {
        //     // window.location.href = 'baidumap://map/show?center=39.90960456049752,116.3972282409668&zoom=13&traffic=on&bounds=37.8608310000,112.5963090000,42.1942670000,118.9491260000&src=pinzhuanhongbao';
        // };
    };
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
            liulanqi = 'qita';
    }
    if (liulanqi === 'HuaweiBrowser') {
        $('html').css('overflow', 'hidden')
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
            getToken();
            if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                setTimeout(function(){
                    $('.hezi').trigger("click");
                },100)
            }
        }
        // eslint-disable-next-line
        clickNum++;
        setTimeout(function(){
            if (isAndroid) {
                // $('.hezi').trigger("click
                //window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk';
                iframeCallup(appMarket);
            }
            if (isIOS) {
                if (isSafire) {
                    window.location.href = ulink;
                } else {
                    window.location.href = 'https://apps.apple.com/app/apple-store/id452186370?pt=328057&ct=PZ1024743a&mt=8';
                }
            }
        },1000)
    });
    // if (isAndroid && liulanqi === 'baiduboxapp' && goWay > 0.5) {
    //     const uad = new UAD({
    //         el: a1,
    //         data: {
    //             android: {
    //                 packageName: 'com.baidu.BaiduMap',
    //                 downloadUrl: 'https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk',
    //                 deeplinkUrl: 'baidumap://map/show?src=pinzhuanhongbao'
    //             }
    //         },
    //         option: {
    //             isActionQueue: true, // 是否启动三步降级
    //             isSwitchToNADownload: false // 是否在三步降级的最后一步启动NA下载, 默认是在最后一步启动H5下载(false)
    //         }
    //     });
    // }
    // 进入页面掉的那次统计函数
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
                // console.log(2)
                let city = [];
                setInfo(city);
            }
        });
        // 用于封装统计请求的发送ajax函数
        function setInfo(city,type) {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=pinzhuan&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&flag_view=' +  flagView + '&flag_download=' + flagDownload + '&other=' + otherfire,
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: (res) => {
                    //  console.log(190);
                    },
                    error: (err) => {
                        if (err.status !==200 && !type) {
                            setInfo(city,true)
                        }  
                    }
                });
           
        }
    }
    // 往历史里push一条，便于回退得时候做操作
    function pushHistory() {
        var state = {
            title: '',
            url: ''
        };
        window.history.pushState(state, '', '');
    }
    pushHistory();
    (function () {
        setTimeout(function () {
            window.addEventListener('popstate', function (e) {
                if (clickNum === 0 && closeClick === 0) {
                    // 没点击过下载然后弹出红包
                    $('.mask').css('display', 'block');
                    closeClick++;
                    // 调用统计函数，第一个红包的展示统计传入red1show
                    statistics('red1show');
                } else {
                    // 点过还是让用户退出
                    window.history.go(-2);
                }  
            }, false);
        }, 0);
        // 点击关闭按钮关闭红包
        $('.close').on('click', function (event) {
            $('.mask').css('display', 'none');
        });
        // 点击开去端内而且统计
        $('.open').on('click', function (event) {
            var clipboard = new ClipboardJS('.open');
            if (red2click === 0) {
                statistics('red1click');
            };
            red2click++;
            // eslint-disable-next-line
            if (isAndroid) {
                setTimeout(function () {
                    window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1012337a.apk';
                }, 100);
            } else {
                window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
            }
        });
    })();
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
    // 点击获取度口令的方法
    function getToken () {
        $.ajax({
            type: 'GET',
            async: false,
            url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
            data:{
                ///'activity_id': '1019801e',
                'activity_id': '626',
                'url': encodeURIComponent(tokenUrl),
                'source': 'pinzhuan',
            },
            dataType: 'jsonp',
            // jsonpCallback: 'callback',
            success: (res) => {
                var bbb = res.data.token
                console.log(bbb)
                textCopy(bbb)
                if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                    $('.a1').attr('data-clipboard-text', bbb);
                    $('.hezi').attr('data-clipboard-text',bbb)
                    new ClipboardJS('.a1'); 
                    new ClipboardJS('.hezi');
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    $('.yinsi').on('click',function(){
        window.location.href = 'https://mz.mbd.baidu.com/r/kyF47IiHiE?f=cp&u=6c6a3842c2cd5a3b'
    })
    $('.quanxian').on('click',function(){
        window.location.href = 'https://ms.mbd.baidu.com/r/kShJBFTRG8?f=cp&u=acc34ad24f6e28c3'
    })
}


// 判断是手机还是pc的方法
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
// 获取cookie函数
function getCookie(name){
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
            
        }
    }
    return "";
}
getBrand1();
// 获取版本号
function getBrand1 () {
    $.ajax({
        type: 'GET',
        async: false,
        // eslint-disable-next-line
        url: 'https://integralwall.baidu.com/integralwall/interact/landingmapversion',
        // url: 'https://integralwall.baidu.com/integralwall/interact/landingchanneldetail?user_id=1381499',
        dataType: 'jsonp',
        jsonpCallback: 'callback1',
        success: (res) => {
            console.log(res,111);
            if (isAndroid) {
                var version = '&nbsp;' + res.data[0].version;
                $('.banben').html(version);
                $('.shijian').html(res.data[0].version_time);
            } else {
                var version1 = '&nbsp;' + res.data[1].version;
                $('.banben').html(version1);
                $('.shijian').html(res.data[1].version_time);
            }
        },
        error: (err) => {
            console.log(err)
        }
    });
}