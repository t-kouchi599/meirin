$(function() {
  let currentImages = [];
  let currentIndex = 0;

  // 商品画像クリック時
  $(".item").on("click", function() {
    const $item = $(this).closest(".item");
    const data = $item.data("images");

    if (data) {
      // JSON形式ならparse、それ以外はsplit
      if (String(data).trim().startsWith("[")) {
        currentImages = JSON.parse(data);
      } else {
        currentImages = String(data).split(",");
      }
    } else {
      currentImages = [$(this).attr("src")]; // fallback
    }

    currentIndex = 0;
    showGalleryImage();
    $("#gallery-modal").fadeIn();
  });


  // 表示切り替え
  function showGalleryImage() {
    $("#gallery-img").attr("src", currentImages[currentIndex]);
  }

  // 前へ
  $("#gallery-modal .prev").on("click", function() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showGalleryImage();
  });

  // 次へ
  $("#gallery-modal .next").on("click", function() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showGalleryImage();
  });

  // 閉じる
  $(".gallery-modal .gallery-close").on("click", function() {
    $(".gallery-modal").fadeOut();
  });

  // 背景クリックで閉じる
  $("#gallery-modal").on("click", function(e) {
    if ($(e.target).is("#gallery-modal")) {
      $(this).fadeOut();
    }
  });
});

