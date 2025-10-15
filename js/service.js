$(function () {
  star();
});

function star() {
  const $canvas = $("#shooting-stars");
  const canvas = $canvas[0];
  const ctx = canvas.getContext("2d");

  function resize() {
    $canvas.attr("width", $(window).width());
    $canvas.attr("height", $(window).height());
  }
  resize();
  $(window).on("resize", resize);

  function ShootingStar() {
    this.reset(true);
  }

  ShootingStar.prototype.reset = function (first = false) {
    this.x = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.2);
    this.y = Math.random() * (canvas.height * 0.6);
    this.length = Math.random() * 120 + 60;
    this.speed = Math.random() * 3 + 1.5;
    this.angle = (3 * Math.PI) / 4 + (Math.random() * 0.2 - 0.1);
    this.opacity = 0.8 + Math.random() * 0.2;
    this.size = Math.random() * 2 + 1.5; // 星の頭の大きさ
    this.delay = first ? 0 : Math.random() * 200;
  };

  ShootingStar.prototype.update = function () {
    if (this.delay > 0) {
      this.delay--;
      return;
    }
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.003;
    if (this.opacity <= 0 || this.y > canvas.height || this.x < 0) {
      this.reset();
    }
  };

  ShootingStar.prototype.draw = function () {
    if (this.delay > 0) return;

    // 尾をグラデーションで描く
    const grad = ctx.createLinearGradient(
      this.x, this.y,
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    grad.addColorStop(0, "rgba(255,255,255," + this.opacity + ")");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    ctx.stroke();

    // 星の先端（頭）
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  let stars = [];
  for (let i = 0; i < 12; i++) {
    stars.push(new ShootingStar());
  }

  function animate() {
    // 背景を消さずに星だけ描画（画像はCSSや別のレイヤーで表示）
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    $.each(stars, function (_, star) {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}