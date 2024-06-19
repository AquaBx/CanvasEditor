import { CE_Object } from "./object"
import { CE_Vec2 } from "./vec2"

export class CE_Picture extends CE_Object{
    private _data : HTMLImageElement|undefined = undefined
    private _size = new CE_Vec2(1,1)

    // -1 <= x <= 1 ; -1 <= y <= 1
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

    public defaultSize(){
        if (this._data){
            return new CE_Vec2(this._data.width,this._data.height)
        }
        
        return new CE_Vec2(1,1)
    }

    public defaultRatio(){
        let s = this.defaultSize()
        return s.x/s.y
    }

    public actualRatio(){
        let s = this.actualSize()
        return s.x/s.y
    }

    public actualSize(){
        return this._size
    }

    public resize(nSize:CE_Vec2){
        this._size = nSize
    }

    public draw(ctx:CanvasRenderingContext2D) {
        this.preDraw(ctx)
        if (this._data){
            let canvas = document.createElement("canvas")
            let ctx2 = canvas.getContext("2d")
    
            canvas.width = this._size.x
            canvas.height = this._size.y
    
            let r1 = this.defaultRatio()
            let r2 = this.actualRatio()
    
            let nw  = r1 < r2 ? this._size.x  : r1 * this._size.y
            let nh = r1 < r2 ? this._size.x / r1 : this._size.y
    
            let offx = Math.abs(nw - this._size.x)*(this.anchor.x+1)/2
            let offy = Math.abs(nh - this._size.y)*(this.anchor.y+1)/2
    
            ctx2?.drawImage(this._data!,-offx, -offy, nw, nh)
            ctx.drawImage(canvas,this.position.x, this.position.y,this._size.x,this._size.y)
        }
        this.postDraw(ctx)
    }
}