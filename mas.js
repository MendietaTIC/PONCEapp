document.addEventListener('DOMContentLoaded', () => {

    const items  = Array.from(document.querySelectorAll('.carrusel .item'));
    const titulo = document.getElementById('tituloExtra');
    const desc   = document.getElementById('descExtra');
    const btn    = document.getElementById('btnExtra');
    const prev   = document.getElementById('prev');
    const next   = document.getElementById('next');
    const carrusel = document.querySelector('.carrusel');

    let index = items.findIndex(i => i.classList.contains('activo'));
    if (index < 0) index = 0;

    function layout() {
        const n = items.length;
        const small = window.innerWidth < 760;
        const spacing = small ? 95 : 155;

        items.forEach((item, i) => {
            let offset = i - index;

            // Camino más corto (efecto infinito)
            if (offset >  n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const abs  = Math.abs(offset);
            const sign = offset === 0 ? 0 : (offset > 0 ? 1 : -1);
            const scale = Math.max(1 - abs * 0.15, 0.55);

            item.style.transform =
                `translate(-50%, -50%) ` +
                `translateX(${offset * spacing}px) ` +
                `translateZ(${-abs * 180}px) ` +
                `rotateY(${-sign * 32}deg) ` +
                `scale(${scale})`;

            item.style.opacity       = abs > 2 ? '0' : String(1 - abs * 0.18);
            item.style.zIndex        = String(100 - abs);
            item.style.pointerEvents = abs > 2 ? 'none' : 'auto';

            item.classList.toggle('activo', i === index);
        });

        const act = items[index];
        titulo.textContent = act.dataset.titulo;
        desc.textContent   = act.dataset.desc;
        btn.setAttribute('href', act.dataset.link);
    }

    function go(n) {
        index = (n + items.length) % items.length;
        layout();
    }

    prev.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (i === index) {
                window.location.href = item.dataset.link; // abre el juego activo
            } else {
                go(i);                                    // acerca la tarjeta
            }
        });
    });

    // Flechas del teclado
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
    });

    // Deslizar en móvil
    let startX = null;
    carrusel.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    carrusel.addEventListener('touchend', e => {
        if (startX === null) return;
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 45) go(diff > 0 ? index - 1 : index + 1);
        startX = null;
    });

    window.addEventListener('resize', layout);
    layout();
});
