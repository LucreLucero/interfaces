"use strict"
document.addEventListener("DOMContentLoaded", function () {
/*Desarrollar una aplicación web similar al clásico Paint de Windows que provea de la siguiente funcionalidad:
1. Barra de herramientas con al menos lápiz y goma de borrar y su correspondiente funcionalidad.
2. Permitir iniciar con un lienzo en blanco, o partir de una imagen que será cargada desde disco (Usar un diálogo
para elegir la imagen)
3. Aplicar al menos cuatro filtros por pixeles a la imagen actual, por ejemplo: negativo, brillo, binarización y sepia.
4. Aplicar al menos dos de los siguientes filtros a la imagen: Saturación, Suavizado, Detección de Bordes, Blur.
Nota: Este ejercicio es Necesario para Promoción.
5. Permitir guardar en disco la imagen, o descartar la imagen y comenzar con un lienzo vacío. */

//1.Lapiz y goma de borrar

let pencil = document.querySelector("#lapiz");

function onMouseMove(){

}
function onMouseClick(e){
    
    
}

//2. iniciar con lienzo en blanco o por carga de imagen desde disco(usar dialogo para elegir imagen)
 
//get component references --canvas que carga imagen
let canvas = document.querySelector('#myCanvas');
let input1 = document.querySelector('#input1');

let context = canvas.getContext('2d');
context.fillStyle = "#FFFFFF"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);

// when click OK in the File Dialog
input1.onchange = e => {

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
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

            // modify imageData
            //for (let j = 0; j < imageData.height; j++) {
                //for (let i = 0; i < imageData.width; i++) {
                    //if (i % 2 == 0) {
                        //let index = (i + imageData.width * j) * 4;
                      //  imageData.data[index + 0] = 0;
                    //    imageData.data[index + 1] = 0;
                  //      imageData.data[index + 2] = 0;
                //    }
              //  }
            //}
            
            // draw the modified image
            context.putImageData(imageData, 0, 0);
        }
    }
}

//----------------------------------------------
//3. aplicar filtros por pixeles a la imagen actual: negativo|brillo|binarizacion(byn)|sepia
function getRed(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+0];
  }

function getGreen(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+1];
  }

function getBlue(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+2];
  }

/*function setRed(imageData,x,y,color){
    return imageData.data[(x+y*imageData.width)*4+0]=color;
  }

function setGreen(imageData,x,y,color){
    return imageData.data[(x+y*imageData.width)*4+1]=color;
  }

function setBlue(imageData,x,y,color){
    return imageData.data[(x+y*imageData.width)*4+2]=color;
  }
*/

//--------declaracion de eventos con botones---------------

let btn = document.querySelector("#filtroBN");
if (btn != null) {
    btn.addEventListener("click", function(){ 
        binarizacion()});
}

let btnNew = document.querySelector("#blanckCanvas");
if (btn != null) {
    btn.addEventListener("click", function(){ 
//setOrigin()

        binarizacion(ctx)});
}


function binarizacion(){
    event.preventDefault();
    console.log("entra");
    

    for (let i=0;i<imageData.width;i++){
            console.log("entra");
        for(let j=0;j<imageData.height;j++){
            let r = getRed(imageData,i,j)*0.3;
            let g = getGreen(imageData,i,j);
            let b = getBlue(imageData,i,j);

        }
    }
}
function sepia(imageData){
    for (let i=0;i<imageData.width;i++){
        for(let j=0;j<imageData.height;j++){
            let r = getRed(imageData,i,j)*0.3;
            let g = getGreen(imageData,i,j);
            let b = getBlue(imageData,i,j);

        }
    }
}
function negativo(){}

function brillo (k){
    //el brillo lo que hace es darle mas intensidad al color asi que lo multiplico por una constante
    for (let i=0;i<imageData.width;i++){
        for(let j=0;j<imageData.height;j++){
            let r = getRed(imageData,i,j)*k;
            let g = getGreen(imageData,i,j)*k;
            let b = getBlue(imageData,i,j)*k;
            setPixel(i,j,r,g,b,255);

        }
    }
}



//4. aplicar al menos dos: Saturación | Suavizado| Detección de Bordes| Blur

//5. guardar en disco la imagen o descartar y comenzar en lienzo vacio

});