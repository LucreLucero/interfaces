let flecha = document.querySelector('.mas-canciones')
if(flecha!=null && flecha!=undefined){
    flecha.addEventListener('click', function(){
        let aux = document.querySelector('.bloque2')
        aux.style.display = "block"
    })
}

let flecha2 = document.querySelector('.mas-canciones2')
if(flecha2!=null && flecha2!=undefined){
    flecha2.addEventListener('click', function(){
        let aux = document.querySelectorAll('.hiden')
        aux.forEach(element => {
            element.classList.remove('hiden')
        });
    })
}



let btnMas = document.querySelectorAll('.action1')
if(btnMas!=null && btnMas!=undefined){
    btnMas.forEach(element => {
        element.addEventListener('click', function(){
            if(element.classList.contains("action1")){
                element.classList.toggle('rotar')
                element.classList.replace("action1", "action1-menos")
                setTimeout(() => {
                    element.classList.toggle('rotar')
                }, 100);
            }else{
                element.classList.toggle('rotar')
                element.classList.replace("action1-menos", "action1")
                setTimeout(() => {
                    element.classList.toggle('rotar')
                }, 100);
            }
        })
    });

}

let btnCorazon = document.querySelectorAll('.action3')
if(btnCorazon!=null && btnCorazon!=undefined){

    btnCorazon.forEach(element => {
        element.addEventListener('click', function(){
            if(element.classList.contains("action3")){
                element.classList.toggle('action-like')
                setTimeout(() => {
                    element.classList.toggle('action-like')
                    element.classList.replace("action3", "action3-menos")
                }, 500);
            }else{
                element.classList.toggle('action-dislike')
                setTimeout(() => {
                    element.classList.toggle('action-dislike')
                    element.classList.replace("action3-menos", "action3")
                }, 500);
            }
        })
    });
}
