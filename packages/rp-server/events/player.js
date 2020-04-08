let spawnpoint = new mp.Vector3(-431.402, 1174.112, 325.856);

mp.events.add('playerDeath', (player, reason, killer) => {
    player.spawn(spawnpoint);
    player.health = 100;
});

mp.events.add('playerReady', (player) => {
    mp.events.call('initVariables', player);
});

mp.events.add('playerJoin', (player) => {
    console.log(`${player.name} подключился к серверу. | IP: ${player.ip}`)
    player.spawn(spawnpoint);
    player.job = 0;
    
});