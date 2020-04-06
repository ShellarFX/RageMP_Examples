require('./Hemp/Hemp');
require('./Logging/log');

mp.events.addCommand('coords', (player) => {
    console.log(`${player.position.x}, ${player.position.y}, ${player.position.z} ${player.heading}`);
});

mp.events.addCommand('veh', (player, veh) => {
    mp.vehicles.new(mp.joaat(veh), new mp.Vector3(player.position.x, player.position.y + 3, player.position.z));
});

mp.events.addCommand('traficstate', (player, state) => {
    if (state == undefined || state == null) return player.outputChatBox('/traficstate [номер]');

    mp.world.trafficLights.state = parseInt(state);

    player.outputChatBox('Меняю светофоры.');
});