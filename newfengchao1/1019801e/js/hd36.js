/* eslint-disable */
// 插入玉门关查看爬虫平台
(function (){
    var script = document.createElement("script");
    script.src = 'https://dlswbr.baidu.com/heicha/mw/abclite-2089-s.js?v=' + Math.random();
    document.body.appendChild(script);
    script.onerror = function() {
        start();
    }
})();

var seckey = '';
window['__abbaidu_2089_cb'] = function (responseData) { 
    // TODO: 返回数据处理，如:写入Cookie，方便传给后端进行解析 };
    try {
        seckey = JSON.parse(responseData).data;
    } catch {

    }
    start();
}

window['__abbaidu_2089_subidgetf'] = function () {
    var subid = 'fengchao'; // ⻓度不超过40的字符串。
    return subid;
}





function start() {
    var ispcorphone= browserRedirect();
    if (ispcorphone === 'pc') {
        $('body').css({'display': 'none'});
            window.location.href = 'http://map.baidu.com/zt/qudao/newfengchao1/1019801e/html/pc.html';
    } else {
        var viewHeight = $(window).height();
        // 获取所有的按钮
        var btn = document.querySelectorAll('.content');
        if (viewHeight > 680) {
            $('.poijingzhun_new .cardbottom').css('height','2rem');
        } 
        if (viewHeight < 680) {
            // $('.lukuang_newbox').css('height','120%');
            $('.poijingzhun_new').css('height','110%');
            $('.weizhang_newbox .phone').css('top','4.90rem');
            $('.zhoubian_newbox').css('height','150%');
            $('.zhoubian_newbox .yinsi1').css('margin-top','22.2rem');
        }
        if (viewHeight < 590) {
            $('#allmap').css('height','8rem');
            $('.poijingzhun_new').css('height','120%');
            $('.close').css('bottom', '-9%');
        };
        if (viewHeight < 540) {
            $('.weizhang_newbox').css('height','150%');
            $('.zhoubian_newbox').css('height','150%');
            $('.dache_newbox .logo').css('top','.433rem')
            $('.dache_newbox .man').css('top','1.5rem');
            $('.dache_newbox .title').css('top','1.42rem');
            $('.dache_newbox .title-bottom').css('top','2.52rem');
            $('.dache_newbox .car').css('top','6.2rem');
            $('.dache_newbox .card').css('top','8.69rem');
            $('.dache_newbox .wenzi').css('top','10.5rem');
            $('.dache_newbox .download-btn').css('top','11.5rem');
            $('.dache_newbox .zibottom').css('top','13rem');
        }
        // 一进入页面让安装了百度地图app的去调起地图
        iframeCallup('baidumap://map/show?src=FCdiaoqi');
        // 调用一次统计函数
        statistics('show');

        // 下面部分用于声明变量
        var flagView = '';
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
        var flag_download = 0;
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
        var chachuan = null;
        // 要复制的东西
        var bbb =null;
        var dukouling = '4:/^PINZHUAN10^';
        // 获取现在时间戳
        var nowTime = new Date().getTime();
        // getToken的url参数
        var tokenUrl = null;
        // uv的百度id
        var baiduid = getCookie('BAIDUID');
        var other = {};
        other.baiduid = baiduid;
        // 给后端传的other
        var otherfire = encodeURIComponent(JSON.stringify(other));



        // 页面逻辑
        if (wayView > 0.1 ) {
            // swiper 初始化dom必须容器有宽高,新的轮播图配置
        }else {
            // 旧通用落地页轮播图配置
            var currentIndex = -1;
                // eslint-disable-next-line
                var swiper = new Swiper('.swiper-container1', {
                    direction: 'vertical',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    paginationClickable: true,
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    loop: true,
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
        }
       
        // 创建地图实例
        var map = new BMap.Map('allmap');
        map.centerAndZoom(new BMap.Point(116.403963,39.915119), 15);
        map.setCurrentCity("");
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
        if (urlSearch.indexOf('uid') > -1) {
                flagView = 'poijingzhun_new';
                $('.main').css({'display': 'none'});
                $('.poijingzhun_new').css('display','block');
                // 调用画地图的方法
                setTimeout(function() {
                    setMap();
                },200)
        } else {
            // 如果地址栏没有缀上uid再走个性落地页
            if (urlSearch.indexOf('key_word') > -1) {
                // eslint-disable-next-line
                fc.query.key_word.then((res)=>{
                    var keywordname = res;
                    console.log(keywordname)
                    switch (true) {
                        case keywordname.indexOf('街景') > -1 || keywordname.indexOf('全景') > -1 || keywordname.indexOf('实景') > -1 || keywordname.indexOf('时光机') > -1:
                            // 展示定位
                            flagView = 'jiejing_new';
                            break;
                        case keywordname.indexOf('路况') > -1:
                            // 展示定位
                            flagView = 'lukuang_new';
                            break;
                        // eslint-disable-next-line
                        case keywordname.indexOf('违章') > -1 || keywordname.indexOf('123123') > -1 || keywordname.indexOf('12123') > -1:
                            // 展示违章
                            flagView = 'weizhang_new';
                            break;
                        case keywordname.indexOf('定位') > -1:
                            // 展示定位
                            flagView = 'dingwei_new';
                            break;
                        case keywordname.indexOf('附近') > -1 || keywordname.indexOf('最近') > -1:
                            // 展示周边
                            flagView = 'zhoubian_new';
                            break;
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
                    // 如果是个性落地页，地铁除外
                    if (flagView !== 'index') {
                        $('.wrapbox').css({'display': 'none'});
                        $(boxname).css({'display': 'block'});
                        // 是苹果且不是地铁落地页
                    } else {
                        $('.main').css({'display': 'block'});
                        if (wayView  > 0.1) {
                            $('.wrapbox').css('display','none')
                            $('.newIndexbox').css('display','block');
                            flagView = 'fengchao_0908'
                            tongyongLunbo();
                        }else {
                            $('.wrapbox').css('display','block')
                            $('.main').css({'visibility': 'visible'});
                            $('main').css('display','block')
                            flagView = 'index_old'
                        }   
                    }
                });
            } else {
                // 如果地址栏没有参数的情况下展示index落地页
                if (wayView > 0.1) {
                    $('.wrapbox').css('display','none');
                    $('.newIndexbox').css('display','block');
                    flagView = 'fengchao_0908';
                    tongyongLunbo();
                
                }else {
                    $('.wrapbox').css('display','block')
                    $('.main').css({'visibility': 'visible'});
                    $('main').css('display','block')
                    flagView = 'index_old'
                }
            }
        }
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

        var useridchuan = fc.query.user_id;
        if (isAndroid) {
            // 如果是安卓，才给flag_download字段赋值
            flag_download = '';
            xitong = 2;  
        } else {
            xitong = 1;
        }
        $('.down-apk').on('click', function () {
            if (clickNum === 0) {
                statistics('click');
                getchal(useridchuan);
                setTimeout(function(){
                    textCopy(bbb);
                }, 500)
                if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                    setTimeout(function(){
                        $('.hezi').trigger("click");
                    },100)
                }
            };
            clickNum++;
            setTimeout(function(){
                if (isAndroid) {
                    if (liulanqi !== 'UCBrowser') {
                        if (useridchuan == 1381622 || useridchuan == 1381057) {
                            console.log(111)
                            window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                        } else if (useridchuan == 1381840) {
                            window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1021938k.apk';
                        } else {
                            window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                        }
                       
                    } else {
                        iframeCallup(appMarket)
                    }
                }
                if (isIOS) {
                    if (isSafire) {
                        window.location.href = ulink;
                    } else {
                        window.location.href = 'https://apps.apple.com/app/apple-store/id452186370?pt=328057&ct=FC1021938i&mt=8';
                    }
                }
            },500)
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
            function setInfo(city,type) {
                $.ajax({
                    type: 'GET',
                    // async: false,
                    url: 'http://integralwall.baidu.com/integralwall/interact/landingrecoder?partner=fengchao&event_type=' + eventType
                        + '&os=' + xitong
                        + '&browser=' + liulanqi
                        + '&model=' + phoneInfo + '&loc_city=' + city + '&plan_id=' + objData.planId + '&unit_id=' + objData.unitId + '&idea_id=' + objData.ideaId + '&word_id=' + objData.wordId + '&flag_download=' + flag_download + '&flag_view=' +  flagView + '&user_id=' + objData.userId + '&seckey=' +seckey+ '&other=' + otherfire,
                    dataType: 'jsonp',
                    jsonpCallback: 'callback10',
                    success: (res) => {
                        // console.log(res)
                    },
                    error: (err) => {
                        // console.log(err);
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
                event.stopPropagation();
                event.preventDefault();
            });
            // 点击开去端内而且统计
            $('.open').on('click', function (event) {
                // 获取度口令并且复制
                getchal(useridchuan);
                if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                    setTimeout(function(){
                        $('.hezi').trigger("click");
                    },100)
                }
                if (red2click === 0) {
                    statistics('red1click');
                };
                red2click++;
                // 下面是执行了复制度口领
                // eslint-disable-next-line
                setTimeout(function () {
                    iframeCallup('baidumap://map/show?src=FChongbao');
                }, 100);
            });
            // 调起百度地图的方法
        })();
        // h5唤醒app的方法
        function iframeCallup(app) {
            var ifr = document.createElement('iframe');
            ifr.src = app;
            ifr.style.display = 'none';
            var bodys = document.body || document.getElementsByTagName('body')[0];
            bodys.appendChild(ifr);
            setTimeout(function () {
                bodys.removeChild(ifr);
            }, 0);
            if (app !== 'baidumap://map/show?src=FCdiaoqi') {
                setTimeout(function () {
                    if (isAndroid) {
                        window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                    } else {
                        window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
                    }
                }, 3000);
            }
        }
        // 在地图上画点控件以及动态渲染内容的方法
        function setMap() {
            var uidData = fc.query.uid;
            $.ajax({
                url: 'http://integralwall.baidu.com/integralwall/interact/querypoi',
                data: {
                    uid:fc.query.uid,
                },
                type: 'GET',
                // dataType: 'jsonp',
                success: (result) => {
                    var res= JSON.parse(result)
                    console.log(res);
                    // 这是并发和uid错误的情况
                    if (res.data.status == 401 || res.data.status == 2) {
                        // bca-disable-line
                        $('.poijingzhun_new .title').html('天安门');
                        // bca-disable-line
                        $('.poijingzhun_new .cardtop .address').html('天安门');
                        // bca-disable-line
                        $('.poijingzhun_new .addressim').html('北京市东城区东长安街');
                    }
                    if (res.data.status === 0) {
                        // bca-disable-line
                        $('.poijingzhun_new .title').html(res.data.result.name);
                        // bca-disable-line
                        $('.poijingzhun_new .cardtop .address').html(res.data.result.name);
                        // bca-disable-line
                        $('.poijingzhun_new .addressim').html(res.data.result.address);
                        // var myIcon = new BMap.Icon("../img/map/yudi3.png", new BMap.Size(66, 75));
                        var new_point = new BMap.Point(res.data.result.location.lng,res.data.result.location.lat);
                        var marker = new BMap.Marker(new_point,{
                        });  // 创建标注
                        map.addOverlay(marker);              // 将标注添加到地图中
                        map.panTo(new_point);
                        marker.addEventListener('click',function(){
                            getchal(useridchuan);
                            if (liulanqi === 'VivoBrowser' || liulanqi === 'HeyTapBrowser' || liulanqi === 'SogouMobileBrowser') {
                                setTimeout(function(){
                                    $('.hezi').trigger("click");
                                },100)
                            }
                            setTimeout( function(){
                                if (isAndroid) {
                                    window.location.href = 'https://downpack.baidu.com/baidumap_AndroidPhone_1019801e.apk';
                                } else {
                                    window.location.href = 'itms-apps://itunes.apple.com/cn/app/bai-du-di-tu/id452186370?mt=8';
                                }
                            },300)
                        }) 
                    }   
                },
                error: (err) => {
                    console.log(err);
                    $('.main').css({'visibility': 'visible'});
                    flagView = 'index';
                }
            })
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
        // 添加定位控件
        var locationControl = new BMap.GeolocationControl({
            // 控件的停靠位置
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            // 控件基于停靠位置的偏移量（可选）
            offset: new BMap.Size(10, 10)
        });
        // 将控件添加到地图上
        map.addControl(locationControl);
        // 添加定位事件
        locationControl.addEventListener("locationSuccess", function(e){
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
        });
        locationControl.addEventListener("locationError",function(e){
        });
        // 点击放大地图控件
        function ZoomControl1() {
            this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
            this.defaultOffset = new BMap.Size(13, 45)
        }
        ZoomControl1.prototype = new BMap.Control();
        ZoomControl1.prototype.initialize = function(map) {
                //创建一个dom元素
                var odiv = document.createElement('div');
                //添加文字说明
                // div.appendChild(document.createTextNode('+'));
                // 设置样式
                odiv.style.width = '32px';
                odiv.style.height = '32px';
                var odiv1 = document.createElement('div');
                odiv.appendChild(odiv1);
                odiv1.style.width = '20px';
                odiv1.style.height = '20px';
                // div.style.fontSize = '20px';
                // div.style.lineHeight = '32px';
                // div.style.textAlign = 'center';
                odiv1.style.background = 'url(../img/map/jiahao1.png) no-repeat  center center';
                odiv1.style.backgroundSize = '100% 100%'
                odiv.style.cursor = 'pointer';
                odiv.style.backgroundColor = 'white';
                odiv.style.position = 'relative';
                odiv1.style.position = 'absolute';
                odiv1.style.left = '50%';
                odiv1.style.top = '50%';
                odiv1.style. transform = 'translate(-50%, -50%)';
                // 绑定事件,点击一次放大两级
                odiv.onclick = function(e){
                    map.setZoom(map.getZoom() + 1);
                }
                // 添加DOM元素到地图中
                map.getContainer().appendChild(odiv);
                // 将DOM元素返回
                return odiv;
            }
            var myZoomCtrl1 = new ZoomControl1();
            //添加到地图中
            map.addControl(myZoomCtrl1)
        // 缩小控件
        function ZoomControl2() {
            this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
            this.defaultOffset = new BMap.Size(13, 10)
        }
        ZoomControl2.prototype = new BMap.Control();
        ZoomControl2.prototype.initialize = function(map) {
            var odiv = document.createElement('div');
            //添加文字说明
            // div.appendChild(document.createTextNode('+'));
            // 设置样式
            odiv.style.width = '32px';
            odiv.style.height = '32px';
            var odiv1 = document.createElement('div');
            odiv.appendChild(odiv1);
            odiv1.style.width = '18px';
            odiv1.style.height = '18px';
            // div.style.fontSize = '20px';
            // div.style.lineHeight = '32px';
            // div.style.textAlign = 'center';
            odiv1.style.background = 'url(../img/map/jianhao1.png) no-repeat  center center';
            odiv1.style.backgroundSize = '100% 100%'
            odiv.style.cursor = 'pointer';
            odiv.style.backgroundColor = 'white';
            odiv.style.position = 'relative';
            odiv1.style.position = 'absolute';
            odiv1.style.left = '50%';
            odiv1.style.top = '50%';
            odiv1.style. transform = 'translate(-50%, -50%)';
            // 绑定事件,点击一次放大两级
            odiv.onclick = function(e){
                map.setZoom(map.getZoom() + 1);
            }
            // 添加DOM元素到地图中
            map.getContainer().appendChild(odiv);
            // 将DOM元素返回
            return odiv;
            }
            var myZoomCtrl2 = new ZoomControl2();
            //添加到地图中
            map.addControl(myZoomCtrl2);
        // 点击获取度口令的方法
        function getToken (tokenurl) {
            $.ajax({
                type: 'GET',
                async: false,
                url:'https://newclient.map.baidu.com/client/maptoken/gettoken',
                data:{
                    ///'activity_id': '1019801e',
                    'activity_id': '627',
                    'url':tokenurl,
                    'source': 'fengchao',
                },
                dataType: 'jsonp',
                // jsonpCallback: 'callback',
                success: (res) => {
                    bbb = res.data.token
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
    // 凤巢通用落地页轮播图
    function tongyongLunbo (){
        var currentIndex1 = -1;
        var swiper1 = new Swiper('.tongyong-banner', {
            loop: true,
            speed: 100,
            autoplay: {
                delay: 2000,
                stopOnLastSlide: true,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: ".swiper-pagination"
            },
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: -50,
            effect : 'coverflow',
            coverflow: {
                rotate: 30,// 旋转的角度
                stretch: 10,// 拉伸   图片间左右的间距和密集度
                depth: 60,// 深度   切换图片间上下的间距和密集度
                modifier: 2,// 修正值 该值越大前面的效果越明显
                slideShadows : false// 页面阴影效果
            },
            on: {
                slideChange: function () {
                    currentIndex1 = this.realIndex;
                    // console.log(currentIndex1)
                    if (currentIndex1 === 0) {
                        // $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/daohangtitle.png) no-repeat center center");
                        // $('.topsmzi').css({"background-size":"100% 100%"})
                        $('.ssstu').css('opacity','1');
                        $('.topsmzi').css({"background-size":"0% 0%"});
                       
                    }
                    if (currentIndex1 === 1) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/daohangtitle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"})
                        $('.ssstu').css('opacity','0');
                    }
                    if (currentIndex1 === 2) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/yuyintitle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"})
                        $('.ssstu').css('opacity','0');
                    }
                    if (currentIndex1 === 3) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/bustitle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"});
                        $('.ssstu').css('opacity','0');
                    }
                    if (currentIndex1 === 4) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/fujintitle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"})
                        $('.ssstu').css('opacity','0');
                    }
                    if (currentIndex1 === 5) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/shiguangjititle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"})
                        $('.ssstu').css('opacity','0');
                    }
                    if (currentIndex1 === 6) {
                        $('.topsmzi').css("background","url(../img/newnewimg/smalltitle/jiayoutitle.png) no-repeat center center");
                        $('.topsmzi').css({"background-size":"100% 100%"});
                        $('.ssstu').css('opacity','0');
                    }
                }
            }
        })
    }
    getBrand();
    setTimeout(function(){
        $('.bannerya').css('opacity','0');
        $('.newIndexbox .tongyong-banner .swiper-wrapper').css('opacity','1');
    },1900)




    // 获取版本号
    function getBrand () {
        $.ajax({
            type: 'GET',
            async: false,
            // eslint-disable-next-line
            // url: 'http://yq01-ns-map392.yq01.baidu.com:8092/iadcchannel/main/landingmapversion',
            url: 'https://integralwall.baidu.com/integralwall/interact/landingmapversion',
            dataType: 'jsonp',
            jsonpCallback: 'callback2',
            success: (res) => {
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
            }
        });
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
    // 获取版本号函数
    function getchal (qudaoid) {
        if (qudaoid) {
            $.ajax({
                type: 'GET',
                async: true,
                // eslint-disable-next-line
                // url: 'http://yq01-ns-map392.yq01.baidu.com:8092/iadcchannel/main/landingchanneldetail?user_id='+qudaoid,
                url: 'https://integralwall.baidu.com/integralwall/interact/landingchanneldetail?user_id='+ qudaoid,
                dataType: 'jsonp',
                jsonpCallback: 'callback4',
                success: (res) => {
                    if (res.data.length > 0) {
                        chachuan = res.data[0].channel;
                        if (isAndroid) {
                            if (useridchuan) {
                                tokenUrl = window.location.href+ '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch='+ chachuan;
                            } else {
                                tokenUrl = window.location.href+ '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e';
                            }
                        } else {
                            if (useridchuan) {
                                tokenUrl = 'http://map.baidu.com/zt/qudao/newfengchao1/1021938i/html/home.html' +location.search + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=' + chachuan;
                            } else {
                                tokenUrl = 'http://map.baidu.com/zt/qudao/newfengchao1/1021938i/html/home.html' +location.search + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1021938i';
                            }
                        }
                        console.log(tokenUrl)
                        getToken(tokenUrl)

                        // window.sessionStorage.setItem('chachuan',chachuan);  
                    }
                },
                error: (err) => {
                    if (isAndroid) {
                        getToken( window.location.href+ '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e')
                    } else {
                        getToken('http://map.baidu.com/zt/qudao/newfengchao1/1021938i/html/home.html' +location.search + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1021938i')
                    }
                   
                }
            });
        } else {
            console.log("我走到这了")
            if (isAndroid) {
                getToken( window.location.href+ '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling  + '&partner=' + partner +'&os=Android&ch=1019801e')
            } else {
                getToken('http://map.baidu.com/zt/qudao/newfengchao1/1021938i/html/home.html' +location.search + '&clickTime=' + nowTime + '&random=' + wayView + '&dukouling=' + dukouling + '&partner=' + partner + '&os=iphone&ch=1021938i')
            }
        } 
    }
}
