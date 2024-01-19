

import InviewObserver from "../InteractionObserver.js";
export default class MainInteraction {
  constructor() {

  }

  
  proxyContentAnimation() {
    const contents = $(".sc-proxy .content-text");
    const imgs = $(".sc-proxy .content-img-box .mockup-inner img");
    const paginations = $(".sc-proxy .pagination-item");


    function contentInit(textDom, imgDom, index) {
      gsap.set(textDom, {y: 0, opacity: 0})
    }
  

    function contentFadeIn(textDom, imgDom, index) {
      gsap.to(textDom, { y: "-50%", opacity: 1, duration: 0.5 });
      gsap.to(imgDom, { y: 0, opacity: 1, duration: 0.5 });
      paginations.each((i, item) => {
        $(item).removeClass("active")
        $(paginations[index]).addClass("active")
      })
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
      end: '+=400%',
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
  }

  visitContentAnimation() {

    const textContent = $(".sc-visit .text-item");
    const figureContent = $(".sc-visit .figuer-box")
    const paginations = $(".sc-visit .pagination-item")
    const contents = $(".sc-visit .content-item")


   

    
    ScrollTrigger.create({
      trigger: ".sc-visit .content-box",
      pin: true,
      start: "top top",
      end: "+=400%",
      onUpdate: (e) => {
        const progress = e.progress * 100;
        const direction = e.direction;
        const index = Math.min(Math.floor(progress / 20), 4);

        console.log(index)

        if (direction === 1) {

          // gsap.set(".sc-visit .content-item.step-")

          contents.each((i, item) => $(item).removeClass("active"))
          $(contents[index]).addClass("active")


          if (index >= 4) {
            $(contents[3]).addClass("wide active")
          }

          

        } else {

        }

      }
    })
  }

  textFadeIn(dom) {
    const inview = new InviewObserver(20);
    inview.observe(dom);
  }
  
  textFadeOut() {

  }

}