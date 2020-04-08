mp.events.addCommand('hp', (player, hp) => {
    player.health = parseInt(hp);
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('veh', (player, model) => {
    mp.vehicles.new(mp.joaat(model), new mp.Vector3(player.position.x + 2, player.position.y, player.position.z));
});

mp.events.addCommand('getpos', (player) => {
    console.log(player.position.x.toFixed(3) + ", " + player.position.y.toFixed(3) + ", " + player.position.z.toFixed(3));
});