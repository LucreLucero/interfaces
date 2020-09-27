"use strict"
document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.querySelector('#myCanvas');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;// = window.width;
    let height = canvas.height;// = window.height;
    //let imageData = ctx.createImageData(width, height);
    //necesito-- tablero(celdas)--matrix
    //ficha(fichas)--movimientos--
    //jugadores--quien gana(ficha-tab)

    //---------------Tablero------------
    const fila=7; const col=6;
    let clickedFigure=false;

    function crearTablero(){ 
        let mat=[fila];
        for (let f=0;f<fila;f++){
            mat [f]=[];
            for (let c=0;c<col;c++){
                mat[f][c]=null;
            }
        }
        console.log(mat);

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
        ctx.fillRect(250,100, img.width*fila, img.width*col);      
    }
    crearTablero();

    function puedoIngresarFicha(){
        //si estoy en el tablero
        //ingreso ficha
    }
    function ingresarFicha(){}
    function corroborarPos(){}

    //---------------------------Fichas---------------------------------
    //declaraciones
    let cantFichas = (fila*col)/2;
    let tamFicha = 50;
    let x =30,y=10;
    let rojas=[]; let azules=[]; let r=0; let a=0;
    let posX, posY;
    //---empiezo
    let img = new Image();        
    img.src = "image/fichaRoja.png";
    let img2 = new Image();        
    img2.src = "image/fichaAzul.png";
    console.log(img);


    function createFichitas(){
    //rooojaaaaass
        let _x = x; 
        for (let i=0; i<cantFichas;i++){
            rojas[r] = new Ficha(ctx, x, y, "#f00", tamFicha);
                console.log(rojas);
                r++;
            x+=30;
            if(r%7==0){
                y+=20;
            }
        }
        x = _x ;
    //azuuleees
        for (let i=0; i<cantFichas;i++){
            azules[a] = new Ficha(ctx, canvas.width-250 + x, y,"#00f", tamFicha);
            console.log(rojas);
            a++;
            x+=30;
            if(r%7==0){
                y+=20;
            }
        }
        x = _x ;

        /*let _x = x; 
        for (let i=1;i<=7;i++) { //bucles para crear fichas.
            for (let j=1;j<=3;j++) {
                rojas[r] = new Ficha(ctx,x,y,"#f00");
                console.log(rojas);

                azules[a] = new Ficha(ctx,canvas.width-250 + x,y,"#00f");
                console.log(azules);
                r++;a++;
                x+=50;
            }
            y+=40; //posición y para ficha siguiente
            x=_x;
        }*/
    }
createFichitas();


    
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
    let elementR, elementA; 
    let hiceClick = null;

    function findClickedFigure(x,y){
        for(let r=0;r<rojas.lenght;r++){
            elementR = rojas[i];

            if(elementR.isPointInside(x,y)){
                return elementR;
            }
        }
        for(let a=0;a<azules.lenght;a++){
            elementA = azules[a];
            if(elementA.isPointInside(x,y)){
                return elementA;
            }
        }
    }
      
    function setPos(x,y){
        posX = (x-25) + pos_x;
        posY = (y-25) + pos_y;
    }

    function isPointInside(x,y){// para ver si estoy agarrando una ficha
        let radio = tamFicha/2;
        let pos_x = posX - x;
        let pos_y = posY - y;

        return Math.sqrt(pos_x *pos_x +pos_y*pos_y) < radio;
    }

    function actualizar(){
        //ctx.fillStyle="#f0f0f0";
        //ctx.fillRect(0,0,width,height);
        
        crearTablero();
        
        for (let i in rojas) {
            rojas[i].createFichitas()
        }
        for (let j in azules){
            azules[j].createFichitas()
        } 
    }


    canvas.addEventListener('mousedown',function(e){
        //en el elemento uso e.layerX , e.layerY
        let elemento = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
        if(elemento == null){return}
        //if(elemento.jugadores == jugadores[i]){
          //  hiceClick = elemento;
        //        
    });
    canvas.addEventListener('mousemove',function(e){
            if(hiceClick != null){
                //x, y del comienzo | x, y de donde estoy
                //moviendo(x, y, e.clientX - rect.left, e.clientY - rect.top)//le paso las coordenadas de inicio a donde estoy
                hiceClick.x = e.clientX;
                hiceClick.y = e.clientY;
            }
            actualizar(); 
    });
    canvas.addEventListener('mouseup',function(e){
        if(hiceClick != null){
            moviendo(x, y, e.clientX - rect.left, e.clientY - rect.top)//le paso las coordenadas de inicio a donde estoy
            x=0;
            y=0;

            hiceClick=null;                   
        }
    });
});