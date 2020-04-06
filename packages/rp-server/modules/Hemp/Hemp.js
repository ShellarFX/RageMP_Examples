mp.events.addCommand('planthemp', (player) => {

    if (!player.colshape) return;
    let colshape = player.colshape;
    if (colshape.info != 'hemp') return player.outputChatBox('Здесь негде сажать коноплю.');
    if (colshape.hemp > 0) return player.outputChatBox('Здесь уже растет конопля.');
    player.notify('Вы посадили коноплю');
    colshape.hemp = 1;

    let i = 5;
    let interval = setInterval(() => {
        i -= 1;
        colshape.label.text = `Конопля растет. Осталось: ${i} секунд`;
    }, 1000);

    setTimeout(() => {
        player.notify('Ваша конопля выросла');
        colshape.label.text = 'Конопля выращена.';
        colshape.hemp = 2;
        clearInterval(interval);
    }, 5000);
});


mp.events.addCommand('usedrugs', (player, amount) => {
    if (amount == undefined) return player.outputChatBox('/userdrugs [кол-во]');
    if (player.data.drugs == 0) return player.outputChatBox('У Вас нет наркотиков.');
    if (player.data.drugs < amount) return player.outputChatBox('У Вас нет столько наркотиков.');
    player.data.drugs -= amount;
    player.outputChatBox(`У Вас осталось ${player.data.drugs} наркотиков.`);
    player.call('useDrugs', amount)
});

mp.events.addCommand('drugs', (player) => {
    player.outputChatBox(`У Вас ${player.data.drugs} наркотиков.`);
});
