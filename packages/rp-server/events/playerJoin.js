let spawnPoints = require('../spawn_points.json').SpawnPoints;

mp.events.add('playerJoin', (player) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.lenght)]);
});