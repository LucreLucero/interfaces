class Ficha{
    constructor(ctx,posX,posY, color, tamFicha,jugador, turnoJugador){
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.color=color
        this.tamFicha = tamFicha
        this.jugador=jugador
        this.turnoJugador=turnoJugador

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
        //console.log("holi")
        if(this.ctx){
            //ctx.beginPath();                 
            //ctx.closePath();
            if(this.color === this.rojo){ 
                //console.log("estoy en ficha roja")
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
        
        this.posX = x - radio 
        this.posY = y - radio         
    }
}