$(window).on("load", function() {
  // sessionStorageで初回判定
  if (!sessionStorage.getItem("firstLoadDone")) {
    // 初回だけアニメーション実行
    $(".brand-and")
      .fadeIn(2000) // 2秒かけてフェードイン
      .css({ opacity: 0 }) // 最初は透明
      .animate({ opacity: 1 }, 2000); // さらに3秒かけてじんわり濃くする

    $(".brand-left").addClass("animate");
    $(".brand-right").addClass("animate");

    setTimeout(function () {
      $("#loading").fadeOut(2000, function () {
        setTimeout(function() {
          slideshowShow();
        }, 500);
      });
    }, 2300);

    // フラグを保存（同じタブ内の再読み込みではスキップされる）
    sessionStorage.setItem("firstLoadDone", "true");

  } else {
    $("#loading").hide();

    setTimeout(function() {
      slideshowShow();
    }, 1000);
  }

  slideshow();

});

$(function () {
  // 最初に一回実行
  updateClock();

  // 1秒ごとに更新
  setInterval(updateClock, 1000);
});

function slideshowShow() {
  $(".slideshow")
    .css("visibility", "visible")
    .css("animation", "floatUp 3s ease-out forwards");
}

function updateClock() {
  const now = new Date();
  let h = String(now.getHours()).padStart(2, "0");
  let m = String(now.getMinutes()).padStart(2, "0");
  let s = String(now.getSeconds()).padStart(2, "0");
  $("#time-box").text(`${h}:${m}:${s}`);
}

const target = document.querySelector(".date-slot");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      slot(); // 画面に入ったら発火

      // 全部止まったあとに時計をスライド表示
      setTimeout(function() {
        $("#time-box").addClass("show");
      }, 4200); // 日付スロットが終わった直後くらい

      obs.unobserve(entry.target); // 監視解除 → 1回だけ動く
    }
  });
});
observer.observe(target);

function slot () {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  function slotAnimation($target, finalValue, delay, maxValue) {
    let counter = 0;
    let interval = setInterval(function() {
      counter++;
      $target.text(Math.floor(Math.random() * maxValue) + 1);
    }, 50);

    setTimeout(function() {
      clearInterval(interval);
      $target.text(finalValue);
    }, delay);
  }

  // 年 → 月 → 日 の順に止まる
  slotAnimation($("#year-slot"), year, 2000, 9999);
  slotAnimation($("#month-slot"), month, 3000, 12);
  slotAnimation($("#day-slot"), day, 4000, 31);
}

function slideshow () {
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
}