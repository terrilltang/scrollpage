/* *
 * 作者：TERRILLTANG
 * 作者邮箱：549697621@qq.com
 * 2014-10-16
 * */
(function ($) {
    $.fn.scrollpage = function (options) {
        var opt = $.extend({
            scroll_child: '.page',
            easing: '',
            next: ".next",
            prev: ".prev",
            time: 600,
            complete: function () {
            }
        }, options);
        var scroll_html = $('html'),
            scroll_body = $('body'),
            scroll_page = this,
            scroll = scroll_page.find(opt.scroll_child),
            l = scroll.length,
            h,
            i = 0,
            callback = opt.complete,
            time = opt.time,
            next = opt.next,
            prev = opt.prev,
            easing = opt.easing;

        $(window).scrollTop(0);
        if (!$.support.opacity) {
            scroll_html.css("overflow", "hidden");
        }
        scroll_body.css("overflow", "hidden");


        function define_height() {
            h = $(window).height();
            scroll_page.css("height", h * l + "px");
            scroll.css("height", h + "px");
            return h;
        }

        define_height();
        scroll.eq(0).addClass("curr");
        function start_scroll(direction) {
            if (scroll_page.is(":animated")) {
                return false;
            }

            var curr_top = parseInt(scroll_page.offset().top)
                , curr_h = parseInt($(window).height());

            if (direction < 0) {
                if (i >= l - 1) {
                    return false;
                }
                ++i;

                scroll_page.stop().animate({
                    top: curr_top - curr_h + "px"
                }, {
                    easing: easing,
                    duration: time,
                    complete: callback
                })
            }
            if (direction > 0) {
                if (i <= 0) {
                    return false;
                }
                --i;
                scroll_page.stop().animate({
                    top: curr_top + curr_h + "px"
                }, {
                    easing: easing,
                    duration: time,
                    complete: callback
                })
            }
            scroll.eq(i).addClass("curr").siblings().removeClass("curr");


        }

        scroll_page.mousewheel(function (event) {
            event.preventDefault();
            start_scroll(event.deltaY);
        });
        $(window).resize(function () {
            define_height();
            scroll_page.css({
                top: -i * h + "px"
            })
        });
        scroll_page.find(next).click(function (event) {
            event.preventDefault();
            start_scroll(-1);
        });
        scroll_page.find(prev).click(function (event) {
            event.preventDefault();
            start_scroll(1);
        });
        $(document).keyup(function (event) {
            event.stopPropagation();
            if (scroll_page.length > 0) {
                if (event.keyCode == 38) {
                    start_scroll(2);
                }
                if (event.keyCode == 40) {
                    start_scroll(-2);
                }
            }
        });
        $(document).keydown(function(event){
           event.preventDefault();
        });


        return this;
    }
}(jQuery));