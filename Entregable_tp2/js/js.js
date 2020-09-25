"use strict"
document.addEventListener("DOMContentLoaded", function(){
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
//let ficha = document.querySelector('#ficha').getContext('2d');
let width = canvas.width;// = window.width;
let height = canvas.height;// = window.height;

let imageData = ctx.createImageData(width, height);
let data = imageData.data;
//--------pruebo crear una matriz
const fila=6; const col=7;
let mat = [];
console.log(mat);

//Cargando imagen local al iniciar
let img = new Image();
img.src = "image/tablero.png";
img.onload = function(){ 
  ctx.drawImage(img, 0, 0); 
}

    for (let i = 0; i < fila; i++) {
      mat[i] = [];
      for (let j = 0; j < col; j++) {
        mat[i][j] = img ; 
        
      }
    }
  
//mat[fila][col];
console.log(mat);

function dibujarFicha(){ 
  let img = new Image();
  img.src = "image/fichaAzul.png";
  img.onload = function(){ 
    ctx.drawImage(img, 0, 0); 
  }
}
//dibujarFicha();

//para usar por cada ficha
document.querySelectorAll("#ficha").forEach(item=> {
  item.addEventListener('click', event=>{
    //algo agarro ficha con mousedown, la muevo con moveto, la suelto con mouseup 
  })

  


})






//--------------------------------
/*function createMatrix(valor, matrix){
  console.log(valor);
  let alto=valor;
  let ancho = alto+1;
  
  for(let i=0;i<alto;i++){
    matrix[i] = [];
    for (let j = 0; j < ancho; j++) {
      matrix[i][j] = [];
    }
  }
  console.log(matrix);
}

createMatrix();

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      setPixel(imageData, x, y, 0, 0, 255, 0);
    }
  }
ctx.putImageData(imageData,0,0);
//---------------------
//cargo imagen
input1.onchange = e => {
  context.clearRect(0,0,canvas.width,canvas.height);//limpia el lienzo
  // getting a hold of the file reference
  let file = e.target.files[0];

  // setting up the reader
  let reader = new FileReader();
  reader.readAsDataURL(file); // this is reading as data url

  // here we tell the reader what to do when it's done reading...
  reader.onload = readerEvent => {
          let content = readerEvent.target.result; // this is the content!
          let image = new Image();
          //image.crossOrigin = 'Anonymous';
          image.src = content;
          image.onload = function () {
              let imageAspectRatio = (1.0 * this.height) / this.width;
              let imageScaledWidth = canvas.width;
              let imageScaledHeight = canvas.width * imageAspectRatio;

              // draw image on canvas
              ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

              // get imageData from content of canvas
              imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
              // draw the modified image
              ctx.putImageData(imageData, 0, 0);
          }
  }
}*/

//--------------------
function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
});