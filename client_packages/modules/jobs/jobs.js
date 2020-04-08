let jobBlip = null;
let jobCheckpoint = null;

mp.events.add('createCheckpoint', (position, radius, stage) => {
    checkpoint = mp.checkpoints.new(1, position, radius, {
        color: [255, 255, 0, 200],
        direction: new mp.Vector3(0, 0, 75)
    });
    checkpoint.stage = stage;
    if (jobCheckpoint && jobCheckpoint.stage == stage)
        checkpoint.destroy();
    else
        jobCheckpoint = checkpoint;

});

mp.events.add('createBlip', (name, position, color, stage) => {
    blip = mp.blips.new(1, position, {
        name: name,
        color: color
    });
    blip.stage = stage;
    if (jobBlip && jobBlip.stage == stage)
        blip.destroy();
    else {
        jobBlip = blip;
        jobBlip.setRoute(true);
    }
});

mp.events.add('destroyCheckpoint', () => {
    if (jobCheckpoint) {
        jobCheckpoint.destroy();
        jobCheckpoint = null;
    }
});

mp.events.add('destroyBlip', () => {
    if (jobBlip) {
        jobBlip.destroy();
        jobBlip = null;
    }
});

mp.events.add('playerEnterCheckpoint', (checkpoint) => {
    if (checkpoint == jobCheckpoint) {
        mp.events.callRemote('jobEnterCheckpoint', mp.players.local);
    }
});