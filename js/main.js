$(function() {
  $("#header").load("header.html", function() {
    $("#menu-btn").on("click", function () {
      const $btn = $(this);
      const $menu = $("#menu");

      $btn.toggleClass("open");
      $menu.toggleClass("show");

      if ($menu.hasClass("show")) {
        $("body").css("overflow", "hidden");   // スクロール禁止
      } else {
        $("body").css("overflow", "auto");     // スクロール解除
      }
    });

    // メニュー内リンクを押したら閉じる
    $("#menu a").on("click", function () {
      $("#menu").removeClass("show");
      $("#menu-btn").removeClass("open");
      $("body").css("overflow", "auto");       // スクロール解除
    });
  });

  $("#footer").load("footer.html");
  $("#footer-menu").load("footer-menu.html");

  $('.scroll-top').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500); // 0.5秒でトップへ
  });

  // スクロール時・ロード時に判定
    $(window).on("scroll load", function() {
      $(".fade-up").each(function() {
        const elemTop = $(this).offset().top;     // 要素の位置
        const scroll = $(window).scrollTop();     // スクロール量
        const windowHeight = $(window).height();  // ウィンドウ高さ

        // 画面の下から20%見えたら発火
        if (scroll > elemTop - windowHeight * 0.8) {
          $(this).addClass("show");
        }
      });
    });
});

