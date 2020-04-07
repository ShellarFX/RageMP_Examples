mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('veh', (player, model) => {
    mp.vehicles.new(mp.joaat(model), new mp.Vector3(player.position.x + 2, player.position.y, player.position.z));
});