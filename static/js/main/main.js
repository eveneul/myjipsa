import { Common } from "../common.js";
import InviewObserver from "../InteractionObserver.js";
import MainInteraction from "./interaction.js";

const interaction = new MainInteraction();
interaction.proxyContentAnimation();
interaction.visitContentAnimation();
interaction.textFadeIn($("[data-scroll-target]"));
// interaction.textFadeIn(document.querySelectorAll(".sc-category"));
// interaction.textFadeIn(document.querySelectorAll(".sc-title"));
// interaction.textFadeIn(document.querySelectorAll(".sc-desc"));
// interaction.textFadeIn(document.querySelector(".sc-visual .link-box"));

/* mobile hamberger menu click event */

/* popup open */

export class Main extends Common {
  constructor() {
    super();
    this.handleOpenPopup();
    this.handleClosePopup();
  }

  handleOpenPopup() {
    const that = this;
    $(".sc-inquiry .inquiry-item[data-type]").click(function (event) {
      event.preventDefault();
      const type = $(this).data("type");
      $("body, html").css("scrollbar-gutter", "stable");
      $("body").css("overflow", "hidden");
      $(`#popup[data-type="${type}"]`).addClass("active");
    });
  }

  handleClosePopup() {
    $("#popup .popup-close").click(function () {
      $(`#popup[data-type]`).removeClass("active");
      // this.handleScrollUnlock();
    });
  }
}

const _ = new Main();
