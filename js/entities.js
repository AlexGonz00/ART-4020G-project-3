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
        src: "../assets/img/entities/midnight_zone_circle.png",
        depth: 990,
        span: 100,
        fade: 20,
        x: 0,
        y: 0,
        offset: 0,
        width: 360,
        endScale: 6,
        wobble: false
    },
    {
        src: "../assets/img/entities/ocean_floor.png",
        depth: 10760,
        span: 350,
        fade: 20,
        x: 0,
        y: 0,
        offset: 0,
        width: 1080,
        endScale: 0.4,
        wobble: true,
        hold: true
    },
    {
        name: "ATLANTIC SALMON",
        src: "../assets/img/entities/atlantic_salmon.png",
        depth: 5,
        span: 25,
        fade: 5,
        x: -30,
        y: -50,
        offset: 0.1,
        width: 24,
        endScale: 1,
        wobble: true
    },
    {
        name: "MANATEE",
        src: "../assets/img/entities/manatee.png",
        depth: 6,
        span: 25,
        fade: 5,
        x: 45,
        y: -20,
        offset: 0.1,
        width: 24,
        endScale: 1,
        wobble: true
    },
    {
        name: "STRIPED BASS",
        src: "../assets/img/entities/striped_bass.png",
        depth: 12,
        span: 30,
        fade: 5,
        x: -12,
        y: 50,
        offset: 0.1,
        width: 20,
        endScale: 1,
        wobble: true
    },
    {
        name: "KILLER WHALE",
        src: "../assets/img/entities/killer_whale.png",
        depth: 80,
        span: 120,
        fade: 40,
        x: 30,
        y: -50,
        offset: 0.1,
        width: 40,
        endScale: 2,
        wobble: true
    }
];