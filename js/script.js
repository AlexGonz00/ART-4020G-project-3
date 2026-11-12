// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const caption = document.querySelector("[data-caption]");
  const readout = document.querySelector("[data-target]");
  const layerHost = document.querySelector("[data-depth-layers]");
  const entityHost = document.querySelector("[data-entities]");
  const surface = document.querySelector("[data-surface]");
  const tiles = document.querySelector("[data-surface-tiles]");

  const MAX_DEPTH = 10935; // Furthest scroll level, reflecting the Challenger Deep's level
  const SCROLL_SPEED = 10;  // One screen of scrolling = 5m
  const scrollDist = (MAX_DEPTH / SCROLL_SPEED) * 100;

  // Background stuff
  const DARK_DEPTH = 1000;
  const SURFACE_COLOR = "#13B9E8";
  const ABYSS_COLOR = "rgb(0, 0, 0)";
  
  // Gradient images for depth indications
  const zones = [
    { name: "Surface", max: 5 },
    { name: "Epipelagic Zone", max: 200 },
    { name: "Mesopelagic Zone", max: 1000 },
    { name: "Bathypelagic Zone", max: 4000 },
    { name: "Abyssopelagic Zone", max: 6000 },
    { name: "Hadalpelagic Zone", max: MAX_DEPTH }
  ];

  // from entities.js
  const entities = ENTITIES;
  
  // Layer stuff
  const NUM_LAYERS = 10;
  const END_SCALE = 4;  // how far each layer expands
  
  // Build layers
  const layers = Array.from({ length: NUM_LAYERS }, (_, i) => {
    const img = document.createElement("img");
    img.className = "layer";
    img.src = `assets/img/ocean_depths/lvl_${i+1}.png`;
    img.alt = "";
    layerHost.appendChild(img);
    return img;
  });

  // Each layer grows over 1.5 steps
  const CURRENT_STEP = DARK_DEPTH / (NUM_LAYERS - 0.5);
  
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".scene",
      start: "top top",
      end: `+=${scrollDist}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const depth = self.progress * MAX_DEPTH;
        const zone = zones.find((z) => depth <= z.max);

        readout.textContent = Math.round(depth).toLocaleString() + "m";

        if (caption.textContent !== zone.name)
          caption.textContent = zone.name;
      }
    }
  });

  gsap.set(layers, { scale: 0 });

  // Surface settings
  const SURFACE = {
    tileSize: 256,
    direction: { x: -1, y: -1 },
    secondsPerTile: 12,
    fadeOutDepth: 10
  };

  const T = SURFACE.tileSize;
  gsap.set(tiles, {
    top: -T,
    left: -T,
    width: `calc(100% + ${T * 2}px)`,
    height: `calc(100% + ${T * 2}px)`,
    backgroundSize: `${T}px ${T}px`
  });

  // Endless slide one tile, then jump back
  gsap.fromTo(
    tiles,
    { x: 0, y: 0 },
    {
      x: SURFACE.direction.x * T,
      y: SURFACE.direction.y * T,
      duration: SURFACE.secondsPerTile,
      ease: "none",
      repeat: -1
    }
  );

  // Adjust surface based on depth
  tl.to(
    surface,
    {
      scale: 1.6,
      autoAlpha: 0,
      duration: SURFACE.fadeOutDepth,
      ease: "power1.in"
    },
    0
  );

  const entityEls = entities.map((e) => {
    const img = document.createElement("img");
    img.className = "entity";
    img.src = e.src;
    img.alt = "";
    img.style.width = `${e.width ?? 30}vmin`;
    entityHost.appendChild(img);
    return img;
  });

  // Give entites (if toggled) a wobble effect
  entities.forEach((e, i) => {
    if (e.wobble === false) return;
    
    gsap.to(entityEls[i], {
      rotation: gsap.utils.random(-10, 10),
      skewX: gsap.utils.random(-15, 15),
      duration: gsap.utils.random(2, 4),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.3
    });
  });

  gsap.set(entityEls, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

  layers.forEach((layer, i) => {
    tl.to(
      layer,
      {
        scale: END_SCALE,
        duration: CURRENT_STEP * 1.5
      },
        i * CURRENT_STEP
      );
  });
  
  entities.forEach((e, i) => {
    const el = entityEls[i];
    const start = e.depth - e.span / 2;
    const fade = e.span * 0.3;
    const off = e.offset ?? 0.5;

    // Grow/drift out
    tl.fromTo(
      el,
      { scale: 0.1, 
        x: `${e.x * off}vw`,
        y: `${e.y * off}vh`
      },
      {
        scale: e.endScale ?? 3,
        x: `${e.x}vw`,
        y: `${e.y}vh`,
        duration: e.span,
        ease: "power2.in"
      },
      start
    );

    // Fade in/out
    tl.to(el, { autoAlpha: 1, duration: fade, ease: "none" }, start);

    // Add fadeout if hold isn't toggled
    if (!e.hold)
    {
      tl.to(el, { autoAlpha: 0, duration: fade, ease: "none" }, start + e.span - fade);
    }
  });

  tl.set({}, {}, MAX_DEPTH);

  

});