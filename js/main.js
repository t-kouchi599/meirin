$(function() {
  $("#header").load("header.html", function() {
    $("#menu-btn").on("click", function() {
      $("#menu").toggleClass("show");   // メニューの表示/非表示切り替え
      $(this).toggleClass("open");      // ボタンの見た目変える用（任意）
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

