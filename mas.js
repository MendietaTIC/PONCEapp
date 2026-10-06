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
  document.addEventListener('DOMContentLoaded', () => {

  const items  = Array.from(document.querySelectorAll('.carrusel .item'));
  const titulo = document.getElementById('tituloExtra');
  const desc   = document.getElementById('descExtra');
  const btn    = document.getElementById('btnExtra');
  const prev   = document.getElementById('prev');
  const next   = document.getElementById('next');

  let index = items.findIndex(i => i.classList.contains('activo'));
  if (index < 0) index = 0;

  function layout(){
    const n = items.length;
    const spacing = Math.min(155, Math.max(62, window.innerWidth * 0.16));
    const small = window.innerWidth < 760;

    items.forEach((item, i) => {
      let offset = i - index;
      // camino más corto (efecto infinito)
      if (offset >  n / 2) offset -= n;
      if (offset < -n / 2) offset += n;

      const abs  = Math.abs(offset);
      const sign = offset === 0 ? 0 : (offset > 0 ? 1 : -1);

      const baseScale = small ? 1.06 : 1.12;
      const scale = Math.max(baseScale - abs * 0.07, 0.6);

      item.style.transform =
        `translate(-50%, -50%) ` +
        `translateX(${offset * spacing}px) ` +
        `translateZ(${-abs * 170}px) ` +
        `rotateY(${-sign * 35}deg) ` +
        `scale(${scale})`;

      item.style.opacity       = abs > 2 ? '0' : String(1 - abs * 0.22);
      item.style.zIndex        = String(100 - abs);
      item.style.pointerEvents = abs > 2 ? 'none' : 'auto';

      item.classList.toggle('activo', i === index);
    });

    const act = items[index];
    titulo.textContent = act.dataset.titulo;
    desc.textContent   = act.dataset.desc;
    btn.setAttribute('href', act.dataset.link);
  }

  function go(n){
    index = (n + items.length) % items.length;
    layout();
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (i === index) {
        window.location.href = item.dataset.link;  // abre el juego activo
      } else {
        go(i);                                     // acerca la tarjeta
      }
    });
  });

  // Flechas del teclado
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  });

  // Deslizar con el dedo (móvil)
  let startX = null;
  const carrusel = document.querySelector('.carrusel');
  carrusel.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
  carrusel.addEventListener('touchend', e => {
    if (startX === null) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 45) go(diff > 0 ? index - 1 : index + 1);
    startX = null;
  });

  window.addEventListener('resize', layout);
  layout();
});

actualizar();

});

actualizar();
