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
    if (player.vehicle)
        console.log('Автомобиль: ' + player.vehicle.position.x.toFixed(3) + ", " + player.vehicle.position.y.toFixed(3) + ", " + player.vehicle.position.z.toFixed(3) + " | " + player.vehicle.heading);
});

mp.events.addCommand('spawn', (player, place) => {
    if (!place) return player.outputChatBox('/spawn [место]');
    if (place == 'building')
        player.spawn(new mp.Vector3(-160.531, -1031.853, 27.274));
    else if (place == 'origin')
        player.spawn(new mp.Vector3(-431.402, 1174.112, 325.856));
    else if (place == 'buspark')
        player.spawn(new mp.Vector3(238.761, -1151.578, 29.289));
});

mp.events.addCommand('obj', (player, obj) => {
    let object = mp.objects.new(obj, player.position);
    player.attachTo(object.handle, 0, 0, 0, 0, 0, 0, 0, true, false, false, false, 0, false);
});