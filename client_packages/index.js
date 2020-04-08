require('./modules/jobs/jobs');

mp.events.add('render', () => {
  /*let scale = 0.45;
  if (mp.players.local.vehicle) {
    scale = 0.4;
    mp.game.graphics.drawText(`${mp.players.local.vehicle.name}\nHP: ${mp.players.local.vehicle.getHealth()}`, [mp.players.local.vehicle.position.x, mp.players.local.vehicle.position.y, mp.players.local.vehicle.position.z + 1.1], {
      font: 4,
      color: [255, 255, 255, 200],
      scale: [0.6, 0,6],
      outline: true
    });
  }
  mp.game.graphics.drawText(`${mp.players.local.name} (${mp.players.local.id})\nHP: ${mp.players.local.getHealth()}`, [mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z + 1.1], {
    font: 4,
    color: [255, 255, 255, 200],
    scale: [scale, scale],
    outline: true
  });*/
});