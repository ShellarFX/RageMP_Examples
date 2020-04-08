let blip = null;
let jobCheckpoint = null;

mp.events.add('createCheckpoint', (position, radius) => {
    jobCheckpoint = mp.checkpoints.new(1, position, radius, {
        color: [255, 255, 0, 200],
        direction: new mp.Vector3(0, 0, 75)
    });
});

mp.events.add('createBlip', (name, position, color) => {
    blip = mp.blips.new(1, position, {
        name: name,
        color: color
    });
    blip.setRoute(true);
});

mp.events.add('destroyCheckpoint', () => {
    if (jobCheckpoint) {
        jobCheckpoint.destroy();
        jobCheckpoint = null;
    }
});

mp.events.add('destroyBlip', () => {
    if (blip) {
        blip.destroy();
        blip = null;
    }
});

mp.events.add('playerEnterCheckpoint', (checkpoint) => {
    if (checkpoint == jobCheckpoint) {
        mp.events.callRemote('jobEnterCheckpoint', mp.players.local);
    }
});