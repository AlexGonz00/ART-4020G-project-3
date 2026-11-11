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
    endScale: 2
},
];