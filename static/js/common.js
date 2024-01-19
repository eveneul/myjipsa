import { lenisScroll } from "./lenis-scroll.js";

lenisScroll.on("scroll", event => {

  // Header
    if (event.scroll > 300) {
      $(header).addClass("scroll")
      if (event.direction === 1) {
        $(header).addClass("down")
      } else {
        $(header).removeClass("down")
      }
    } else {
      $(header).removeClass("scroll")
    }
})