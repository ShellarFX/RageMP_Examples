mp.keys.bind(0x45, true, function() {
    mp.events.callRemote('keypress:E', mp.players.local);
});

mp.events.add('useDrugs', (amount) => {
    mp.game.graphics.startScreenEffect('DrugsMichaelAliensFightIn', 1000, true);

    setTimeout(function() {
        mp.game.graphics.stopScreenEffect('DrugsMichaelAliensFightIn');
        mp.game.graphics.startScreenEffect('DrugsMichaelAliensFight', 1000, true);
    }, 5000);

    setTimeout(function() {
        mp.game.graphics.stopScreenEffect('DrugsMichaelAliensFight');
        mp.game.graphics.startScreenEffect('DrugsMichaelAliensFightOut', 1000, false);
    }, 15000);
    
});

mp.events.add('createPed', () => {
    let ped = mp.peds.new(
        mp.game.joaat('MP_F_Freemode_01'), 
        new mp.Vector3(-16.53589630126953, 6.773049831390381, 71.61302185058594),
        250.0,
        mp.players.local.dimension
    );

    setInterval(() => {
        if (mp.players.local.vehicle) {
            let bool = mp.players.local.vehicle.isStoppedAtTrafficLights();
            mp.gui.chat.push(bool.toString());
        }
    }, 1000);
});

mp.events.add('render', () => {
    
});
