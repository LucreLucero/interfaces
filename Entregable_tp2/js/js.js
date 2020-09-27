"use strict"
document.addEventListener("DOMContentLoaded", function(){
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
//let fila = document.querySelector('#ficha').getContext('2d');
//let col = document.querySelector('#ficha').getContext('2d');
let width = canvas.width;// = window.width;
let height = canvas.height;// = window.height;
let fichas = [];
let ficha;
let moviendo = false;
let imageData = ctx.createImageData(width, height);

//--------pruebo crear una matriz
const fila=7; const col=6;
let nrofichas = fila*col;

let tablero = new Tablero(canvas,ctx,fila,col); //crearTablero();
tablero.crearTablero();

function actualizar(){
  for (let i=0;i<fichas.lenght;i++){
    ctx.fillStyle=fichas[i].color;
    ctx.fillRect(fichas[i].x, fichas[i].y, fichas[i].width, fichas[i].height);
  }
}

actualizar();
/*for (let i = 0;i<nrofichas;i++){
  ficha =  dibujarFicha();
  console.log(ficha);

  fichas.push(ficha);
}*/

function dibujarFicha(){ 
  let img = new Image();
  img.src = "image/fichaRoja.png";
  img.onload = function(){ 
    ctx.drawImage(img, 0, 0); 
  }
}

/*function crearTablero(){ 
  let img = new Image();
  img.src = "image/tablero.png";
  img.onload = function(){ 
  let miPatron = ctx.createPattern(img, 'repeat');
          ctx.fillStyle = miPatron;
          ctx.fillRect(250,100, img.width*fila, img.width*col);
  }
}*/


canvas.addEventListener('click', function (e){ 
  clickedFigure = Ficha.findClickedFigure(event.layerX, event.layerY);
  if(clickedFigure != null){
    //mover
  }
});

canvas.addEventListener("mousedown", function(evt) {
  // haz algo
  }, false);
  
  canvas.addEventListener("mousemove", function(evt) {
  // haz otra cosa
  }, false);
  
  canvas.addEventListener("mouseup", function(evt) {
  // haz algo más
  }, false);

//para usar por cada ficha
document.querySelectorAll("#ficha").forEach(item=>{
  item.addEventListener('click', event=>{
    //algo agarro ficha con mousedown, la muevo con moveto, la suelto con mouseup 
  })
});

});