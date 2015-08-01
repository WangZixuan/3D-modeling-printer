/*sculptGL gui*/
var gui;
var subGuiR;
var subGuiT;
var subGuiS;
var tool = {
    Tool:1
};
function initGui(cube, render) {
    gui = new dat.GUI({ autoPlace: false });
    document.getElementById('gui-container').appendChild(gui.domElement);
    subGuiR = gui.addFolder('RENDERING');
    subGuiT = gui.addFolder('TOPOLOGY');
    subGuiS = gui.addFolder('SCULPTING & PAINTING');
    subGuiS.add(tool, 'Tool', { Drag: 1, Brush: 2 }).onChange(function(){
        destroyTools();
        initTools(cube, render);
    });
}
function destroyTools() {
    var l = subGuiS.__controllers.length;
    for(var i = 1; i < l; i++) {
        subGuiS.__controllers[1].remove();
    }
}
function initTools(cube, render) {
    switch(tool.Tool) {
        case "1": // drag
            initDragToolsGui(cube, render);
            break;
        case "2": // brush
            initBrushToolsGui();
            break;
        default :
            break;
    }
}

/***** drag tools *****/
var dragTools = {
    Radius : 1,
    Symmetry : false
}
function initDragToolsGui(cube, render) {
    subGuiS.add(dragTools, 'Radius', 1, 25);
    subGuiS.add(dragTools, 'Symmetry');
    subGuiS.add(cube.scale, 'x', 0.1, 10, 0.1).onChange(function() { render(); });
    subGuiS.add(cube.scale, 'y', 0.1, 10, 0.1).onChange(function() { render(); });
    subGuiS.add(cube.scale, 'z', 0.1, 10, 0.1).onChange(function() { render(); });
}
/***** brush tools *****/
var brushTools = {
    Radius : 1,
    Intensity: 1,
    Negative: false,
    Symmetry: false
};
function initBrushToolsGui() {
    subGuiS.add(brushTools, 'Radius', 1, 25);
    subGuiS.add(brushTools, 'Intensity', 1, 100);
    subGuiS.add(brushTools, 'Negative');
    subGuiS.add(brushTools, 'Symmetry');
}