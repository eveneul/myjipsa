// const lenisScroll = new Lenis({
//     duration: 1.6,
// 		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
// 		orientation: "vertical", // vertical, horizontal
// 		gestureOrientation: "vertical", // vertical, horizontal, both
// 		smoothWheel: true,
// 		wheelMultiplier: 2,
// 		smoothTouch: true,
// 		touchMultiplier: 1,
// 		// lerp: 1,
// 		touchInertiaMultiplier: 15,
// });


// function raf(time) {
//   lenisScroll.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)

// 집보러가요 섹션

const proxySlideItems = document.querySelectorAll(".sc-proxy .content-box .content-item")
const proxySwiperHeight = proxySlideItems[0].offsetHeight * proxySlideItems.length;
const proxySwiperWrapper = document.querySelector(".sc-proxy .content-box")
proxySwiperWrapper.style.height = proxySwiperHeight + "px"
console.log(proxySwiperHeight)


var swiper = new Swiper(".sc-proxy .swiper-container", {
  direction: 'vertical',
  slidesPerView: 1,
  // paginationClickable: true,
  mousewheelControl: true,
  parallax: true,
  speed: 600,
})