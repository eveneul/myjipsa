
import InviewObserver from "../InteractionObserver.js";
import MainInteraction from "./interaction.js";

const interaction = new MainInteraction()
interaction.proxyContentAnimation()
interaction.visitContentAnimation()



interaction.textFadeIn(document.querySelectorAll(".sc-category"))
interaction.textFadeIn(document.querySelectorAll(".sc-title"))
interaction.textFadeIn(document.querySelectorAll(".sc-desc"))
interaction.textFadeIn(document.querySelector(".sc-visual .link-box"))


