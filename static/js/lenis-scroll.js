export const lenisScroll = new Lenis({
    duration: 1,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
		orientation: "vertical", // vertical, horizontal
		gestureOrientation: "vertical", // vertical, horizontal, both
		smoothWheel: true,
		wheelMultiplier: 2,
		smoothTouch: true,
		touchMultiplier: 1,
		// lerp: 1,
		touchInertiaMultiplier: 15,
});


function raf(time) {
  lenisScroll.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)