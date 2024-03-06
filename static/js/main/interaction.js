import InviewObserver from "../InteractionObserver.js";
export default class MainInteraction {
  constructor() {
    this.navItems = $("#header nav ul li");
    this.nav = $("#header nav");
    this.colorGray = "#D8DFE5";
    this.colorBlack = "#0C0D0F";
    this.colorWhite = "#fff";
    this.header = $("#header");
    this.handleMouseEnterGnb();
    this.handleMouseLeaveGnb();
  }

  proxyContentAnimation() {
    if (matchMedia("screen and (min-width: 1024px)").matches) {
      // pc
      const contents = $(".sc-proxy .content-text");
      const imgs = $(".sc-proxy .content-img-box .mockup-inner img");
      const paginations = $(".sc-proxy .pagination-item");

      function contentInit(textDom, imgDom, index) {
        gsap.set(textDom, { y: 0, opacity: 0 });
      }

      function contentFadeIn(textDom, imgDom, index) {
        gsap.to(textDom, { y: "-50%", opacity: 1, duration: 0.5 });
        gsap.to(imgDom, { y: 0, opacity: 1, duration: 0.5 });
        paginations.each((i, item) => {
          $(item).removeClass("active");
          $(paginations[index]).addClass("active");
        });
      }

      function contentFadeOut(textDom, imgDom, index, isToTop = true) {
        gsap.to(textDom, { y: isToTop ? "-100%" : 0, opacity: 0, duration: 0.5 });
        gsap.to(imgDom, { y: "50px", opacity: 0, duration: 0.5 });
      }

      gsap.set(contents[0], { y: "-50%", opacity: 1 });
      gsap.set(imgs[0], { y: 0, opacity: 1 });

      ScrollTrigger.create({
        trigger: ".sc-proxy .content-box",
        pin: true,
        start: "top top",
        end: "+=400%",
        onUpdate: (e) => {
          const progress = e.progress * 100;
          const direction = e.direction;
          const index = Math.min(Math.floor(progress / 25), contents.length - 1);

          if (direction === 1) {
            if (index > 0) {
              contentFadeOut(contents[index - 1], imgs[index - 1], index);
            }
            contentFadeIn(contents[index], imgs[index], index);
          } else {
            if (index < contents.length - 1) {
              contentFadeOut(contents[index + 1], imgs[index + 1], index, false);
            }
            contentFadeIn(contents[index], imgs[index], index);
          }
        },
      });
    } else {
      // mobile
    }
  }

  visitContentAnimation() {
    const textContent = $(".sc-visit .text-item");
    const figureContent = $(".sc-visit .figuer-box");
    const paginations = $(".sc-visit .pagination-item");
    const contents = $(".sc-visit .content-item");
    const downloadTitle = $(".sc-visit .content-item.step-4 .text-box em");
    const downloadLinks = $(".sc-visit .content-item.step-4 .text-box .link-store");

    ScrollTrigger.create({
      trigger: ".sc-visit .content-box",
      pin: true,
      start: "top top",
      end: "+=600%",
      onUpdate: (e) => {
        const progress = e.progress * 100;
        const direction = e.direction;
        const index = Math.min(Math.floor(progress / 16), 6);

        paginations.each((i, pagination) => {
          $(pagination).removeClass("active");
          $(paginations[index]).addClass("active");
        });

        if (direction === 1) {
          contents.each((i, item) => $(item).removeClass("active"));
          $(contents[index]).addClass("active");

          if (index >= 4) {
            $(contents[3]).addClass("wide active");
            downloadTitle.addClass("active");
            downloadLinks.addClass("active");
          }
        } else {
          contents.each((i, item) => $(item).removeClass("active"));
          $(contents[index]).addClass("active");

          if (index >= 4) {
            downloadTitle.removeClass("active");
            downloadLinks.removeClass("active");
          } else if (index >= 3) {
            $(contents[3]).removeClass("wide");
          }
        }
      },
    });
  }

  textFadeIn(element) {
    const parent = $(element).closest("[data-scroll-trigger]");
    console.log(parent, element);

    if (!parent) return;

    const m = gsap.from(element, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: parent,
        start: "top 60%",
      },
    });
  }

  textFadeOut() {}

  handleMouseEnterGnb() {
    const that = this;

    $(this.navItems).on("mouseenter", function () {
      if ($(that.header).hasClass("scroll")) {
        $(that.navItems).css("color", that.colorGray);
        $(this).css("color", that.colorBlack);
      } else {
        $(that.navItems).css("color", that.colorGray);
        $(this).css("color", that.colorWhite);
      }
    });
  }

  handleMouseLeaveGnb() {
    $(this.nav).on("mouseleave", () => {
      if ($(this.header).hasClass("scroll")) {
        $(this.navItems).css("color", this.colorBlack);
      } else {
        $(this.navItems).css("color", this.colorWhite);
      }
    });
  }
}
