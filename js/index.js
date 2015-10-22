$(function() {
  var scroll = $(".scroll_page");
  scroll.find(".content").eq(0).show();
  scroll.scrollpage({
    scroll_child: '.page',
    easing: '',
    next: ".next",
    prev: ".prev",
    time: 1000,
    complete: function() {
      var curr = $(".curr");
      /*console.log(curr.index());*/
      curr.find(".content").slideDown(500, function() {
        curr.siblings().find(".content").slideUp(800);
      });
    }
  });

});
