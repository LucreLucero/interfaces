"use strict"
document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;// = window.width;
    let height = canvas.height;// = window.height;
    const fila=7; 
    const col=6;
    let cantFichas = (fila*col)/2;
    let tamFicha = 50;

    //let clickedFigure;
    let clickedFigure = null;

    let rojas=[]; let azules=[]; let r=0; let a=0;
    let posX, posY;
    //---empiezo
    let img = new Image();        
    img.src = "image/fichaRoja.png";
    let img2 = new Image();        
    img2.src = "image/fichaAzul.png";

    //----------------------eventos----------------
    //let fila = document.querySelector('#alto').value;
    //let col = document.querySelector('#ancho').value;
    document.querySelector('#jugar').addEventListener('click',inicial);
    document.querySelector('#reiniciar').addEventListener('click',reiniciarJuego);

    canvas.addEventListener('mousedown',function(e){
        //let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
        let eX = e.layerX;
        let eY = e.layerY;        
        let hiceClick = findClickedFigure(eX, eY)
        console.log(hiceClick)
        
        if(hiceClick != null){
            //console.log(clickedFigure)
            //console.log(hiceClick)
            clickedFigure = hiceClick;
            return hiceClick
        }
        //if(clickedFigure.jugador == jugadores[i]){
          //  hiceClick = elemento;
        //        
    });
    canvas.addEventListener('mouseup',function(e){ //todavia no anda

        if(clickedFigure != null){//como en ej figuras
            //aca deberia probar si puedo insertar en el tablero 
            let estaFicha = puedoIngresarFicha(clickedFigure)
            if(estaFicha != null){
                ingresarFicha(estaFicha) //poner en el tablero                 
            }
        }
        //clickedFigure = null; 
        
    });
    canvas.addEventListener('mousemove',function(e){
        //console.log(clickedFigure)
        console.log("mousemoveee")
        if(clickedFigure == null){return} //dataso! si uso solo return freno la ejecucion

                //moviendo(x, y, e.clientX - rect.left, e.clientY - rect.top)//le paso las coordenadas de inicio a donde estoy
                clickedFigure.setPos(e.layerX, e.layerY)//le paso las coordenadas de inicio a donde estoy            
        actualizar(); 
    });
    
    canvas.addEventListener("mouseleave", function(){
        clickedFigure = null; 
    });

    //necesito-- tablero(celdas)--matrix
    //ficha(fichas)--movimientos--
    //jugadores--quien gana(ficha-tab)
    //---------------Tablero------------
   
    function inicial(){
        rojas=[];
        azules=[];
        crearTablero();
        createFichitas();
    }

    function crearTablero(){ 
        let mat=[fila];
        for (let f=0;f<fila;f++){
            mat [f]=[];
            for (let c=0;c<col;c++){
                mat[f][c]=null;
            }
            //console.log(mat);
        }
        //console.log("miro la matriz")

        let img = new Image();
        img.src = "image/tablero.png";
        img.onload = function(){ 
            redibujarTablero(img,mat);
        }
    }
    function redibujarTablero(img,mat){ 
        //let miPatron;
        for (let f=0;f<fila;f++){
            for (let c=0;c<col;c++){
                mat[f][c]= img;    
                
            }
        }
        let miPatron = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = miPatron;
        ctx.fillRect(250,250, img.width*fila, img.width*col);      
    }

    function puedoIngresarFicha(){
        //si estoy en el tablero
        //ingreso ficha
    }
    function ingresarFicha(){}
    function corroborarPos(){}

    //---------------------------Fichas---------------------------------
    //declaraciones
    
    function createFichitas(){
        let x =30,y=10;
    //rooojaaaaass
        let _x = x;
        let _y = y; 
        for (let i=0; i<cantFichas;i++){
            rojas[r] = new Ficha(ctx, x, y, "#f00", tamFicha);
            //console.log(rojas);
            r++;
            x+=30;
            if(r%7==0){
                x=_x;
                y+=45;
            }
        }
        x = _x ;
        y= _y;
    //azuuleees
        for (let j=0; j<cantFichas;j++){
            azules[a] = new Ficha(ctx, x+500, y,"#00f", tamFicha);
            //console.log(azules);
            a++;
            x+=30;
            if(a%7==0){
                x=_x;
                y+=45;
            }
        }
        x = _x ;
    }
    
    function getPosition(){
        return{
            x:getPosX(),
            y:getPosY()
        };
    }
    function getPosX(){
        return canvas.posX;
    }
    function getPosY(){
        return canvas.posY;
    }
    
//------------------------------------Main-------------------------------------------
    

    function findClickedFigure(x,y){
        // tengo que recorrer los arreglos de cada ficha y ver si toque a alguna
        for(let r=0; r<rojas.length; r++){
            rojas[r].isPointInside(x,y)
            //console.log(rojas[r].isPointInside(x,y))

            if (rojas[r].isPointInside(x,y)){
                return rojas[r]
            }

        }
        for(let a=0; a<azules.lenght; a++){
            azules[a].isPointInside(x,y)
            //console.log(azules[a].isPointInside(x,y))

            if (azules[a].isPointInside(x,y)){
                return azules[a]
            }
        }
    }
      
    /*function setPos(x,y){
        posX = (x-25) + pos_x;
        posY = (y-25) + pos_y;
    }*/

    function actualizar(){
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height);
        
        crearTablero();
        
    
        for (const i in rojas) {
            //console.log(rojas[i])
            rojas[i].dibujarFicha();
        }
        for (let j in azules){
            azules[j].dibujarFicha();
        }
        console.log("actualice fichas y ahora el tablero")
        
    }
    function dibujarFicha(){
        //console.log("holi")
        if(ctx){
            //ctx.beginPath();                 
            //ctx.closePath();
            if(color === rojo){ 
                //console.log("estoy en ficha roja")
                this.ctx.drawImage(this.img, this.posX, this.posY, this.tamFicha, this.tamFicha)                    
                //this.ctx.strokeStyle("black");
                //this.ctx.stroke();
            }else{
                //console.log("estoy en ficha azul")
                this.ctx.drawImage(this.img2, this.posX, this.posY, this.tamFicha, this.tamFicha) 

            }
        }
    }

    function reiniciarJuego(){
        console.log(rojas.length);
        console.log(azules.length);
       
        rojas=[];
        azules.splice(0);

        ctx.clearRect(0,0,canvas.width,canvas.height);//limpia el lienzo        
        inicial();
        console.log(rojas.length);
        console.log(azules.length);


    }

    createFichitas();
    crearTablero();
});