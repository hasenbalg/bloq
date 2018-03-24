interface IScreen{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    debug:boolean;
    update():void;
    render():void;
    resize():void;
}