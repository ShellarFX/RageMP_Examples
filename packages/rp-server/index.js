require('./modules/index');
require('./events/index');

let drugLabel = mp.labels.new('Конопля не посажена.', new mp.Vector3(-17.76176643371582, 12.943828582763672, 72.24607849121094), 
{
    los: false,
    color: [255, 255, 0, 255],
    drawDistance: 15,
});
let drugMarker = mp.markers.new(1, new mp.Vector3(-17.76176643371582, 12.943828582763672, 71.74607849121094 - 1.4), 2,
{
    color: [246, 205, 97, 200],
});
let drugColshape = mp.colshapes.newCircle(-17.76176643371582, 12.943828582763672, 2);

drugColshape.hemp = 0;
drugColshape.info = 'hemp';
drugColshape.label = drugLabel;