import { CE_Object } from "./object";
import {FormattingFunction} from "./index"

export class CE_Text extends CE_Object {
    
    public data = ""

    public width = Infinity

    public fontFamily:string
    public fontSize:number
    public fontWeight:string
    public color:string
    public letterSpacing:number
    public textAlign:string

    constructor(fontFamily:string,fontSize:number,fontWeight:string,color:string,letterSpacing:number,textAlign:string="left"){
        super()

        this.fontFamily = fontFamily
        this.fontSize = fontSize
        this.fontWeight = fontWeight
        this.color = color
        this.letterSpacing = letterSpacing
        this.textAlign = textAlign
    }

    public draw(ctx:CanvasRenderingContext2D){
        this.preDraw(ctx)

        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`
        ctx.textAlign = this.textAlign as CanvasTextAlign;
        ctx.fillStyle = this.color
        ctx.letterSpacing = `${this.letterSpacing}px`

        let coef = Math.min(this.width/ctx.measureText(this.data).width,1)
        ctx.font = `${this.fontWeight} ${coef*this.fontSize}px ${this.fontFamily}`

        ctx.fillText(this.data, this.position.x, this.position.y);

        this.postDraw(ctx)
    }

    public wordSize(ctx:CanvasRenderingContext2D,word:string,letterSpacing:number){
        let s = 0
        for (let l of word){
            if (l=="$") continue
            s += ctx.measureText(l).width
        }
        return s+letterSpacing*(word.length-1)
    }

}