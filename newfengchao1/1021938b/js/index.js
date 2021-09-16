//判断是ios 还是 andr   
var u = navigator.userAgent; 
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
var liulanqi = null;
var device_type = navigator.userAgent; //获取userAgent 信息
if (device_type.indexOf('HuaweiBrowser')) {
    liulanqi = 'HuaweiBrowser'
} else if (device_type.indexOf('MiuiBrowser')) {
    liulanqi = 'MiuiBrowser'
} else if (device_type.indexOf('QQBrowser')) {
    liulanqi = 'QQBrowser'
} else if (device_type.indexOf('UCBrowser')) {
    liulanqi = 'UCBrowser'
} else if (device_type.indexOf('VivoBrowser')) {
    liulanqi = 'VivoBrowser'
} else if (device_type.indexOf('baiduboxapp')) {
    liulanqi = 'baiduboxapp'
} else if (device_type.indexOf('Safari')) {
    liulanqi = 'Safari'
} else if (device_type.indexOf('HeyTapBrowser')) {
    liulanqi = 'HeyTapBrowser'
} else {
    liulanqi = 'qita'
}
var md = new MobileDetect(device_type); //初始化mobile-detect 
var os = md.os(); //获取系统 
var model = "";
if (os == "iOS") { //ios系统的处理 
    os = md.os() + md.version("iPhone");
    model = md.mobile();
} else if (os == "AndroidOS") { //Android系统的处理 
    os = md.os() + md.version("Android");
    var sss = device_type.split(";");
    var i = sss.contains("Build/");
    if (i > -1) {
        model = sss[i].substring(0, sss[i].indexOf("Build/"));
    }
}
var sHref = window.location.href;
var objData = {
    plan_id: '',
    unit_id: '',
    idea_id: '',
    word_id: ''
};
    if(sHref.indexOf('?') > -1){
        var args = sHref.split('?');
        var arr = args[1].split('&');
        
    for(var i = 0;i< arr.length;i++){
        var arg = arr[i].split('=');
        if (objData.hasOwnProperty(arg[0])) {
            objData[arg[0]] = arg[1];
        }
    }  
}

var flag_diaoqi = 0;
var duna = os
var xitong = null;
if(duna.indexOf('Android') > -1) {
    xitong = 2
}else{
    xitong = 1
}
    statistics('show')
if (isAndroid) {
    //$(".content a").attr('href','https://downpack.baidu.com/baidumap_AndroidPhone_1012337j.apk');
    $('.content a').css({ 'background': 'url(../img/andr.jpg) no-repeat 0.25rem center', 'background-size': '0.35rem 0.4rem' });
} else if (isIOS) {
    $('.content a').attr('href', 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8');
    // $('.content a').css({ 'background': 'url(../img/app.jpg) no-repeat 0.25rem center', 'background-size': '0.325rem 0.3625rem' });
    window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
}

$('#down-apk').on('click',function () {
    statistics('click').then(()=>{  
    })
    if (isAndroid) {
        // var ifr = document.createElement("iframe");
        // var userAgent = navigator.userAgent;
        // console.log(userAgent)
        // if (userAgent.indexOf('MI') > -1 || userAgent.indexOf('Mi') > -1 || userAgent.indexOf('Redmi') > -1) {
        //     ifr.src = 'mimarket://details?id=com.baidu.BaiduMap&back=true&enable_tieba_native_open=1' /***打开app的协议，如zhe800://goto_home***/
        // } else if (userAgent.indexOf('HUAWEI') > -1 || userAgent.indexOf('HONOR') > -1) {
        //     ifr.src = 'appmarket://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1'
        // } else if (userAgent.indexOf('OPPO') > -1) {
        //     ifr.src = 'oppomarket://details?packagename=com.baidu.BaiduMap&enable_tieba_native_open=1'
        // } else if (userAgent.indexOf('VIVO') > -1 || userAgent.indexOf('vivo') > -1 || (model.slice(0, 2)=== 'V1' || model.slice(0, 2)=== 'V2')) {
        //     console.log(111)
        //     ifr.src = 'vivomarket://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1'
        // } else if (userAgent.indexOf('SM-') > -1 || userAgent.indexOf('SAMSUNG') > -1) {
        //     console.log('sanxing')
        //     ifr.src = 'samsungapps://ProductDetail/com.baidu.BaiduMap?enable_tieba_native_open=1'
        //     console.log(1,'woshianzhuo')
        //  ifr.style.display = "none";
        // document.body.appendChild(ifr);
        console.log(1234567656789098765);
        // ifr.src = 'market://details?id=com.baidu.BaiduMap&enable_tieba_native_open=1';
        window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1021938b.apk';
        // console.log(1,'woshianzhuo')
        // ifr.style.display = "none";
        //console.log(ifr);
        //document.body.appendChild(ifr);
        // let obj = statistics('click')
        // console.log(isAndroid, isIOS);     
    }  
});
// 判断微信浏览器
// 统计机型，浏览器，位置，的函数
async function  statistics(event_type) {
    function getData() {
        return new Promise((resolve)=> {
            $.ajax({
                type: 'GET',
                async: false,
                url: 'http://api.map.baidu.com/location/ip?ak=a1GMyGLfyC5UiSGAucCGASgOHAFrTGdQ&ip=' + returnCitySN.cip + '&coor=bd09ll',
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: (res) => {
                   const city = res.content.address_detail.city;
                   resolve(city)
                },
                error: (err) => {
                    console.log(err)
                }
            })
        })
    }
    city = await getData();
    $.ajax({
        type: 'GET',
        async: false,
        url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + event_type + '&os=' + xitong + '&browser='+liulanqi+'&terminal=' + model + '&loc_city=' + city + '&plan_id=' + objData.plan_id +'&unit_id=' + objData.unit_id + '&idea_id=' + objData.idea_id + '&word_id=' + objData.word_id+ '&flag_diaoqi=' + flag_diaoqi,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: (res) => {
            console.log(190)
        },
        error: (err) => {
            console.log(err)
        }
    })
    if(event_type === 'click') {
        function getData2() {
            return new Promise((resolve)=> {
                $.ajax({
                    type: 'GET',
                    async: false,
                    url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
                    data:{
                        'activity_id': '626',
                        'url': encodeURIComponent('http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + event_type + '&os=' + xitong + '&browser='+liulanqi+'&terminal=' + model + '&loc_city=' + city + 'plan_id=' + objData.plan_id +'&unit_id=' + objData.unit_id + '&idea_id=' + objData.idea_id + '&word_id=' + objData.word_id+ '&flag_diaoqi=1'),
                        'source': 'download_page'
                    },
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: (res) => {
                        resolve(res.data.token)
                    },
                    error: (err) => {
                        console.log(err)
                    }
                })
            })
        }
        var dukouling = await getData2()
        var clipboard = new ClipboardJS('#down-apk',{
            text: function() {
                return dukouling;
            }
        });
        // 复制成功的回调
        clipboard.on('success', function(e) {
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
        console.log('woyaofanhuipromise')

    }
    return new Promise((resolve,reject)=>{
        resolve()
    })
}

