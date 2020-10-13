"use strict"
document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;// = window.width;
    let height = canvas.height;// = window.height;
    const fila=6; 
    const col=7;
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
    
    let tieneTurno = true
    let hayGanador = false

    //----------------------eventos----------------
    //let jugador1 = document.querySelector("#jugador1").value
    //let jugador2 = document.querySelector("#jugador2").value
    //console.log(jugador1)
    //console.log(jugador2)


    jugadores[0] = jugador1; //luis
    jugadores[1] = jugador2; //cristian
    //let fila = document.querySelector('#alto').value;
    //let col = document.querySelector('#ancho').value;
    document.querySelector('#jugar').addEventListener('click',inicial);
    document.querySelector('#reiniciar').addEventListener('click',reiniciarJuego);
    canvas.addEventListener('mousedown',function(e){//CUANDO HAGO CLICK
        //let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
        let eX = e.layerX;
        let eY = e.layerY;        
        let hiceClick = findClickedFigure(eX, eY);
        let turnoJugador = hiceClick.turnoJugador //inicio con el turno de rojas y despues veo si es el turno del jugador

        if((hiceClick != null)&&(tieneTurno == turnoJugador)&&(hayGanador == false) ){
            //console.log(hiceClick.jugador)//me trae el jugador..interesantee...
            clickedFigure = hiceClick;            
        }
    });

    canvas.addEventListener('mouseup',function(){ 
        if(clickedFigure != null){
            //aca deberia probar si puedo insertar en el tablero 
            let colDeEstaFicha = tablero.puedoIngresarFicha(clickedFigure) // me va a retornar la fila o -1
            //console.log(colDeEstaFicha)

            if(colDeEstaFicha != -1){
                tablero.ingresarFicha(clickedFigure, colDeEstaFicha) //poner en el tablero  
                //tablero.toggle(clickedFigure)
                

                if(hayGanador==false){
                    if (tieneTurno==true)
                        tieneTurno = false
                    else
                        tieneTurno = true
                
                    //corroboro si alguien gano 
                    hayGanador = tablero.corroborarGanador() //aca deberia traer un boolean
                    if(hayGanador==true){
                        tablero.mensajeGanador(clickedFigure,hayGanador)
                    }else{
                        if((rojas != null && rojas.length==0) && (azules != null && azules.length == 0)){ 
                            console.log(rojas)
                            console.log(rojas.length)
                            console.log(azules)
                            console.log(azules.length)
                            console.log("algo aca para ver el empate")
                            console.log(hayGanador)
                            
                            tablero.mensajeEmpate()
                        }
                    }
                    

                    //elimino las fichas ingresadas del arr de fichas
                    let indiceFichaR = rojas.indexOf(clickedFigure) // busca si esa ficha esta en de ese arreglo -- me da el indice y sino -1
                    if(indiceFichaR != -1){
                        rojas.splice(indiceFichaR, 1) //borro la ficha en ese indice
                    }else{
                        let indiceFichaA = azules.indexOf(clickedFigure) // busca si esa ficha esta en de ese arreglo -- me da el indice y sino -1
                        if(indiceFichaA != -1){
                            azules.splice(indiceFichaA, 1) //borro la ficha en ese indice
                        }

                    }                    
                }  
                actualizar() //actualizo mi vista
                
                if(clickedFigure.jugador.value == jugador1.value)
                    tablero.toggleMensajeTurno(jugador2.value,hayGanador)
                else
                    tablero.toggleMensajeTurno(jugador1.value,hayGanador)

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
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height); 
    
        rojas=[];
        azules=[];
        tieneTurno = true
        hayGanador = false
        let msjGanador = document.querySelector("#win")
        msjGanador.style.display = 'none'
        let jugador1 = document.querySelector("#jugador1").value
        let jugador2 = document.querySelector("#jugador2").value
        
        crearTablero();
        createFichitas();
    }

    function crearTablero(){
        tablero = new Tablero(canvas,ctx,fila,col,jugadores)  
        tablero.nombresIndice()  
        tablero.nombresTurno()       
    }

    //---------------------------Fichas---------------------------------

    function createFichitas(){
        let turnoJugadorRojo = true; // alternar turnos para fichas ??
        let turnoJugadorAzul = false;
        let x =30,y=40;
    //rooojaaaaass
        let _x = x;
        let _y = y; 
        for (let i=1; i<=cantFichas;i++){
            rojas[i-1] = new Ficha(ctx, x, y, "#f00", tamFicha,jugador1,turnoJugadorRojo);
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
            azules[j-1] = new Ficha(ctx, x+500, y,"#00f", tamFicha,jugador2,turnoJugadorAzul);
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
        if (hayGanador==false){ 
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height);  }      
        tablero.redibujarTablero();
        
        for (const i in rojas) {
            rojas[i].dibujarFicha();
        }
        for (let j in azules){
            azules[j].dibujarFicha();
        }  
        tablero.nombresIndice() 
    
    }

    function reiniciarJuego(){       
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,width,height); 

        tieneTurno = true
        hayGanador = false
        rojas=[];
        azules=[];
        inicial();
    }
    createFichitas();//--------------- comentar despues, es para probar
    crearTablero();//--------------- comentar despues, es para probar
});