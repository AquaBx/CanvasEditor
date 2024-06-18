import { CE_Vec2 } from "./vec2";

export abstract class CE_Object {
    position = new CE_Vec2(0,0)
    angle = 0
    filter = "none"

    abstract draw(ctx:CanvasRenderingContext2D):void

    public preDraw(ctx:CanvasRenderingContext2D){
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.filter = this.filter;
    }

    public postDraw(ctx:CanvasRenderingContext2D) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.filter = "none";
    }
}