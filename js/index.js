$(function() {
  let index = 0;
  const images = document.querySelectorAll(".slideshow img");

  images[index].classList.add("active");

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 5000);
});
