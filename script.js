// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const caption = document.querySelector("[data-caption]");
  const readout = document.querySelector("[data-target]");

  const messages = [
    "The Surface",
    "Epipelagic Zone",
    "Mesopelagic Zone",
    "Bathypelagic Zone",
    "Abyssopelagic Zone",
    "Hadalpelagic Zone"
  ];

  // Pin the scene, report progress
  gsap.to("#scene-title", {
    scale: 1.4,
    ease: "none",
    scrollTrigger: {
      trigger: ".scene",
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        readout.textContent = Math.round(self.progress * 100) + "%";

        const i = Math.min(
          messages.length - 1,
          Math.floor(self.progress * messages.length)
        );
        if (caption.textContent !== messages[i]) {
          caption.textContent = messages[i];
        }
      }
    }
  });
});