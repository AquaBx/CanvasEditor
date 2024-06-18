import { CE_Object } from "./object";
import {FormattingFunction} from "./index"

export class CE_Text extends CE_Object {
    
    public data = ""

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
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`
        ctx.textAlign = this.textAlign as CanvasTextAlign;
        ctx.fillStyle = this.color
        ctx.letterSpacing = `${this.letterSpacing}px`

        ctx.fillText(this.data, this.position.x, this.position.y);
    }

    public wordSize(ctx:CanvasRenderingContext2D,word:string,letterSpacing:number){
        let s = 0
        for (let l of word){
            if (l=="$") continue
            s += ctx.measureText(l).width
        }
        return s+letterSpacing*(word.length-1)
    }

    public drawFormattedTexte(ctx:CanvasRenderingContext2D,xmin:number,xmax:number,y:number,formatting:FormattingFunction) {

        let xOffset = 0
        let yOffset = 0

        let specialColored = false
        let fmt = formatting(this.data)

        for (let word of this.data.split(" ")){

            
            let spaceSize = this.wordSize(ctx," ",0)

            ctx.font = `${fmt.fontWeight} ${fmt.fontSize}px ${fmt.fontFamily}`
            ctx.textAlign = fmt.textAlign as CanvasTextAlign;
            
            let nl = xOffset + fmt.letterSpacing + spaceSize + fmt.letterSpacing
            let wordSize = this.wordSize(ctx,word,fmt.letterSpacing)
            
            if (xOffset == 0) {
                xOffset = 0
            }
            else if ( nl + wordSize > xmax-xmin){
                yOffset += fmt.fontSize
                xOffset = 0
            }
            else {
                xOffset += spaceSize + fmt.letterSpacing
            }
            
            for (let i = 0; i < word.length; i++) {                
                if ( word[i] == "$" ) {
                    specialColored = !specialColored
                    continue
                }
                
                ctx.fillStyle = specialColored ? fmt.specialColor : fmt.color

                if (word[i] == "\n") {
                    xOffset = 0
                    yOffset += fmt.fontSize
                }
                else {
                    ctx.fillText(word[i], xmin+xOffset, y+yOffset)
                    xOffset+=this.wordSize(ctx,word[i],fmt.letterSpacing)+fmt.letterSpacing
                }
            }
        }
        return y + yOffset + fmt.fontSize
    }
}