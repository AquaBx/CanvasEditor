import { CE_Text } from "./text";
import {FormattingFunction} from "./index"

export class CE_FormattedText extends CE_Text {

    public formatting:FormattingFunction

    constructor(formatting:FormattingFunction,width:number){
        super("",0,"","",0,"")
        
        this.width = width
        this.formatting = formatting
    }

    public draw(ctx:CanvasRenderingContext2D){

        let xOffset = 0
        let yOffset = 0

        let specialColored = false
        let fmt = this.formatting(this.data)

        for (let word of this.data.split(" ")){
            let spaceSize = this.wordSize(ctx," ",0)

            ctx.font = `${fmt.fontWeight} ${fmt.fontSize}px ${fmt.fontFamily}`
            ctx.textAlign = fmt.textAlign as CanvasTextAlign;
            
            let nl = xOffset + fmt.letterSpacing + spaceSize + fmt.letterSpacing
            let wordSize = this.wordSize(ctx,word,fmt.letterSpacing)

            if (xOffset == 0) {
                xOffset = 0
            }
            else if ( nl + wordSize > this.width-this.position.x){
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
                    ctx.fillText(word[i], this.position.x+xOffset, this.position.y+yOffset)
                    xOffset+=this.wordSize(ctx,word[i],fmt.letterSpacing)+fmt.letterSpacing
                }
            }
        }
        //return this.position.y + yOffset + fmt.fontSize
    }
}