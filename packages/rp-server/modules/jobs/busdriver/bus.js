mp.events.add('initVariables', (player) => {
    player.job = {
        id: 0,
        vehicle: null,
        stage: null,
        salary: 0
    }
    player.jobSkills = [];

    player.jobSkills[0] = { name: 'Водитель автобуса', level: 1, exp: 0, needExp: 10 }
});

let vehSpawnPoints = [
    [-410.722, 1177.173, 325.641]
]

let busPoints = [
    [-384.672, 1174.166, 324.285],
    [-313.943, 1195.099, 320.006],
    [-252.631, 1269.916, 308.590],
    [-177.264, 1335.497, 299.076]
]

let busMarker = mp.markers.new(1, new mp.Vector3(-435.538, 1180.199, 324.576), 1.5, 
    {
        color: [255, 255, 0, 200]
    });
let busColshape = mp.colshapes.newCircle(-435.538, 1180.199, 1.5);
let busLabel = mp.labels.new('Водитель автобуса', new mp.Vector3(-435.538, 1180.199, 327.0), 
    {
        color: [255, 255, 255, 200],
        drawDistance: 15,
        font: 4,
        los: false,
    })
mp.blips.new(513, new mp.Vector3(-435.538, 1180.199, 0), 
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
        player.job.vehicle = mp.vehicles.new('Bus', vehSpawnPoints[Math.floor(Math.random() * vehSpawnPoints.length)]);
        player.job.vehicle.owner = player;
        player.job.stage = 0;
        player.putIntoVehicle(player.job.vehicle, -1);
        let route = busPoints[player.job.stage];
        player.call('createCheckpoint', [new mp.Vector3(route[0], route[1], route[2]), 4]);
        player.call('createBlip', ['Остановка #' + player.job.stage, new mp.Vector3(route[0], route[1], route[2]), 46]);
    }
});

mp.events.add('stopJob', (player) => {
    if (player.job.id == 1) {
        player.job.id = 0;
        player.job.vehicle.destroy();
        player.call('destroyCheckpoint');
        player.call('destroyBlip');
        player.notify('Вы заработали ' + player.job.salary + "$");
    }
});

mp.events.add('jobEnterCheckpoint', (player) => {
    if (player.job.id == 1) {
        player.call('destroyCheckpoint');
        player.call('destroyBlip');
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
        let route = busPoints[player.job.stage];
        player.call('createCheckpoint', [new mp.Vector3(route[0], route[1], route[2]), 4]);
        player.call('createBlip', ['Остановка #' + player.job.stage, new mp.Vector3(route[0], route[1], route[2]), 46]);
    }
});