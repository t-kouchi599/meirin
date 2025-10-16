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

  // 再生/停止ボタン
  $("#music-play-btn").on("click", function() {
    if (bgm.paused) {
      bgm.play();
      $(this).text("■");
    } else {
      bgm.pause();
      $(this).text("♪");
    }
  });

  const $bg = $("#polka-bg");

  // カラーパレット
  const colors = ["#FF7A7A", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#FFD6A5", "#A0C4FF"];

  // ドット数を決める
  const count = 120;

  for (let i = 0; i < count; i++) {
    const size = rand(10, 40);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const color = colors[i % colors.length];
    const dur = rand(5, 12) + "s";
    const delay = (-Math.random() * 5) + "s";
    const amp = rand(20, 60) + "px";   // 縦の振幅
    const jx = rand(-30, 30) + "px";   // 横のブレ
    const scale = (rand(80, 120) / 100).toFixed(2);

    const $dot = $("<span/>", { class: "polka-dot" }).css({
      "--size": size + "px",
      "--color": color,
      "--dur": dur,
      "--delay": delay,
      "--amp": amp,
      "--jx": jx,
      "--scale": scale,
      left: x + "%",
      top: y + "%"
    });

    $bg.append($dot);
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

