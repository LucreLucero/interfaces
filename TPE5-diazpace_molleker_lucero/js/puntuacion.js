let flecha = document.querySelector('.mas-canciones')
flecha.addEventListener('click', function(){
    let aux = document.querySelector('.bloque2')
    aux.style.display = "block"
})

let btnMas = document.querySelectorAll('.action1')
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

let btnCorazon = document.querySelectorAll('.action3')
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
