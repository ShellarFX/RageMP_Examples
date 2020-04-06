let spawnPoints = require('../spawn_points.json').SpawnPoints;

mp.events.add('playerDeath', (player, reason, killer) => {
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.lenght)]);
    player.health = 100;
});