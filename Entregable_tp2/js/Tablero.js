    
class Tablero{
    constructor(canvas,ctx,fila, col){
        this.canvas=canvas;
        this.ctx=ctx;
        this.fila=fila;
        this.col=col;
        
        this.ini = 2
        this.punto = "#862"
        this.img = new Image();
        this.img.src = "image/tablero.png";

        //tengo que crear la matriz donde voy a poner mi tablero
        this.mat = [this.fila];
        for (let f=0; f<this.fila; f++){
            this.mat [f] = [];
            for (let c=0; c<this.col; c++){
                this.mat[f][c] = null;
            }
        }
        //console.log("miro la matriz")

        this.crearTablero();
    }
    crearTablero(){ 
        //---------------
        let t = this // porque tengo que hacer una variable? .. no lo se, pero funciona
        this.img.onload = function(){ 
            t.redibujarTablero();
        }
    }
    
    redibujarTablero(){ 
        for (let f=0;f<this.fila;f++){
            for (let c=0;c<this.col;c++){
                //this.mat[f][c]= this.img;    
                //console.log(this.img)
            }
        }
        
        for (let i=0;i<this.fila;i++){// hago los indicadores del tablero por cada filas
            this.ctx.beginPath()
            this.ctx.fillStyle = this.punto
            this.ctx.arc(275+this.img.width*i, 220, 10, 0, 2 * Math.PI)
            this.ctx.closePath()
            this.ctx.fill()
        }
        //creo el tablero con la imagen
        let miPatron = this.ctx.createPattern(this.img, 'repeat');
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(250,250, this.img.width * this.fila, this.img.width*this.col);      
    }

    puedoIngresarFicha(clickedFigure){
        //le paso una ficha 
        //let hiceClick = findClickedFigure(eX, eY)
        console.log()
        for (let i=0;i<this.fila;i++){
            if((clickedFigure.x == 275+this.img.width*i)&&(clickedFigure.y == 220)){
                return true;
            }  
            return false;          
        }

    }
    ingresarFicha(){}
    corroborarPos(){}
    
}