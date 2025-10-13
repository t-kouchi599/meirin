$(function() {
  let slideIndex = 0;
  let slides = $(".slide");
  let dots = $(".dot");
  let timer;

  function showSlide(index) {
    slides.hide().removeClass("fade");
    dots.removeClass("active");

    slides.eq(index).show().addClass("fade");
    dots.eq(index).addClass("active");

    slideIndex = index;
  }

  function nextSlide() {
    let nextIndex = (slideIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startSlideShow() {
    timer = setInterval(nextSlide, 3000); // 3秒ごとに切替
  }

  function stopSlideShow() {
    clearInterval(timer);
  }

  // 初期表示
  showSlide(0);
  startSlideShow();

  // ドットクリック
  dots.on("click", function() {
    let index = $(this).data("index");
    showSlide(index);
    stopSlideShow();
    startSlideShow(); // クリック後も自動再生を継続
  });
});
