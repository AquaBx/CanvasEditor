import { CE_Object } from "./object"
import { CE_Vec2 } from "./vec2"

export class CE_Picture extends CE_Object{
    private _data : HTMLImageElement|undefined = undefined
    private _size = new CE_Vec2(0,0)

    anchor = new CE_Vec2(0,0)

    constructor () {
        super()
    }

    public loadFromUrl(url:string) : Promise<void>{
        let image = new Image()
        image.src = url;

        let context = this
        return new Promise((resolve,reject) =>{
            image.onload = () => {
                context._data = image
                context._size = new CE_Vec2(image.width,image.height)
                
                resolve(undefined)
            }
        })
    }

    public loadFromFile(file:File) : Promise<void>{
        var fr = new FileReader();
        let image = new Image()
        let context = this

        fr.onload = function () {
            image.src = fr.result as string
        }

        fr.readAsDataURL(file);
        return new Promise((resolve,reject) =>{
            image.onload = function (){
                context._data = image
                context._size = new CE_Vec2(image.width,image.height)

                resolve(undefined)
            }
        })
    }

    public draw(ctx:CanvasRenderingContext2D) {
        this.preDraw(ctx)
        if (this._data){
            ctx.drawImage(this._data, this.position.x, this.position.y, this._size.x, this._size.y);
        }
        this.postDraw(ctx)
    }

    public drawResizeCropImage(ctx:CanvasRenderingContext2D,maxWidth:number,maxHeight:number){

        let canvas = document.createElement("canvas")
        let ctx2 = canvas.getContext("2d")

        canvas.width = maxWidth
        canvas.height = maxHeight

        let r1 = this._size.x/this._size.y
        let r2 = maxWidth/maxHeight

        let nw  = r1 < r2 ? maxWidth  : r1 * maxHeight
        let nh = r1 < r2 ? maxWidth / r1 : maxHeight

        let offx = Math.abs(nw - maxWidth)/2
        let offy = Math.abs(nh - maxHeight)/2

        ctx2?.drawImage(this._data!,-offx, -offy, nw, nh)
        ctx.drawImage(canvas,this.position.x, this.position.y,maxWidth,maxHeight)
    }
}