/**
 * 划动翻页
 */
function Slider($pageWrapper, $pages, onPageChanged) {
    if (!$pageWrapper || !$pages) {
        throw new Error('usage: new Slider($pageWrapper, $pages[, onPageChanged])');
    }
    this.$pageWrapper = $pageWrapper;
    this.$pages = $pages;
    this.onPageChanged = onPageChanged;

    this.currentClass = 'current';
}
Slider.prototype.init = function() {
    var self = this;
    var pageCount = self.$pages.length;
    var pageId = 0;
    var sh = document.documentElement.clientHeight;

    self.$pages.height(sh + 'px');
    self.$pages.eq(0).addClass(self.currentClass);

    var startY, deltaY, transY,
        timer, touchId, changedTouch;
    self.$pageWrapper.on('touchstart', function(e) {
        if (e.changedTouches.length > 1) return;    // 忽略多点
        // 记录起点Y及touch id
        if (!e.touches.length) return;
        startY = e.touches[0].screenY;
        touchId = e.touches[0].identifier;
    }).on('touchmove', function(e) {
        // 手指移动时页面跟随
        e.preventDefault();
        if (timer || e.changedTouches.length > 1) return;    // 忽略多点
        // 20ms节流
        timer = setTimeout(function(){
            timer = null;
            for (var i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === touchId) {
                    changedTouch = e.changedTouches[i];
                    break;
                }
            }
            if (changedTouch) {
                deltaY = changedTouch.screenY - startY;
                // 首页下划和最后一页上划时不跟随，避免露出body背景色
                if ((pageId === 0 && deltaY > 0) || (pageId === pageCount - 1 && deltaY < 0)) {
                    // deltaY = deltaY / Math.abs(deltaY) * Math.min(Math.abs(deltaY), 150);
                    return;
                }
                transY = pageId * sh - deltaY;
                // 页面跟随
                self.$pageWrapper.css('-webkit-transform', 'translate3d(0, ' + -transY + 'px, 0)');
            }
        }, 20);
    }).on('touchend', function(e) {
        // 手指离开时翻页
        if (e.changedTouches.length > 1) return;    // 忽略多点
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        for (var i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === touchId) {
                changedTouch = e.changedTouches[i];
                break;
            }
        }
        if (changedTouch) {
            deltaY = changedTouch.screenY - startY;
            if (Math.abs(deltaY) > 50) {
                // 首页下划不翻页，最后一页上划不翻页
                if (!(pageId === 0 && deltaY > 0) && !(pageId === pageCount - 1 && deltaY < 0)) {
                    // current page
                    self.$pages.eq(pageId).removeClass(self.currentClass);
                    pageId -= deltaY / Math.abs(deltaY);
                    // update current page
                    self.$pages.eq(pageId).addClass(self.currentClass);
                    self.onPageChanged && self.onPageChanged.call(this, pageId);
                }
            }
            transY = pageId * sh;
            self.$pageWrapper.addClass('animating').css('-webkit-transform', 'translate3d(0, ' + -transY + 'px, 0)');
        }
    }).on('webkitTransitionEnd', function() {
        self.$pageWrapper.removeClass('animating');
    });
};

;!void function() {
    // 翻页控制
    var $pageWrapper = $('#amap_ul');
    var $pages = $('#amap_ul li');
    // 进度点
    var $pointWrapper = $('#amap_point');
    var $points = $pointWrapper.find('span');
    var currentPageId = 0;
    var silder = new Slider($pageWrapper, $pages, function(pageId) {
        // console.log(pageId);
        if (currentPageId >= 0) {
            $pages.eq(currentPageId).removeClass('play');
            $points.eq(currentPageId).removeClass('current');
        }
        currentPageId = pageId;
        $pages.eq(currentPageId).addClass('play');
        $points.eq(currentPageId).addClass('current');
        // 除首页外，都显示进度点
//      if (currentPageId >=0) {
//          $pointWrapper.show();
//      }
//      else {
//          $pointWrapper.hide();
//      }
    });
    silder.init();
    $pages.eq(currentPageId).addClass('play');
}();