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
