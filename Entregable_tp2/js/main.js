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
    let clickedFigure = null;

    let tablero;
    let rojas=[]; let azules=[]; 
    let r=0; let a=0; 
    let jugadores=[];
    let posX, posY;
    //---empiezo---------------------
    let img = new Image();        
    img.src = "image/fichaRoja.png";
    let img2 = new Image();        
    img2.src = "image/fichaAzul.png";

    let jugador1 = "Luis";
    let jugador2 = "Cristian";
    jugadores[0] = jugador1; //luis
    jugadores[1] = jugador2; //cristian
    let esSuTurno = false;// alternar turnos para fichas ??
    
    //----------------------eventos----------------
    //let fila = document.querySelector('#alto').value;
    //let col = document.querySelector('#ancho').value;
    let j = document.querySelector('#jugar').addEventListener('click',inicial);
    document.querySelector('#reiniciar').addEventListener('click',reiniciarJuego);
    canvas.addEventListener('mousedown',function(e){//CUANDO HAGO CLICK
        //let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
        let eX = e.layerX;
        let eY = e.layerY;        
        let hiceClick = findClickedFigure(eX, eY);
        //console.log(hiceClick)
        
        if((hiceClick != null) ){
            //console.log(hiceClick.jugador)//me trae el jugador..interesantee...
            clickedFigure = hiceClick;
        }
    });

    canvas.addEventListener('mouseup',function(){ //todavia no anda //LO QUE HAGO AL SOLTAR LA FICHA

        if(clickedFigure != null){//como en ej figuras
            //aca deberia probar si puedo insertar en el tablero 

            let filaDeEstaFicha = tablero.puedoIngresarFicha(clickedFigure) // me va a retornar la fila o -1
            console.log(filaDeEstaFicha)

            if(filaDeEstaFicha != -1){
                console.log(clickedFigure)
                console.log( "ingreso la ficha")
                //clickedFigure.setPos(x,y)
                tablero.ingresarFicha(clickedFigure, filaDeEstaFicha) //poner en el tablero  
                console.log("acaa")
                let indiceFichaR = rojas.indexOf(clickedFigure) // busca si esa ficha esta en de ese arreglo -- me da el indice y sino -1
                if(indiceFichaR != -1){
                    rojas.splice(indiceFichaR, 1) //borro la ficha en ese indice
                }else{
                    let indiceFichaA = azules.indexOf(clickedFigure) // busca si esa ficha esta en de ese arreglo -- me da el indice y sino -1
                    if(indiceFichaA != -1){
                        azules.splice(indiceFichaA, 1) //borro la ficha en ese indice
                    }

                }
                actualizar()
            }
        }
        clickedFigure = null; 
        
    });
    canvas.addEventListener('mousemove',function(e){ //ES PARA CUANDO MUEVO EL MOUSE
        if(clickedFigure == null){return} //dataso! si uso solo return freno la ejecucion
        clickedFigure.setPos(e.layerX, e.layerY)//le paso las coordenadas de inicio a donde estoy   
        actualizar(); 
    });    

    canvas.addEventListener("mouseleave", function(){//CUANDO EL PUNTERO DEL MOUSE DEJA EL ELEMENTO SELECCIONADO
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
        tablero = new Tablero(canvas,ctx,fila,col)        
    }
    crearTablero()//--------------- comentar despues, es para probar

    //---------------------------Fichas---------------------------------
    //declaraciones
    

    function createFichitas(){
        let x =30,y=10;
    //rooojaaaaass
        let _x = x;
        let _y = y; 
        for (let i=1; i<=cantFichas;i++){
            rojas[i-1] = new Ficha(ctx, x, y, "#f00", tamFicha,jugador1);
            //console.log(rojas);
            //r++;
            x+=30;
            if(i%7==0){
                x=_x;
                y+=45;
            }
        }
        x = _x ;
        y= _y;
    //azuuleees
        for (let j=1; j<=cantFichas;j++){
            azules[j-1] = new Ficha(ctx, x+500, y,"#00f", tamFicha,jugador2);
            //console.log(azules);
            //a++;
            x+=30;
            if(j%7==0){
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
        console.log("x: " + x)
        console.log("y: " + y)

        for(let r=0; r<rojas.length; r++){
            rojas[r].isPointInside(x,y)
            //console.log(rojas[r].isPointInside(x,y))

            if (rojas[r].isPointInside(x,y)){
                return rojas[r]
            }
        }

        for(let a=0; a<azules.length; a++){
            azules[a].isPointInside(x,y)

            if (azules[a].isPointInside(x,y)){
                return azules[a]
            }
        }
    }
    
    function actualizar(){
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height);        
        tablero.redibujarTablero();
        
        for (const i in rojas) {
            rojas[i].dibujarFicha();
        }
        for (let j in azules){
            azules[j].dibujarFicha();
        }        
    }

    function reiniciarJuego(){       
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height); 
        rojas=[];
        azules=[];

        inicial();
    }

    createFichitas();//--------------- comentar despues, es para probar
    crearTablero();//--------------- comentar despues, es para probar
});