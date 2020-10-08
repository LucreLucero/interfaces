    
class Tablero{
    constructor(canvas,ctx,fila, col){
        this.canvas=canvas;
        this.ctx=ctx;
        this.fila=fila;
        this.col=col;
        
        this.cantRondas = 1

        this.tamFicha = 50
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
                if(this.mat[f][c] != null){
                    this.mat[f][c].dibujarFicha()
                }
                //console.log(this.img)
            }
        }
        // hago los indicadores del tablero por cada filas
        for (let i=0;i<this.fila;i++){
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
        console.log("puedo ingresar ficha")
        //le paso una ficha 
        let ubicacionX = clickedFigure.posX + this.tamFicha/2;//
        let ubicacionY = clickedFigure.posY + this.tamFicha/2;//

        for (let i=0;i<this.fila;i++){ //recorro por la cantidad de puntos
            //tengo que corroborar que el x coincida desde el centro, un poco mas            
            let x_delPunto = 275+this.tamFicha*i;
            let y_delPunto = 220//this.tamFicha*this.col;

            let distancia = Math.sqrt((ubicacionX - x_delPunto) * (ubicacionX - x_delPunto) + (ubicacionY - y_delPunto) * (ubicacionY - y_delPunto))
            //console.log(distancia)
            if((distancia < 20)&&(this.mat[i][0] == null)){// distancia al tamaño de mi puntito :)
                console.log("estoy en el puntito")
                return i;
            }  
        }
        return -1;          

    }
    ingresarFicha(clickedFigure, filaDeEstaFicha){
        //meterla en la fila de la matriz si no esta vacia //desde atras para adelante
        let finalC = this.col -1
        let x = 275+this.tamFicha*filaDeEstaFicha
        let y = 0
        for (let c=finalC; c >= 0; c--){
            console.log(this.mat[filaDeEstaFicha][c])

            if(this.mat[filaDeEstaFicha][c]==null){
                console.log("entro aca")

                this.mat[filaDeEstaFicha][c] = clickedFigure;  
                //console.log(this.mat[filaDeEstaFicha][c])
                y =  275 + this.tamFicha * c
                clickedFigure.setPos(x,y)
                break
            } 
        }
        console.log(x)
        console.log(y)
        console.log(clickedFigure)
    }
    corroborarPos(){
        //tengo que recorrer la matriz 

        for (let f=0;f<this.fila;f++){
            for (let c=0;c<this.col;c++){                
                if(this.mat[f][c] != null){
                    this.mat[f][c].dibujarFicha()
                }
                //console.log(this.img)
            }
        }
    }
    
}