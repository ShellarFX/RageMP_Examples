let spawnpoint = new mp.Vector3(238.761, -1151.578, 29.289);

mp.events.add('playerDeath', (player, reason, killer) => {
    player.spawn(spawnpoint);
    player.health = 100;
});

mp.events.add('playerReady', (player) => {
    mp.events.call('initVariables', player);
    player.call('clearBlips');
    player.call('createZones');
});

mp.events.add('playerJoin', (player) => {
    console.log(`${player.name} подключился к серверу. | IP: ${player.ip}`)
    player.spawn(spawnpoint);
    player.job = 0;
    
});