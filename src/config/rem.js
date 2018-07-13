(function(doc, win) {
    var docEl = doc.documentElement,
        /* orientationchange 事件是在用户水平或者垂直翻转设备（即方向发生变化）时触发的事件 */
        /*浏览器窗口调整触发的事件*/
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 14 * (clientWidth / 320) + 'px'; //320是iphone5的尺寸
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    /* DOMContentLoaded 先触发DOMContentLoaded（图片等外部文件还没加载完），后触发load事件 */
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
