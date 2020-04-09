'use strict';

const blipPositions = [
    { 'position': { 'x': -182.310, 'y': -1546.895, 'z': 34.923 }, 'color': 35 },
    { 'position': { 'x': 18.310, 'y': -1546.895, 'z': 34.923 }, 'color': 46 },
    { 'position': { 'x': 218.310, 'y': -1546.895, 'z': 34.923 }, 'color': 35 },
    { 'position': { 'x': 418.310, 'y': -1546.895, 'z': 34.923 }, 'color': 67 },
    { 'position': { 'x': 618.310, 'y': -1546.895, 'z': 34.923 }, 'color': 69 },
    { 'position': { 'x': 818.310, 'y': -1546.895, 'z': 34.923 }, 'color': 35 },
]

const blips = [];
const colshapes = [];

const Natives = {
    SET_BLIP_SPRITE: '0xDF735600A4696DAF',
    SET_BLIP_ALPHA: '0x45FF974EEE1C8734',
    SET_BLIP_COLOUR: '0x03D7FB09E75D6B7E',
    SET_BLIP_ROTATION: '0xF87683CDF73C3F6E',
    GET_FIRST_BLIP_INFO_ID: '0x1BEDE233E6CD2A1F',
    GET_NEXT_BLIP_INFO_ID: '0x14F96AA50D6FBEA7',
    DOES_BLIP_EXIST: '0xA6DB27D19ECBB7DA',
    SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT: '0xB98236CAAECEF897'
};

mp.events.add('createZones', () => {
    blipPositions.forEach((element, i) => {
        let blip = mp.game.ui.addBlipForRadius(element.position.x, element.position.y, element.position.z, 100);
        mp.game.invoke(Natives.SET_BLIP_SPRITE, blip, 5);
        mp.game.invoke(Natives.SET_BLIP_ALPHA, blip, 175);
        mp.game.invoke(Natives.SET_BLIP_COLOUR, blip, element.color);
        blips.push(blip);
    });
});


mp.events.add('render', () => {
    if (blips.length !== 0) {
        blips.forEach(blip => {
            mp.game.invoke(Natives.SET_BLIP_ROTATION, blip, 00);
        });
    }
});

mp.events.add('clearBlips', () => {
    mp.game.invoke(Natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT, true);
    let last_blip = mp.game.invoke(Natives.GET_FIRST_BLIP_INFO_ID, 5);
    while (mp.game.invoke(Natives.DOES_BLIP_EXIST, last_blip)) {
        mp.game.ui.removeBlip(last_blip);
        last_blip = mp.game.invoke(Natives.GET_NEXT_BLIP_INFO_ID, 5);
        //mp.game.wait(50);
    }
});