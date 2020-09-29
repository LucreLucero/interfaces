class Ficha{
    constructor(ctx,posX,posY, color, tamFicha,jugador){
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.color=color
        this.tamFicha = tamFicha
        this.jugador=jugador

        this.rojo = "#f00"
        this.img = new Image()        
        this.img.src = "image/fichaRoja.png"
        this.img2 = new Image()        
        this.img2.src = "image/fichaAzul.png"
        
        //console.log(this.img)
        //console.log(this.img2)
        this.cargarImg()
    } 

    cargarImg(){
        let t = this;// no entiendo porque si no le doy valor this a una variable no me lo toma
        this.img.onload, this.img2.onload = function(){
            t.dibujarFicha()

        }
    }

    dibujarFicha(){
        console.log("holi")
        if(this.ctx){
            //ctx.beginPath();                 
            //ctx.closePath();
            if(this.color === this.rojo){ 
                //console.log("estoy en ficha roja")
                /*this.ctx.fillStyle = this.color
                this.ctx.beginPath()
                //ctx.arc(x, y, tam, 0(circ_entero), 2 * Math.PI,);
                this.ctx.arc(this.posX+this.tamFicha/2, this.posY+this.tamFicha/2, this.tamFicha/2, 0, 2*Math.PI)
                this.ctx.closePath()
                this.ctx.fill()*/

                this.ctx.drawImage(this.img, this.posX, this.posY, this.tamFicha, this.tamFicha)                    
                
            }else{
                //console.log("estoy en ficha azul")
                this.ctx.drawImage(this.img2, this.posX, this.posY, this.tamFicha, this.tamFicha) 

            }
        }
    }
    isPointInside(x,y){// para ver si estoy agarrando una ficha
        let radio = this.tamFicha/2;        
        let pos_x = (this.posX + radio) - x;
        let pos_y = (this.posY + radio) - y;

        return Math.sqrt(pos_x * pos_x + pos_y * pos_y) < radio;
    }
    setPos(x,y){
        let radio = this.tamFicha/2;
        let pos_x = (this.posX + radio) - x;
        let pos_y = (this.posY + radio) - y;

        this.posX = x - radio + pos_x;
        this.posY = y - radio + pos_y;
    }
}