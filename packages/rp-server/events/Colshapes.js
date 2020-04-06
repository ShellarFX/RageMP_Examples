mp.events.add('playerEnterColshape', (player, shape) => {
    player.colshape = shape;
});

mp.events.add('playerExitColshape', (player, shape) => {
    player.colshape = undefined;
});