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

$(".select-box").click(function(e)  {
  if (e.currentTarget !== e.target) return;
  const top = e.target.offsetTop + e.target.clientHeight + 12
  $(".select-box-options").toggleClass("active")
  $(".select-box-options").css("top", `${top}px`)
})

$(".select-box-option").click(function (e) {
  const value = $(e.currentTarget).text()
  $(".select-box span").text(value)
  $(".select-box-options").removeClass("active")
})

$("body").click(function(e) {
  if ($(".select-box-options").hasClass("active")) {
    if (!$(e.target).is(".select-box-options, .select-box-option")) {
      $(".select-box-options").removeClass("active");
    }
  }
});
