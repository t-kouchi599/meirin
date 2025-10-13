$(function () {
  let index = 0;
  const $images = $(".slideshow img");
  $images.eq(index).addClass("active");

  setInterval(() => {
    // 今の画像を消す
    $images.eq(index).removeClass("active");

    // 次の画像へ
    index = (index + 1) % $images.length;
    $images.eq(index).addClass("active");
  }, 5000); // 5秒ごとに切り替え
});