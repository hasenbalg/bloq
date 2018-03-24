
let currentScreen: IScreen;
window.onload = function () {
    currentScreen = new StartScreen(<HTMLCanvasElement>this.document.getElementById('game'));
    loop();
}

window.onresize = function () {
    currentScreen.resize();
}

window.onkeypress = function(evt:KeyboardEvent) {
    evt = <KeyboardEvent>(evt || window.event);
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if(charStr = 'd'){
        currentScreen.debug = !currentScreen.debug;
    }
    
}

function loop() {
    currentScreen.update();
    currentScreen.render();
    window.requestAnimationFrame(loop);
}

function swapScreen(newScreen:IScreen){
    currentScreen = newScreen;
}


function cloneCanvas(oldCanvas:HTMLCanvasElement) {
    let newCanvas = document.createElement('canvas');
    let context = <CanvasRenderingContext2D>newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    let imageData :ImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

    //context.drawImage(oldCanvas, 0, 0);
    context.putImageData(imageData, 0, 0);

    newCanvas.id = oldCanvas.id;
    oldCanvas.remove();
    document.body.appendChild(newCanvas);
    return newCanvas;
}
