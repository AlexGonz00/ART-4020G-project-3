# DEEP SEA EXPLORATION
## By Alexander Gonzales

This is my interactive web experience project, developed using GSAP and ScrollTrigger. In this site, you go on deep sea expedition into the deepest depths currently known by man, meeting many ocean critters on the way! This website takes inspiration from multiple sources:
+ __[The Deep Sea](https://neal.fun/deep-sea/)__, by Neal Agarwal
    * Many of the assets for this project was pulled from here
+ __[Scale of the Universe](https://scaleofuniverse.com/en)__, by Cary Huang
    * For the presentation style

### How it is built
As mentioned, the handling of the assets on this website was made using GSAP, along with ScrollTrigger as a plugin. Exploration progress is tracked using a main timeline, where scroll progress is mapped straight into it.

On top of that, I also added data-driven elements, including:
+ Entities, that hold info on each creature/object's depth, span, drift, size, etc.
    * The full list can be found in `entities.js`
+ A pressure calculator, with the math pulled from __[Blue Robotics Inc](https://bluerobotics.com/learn/pressure-depth-calculator/)__, specifically:

```
P = pgh

pₛₐₗₜ = 1023.6 kg/m³
g = 9.80665 m/s²
h = <current num meters>
```