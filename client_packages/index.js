require('./modules/jobs/jobs');
require('./modules/blips');

let player = mp.players.local;
mp.events.add('render', () => {
  mp.game.graphics.drawText(`x: ${player.position.x.toFixed(3)} y: ${player.position.y.toFixed(3)} z: ${player.position.z.toFixed(3)}`, [0.07, 0.005], {
    font: 4,
    centre: false,
    color: [255, 255, 255, 200],
    scale: [0.5, 0.5],
    outline: true
  });
});