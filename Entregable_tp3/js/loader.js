"use strict"
//-----------------volver a ver el loader-----------------
window.onload = setTimeout(function(){
    document.querySelector('#spinner').style.display="none";
  
    //cargo el menu aca -- sino tengo que hacerlo con el content dom para que me lo tome --??
    let menu = document.querySelector('.mHamburguesa');
    menu.addEventListener('click', toggleMenu, false);
    function toggleMenu (e) {
      this.classList.toggle('is-active');
      document.querySelector( ".menu" ).classList.toggle("is_active");
      e.preventDefault();
    }

    document.querySelector( ".page" ).style.display="block";
  },3000);

//document.querySelector('input').addEventListener('click',function (){
 // document.querySelector(".nota").innerHTML = "Gracias por comentar!";
//});
window.addEventListener("scroll", function(){
  if (document.body.scrollTop > 1300|| document.documentElement.scrollTop > 1300){
    document.querySelector('#anim').style.display = "block";
  }
});