/* eslint-disable */
window.onload = function() {
    var ispcorphone= browserRedirect();
    if (ispcorphone === 'pc') {
        window.location.href = 'http://map.baidu.com/zt/qudao/newfengchao1/1019801e/html/pc.html';
    } else {
        var viewHeight = $(window).height();
        // 调用一次统计函数
        setTimeout(function(){ statistics('show');},200)
        // 下面部分用于声明变量
        var flagView = 'bangdan';
        var partner = 'fengchao';
        var flagDownload = 0;
        var packageName = 'com.baidu.BaiduMap';
        var appMarket = 'market://details?id=' + packageName + '&enable_tieba_native_open=1';
        // 针对于safire浏览器universalLink的链接
        var ulink = 'https://clientmap.baidu.com/map/maplink.php?openapi=' + encodeURIComponent('baidumap://map/show?src=FCdiaoqi') + '&cburl=' + encodeURIComponent('https://map.baidu.com/zt/client/index/?down=iphone&fr=webapp_callna');
        // kewwordname是丰巢那边的关键字
        // urlSearch用于判断有没有key_word那个参数，如果没有不让程序报错
        var urlSearch = window.location.search;
        // phoneInfo 为截取出的机型字符串传给后端让后端获取机型
        var u = navigator.userAgent;
        var before = u.indexOf('(');
        var after = u.indexOf(')');
        var phoneInfo = u.slice(before + 1, after);
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // eslint-disable-next-line
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // 判断是ios且是safire浏览器
        var isSafire = isIOS && (u.indexOf('QQBrowser') === -1 && u.indexOf('UCBrowser') === -1 && u.indexOf('baiduboxapp') === -1);
        // liulanqi为传给后端的什么浏览器字段
        var liulanqi = '';
        // objData是用来存放地址栏参数的对象
        var objData = {};
        // 这个参数用于ab计划统计的ab
        var flag_download = '';
        // 系统位传给后端的安卓或者ios系统，安卓为2，ios为1
        var xitong = 0;
        // clickNum用来记录下载的点击次数，用于预防防止多次点击
        var clickNum = 0;
        // closeClick用于记录第一个红包页面的关闭按钮点击次数，防止页面不点下载一直弹出红包死循环
        var closeClick = 0;
        // red2click用于"开"多次被点击统计到，原则上开不会多次点击，这里是双重保险
        var red2click = 0;
        // ab计划的随机数，在这一期中手百ab计划的随机数
        var wayView = Math.random();
        var dukouling = '4:/^PINZHUAN10^';
        // 获取现在时间戳
        var nowTime = new Date().getTime();
        // getToken的url参数
        var tokenUrl = null;
        var tokenUrlH =null;
        var flagshijue = window.localStorage.getItem("flagshijue")
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
        // 如果地址栏缀上了uid,那么就走动态渲染的落地页
        // 判断浏览器并且赋值
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
        if (liulanqi === 'VivoBrowser' || liulanqi === 'SogouMobileBrowser') {
            $('.xiding').css('display','block');
        }
        var bangdanId = window.localStorage.getItem('bangdanid')
        // alert(bangdanId)
        if (isAndroid) {
            xitong = 2;
            // 头部卡片和浮窗的tokenUrl
            tokenUrlH = 'https://ugc.map.baidu.com/cube/feed/newhotlistpage?pass_back=' + bangdanId + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e'+ '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&user_id=' + objData.userId
            //tokenUrlH = window.location.href+ '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e';
        } else {
            xitong = 1;
            $('.yinsi1 .yinsitop1 .update').css('background-image','url(../img/yinsi/iosshijian.png)');
            tokenUrlH = 'https://ugc.map.baidu.com/cube/feed/newhotlistpage?pass_back='+ bangdanId + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=iphone&ch=1021938i'+ '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&user_id=' + objData.userId
            //tokenUrlH = 'http://map.baidu.com/zt/qudao/newfengchao1/1021938i/html/home.html' +location.search + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1021938i';
        }


        
            $('.down-apk').on('click', function () {
                var getUid = window.localStorage.getItem("uid");
                if (isAndroid) {
                    tokenUrl = 'baidumap://map/place/detail?uid='+ getUid + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e'+ '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&user_id=' + objData.userId; 
                } else {
                    tokenUrl = 'baidumap://map/place/detail?uid='+ getUid + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1021938i'+ '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&user_id=' + objData.userId;
                }
                getToken();
                if (flagshijue === 'bangdan_index'){
                    flagDownload = 'click'
                }
                if (flagshijue === 'bangdan_new') {
                    flagDownload = 'poi_click'
                }
                if (clickNum === 0) {
                    statistics('click');
                    if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                        setTimeout(function(){
                            $('.hezi').trigger("click");
                        },100)
                    }
                };
                clickNum++;
                if (flagshijue === 'bangdan_index') {
                    setTimeout(function(){
                        if (isAndroid) {
                           
                            window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                            
                        }
                        if (isIOS) {
                            if (isSafire) {
                                window.location.href = ulink;
                            } else {
                                window.location.href = 'https://apps.apple.com/app/apple-store/id452186370?pt=328057&ct=FC1021938i&mt=8';
                            }
                        }
                    },500)
                }
            });



            // 点击卡片头部按钮和浮窗按钮
            $('.down-apk1').on('click', function () {
                flagDownload = 'fuchuang_click';
                getTokenHeader();
                if (clickNum === 0) {
                    statistics('click');
                    if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                        setTimeout(function(){
                            $('.hezi').trigger("click");
                        },100)
                    }
                };
                clickNum++;
                setTimeout(function(){
                    if (u.indexOf('MiuiBrowser') > -1) {
                        window.location.href = 'baidumap://map/show?src=FCH5shantou';
                    }
                },100)
               
                if (flagshijue === 'bangdan_index') {
                    setTimeout(function(){
                        if (isAndroid) {
                           
                             window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                            
                        }
                        if (isIOS) {
                            if (isSafire) {
                                window.location.href = ulink;
                            } else {
                                window.location.href = 'https://apps.apple.com/app/apple-store/id452186370?pt=328057&ct=FC1021938i&mt=8';
                            }
                        }
                    },500)
                }
            });

        
           

        // 统计机型，浏览器，位置，的函数
        function statistics(eventType) {
            let city = 0;
            $.ajax({
                type: 'GET',
                // async: false,
                url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + eventType + '&os=' + xitong + '&browser=' + liulanqi + '&model=' + phoneInfo + '&loc_city=' + city + '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&flag_download=' + flagDownload + '&flag_view=' +  flagshijue + '&user_id=' + objData.userId,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: (res) => {
                    // console.log(res);
                },
                error: (err) => {
                    // console.log(err);
                }
            });
        }
        // 在地图里点击雨滴复制文本的方 法
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
        function getToken () {
            console.log(tokenUrl)
            $.ajax({
                type: 'GET',
                async: false,
                url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
                data:{
                    ///'activity_id': '1019801e',
                    'activity_id': '870',
                    'url': tokenUrl,
                    'source': 'fengchao',
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
        // uid头部点击请求度口令的方法
        function getTokenHeader () {
            // console.log(tokenUrlH)
            $.ajax({
                type: 'GET',
                async: false,
                url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
                data:{
                    ///'activity_id': '1019801e',
                    'activity_id': '870',
                    'url': tokenUrlH,
                    'source': 'fengchao',
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

}