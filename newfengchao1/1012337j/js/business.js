function hide(ele){
    document.querySelector('#'+ele).style.display = 'none';
}

function show(ele){
    document.querySelector('#'+ele).style.display = 'block';
}

//根据ua 控制首页 andorid/IOS的展示
var ua = navigator.userAgent.toLowerCase();
var appstroe_ele = document.getElementsByClassName('appstore')[0];
if (is_iphone==1) {
	hide('otherVersion');
    show('downloadMap');
}else{
    hide('downloadMap');
    show('otherVersion');
    document.getElementById('item0-title').innerHTML = 'For Android';
    document.getElementById('item5-title').innerHTML = 'For Android';
    document.getElementById('item5-title').style.fontSize = '20px';
}
//其余部分JSONP获取
var mapChannels = {};//重组channels数据
var flag;
var downLoad,basePath,baseChannelPath,channels;
var fresh,releVer,reguDl,manu,andShenma,bdpz04,releVerBd,releVerSg;

//jsonp
function getData(result) {
    json = result;
    //console.log(json);
    downLoad = json.android.downLoad;
    basePath = downLoad.basePath;
    baseChannelPath = downLoad.baseChannelPath;
    channels = downLoad.channels;

    channels.forEach(function(item,i){
        mapChannels[ item.type ] = item;
    });

    fresh = basePath + downLoad.betaDl;
    releVer = basePath + downLoad.releDl;
    reguDl = basePath + downLoad.reguDl;
    manu = basePath + downLoad.mntpDl;//不变 直接下载的
    //下边4个是渠道
    // andShenma = baseChannelPath + downLoad.shmaDl; //shenma.html --对应html元素的id="andShenma"
    // bdpz04 = baseChannelPath + downLoad.bdpz04tpDl;
    // releVerBd = baseChannelPath + downLoad.releBdDl;//bd/index.htm---id="releVerBd"
    // releVerSg = baseChannelPath + downLoad.releSgDl;//sougou/sougou.html---id="releVerSg"

    andShenma =  downLoad.shmaDl; //shenma.html --对应html元素的id="andShenma"
    bdpz04 =  downLoad.bdpz04tpDl;
    releVerBd = downLoad.releBdDl;//bd/index.htm---id="releVerBd"
    releVerSg =  downLoad.releSgDl;//sougou/sougou.html---id="releVerSg"
    //以上变量名不变
    //渠道下载变量
    var regules =  /^http[s]?\:\/\//;
    channels.forEach(function(item,i){
        //window[ item.type ] = baseChannelPath + mapChannels[item.type].url;
        if(regules.test(item.url)){
           window[ item.type ]  = item.url;
        }else{
           window[ item.type ] = baseChannelPath + mapChannels[item.type].url;
        }
    });
    flag = json.android.flag;//是否正式版标志


    // type id 下载变量 同名
    var version = json.android.version;
    var versionIos = json.ios.versionIos;
    var oldVersion = json.android.oldVersion;
    var manuVersion = json.android.manuVersion;
    //文案
    var cont730 ='';
    var len730 = json.android.cont730.length || 0;
    if(len730 > 3){
        len730 = 3;
    }
    for(var i = 0;i<len730;i++){
        var n = i+2;
        cont730 +='<p class="item5-'+ n +'">'+ json.android.cont730[i] +'</p>';
    }
    //var cont730 = '<p class="item5-2">外埠车辆无忧行</p><p class="item5-3">模拟导航提前熟悉路线</p><p class="item5-4">驾车导航方案多</p>';
    var releasecontIos ='';
    var lenIos = json.ios.releasecontIos.length || 0;
    if(lenIos >3){
        lenIos  = 3;
    }
    for(var i = 0;i < lenIos;i++){
        var n = i+2;
        releasecontIos +=  '<p class="item5-'+ n +'">'+ json.ios.releasecontIos[i] +'</p>';
    }
    var releasecont = '';
    var lenCont = json.android.releasecont.length || 0;
    if( lenCont > 3){
        lenCont = 3;
    }
    for(var i = 0;i<lenCont;i++){
        var n = i+2;
        releasecont +='<p class="item5-'+ n +'">'+ json.android.releasecont[i] +'</p>';
    }


    //首先取得访问当前界面的useragent
    var ua = navigator.userAgent.toLowerCase();
    var os;
    var Params = {};
    (function() {
        for (var a = document.location.search.substr(1).split("&"), b = 0; b < a.length; b++) {
            var c = a[b].split("=");
            Params[c[0]] = c[1]
        }
    })();
    var dis = Params.dis,
        dia = Params.dia;
        //打开链接跳转到相应的下载链接
        //M站C02110001348、神马C02110001349

    document.querySelector('.item5-title').innerHTML = releasecont;
    document.querySelector('.item5-1').innerHTML = version + '正式版本';
    if(/iphone|ipad|ipod/i.test(ua)){
        os = 'appl';
        document.querySelector('.item5-1').innerHTML = versionIos;
        document.querySelector('.item5-title').innerHTML = releasecontIos;
    }else if(/android(\s|\/)?(4|5|6|7)\.\d/.test(ua)){
        os = 'and4+';
        if(ua.match(/MicroMessenger/i) != "micromessenger" && !flag && !(/shenma/.test(location.href))){
            show('fresh')
        }
    }else if(/android(\s|\/)?((1\.(6|8))|(2\.(1|2|3)))/.test(ua)){
        os = 'and2.3-';
        document.querySelector('.item5-1').innerHTML = oldVersion;
        document.querySelector('.item5-title').innerHTML = cont730;
        //更改下载链接
    }else if(/android/.test(ua)){
        os = 'unknownAnd';
        hide('downloadMap');
        show('otherVersion');
    }else if(!Params.type){
        // location.href = 'https://mobile.amap.com';
    }


    var logServer='https://oss.amap.com/ws/h5_log?';//public

    (function() {
        (function(a, b, c, e, d, g, h) {
            a.GoogleAnalyticsObject = d;
            a[d] = a[d] || function() {
                (a[d].q = a[d].q || []).push(arguments)
            };
            a[d].l = 1 * new Date;
            g = b.createElement(c);
            h = b.getElementsByTagName(c)[0];
            g.async = 1;
            g.src = e;
            h.parentNode.insertBefore(g, h)
        })(window, document, "script", "https://www.google-analytics.com/analytics.js",
            "ga");
        ga("create", "UA-23424605-2", "amap.com");
        ga("send", "pageview");
        if (dia) {
            ga("send", "event", dia + "-view", "view", dia + "-view");
        }
        new Image().src = logServer + '&value=view&timestamp=' + new Date().getTime();
    })();

    function log(action, pageType) {
        // pageType = pageType || window.ampTpl;
        ga("send", "event", action, "click", action);
        new Image().src = logServer + '&value=' + action + '&timestamp=' + new Date().getTime();
    }

    function goTo(url) {
        setTimeout(function(){
            location.href= url;
        },200)
    }
}
var JSONP = document.createElement("script");
JSONP.type = "text/javascript";
JSONP.src = "https://cache.amap.com/h5/official/wap.json?callback=getData&t="+Date.now();
document.getElementsByTagName("head")[0].appendChild(JSONP);