class Ficha{

    constructor(posX,posY,fill,ficha){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ficha = ficha;
    }
    setFill(fill){
        this.fill =fill;
    }
    getPosition(){
        return{
            x:this.getPosX(),
            y:this.getPosY()
        };
    }
    getPosX(){
        return this.posX;
    }
    getPosY(){
        return this.posY;
    }
    getFill(){
        return this.fill;

    }


    draw() {
        draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.highlighted === true) {
            this.ctx.strokeStyle = this.highlightedStyle;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }

        this.ctx.closePath();
    }
    getRadius(){
        return this.radius;
    }
}