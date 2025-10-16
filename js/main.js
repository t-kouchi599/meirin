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

  // 横幅に応じてカード数を決定する
  function setGridColumns() {
    var width = $(window).width();
    var columns = 2; // 600pxまでは2列固定

    if (width > 600) {
      columns += Math.floor((width - 600) / 200) + 1;
    }

    $(".services").css("grid-template-columns", "repeat(" + columns + ", 1fr)");
  }

  setGridColumns();

  // ウィンドウサイズ変更時にも実行
  $(window).resize(function() {
    setGridColumns();
  });

  // 音楽再生
  const bgm = $("#bgm")[0];

  // 前回の再生秒数を復元
  const savedTime = sessionStorage.getItem("bgmTime");
  if (savedTime) {
    bgm.currentTime = parseFloat(savedTime);
  }

  // 再生状態を復元
  if (sessionStorage.getItem("bgmPlaying") === "true") {
    bgm.play();
    $("#music-play-btn").text("■");
  }

  // 再生/停止ボタン
  $("#music-play-btn").on("click", function() {
    if (bgm.paused) {
      bgm.play();
      $(this).text("■");
      sessionStorage.setItem("bgmPlaying", "true");
    } else {
      bgm.pause();
      $(this).text("♪");
      sessionStorage.setItem("bgmPlaying", "false");
    }
  });

  // 定期的に現在の再生秒数を保存
  bgm.addEventListener("timeupdate", function() {
    sessionStorage.setItem("bgmTime", bgm.currentTime);
  });
});

