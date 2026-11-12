// List of sea critters + depth details
// =====================================
//               Parameters
// src: path to image file
// depth: center of the entitiy's appearance on the depth scale
// span: How many meters of descent the entity stays on screen (in meters)
// x: horizontal drift
//  pos: right
//  neg: left
// y: vertical drift
//  pos: down
//  neg: up
// offset: entity starting position based on drift
// width: entity's size at scale: 1
// endScale: scale multiplier
const ENTITIES = [
    {
        src: "../assets/img/entities/killer_whale.png",
        depth: 120,
        span: 60,
        x: 0,
        y: -50,
        offset: 0.1,
        width: 40,
        endScale: 2,
        wobble: true
    },
    {
        src: "../assets/img/entities/midnight_zone_circle.png",
        depth: 990,
        span: 100,
        x: 0,
        y: 0,
        offset: 0,
        width: 360,
        endScale: 6,
        wobble: false
    },
    {
        src: "../assets/img/entities/ocean_floor.png",
        depth: 10935,
        span: 350,
        x: 0,
        y: 0,
        offset: 0,
        width: 1080,
        endScale: 0.4,
        wobble: false,
        hold: true
    }
];