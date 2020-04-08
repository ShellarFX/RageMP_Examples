require('./modules/jobs/jobs');

mp.events.add('render', () => {
      mp.game.graphics.drawText(`${mp.players.local.name} (${mp.players.local.id})\nHP: ${mp.players.local.getHealth()}`, [mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z + 1.1], {
        font: 4,
        color: [255, 255, 255, 200], 
        scale: [0.45, 0.45], 
        outline: true
    });
});