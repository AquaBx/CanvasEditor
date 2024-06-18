export {CE_Object} from "./object";
export {CE_Picture} from "./picture";
export {CE_Text} from "./text";
export {CE_Vec2} from "./vec2";

export type configuration = {
    backgroundURL: string,
    height:number,
    width:number,
    canvas:HTMLCanvasElement
}

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
    private configuration : configuration
    ctx:CanvasRenderingContext2D

    constructor( configuration : configuration) {
        this.configuration = configuration

        this.ctx = this.configuration.canvas.getContext('2d')!;
        this.configuration.canvas.height = this.configuration.height
        this.configuration.canvas.width = this.configuration.width
    }

    public clear(){
        this.ctx.clearRect(0,0,this.configuration.width, this.configuration.height)
    }

    public download(){
        var link = document.createElement('a');
        link.download = 'mail.png';
        link.href = this.configuration.canvas.toDataURL()
        link.click();
    }
}
