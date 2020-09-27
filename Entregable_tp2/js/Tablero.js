//const fila=9; const col=8;
    //let tablero = new Tablero(canvas,ctx,fila,col);
    //tablero.crearTablero();
    
class Tablero{
    constructor(canvas,ctx,fila, col){
        this.canvas=canvas;
        this.ctx=ctx;
        this.fila=fila;
        this.col=col;

        this.img = new Image();
        this.img.src = "image/tablero.png";


        //tengo que crear la matriz donde voy a poner mi tablero
        this.altura = [this.col];
        this.crearTablero();
    }

    crearTablero(){ 
        //let img = new Image();
        //img.src = "image/tablero.png";

        this.img.onload = function(){ 
            redibujarTablero();
        }
    }
    redibujarTablero(){ 
        //let img = new Image();
        //img.src = "image/tablero.png";
        let miPatron;
        this.miPatron = this.ctx.createPattern(img, 'repeat');
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(250,100, img.width*fila, img.width*col);
        
    }





}