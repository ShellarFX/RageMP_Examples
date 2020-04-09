mp.events.add('initVariables', (player) => {
    player.colshape = null;
    player.hemp = 0;
});

let hempPoints = [
    [245.884, -1159.265, 29.16]
]

let hempColshapes = []

// Создание лейблов и колшейпов
for (let i = 0; i < hempPoints.length; i++) {
    let label = mp.labels.new('Место #' + parseInt(i + 1) + '~n~Конопля не посажена.', new mp.Vector3(hempPoints[i][0], hempPoints[i][1], hempPoints[i][2] + 1), {
        color: [255, 255, 255, 200],
        drawDistance: 10,
        los: true,
        font: 4
    });
    let marker = mp.markers.new(0, new mp.Vector3(hempPoints[i][0], hempPoints[i][1], hempPoints[i][2]), 0.75, {
        color: [255, 255, 0, 200]
    });
    let colshape = mp.colshapes.newSphere(hempPoints[i][0], hempPoints[i][1], hempPoints[i][2], 1);
    colshape.info = {
        id: i + 1,
        label: label,
        marker: marker,
        hemp: 0
    }

    hempColshapes.push(colshape);
}

mp.events.add('playerEnterColshape', (player, colshape) => {
    player.colshape = colshape;
});

mp.events.add('playerExitColshape', (player, colshape) => {
    player.colshape = null;
});

mp.events.addCommand('planthemp', (player) => {
    if (!player.colshape || hempColshapes.indexOf(player.colshape) == -1) return player.notify('Здесь нельзя посадить коноплю.');
    let colshape = player.colshape;
    if (colshape.info.hemp != 0) return player.notify('Здесь уже растет конопля.');
    console.log(player);
    colshape.info.hemp = 1;
    colshape.info.marker.setColor(200, 200, 0, 100);
    player.notify('Вы посадили коноплю');

    let i = 15;
    colshape.info.label.text = 'Место #' + colshape.info.id + '~n~Конопля растет. Осталось: ' + i + '~n~Посадил: ' + player.name;
    let interval = setInterval(() => {
        i--;
        colshape.info.label.text = 'Место #' + colshape.info.id + '~n~Конопля растет. Осталось: ' + i + '~n~Посадил: ' + player.name;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        colshape.info.label.text = 'Место #' + colshape.info.id + '~n~Конопля выросла.~n~Посадил: ' + player.name;
        colshape.info.hemp = 2;
        colshape.info.marker.setColor(0, 255, 0, 100);
        player.notify('Ваша конопля на месте #' + colshape.info.id + " выросла.");
    }, 16000);
});

mp.events.addCommand('harvesthemp', (player) => {
    if (!player.colshape || hempColshapes.indexOf(player.colshape) == -1) return;
    let colshape = player.colshape;
    if (colshape == hempColshape) {
        let colshape = player.colshape;
        if (colshape.info.hemp == 0) return player.notify('Здесь не растет конопля.');
        if (colshape.info.hemp == 1) return player.notify('Конопля еще не выросла.');
        colshape.info.hemp = 0;
        colshape.info.label.text = 'Место #' + colshape.info.id + '~n~Конопля не посажена.';
        colshape.info.marker.setColor(255, 255, 0, 200);
        player.hemp++;
        player.notify('Вы собрали коноплю.~n~У Вас: ' + player.hemp);
        return;
    }
});

mp.events.addCommand('smokehemp', (player) => {
    player.playAnimation('mp_player_int_uppersmoke', 'mp_player_int_smoke', 1, 49);
    setTimeout(() => {
        player.playAnimation('mp_player_int_uppersmoke', 'mp_player_int_smoke', 1, 48);
        setTimeout(() => {
            player.stopAnimation();
        }, 1000);
    }, 6000);
});