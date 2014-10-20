/* *
 * 作者：TERRILLTANG
 * 作者邮箱：549697621@qq.com
 * 2014-10-16
 * Version:1.0.20
 * */
(function ($) {
    $.fn.scrollpage = function (options) {
        var opt = $.extend({
            scroll_child: '.page',
            easing: '',
            next: ".next",
            prev: ".prev",
            time: 600,
            nav: true,
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
            nav = opt.nav,
            easing = opt.easing;
        $(window).scrollTop(0);
        //if low version ie explorer;
        if (!$.support.opacity) {
            scroll_html.css("overflow", "hidden");
        }
        //disable body overflow;
        scroll_body.css("overflow", "hidden");
        //define height when init page and resize page;
        function define_height() {
            h = $(window).height();
            scroll_page.css("height", h * l + "px");
            scroll.css("height", h + "px");
            return h;
        }
        //first init page
        define_height();
        //first page add class 'curr';
        scroll.eq(0).addClass("curr");

        //mouse and key control scroll page function;
        function start_scroll(direction) {
            if (scroll_page.is(":animated") || scroll_page.find(".curr").find(":animated").length > 0) {
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
            change_class();
        }

        //change current page and current nav class name;
        function change_class() {
            scroll.eq(i).addClass("curr").siblings().removeClass("curr");
            scroll_page.find(".scroll_nav li").eq(i).addClass("curr_page").siblings().removeClass("curr_page");
        }

        //mouse scroll
        scroll_page.mousewheel(function (event) {
            event.preventDefault();
            start_scroll(event.deltaY);
        });

        //window resize;
        $(window).resize(function () {
            define_height();
            scroll_page.css({
                top: -i * h + "px"
            })
        });

        //next button;
        scroll_page.find(next).click(function (event) {
            event.preventDefault();
            start_scroll(-1);
        });
        //prev button
        scroll_page.find(prev).click(function (event) {
            event.preventDefault();
            start_scroll(1);
        });
        //keyboard control
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
        //fix firefox keyup bug;
        $(document).keydown(function (event) {
            event.preventDefault();
        });

        //if have scroll_nav;
        if (nav) {
            var nav_content = '';
            for (var j = 1; j <= l; j++) {
                nav_content += '<li>' + j + '</li>';
            }
            var append_nav = '<ol class="scroll_nav">' + nav_content + '</ol>';
            scroll_page.append(append_nav);
            scroll_page.find(".scroll_nav li").eq(i).addClass("curr_page");
            scroll_page.on("click", ".scroll_nav li", function (event) {
                event.preventDefault();
                i = $(this).index();
                if (scroll_page.is(":animated") || scroll_page.find(".curr").find(":animated").length > 0) {
                    return false;
                }
                change_class();
                scroll_page.stop().animate({
                    top: -i * h + "px"
                }, {
                    easing: easing,
                    duration: time,
                    complete: callback
                })
            })
        }
        return this;
    }
}(jQuery));