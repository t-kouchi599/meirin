$(window).on("load", function() {
  // sessionStorageで初回判定
  if (!sessionStorage.getItem("firstLoadDone")) {
    // 初回だけアニメーション実行
    $(".brand-left").addClass("animate");
    $(".brand-right").addClass("animate");

    setTimeout(function() {
      $("#loading").fadeOut(2000);
    }, 2300);

    // フラグを保存（同じタブ内の再読み込みではスキップされる）
    sessionStorage.setItem("firstLoadDone", "true");
  } else {
    // 2回目以降はすぐ非表示
    $("#loading").hide();
  }
});

$(function () {
  let index = 0;
  const $images = $(".slideshow img");

  // 最初の画像にもアニメーションがかかる
  $images.eq(index).addClass("active");

  setInterval(() => {
    // 現在の画像を非表示にする
    $images.eq(index).removeClass("active");

    // 次の画像に進む
    index = (index + 1) % $images.length;

    // 次の画像に active を付ける（アニメーション開始）
    $images.eq(index).addClass("active");
  }, 5000);
});
