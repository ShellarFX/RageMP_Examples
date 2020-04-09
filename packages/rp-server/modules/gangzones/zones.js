const colshapePositions = [
    [182.310, 1546.895],
    [18.310, -1546.895],
    [218.310, -1546.895],
    [418.310, -1546.895],
    [618.310, -1546.895],
    [818.310, -1546.895]
]

const colshapes = [];

colshapePositions.forEach((element, i) => {
    let colshape = mp.colshapes.newRectangle(element[0], element[1], 200, 200);
    colshape.zone = i;
    colshapes.push(colshapes);
});

mp.events.add('playerEnterColshape', (player, colshape) => {
    if (!colshape.zone) return;
        player.notify('Вы вошли в зону #' + colshape.zone);
});