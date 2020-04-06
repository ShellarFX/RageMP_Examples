require('./Colshapes');

mp.events.add('playerJoin', (player) => {
    player.data.drugs = 0;
    player.call('createPed');
    console.log(`Игрок ${player.name} подключился к серверу | IP: ${player.ip}`);
});

mp.events.add('keypress:E', (player) => {
    CollectHemp(player);
});

function CollectHemp(player) {
    if (!player.colshape) return;
    if (player.colshape.hemp != 2) return player.outputChatBox('Конопля еще не выросла.');
    player.colshape.label.text = 'Конопля не посажена.';
    player.colshape.hemp = 0;
    player.data.drugs += 1;
    player.notify('Вы собрали коноплю.');
}