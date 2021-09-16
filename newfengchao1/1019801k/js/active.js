var viewHeight = $(window).height();
// 针对小屏幕手机做的处理
if (viewHeight < 580) {
    $('.close').css('bottom', '-9%');
}
// 一进入页面让安装了百度地图app的去调起地图
iframeCallup('baidumap://map/show?center=39.90960456049752,116.3972282409668&zoom=13&traffic=on&bounds=37.8608310000,112.5963090000,42.1942670000,118.9491260000&src=FCdiaoqi');
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
// 这个参数用于ab计划统计的ab
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
} else {
    xitong = 1;
    $('.content a').attr('href', 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
}
// 调用一次统计函数
statistics('show');
// clickNum用来记录下载的点击次数，用于预防防止多次点击
var clickNum = 0;
// closeClick用于记录第一个红包页面的关闭按钮点击次数，防止页面不点下载一直弹出红包死循环
var closeClick = 0;
// red2click用于"开"多次被点击统计到，原则上开不会多次点击，这里是双重保险
var red2click = 0;
$('.down-apk').on('click', function () {
    if (clickNum === 0) {
        statistics('click');
    };
    clickNum++;
    if (isAndroid) {
        $('.content a').attr('href', 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801k.apk');
        // 下面是执行了复制度口领
        // eslint-disable-next-line
        var clipboard = new ClipboardJS('.a1');
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
        event.stopPropagation();
        event.preventDefault();
    });
    // 点击开去端内而且统计
    $('.open').on('click', function (event) {
        var clipboard = new ClipboardJS('.open');
        if (red2click === 0) {
            statistics('red1click');
        };
        red2click++;
         // 下面是执行了复制度口领
        // eslint-disable-next-line
        setTimeout(function () {
            iframeCallup('baidumap://map/cost_share?url=https%3A%2F%2Fcarowner.baidu.com%2FactivityVue%2FcashNavigator.html%3Ffr%3Dfengchaoguanggao&transparentWeb=0&navigationStatus=2&hiddenBackBtn=0&hiddenTitle=1&src=FChongbao');
        }, 100);
    });
    // 调起百度地图的方法
})();
function iframeCallup(app) {
    var ifr = document.createElement('iframe');
    ifr.src = app;
    ifr.style.display = 'none';
    var bodys = document.body || document.getElementsByTagName('body')[0];
    bodys.appendChild(ifr);
    setTimeout(function () {
        bodys.removeChild(ifr);
    }, 0);
    if (app !== 'baidumap://map/show?center=39.90960456049752,116.3972282409668&zoom=13&traffic=on&bounds=37.8608310000,112.5963090000,42.1942670000,118.9491260000&src=FCdiaoqi') {
        setTimeout(function () {
            if (isAndroid) {
                window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801n.apk';
            } else {
                window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
            }
        }, 3000);
    }
}