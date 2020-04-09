mp.events.add('initVariables', (player) => {
    player.job = {
        id: 0,
        vehicle: null,
        stage: null,
        salary: 0,
        delVehTimer: null
    }
    player.jobSkills = [];

    player.jobSkills[0] = { name: 'Водитель автобуса', level: 1, exp: 0, needExp: 10 }
});

let vehSpawnPoints = [
    [259.819, -1163.167, 29.167, 90.29287719726562],
    [259.612, -1157.909, 29.231, 90.1116943359375],
    [259.510, -1151.398, 29.282, 90.34283447265625]
]

let busPoints = [
    [224.388, -1099.068, 28.050],
    [254.147, -986.887, 27.676],
    [114.474, -785.589, 29.858],
    [-244.494, -713.529, 31.924],
    [-250.006, -882.639, 28.895],
    //[-61.852, -994.706, 28.052],
    [143.795, -1026.155, 27.734]
]

let busMarker = mp.markers.new(1, new mp.Vector3(238.698, -1147.730, 29.308 - 1.5), 1.5,
    {
        color: [255, 255, 0, 200]
    });
let busColshape = mp.colshapes.newCircle(238.698, -1147.730, 1.5);
let busLabel = mp.labels.new('Водитель автобуса', new mp.Vector3(238.698, -1147.730, 30.308),
    {
        color: [255, 255, 255, 200],
        drawDistance: 15,
        font: 4,
        los: false,
    })
mp.blips.new(513, new mp.Vector3(238.698, -1147.730, 29.308),
    {
        shortRange: true
    });

mp.events.add('playerEnterColshape', (player, colshape) => {
    if (colshape != busColshape) return;
    if (player.job.id == 0) {
        player.job.id = 1;
        mp.events.call('startJob', player);
    }
    else {
        mp.events.call('stopJob', player);
    }
});

mp.events.add('startJob', (player) => {
    if (player.job.id == 1) {
        player.notify('Вы начали работу водителем автобуса.')
        let ranIndex = Math.floor(Math.random() * vehSpawnPoints.length);
        player.job.vehicle = mp.vehicles.new('Bus', vehSpawnPoints[ranIndex], {
            heading: vehSpawnPoints[ranIndex][3]
        });
        player.call('createMarker', [new mp.Vector3(vehSpawnPoints[ranIndex][0], vehSpawnPoints[ranIndex][1], vehSpawnPoints[ranIndex][2] + 3.5)]);
        player.job.vehicle.owner = player;
        player.job.stage = 0;
    }
});

mp.events.add('stopJob', (player) => {
    if (player.job.id == 1) {
        player.job.id = 0;
        player.job.vehicle.destroy();
        player.job.vehicle = null;
        player.job.stage = null;
        player.call('destroyCheckpoint');
        player.call('destroyBlip');
        player.call('destroyMarker');
        player.notify('Вы заработали ' + player.job.salary + "$");
        // Где-то тут должны прибавляться деньги...
        player.job.salary = 0;
    }
});

mp.events.add('jobEnterCheckpoint', (player) => {
    if (player.job.id == 1) {
        if (!player.vehicle || player.vehicle != player.job.vehicle) return player.notify('Вы должны находится в рабочем автомобиле.');
        player.call('destroyCheckpoint');
        player.call('destroyBlip');
        player.notify('Подождите 10 секунд.');
        setTimeout(() => {
            if (player.dist(new mp.Vector3(busPoints[player.job.stage])) > 10) {
                player.notify('Вы слишком далеко от прошлой остановки.');
            }
            else
                player.job.stage++;
            if (player.job.stage == busPoints.length) {
                player.job.stage = 0;
                let pay = 400 + (200 * player.jobSkills[0].level);
                player.job.salary += pay;
                player.notify(pay + "$ добавлено к зарплате.");
                player.jobSkills[0].exp += 10;
                if (player.jobSkills[0].exp == player.jobSkills[0].needExp) {
                    player.jobSkills[0].exp = 0;
                    player.jobSkills[0].needExp *= 2;
                    player.jobSkills[0].level++;
                    player.outputChatBox(`Вы достигли ${player.jobSkills[0].level} уровня водителя автобуса.`);
                }
            }
            player.call('createCheckpoint', [new mp.Vector3(busPoints[player.job.stage]), 4, player.job.stage]);
            player.call('createBlip', ['Остановка #' + player.job.stage, new mp.Vector3(busPoints[player.job.stage]), 46, player.job.stage]);
        }, 10000);
    }
});

mp.events.add('playerExitVehicle', (player, vehicle) => {
    if (player.job.id == 1 && player.job.vehicle == vehicle) {
        player.notify('У Вас есть 60 секунд, чтобы вернуться в автобус.');
        player.call('createMarker', [new mp.Vector3(player.job.vehicle.position.x, player.job.vehicle.position.y, player.job.vehicle.position.z + 3.5)])
        player.job.delVehTimer = setTimeout(() => {
            mp.events.call('stopJob', player);
        }, 60000);
    }
});

mp.events.add('playerEnterVehicle', (player, vehicle) => {
    if (player.job.id == 1 && player.job.vehicle == vehicle) {
        let route = busPoints[player.job.stage];
        player.call('createCheckpoint', [new mp.Vector3(route[0], route[1], route[2]), 4, player.job.stage]);
        player.call('createBlip', ['Остановка #' + player.job.stage, new mp.Vector3(route[0], route[1], route[2]), 46, player.job.stage]);
        player.call('destroyMarker');
        if (player.job.delVehTimer) {
            clearTimeout(player.job.delVehTimer);
        }
    }
});

mp.events.add('playerDeath', (player, reason, killer) => {
    if (player.job.id == 1) {
        mp.events.call('stopJob', player);
    }
})

mp.events.add('playerQuit', (player, type, reason) => {
    if (player.job.id == 1) {
        mp.events.call('stopJob', player);
    }
});