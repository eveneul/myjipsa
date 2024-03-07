import { lenisScroll } from "./lenis-scroll.js";
import MainInteraction from "./main/interaction.js";

export class Common extends MainInteraction {
  constructor() {
    super();
    this.topBtn = $(".btn-progress");
    this.topBtnBar = $(".btn-progress .inner");
    this.topBtnRadius = 21.5;
    this.circumfrence = 2 * Math.PI * this.topBtnRadius;
    this.menuBtn = $(".btn-menu");
    this.sidebar = $("#sidebar");
    this.pageY = 0;
    this.main = $("main");
    this.topBtnInit();
    this.handleSelectBoxClick();
    this.handleSelectOptionsClick();
    this.handleScroll();
    this.handleScrollToTop();
    this.handleOpenSidebar();
    this.handleHeaderNaviClick();
    // this.handleScrollLock();
  }

  topBtnInit() {
    this.topBtnBar.css("stroke-dasharray", this.circumfrence);
    this.topBtnProgress(0);
    console.log("init");
  }

  topBtnProgress(percent) {
    const progress = percent / 100;
    const dashoffset = this.circumfrence * (1 - progress);
    this.topBtnBar.css("stroke-dashoffset", dashoffset);
  }

  handleSelectBoxClick() {
    $(".select-box").click(function (e) {
      if (e.currentTarget !== e.target) return;
      const top = e.target.offsetTop + e.target.clientHeight + 12;
      $(".select-box-options").toggleClass("active");
      $(".select-box-options").css("top", `${top}px`);
    });
  }

  handleSelectOptionsClick() {
    $(".select-box-option").click(function (e) {
      const value = $(e.currentTarget).text();
      $(".select-box span").text(value);
      $(".select-box-options").removeClass("active");
    });
  }

  handleScroll() {
    lenisScroll.on("scroll", (event) => {
      // Header
      if (event.scroll > 300) {
        this.navItems.css("color", this.colorBlack);
        this.header.addClass("scroll");
        this.topBtn.addClass("active");

        if (event.direction === 1) {
          this.header.addClass("down");
        } else {
          this.header.removeClass("down");
        }
      } else {
        this.navItems.css("color", this.colorWhite);

        this.header.removeClass("scroll");
        this.topBtn.removeClass("active");
      }

      this.topBtnProgress(event.progress * 100);
    });
  }

  handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $(this.topBtn).click(() => {
      // $("body, html").animate({ scrollTop: 0 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("click top button");
    });
  }

  handleLockDom(dom) {
    $(dom).css("height", "100%");
    $(dom).css("overflow", "hidden");
  }

  handleUnlockDom(dom) {
    $(dom).css("height", "");
    $(dom).css("overflow", "");
  }

  handleScrollLock() {
    this.pageY = window.scrollY;
    this.main.css("top", `-${window.scrollY}px`);
    this.handleLockDom("body");
    this.handleLockDom("html");
  }

  handleScrollUnlock() {
    this.handleUnlockDom("html");
    this.handleUnlockDom("body");
    this.main.css("top", "0px");
    window.scrollTo(0, this.pageY);
    window.setTimeout(() => {
      this.pageY = 0;
    });
  }

  handleOpenSidebar() {
    const that = this;
    $(this.menuBtn).click(() => {
      console.log("test");
      $(this.menuBtn).toggleClass("open");
      $(this.sidebar).toggleClass("open");

      if ($(this.menuBtn).hasClass("open")) {
        lenisScroll.stop();
      } else {
        lenisScroll.start();
      }
    });
  }

  handleHeaderNaviClick() {
    $(this.navItems).click(function (e) {
      // e.preventDefault();

      const target = $(this).data("anchor");
      const section = $(`[data-section="${target}"]`);

      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $(section).offset().top,
        },
        {
          duration: 1000,
        }
      );
    });
  }
}

// const c = new Common();
