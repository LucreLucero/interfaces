"use strict"
document.addEventListener("DOMContentLoaded", function(){
// Seteo el dia al que quiero hacer el countdown
let countDownDate = new Date("Feb 2, 2021 19:30:00").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Hago un date del dia actual
  let now = new Date().getTime();

  // hago el calculo entre el dia actual y el que estoy haciendo cuenta regresiva
  let distance = countDownDate - now;

  // Calcula dias, horas, minutos y segundos
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // muestro el conteo en el html
  document.querySelector("#countD").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s";

  // si se me termina el conteo pongo un mensaje
  if (distance < 0) {
    clearInterval(x);
    document.querySelector("#countD").innerHTML = "Nos vemos en el cine!";
  }
}, 1000);

//volver a ver el loader
//let s = setTimeout(function(){
  //let loader = document.querySelector("#spinner")
  //classList.toggle("#spinner")

//});

//-----hacer el menu hamburguesa------

let menu = document.querySelector('.mHamburguesa');
function toggleMenu (e) {
  this.classList.toggle('is-active');
  document.querySelector( ".menu" ).classList.toggle("is_active");
  e.preventDefault();
}
menu.addEventListener('click', toggleMenu, false);


});
