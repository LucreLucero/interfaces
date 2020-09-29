    
class Tablero{
    constructor(canvas,ctx,fila, col){
        this.canvas=canvas;
        this.ctx=ctx;
        this.fila=fila;
        this.col=col;

        this.img = new Image();
        this.img.src = "image/tablero.png";

        //tengo que crear la matriz donde voy a poner mi tablero
        this.mat = [this.fila];
        for (let f=0; f<this.fila; f++){
            this.mat [f] = [];
            for (let c=0; c<this.col; c++){
                this.mat[f][c] = null;
            }
            //console.log(this.mat);
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
        //let miPatron;
        for (let f=0;f<this.fila;f++){
            for (let c=0;c<this.col;c++){
                //this.mat[f][c]= this.img;    
                //console.log(this.img)
            }
        }

        let miPatron = this.ctx.createPattern(this.img, 'repeat');
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(250,250, this.img.width * this.fila, this.img.width*this.col);      
    }
    
}