var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(function() {
  // 清空导航栏，避免重复添加
  $("nav ul").empty();

  // 遍历所有的 h1, h2, h3 标签，生成导航栏项并为每个标题设置 id
  $("section h1, section h2, section h3").each(function(index){
    var id = $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + '-' + index;
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + id + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id", id);
  });

  // 滚动到相应的位置，并高亮当前激活的导航项
  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();
  $('img').on('load', sectionHeight);
});

$(function() {
  // 检查用户滚动的位置，显示或隐藏 "Back to Top" 按钮
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {  // 页面滚动超过 200px 时显示按钮
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();  // 否则隐藏按钮
    }
  });

  // 点击按钮时，平滑滚动回到页面顶部
  $('#back-to-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 400);  // 平滑滚动至顶部
    return false;  // 防止默认的点击行为
  });
});