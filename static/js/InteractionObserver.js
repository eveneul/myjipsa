export default class InviewObserver {
  constructor(percent) {
    // this.rootMargin = triggerCenter ? "0px 0px -45% 0px" : "0px";
    this.observer = new IntersectionObserver(
      (entires) => {
        entires.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        root: null,
        rootMargin: percent ? `0px 0px -${percent}% 0px` : `0px`,
        threshold: 1,
      }
    );
  }

  observe(element) {
    // if(element)
    // if(element.)
    if (element.length) {
      element.forEach((item) => this.observer.observe(item));
    } else {
       this.observer.observe(element)
    }
      //  element.forEach((item) => this.observer.observe(item));
    // console.log(element)
    // this.observer.observe(element)
  }
  // constructor(dom) {
  //   this.dom = dom;
  //   this.observer = null;
  // }

  // observe() {
  //   this.observer = new IntersectionObserver(
  //     entries => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("in-view")
  //           console.log("tses")
  //         } else {
  //           entry.target.classList.remove("in-view")
  //         }
  //       })
  //     }, {
  //       root: null,
  //       rootMargin: "0px",
  //       threshold: 0.5
  //     }
  //   )

  //   // if (this.targets.length > 1) {
  //   //   this.targets.forEach((target) => this.observer.observe(target));
  //   // } else {
  //   //   this.observer.observe(this.targets);
  //   // }
  // }

  // disconnect() {
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }
}