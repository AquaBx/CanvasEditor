import {CE_Object} from "./object";
import {CE_Vec2} from "./vec2";
export {CE_Object} from "./object";
export {CE_Picture} from "./picture";
export {CE_Text} from "./text";
export {CE_FormattedText} from "./formattedText";
export {CE_Vec2} from "./vec2";

export type FormattingFunction = (input: string) => {
    fontSize: number;
    fontWeight: number;
    color: string;
    specialColor: string;
    fontFamily: string;
    textAlign: string;
    letterSpacing: number;
    output: string;
}

export class Template {
    private size : CE_Vec2
    private _canvas:HTMLCanvasElement|undefined
    private elements : CE_Object[] = []
    ctx:CanvasRenderingContext2D|undefined

    constructor( size:CE_Vec2 ) {
        this.size = size
    }

    set canvas(val:HTMLCanvasElement) {
        this._canvas = val
        this.ctx = this._canvas.getContext('2d')!;
        this._canvas.height = this.size.y
        this._canvas.width = this.size.x
    }

    public add(el:CE_Object) {
        this.elements.push(el)
    }

    public draw() {
        this.clear()

        if (!this.ctx) return

        for (let el of this.elements){
            el.draw(this.ctx)
        }

    }

    public startLoop(){
        let callback = this.startLoop
        this.draw()
        requestAnimationFrame(callback);
    }

    public clear(){
        if (!this.ctx) return

        this.ctx.clearRect(0,0,this.size.x, this.size.y)
    }

    public download(fileName:string){
        if (!this._canvas) return

        var link = document.createElement('a');
        link.download = 'mail.png';
        link.href = this._canvas.toDataURL()
        link.click();
    }
}
