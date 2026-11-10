// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const caption = document.querySelector("[data-caption]");
  const readout = document.querySelector("[data-target]");

  const MAX_DEPTH = 10935; // Furthest scroll level, reflecting the Challenger Deep's level
  const SCROLL_SPEED = 10;  // One screen of scrolling = 5m

  // Background stuff
  const DARK_DEPTH = 1000;
  const SURFACE_COLOR = "rgb(19, 185, 232)";
  const ABYSS_COLOR = "rgb(0, 0, 0)";
    
  const zones = [
    { name: "Surface", max: 5 },
    { name: "Epipelagic Zone", max: 200 },
    { name: "Mesopelagic Zone", max: 1000 },
    { name: "Bathypelagic Zone", max: 4000 },
    { name: "Abyssopelagic Zone", max: 6000 },
    { name: "Hadalpelagic Zone", max: MAX_DEPTH }
  ];

  const scrollDist = (MAX_DEPTH / SCROLL_SPEED) * 100;

  function getDepthState(progress) {
    const scale = progress * zones.length;
    const index = Math.min(zones.length-1, Math.floor(scale));
    const local = Math.min(1, scale - index);
    
    const currentZone = zones[index];
    const depth = currentZone.min + local * (currentZone.max - currentZone.min);

    return { depth, currentZone }
  }

  // Pin the scene, report progress
  gsap.to("#scene-title", {
    scale: 1.4,
    ease: "none",
    scrollTrigger: {
      trigger: ".scene",
      start: "top top",
      end: `+=${scrollDist}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const depth = self.progress * MAX_DEPTH;

        // get current zone
        const zone = zones.find((z) => depth <= z.max);

        readout.textContent = Math.round(depth).toLocaleString() + "m";

        if (caption.textContent !== zone.name) {
          caption.textContent = zone.name;
        }
        
        // Interpolate colors based on depth
        const t = Math.min(1, depth / DARK_DEPTH);      // 0 at surface, 1 at DARK_DEPTH and below
        const eased = gsap.parseEase("sine.out")(t);    // darkens quickly at first, then levels off
        document.body.style.backgroundColor = gsap.utils.interpolate(SURFACE_COLOR, ABYSS_COLOR, eased);

      }
    }
  });

});