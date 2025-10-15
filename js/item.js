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
    updateDots();
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
  $(".gallery-close-top").on("click", function() {
    $(".gallery-modal").fadeOut();
  });

  let startX = 0;
  let endX = 0;

  $("#gallery-modal").on("touchstart", function(e) {
      startX = e.originalEvent.touches[0].clientX;
  });

  $("#gallery-modal").on("touchend", function(e) {
    endX = e.originalEvent.changedTouches[0].clientX;

    let diffX = endX - startX;

    // 右にスワイプしたとき（閾値30pxくらい）
    if (diffX > 30) {
      // 「前へ」と同じ処理
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showGalleryImage();
    }

    // 左にスワイプしたとき（逆方向）
    if (diffX < -30) {
      // 「次へ」と同じ処理
      currentIndex = (currentIndex + 1) % currentImages.length;
      showGalleryImage();
    }
  });

  function updateDots() {
    let html = "";
    for (let i = 0; i < currentImages.length; i++) {
      html += `<span class="${i === currentIndex ? 'active' : ''}" data-index="${i}"></span>`;
    }
    $("#gallery-dots").html(html);
  }

  $(document).on("click", "#gallery-dots span", function() {
    currentIndex = $(this).data("index");
    showGalleryImage();
    updateDots();
  });

});

