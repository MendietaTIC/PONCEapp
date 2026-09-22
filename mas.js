const items = document.querySelectorAll(".item");

const titulo = document.getElementById("tituloExtra");
const descripcion = document.getElementById("descExtra");
const boton = document.getElementById("btnExtra");

let actual = 0;

function actualizar(){

items.forEach(i => i.classList.remove("activo"));

items[actual].classList.add("activo");

titulo.textContent =
items[actual].dataset.titulo;

descripcion.textContent =
items[actual].dataset.desc;

boton.href =
items[actual].dataset.link;
}

items.forEach((item,index)=>{

item.addEventListener("click",()=>{

actual=index;

actualizar();

});

});

document.getElementById("next")
.addEventListener("click",()=>{

actual++;

if(actual>=items.length){

actual=0;

}

actualizar();

});

document.getElementById("prev")
.addEventListener("click",()=>{

actual--;

if(actual<0){

actual=items.length-1;

}

actualizar();

});

actualizar();
