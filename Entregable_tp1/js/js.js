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
let canvas = document.querySelector('#myCanvas');
let context = canvas.getContext('2d');
let input1 = document.querySelector('#input1');
let imageData = context.createImageData(canvas.width, canvas.height);
let rect = canvas.getBoundingClientRect();//me da el left y top de donde esta el canvas(coordenadas)
let x=0, y=0, dibujando=false, color='black', grosor=1, lapiz=false, goma =false;
let imagenOriginal;
let imagenCargada=false;
let descartarImg=false;
//para dibujar necesito 3 eventos: mousedown, mousemove y mouseup

canvas.addEventListener('mousedown',function(e){
    x = e.clientX - rect.left; //x=left 
    y = e.clientY - rect.top; //y=top
    dibujando = true;
});
canvas.addEventListener('mousemove',function(e){
        if(dibujando===true){
            //x, y del comienzo | x, y de donde estoy
            dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top)//le paso las coordenadas de donde dibujo desde el inicio a donde estoy
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
});
canvas.addEventListener('mouseup',function(e){
    if(dibujando===true){
        dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top)//le paso las coordenadas de donde dibujo desde el inicio a donde estoy
        x=0;
        y=0;
        dibujando=false;
    }
});

function dibujar(x1, y1, x2, y2){
    if(lapiz===true){ 
          context.beginPath();
          color = document.querySelector("#color").value;
          grosor = document.querySelector("#grosor").value;
          context.strokeStyle = color;
          context.lineJoin = 'round';
          context.lineCap = 'round';
          context.lineWidth = grosor;
          context.moveTo(x1,y1);
          context.lineTo(x2,y2);
          context.stroke();
          context.closePath();     
    }
    else if(goma===true){ 
        context.beginPath();
          color = "white";
          grosor = 20;
          context.strokeStyle = color;
          context.lineJoin = 'round';
          context.lineCap = 'round';
          context.lineWidth = grosor;
          context.moveTo(x1,y1);
          context.lineTo(x2,y2);
          context.stroke();
          context.closePath();    
    }else{
        console.log("entre a un error");
    }
}

function restaurarOriginal(){
    //console.log(imagenOriginal);
    //console.log(imagenCargada);
    if((imagenCargada===true)&&(descartarImg===false))
        context.putImageData(imagenOriginal, 0, 0);    
    lapiz=false;
    goma=false;
}

function usoLapiz(){
    lapiz = true;
}
function usoGoma(){
    lapiz = false;
    goma = true;
}

//--------declaracion de eventos con botones---------------
document.querySelector("#color").addEventListener("click",usoLapiz);//anda
document.querySelector("#goma").addEventListener("click",usoGoma);//anda

document.querySelector("#original").addEventListener("click", restaurarOriginal);//anda
document.querySelector("#ByN").addEventListener("click", binarizacion);//anda
document.querySelector("#sepia").addEventListener("click", sepia);//anda
document.querySelector("#negativo").addEventListener("click",negativo);//anda
document.querySelector("#brillo").addEventListener("click",brillo);//anda

document.querySelector("#saturacion").addEventListener("click", saturacion);//anda
document.querySelector("#blur").addEventListener("click",blur);//no andaaaaaaa
//document.querySelector("#suavizado").addEventListener("click", suavizado);
//document.querySelector("#bordes").addEventListener("click",deteccionDeBordes); 

document.querySelector("#dwn").addEventListener("click",guardar);//anda
document.querySelector("#delete").addEventListener("click",descartar);//anda

//2. iniciar con lienzo en blanco o por carga de imagen desde disco(usar dialogo para elegir imagen)

function lienzoBlanco(){//listo
    event.preventDefault();
    console.log("entre a lienzooo blancoo");

    imageData = context.getImageData(0,0,canvas.width,canvas.height);
    for(let i=0;i<canvas.width;i++){
        for(let j=0;j<canvas.height;j++){
            setPixel(imageData,i,j,255,255,255,255);
        }
    }
    context.putImageData(imageData,0,0);
}

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
                context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

                // get imageData from content of canvas
                imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                imagenOriginal = imageData;
                imagenCargada =true;
                descartarImg=false;
                // draw the modified image
                context.putImageData(imageData, 0, 0);
            }
    }
}


//----------------------------------------------
//3. aplicar filtros por pixeles a la imagen actual: negativo|brillo|binarizacion(byn)|sepia
function binarizacion(){ //blanco y negro
    event.preventDefault();
    console.log("binarizameee");
    //necesito aplicar umbral para tomar los grises
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let umbral = 50;
    for(let i = 0; i<canvas.width-1; i++){
        for(let j = 0; j<canvas.height; j++){
            let prom = Math.floor((getRed(imageData,i,j)+getGreen(imageData,i,j)+getBlue(imageData,i,j))/3);
            if(prom>umbral){
                setPixel(imageData,i,j,255,255,255,255);
            }else{
                setPixel(imageData,i,j,0,0,0,255);
            }
        }
    }
    context.putImageData(imageData,0,0);
}

function sepia(){//listo - corroborar
    event.preventDefault();
    console.log("sepiaaaaaaaaaaa");

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);    
    for (let i=0;i<imageData.width;i++){
        for(let j=0;j<imageData.height;j++){            
            let prom = Math.floor(getRed(imageData,i,j)+getGreen(imageData,i,j)+getBlue(imageData,i,j)/3);
            let r = Math.min(prom+40, 255);
            let g = Math.min(prom+15, 255);
            let b = Math.min(prom, 255);
            setPixel(imageData,i,j,r,g,b, 255);
        }
    }
    context.putImageData(imageData,0,0);
}

function negativo(){//listo
    event.preventDefault();
    console.log("en el negativo");
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 0] = 255 - data[i];     // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        context.putImageData(imageData,0,0);
}

function brillo (){//listo
    event.preventDefault();
    console.log("en el brillo");
    let brillo = 10;
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    //el brillo lo que hace es darle mas intensidad al color asi que le sumo una constante
    for (let i=0;i<imageData.width;i++){
        for(let j=0;j<imageData.height;j++){
            let r = getRed(imageData,i,j) + brillo;
            let g = getGreen(imageData,i,j) + brillo;
            let b = getBlue(imageData,i,j) + brillo;
            setPixel(imageData,i,j,r,g,b,255);
        }
    }
    context.putImageData(imageData,0,0);
}

//4. aplicar al menos dos: Saturación | Suavizado| Detección de Bordes| Blur
function saturacion(){
    event.preventDefault();
    console.log("me estoy saturando");
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let i=0;i<imageData.width;i++){
        for(let j=0;j<imageData.height;j++){
        let r = getRed(imageData,i,j);  
        let g = getGreen(imageData,i,j);
        let b = getBlue(imageData,i,j);
        let hsv= RGBtoHSV ([r,g,b]);
        hsv[1] *= 1.5;        
        let rgb = HSVtoRGB(hsv);
        setPixel(imageData,i,j,rgb[0],rgb[1],rgb[2],255);
    }}
    context.putImageData(imageData,0,0);
}
function blur(opaque){
    event.preventDefault();
    console.log("esto deberia tener efecto blur pero no anda");
        
    /*let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    let matReference = [1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36,
        1/36, 1/36, 1/36 ]

        let side = Math.round(Math.sqrt(matReference.length));
        let halfSide = Math.floor(side/2);
        let src = imageData.data;
        let sw = imageData.width;
        let sh = imageData.height;

        let w = sw;
        let h = sh;
        let output = createImageData(w, h);
        let dst = output.data;
        let alphaFac = opaque ? 1 : 0;
        for (let y=0; y<h; y++) {
            for (let x=0; x<w; x++) {
            let sy = y;
            let sx = x;
            let dstOff = (y*w+x)*4;
            let r=0, g=0, b=0, a=0;
            for (let cy=0; cy<side; cy++) {
                for (let cx=0; cx<side; cx++) {
                let scy = sy + cy - halfSide;
                let scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                    let srcOff = (scy*sw+scx)*4;
                    let wt = matReference[cy*side+cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff+1] * wt;
                    b += src[srcOff+2] * wt;
                    a += src[srcOff+3] * wt;
                }
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
            }
        }
        context.putImageData(output,0,0);*/
    }
//function suavizado(){}
//function deteccionDeBordes(){}

//5. guardar en disco la imagen o descartar y comenzar en lienzo vacio
function guardar (el){//listo
    //console.log("entre a guardar");
    dwn.href = canvas.toDataURL()
    dwn.download = "myImage.jpg"
} 

function descartar(){//listo
    event.preventDefault();
    //console.log("descartar y empezar en lienzo blanco");
    context.clearRect(0,0,canvas.width,canvas.height);//limpia el lienzo
    lienzoBlanco();
    descartarImg=true; 
    lapiz=false;
    goma =false;
}
//------------- getters y setters-------------------------
function setPixel(imageData,x,y,r,g,b,a){    
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;               
}
function getRed(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+0];
}
function getGreen(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+1];
}
function getBlue(imageData,x,y){
    return imageData.data[(x+y*imageData.width)*4+2];
}
//----------------------funciones de conversion
function RGBtoHSV(color) {
    let r,g,b,h,s,v;
    r= color[0];
    g= color[1];
    b= color[2];
    let min = Math.min( r, g, b );
    let max = Math.max( r, g, b );


    v = max;
    let delta = max - min;
    if( max != 0 )
        s = delta / max;        // s
    else {
        // r = g = b = 0        // s = 0, v is undefined
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if( r === max )
        h = ( g - b ) / delta;      // between yellow & magenta
    else if( g === max )
        h = 2 + ( b - r ) / delta;  // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;  // between magenta & cyan
    h *= 60;                // degrees
    if( h < 0 )
        h += 360;
    if ( isNaN(h) )
        h = 0;
    return [h,s,v];
};

function HSVtoRGB(color) {
    let i;
    let h,s,v,r,g,b;
    h= color[0];
    s= color[1];
    v= color[2];
    if(s === 0 ) {
        // achromatic (grey)
        r = g = b = v;
        return [r,g,b];
    }
    h /= 60;            // sector 0 to 5
    i = Math.floor( h );
    let f = h - i;          // factorial part of h
    let p = v * ( 1 - s );
    let q = v * ( 1 - s * f );
    let t = v * ( 1 - s * ( 1 - f ) );
    switch( i ) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r,g,b];
}
});