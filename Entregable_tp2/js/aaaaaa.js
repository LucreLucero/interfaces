class Ficha{
    constructor(ctx,posX,posY, color){
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        //this.fill = fill;
        this.img = new Image()        
        this.img.src = "image/fichaRoja.png"
        this.img2 = new Image()        
        this.img2.src = "image/fichaAzul.png"
        
        this.color=color
        
        //console.log(image)

        this.dibujar()
    }   
    dibujar(){
        this.img.onload,this.img2.onload = function(){ 
            //this.dibujarFicha()
            console.log("entre a dibujar ficha");
            
            if(this.col==this.color)
            this.ctx.drawImage(this.img, posX, posY,50,50); 
            else
            this.ctx.drawImage(this.img2, posX, posY,50,50); 

    }
}
    dibujarFicha (){ 
        console.log("entre a dibujar ficha")
        this.ctx.beginPath()
        //this.img.onload,this.img2.onload = function(){ 

        //this.image.onload = function(){  
            console.log(this.img)
            console.log("entre a dibujar ficha");
            if(this.col==this.color)
            this.ctx.drawImage(img, x, y,50,50); 
            else
            this.ctx.drawImage(img2, x, y,50,50); 

            //this.ctx.drawImage(this.img, this.posX, this.posY,50,50)
                    
            //}
        
    }

      /*
    isPointInside(posX, posY){
        let radio = 25
        let pos_x = posX - x
        let pos_y = posY - y

        return Math.sqrt(pos_x *pos_x +pos_y*pos_y) < radio
    }*/
      
}