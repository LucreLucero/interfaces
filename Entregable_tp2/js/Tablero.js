    
class Tablero{
    constructor(canvas,ctx,fila, col,jugadores){
        this.canvas=canvas;
        this.ctx=ctx;
        this.fila=fila;
        this.col=col;
        this.jugadores=jugadores
        
        this.cantRondas = 1

        this.tamFicha = 50
        this.punto = "#862"
        this.img = new Image();
        this.img.src = "image/tablero.png";

        this.posFicha = {f:0,c:0} 

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
            }
        }
        // hago los indicadores del tablero por cada filas
        for (let i=0;i<this.col;i++){
            this.ctx.beginPath()
            this.ctx.fillStyle = this.punto
            this.ctx.arc(275+this.img.width*i, 220, 10, 0, 2 * Math.PI)
            this.ctx.closePath()
            this.ctx.fill()
        }
        //creo el tablero con la imagen
        let miPatron = this.ctx.createPattern(this.img, 'repeat');
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(250,250, this.img.width * this.col, this.img.width*this.fila);     
    }
    nombresIndice(){
        this.ctx.font = "15px Arial black"
        this.ctx.fillStyle = "red"
        this.ctx.textAlign = "right"
        this.ctx.fillText(this.jugadores[0].value,180, 30) 

        this.ctx.font = "15px Arial black"
        this.ctx.fillStyle = "blue"
        this.ctx.textAlign = "right"
        this.ctx.fillText(this.jugadores[1].value, 680, 30)
    }

    nombresTurno(){
        this.ctx.font = "20px Arial black"
        this.ctx.fillStyle = "grey"
        this.ctx.textAlign = "center"
        this.ctx.fillText("ROJAS PRIMERO!",this.canvas.width/2, this.canvas.height/5) 
    }

    toggleMensajeTurno(jugador,hayGanador){
        console.log(hayGanador)
            this.ctx.font = "20px Arial black"
            this.ctx.fillStyle = "grey"
            this.ctx.textAlign = "center"
            this.ctx.fillText("Y ahora? " ,this.canvas.width/2, this.canvas.height/5) 
            this.ctx.fillText(jugador,this.canvas.width/2, this.canvas.height/4) 
        
    }

    nombresTurno(){
        this.ctx.font = "20px Arial black"
        this.ctx.fillStyle = "grey"
        this.ctx.textAlign = "center"
        this.ctx.fillText("ROJAS PRIMERO!",this.canvas.width/2, this.canvas.height/5) 
    }


    mensajeGanador(clickedFigure,hayGanador){
        if(hayGanador==true){
            let msjGanador = document.querySelector("#win")
            let c = clickedFigure.color

            msjGanador.style.display = 'none'
            let player = clickedFigure.jugador.value
            msjGanador.innerHTML = "EL GANADOR ES \n" + player + " !"
            msjGanador.style = `background : ${c}`
            this.ctx.fillStyle="#fff";
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height); 
    //----------------------------------
            this.ctx.font = "20px Arial black"
            this.ctx.fillStyle = `${c}`
            this.ctx.textAlign = "center"
            this.ctx.fillText("YEAHH!",this.canvas.width/2, this.canvas.height/5) 
            this.ctx.fillText("WIN "+ player+ "!",this.canvas.width/2, this.canvas.height/4) 
        }
    }
    mensajeEmpate(){
        //console.log("empateeee")
        this.ctx.font = "20px Arial black"
        this.ctx.fillStyle = `grey`
        this.ctx.textAlign = "center"
        this.ctx.fillText("ESTUVO PELEADO!",this.canvas.width/2, this.canvas.height/5) 
        this.ctx.fillText("ES UN EMPATE!",this.canvas.width/2, this.canvas.height/4)
    
    }

    puedoIngresarFicha(clickedFigure){
        //console.log("puedo ingresar ficha")
        //le paso una ficha 
        let ubicacionX = clickedFigure.posX + this.tamFicha/2;//
        let ubicacionY = clickedFigure.posY + this.tamFicha/2;//

        for (let i=0;i<this.col;i++){ //recorro por la cantidad de puntos
            //tengo que corroborar que el x coincida desde el centro, un poco mas            
            let x_delPunto = 275+this.tamFicha*i;
            let y_delPunto = 220//this.tamFicha*this.col

            let distancia = Math.sqrt((ubicacionX - x_delPunto) * (ubicacionX - x_delPunto) + (ubicacionY - y_delPunto) * (ubicacionY - y_delPunto))
            //console.log(distancia)
            if((distancia < 30)&&(this.mat[0][i] == null)){// distancia al tamaño de mi puntito :)
                //console.log("estoy en el puntito")
                return i;
            }  
        }
        return -1;          

    }
    ingresarFicha(clickedFigure, colDeEstaFicha){
        //meterla en la fila de la matriz si no esta vacia //desde atras para adelante
        this.posFicha.c = colDeEstaFicha

        let finalF = this.fila -1
        let x = 275+this.tamFicha*colDeEstaFicha
        let y = 0
        for (let f=finalF; f >= 0; f--){
            //console.log(this.mat[filaDeEstaFicha][c])

            if(this.mat[f][colDeEstaFicha]==null){
                //console.log("entro aca")
                this.mat[f][colDeEstaFicha] = clickedFigure;                  
                this.posFicha.f = f
                //console.log(this.posFicha.f)

                y =  275 + this.tamFicha * f
                clickedFigure.setPos(x,y)
                break
            } 
        }
        //console.log(this.mat)
        //console.log(y)
        //console.log(clickedFigure)
    }

    corroborarGanador(){
        let f = this.posFicha.f
        let c = this.posFicha.c
        //para horizontal paso fila - vertical paso col - asc y desc fila y col
        return this.posHorizontal(f) || this.posVertical(c) || this.posDiagonalAsc(f,c) || this.posDiagonalDesc(f,c)
    }

    posHorizontal(fila){
        let contador = 1
        let c = 0
        //console.log(ficha)
        //tengo que recorrer la matriz
        while(c < this.col-1){
            console.log("entre a la horizontal")

            if((this.mat[fila][c] != null)&& (this.mat[fila][c+1] != null)){
                if(this.mat[fila][c].color == this.mat[fila][c+1].color){ 
                    contador++
                    //console.log("aqui"+contador)
                    if(contador==4){
                        console.log(contador + "cuatrooo")
                        return true
                    }
                }else{
                    contador = 1
                }
            }else{
                contador = 1
            }                     
            c++
        }
        return false
    }

    posVertical(columna){
        let contador = 1
        let f = 1
        
        while(f < this.fila-1){
            console.log("entre a la vertical")

            if((this.mat[f][columna] != null)&& (this.mat[f+1][columna] != null)){
                if(this.mat[f][columna].color == this.mat[f+1][columna].color){ 
                    contador++
                    //console.log("aqui"+contador)
                    if(contador==4){
                        console.log(contador + "cuatrooo")
                        return true
                    }
                }else{
                    contador = 1
                }
            } else{
                contador = 1
            }                     
            f++
        }
        return false
    }

    posDiagonalAsc(f,c){
        let contador = 1
        console.log("ascendenteeeee")

        while ((f > 0 && c < this.col-1) && 
            (this.mat[f][c] != null) && (this.mat[f-1][c+1] != null) && (this.mat[f][c].color == this.mat[f-1][c+1].color)){
                f--
                c++
        }
        while (f < this.fila-1 && c > 0) {

            if (this.mat[f][c] != null && this.mat[f+1][c-1] != null) {
                if (this.mat[f][c].color == this.mat[f+1][c-1].color) {
                    contador ++;

                    if (contador == 4){
                        console.log(contador + "cuatrooo")
                        return true;
                    }                    
                } else
                    contador = 1;
            } else
            contador = 1;
            f ++;
            c --;
        }
        return false;
    
    }
    
    posDiagonalDesc(f,c){
        let contador = 1
        console.log("descendenteeeee")
        
        while ((f > 0 && c > 0) && 
        (this.mat[f][c] != null) && (this.mat[f-1][c-1] != null) && (this.mat[f][c].color == this.mat[f-1][c-1].color)){
            f--
            c--
        }

        while (f < this.fila-1 && c < this.col-1) {
            if (this.mat[f][c] != null && this.mat[f+1][c+1] != null) {
                if (this.mat[f][c].color == this.mat[f+1][c+1].color) {
                    contador ++;
                    //console.log(contador)

                    if (contador == 4){
                        console.log(contador + "cuatrooo")
                        return true;
                    }                    
                } else
                    contador = 1;
            } else
            contador = 1;
            f ++;
            c ++;
        }
        return false;
    
    }

    
}