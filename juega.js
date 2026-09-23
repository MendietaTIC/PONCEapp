/* =========================================================
   APRENDE JUGANDO · Lengua de señas
   Alfabeto dactilológico español (A-Z + Ñ)
   ========================================================= */

/* ====== 1. DATOS DEL ALFABETO ====== */
/* archivo = nombre del archivo en /img  →  img/a.jpg, img/ñ.jpg, etc. */
const ALFABETO = [
  { letra:'A', archivo:'a', emoji:'✊', desc:'Puño cerrado con el pulgar pegado al lado de los dedos (no encima).', tip:'La muñeca debe quedar recta, mirando al frente.', nivel:1 },
  { letra:'B', archivo:'b', emoji:'✋', desc:'Mano abierta, dedos juntos y extendidos hacia arriba, pulgar doblado hacia la palma.', tip:'Mantén los cuatro dedos bien pegados.', nivel:1 },
  { letra:'C', archivo:'c', emoji:'🤏', desc:'Mano curvada formando la forma de una "C".', tip:'Como si sostuvieras un vaso pequeño.', nivel:1 },
  { letra:'D', archivo:'d', emoji:'👆', desc:'Índice extendido hacia arriba; los demás dedos tocan el pulgar formando un círculo.', tip:'El círculo queda debajo del índice.', nivel:2 },
  { letra:'E', archivo:'e', emoji:'✊', desc:'Dedos doblados hacia la palma, con el pulgar por debajo.', tip:'Las puntas de los dedos tocan la palma.', nivel:2 },
  { letra:'F', archivo:'f', emoji:'👌', desc:'Pulgar e índice se tocan formando un círculo; los otros tres dedos extendidos.', tip:'Parecido a la señal de "OK".', nivel:1 },
  { letra:'G', archivo:'g', emoji:'👉', desc:'Índice y pulgar extendidos horizontalmente y paralelos.', tip:'La mano mira de lado.', nivel:2 },
  { letra:'H', archivo:'h', emoji:'✌️', desc:'Índice y medio extendidos y juntos, en horizontal.', tip:'Los dedos apuntan hacia el lado.', nivel:2 },
  { letra:'I', archivo:'i', emoji:'🤙', desc:'Meñique extendido hacia arriba, el resto en puño.', tip:'Solo se levanta el meñique.', nivel:1 },
  { letra:'J', archivo:'j', emoji:'🤙', desc:'Meñique extendido; se traza una "J" en el aire.', tip:'Es la "I" con movimiento.', nivel:3 },
  { letra:'K', archivo:'k', emoji:'✌️', desc:'Índice y medio extendidos en V, con el pulgar entre ellos.', tip:'El pulgar toca la base del dedo medio.', nivel:2 },
  { letra:'L', archivo:'l', emoji:'🤟', desc:'Índice hacia arriba y pulgar hacia el lado formando una "L".', tip:'Ángulo de 90° entre ambos.', nivel:1 },
  { letra:'M', archivo:'m', emoji:'✊', desc:'Pulgar bajo tres dedos: índice, medio y anular.', tip:'Se ve el pulgar asomando por debajo.', nivel:3 },
  { letra:'N', archivo:'n', emoji:'✊', desc:'Pulgar bajo dos dedos: índice y medio.', tip:'Similar a la M, pero con dos dedos.', nivel:3 },
  { letra:'Ñ', archivo:'ñ', emoji:'✊', desc:'Igual que la N, pero con un pequeño movimiento ondulado de la muñeca.', tip:'El movimiento es lo que la distingue de la N.', nivel:3 },
  { letra:'O', archivo:'o', emoji:'👌', desc:'Todos los dedos curvados tocan el pulgar formando una "O".', tip:'Como si sostuvieras una moneda.', nivel:1 },
  { letra:'P', archivo:'p', emoji:'👇', desc:'Como la K, pero apuntando hacia abajo.', tip:'La mano mira al suelo.', nivel:3 },
  { letra:'Q', archivo:'q', emoji:'👇', desc:'Como la G, pero apuntando hacia abajo.', tip:'Índice y pulgar hacia abajo.', nivel:3 },
  { letra:'R', archivo:'r', emoji:'🤞', desc:'Índice y medio cruzados.', tip:'El dedo medio pasa por delante del índice.', nivel:2 },
  { letra:'S', archivo:'s', emoji:'✊', desc:'Puño cerrado con el pulgar por delante de los dedos.', tip:'El pulgar cruza sobre los demás.', nivel:2 },
  { letra:'T', archivo:'t', emoji:'✊', desc:'Pulgar entre el índice y el medio, puño cerrado.', tip:'El pulgar asoma entre los dedos.', nivel:3 },
  { letra:'U', archivo:'u', emoji:'✌️', desc:'Índice y medio juntos y extendidos hacia arriba.', tip:'Dedos pegados, no separados.', nivel:1 },
  { letra:'V', archivo:'v', emoji:'✌️', desc:'Índice y medio extendidos y separados formando una "V".', tip:'Separa bien los dedos.', nivel:1 },
  { letra:'W', archivo:'w', emoji:'🖖', desc:'Índice, medio y anular extendidos y separados.', tip:'Tres dedos hacia arriba.', nivel:2 },
  { letra:'X', archivo:'x', emoji:'☝️', desc:'Índice doblado en forma de gancho.', tip:'Como una pequeña garra.', nivel:2 },
  { letra:'Y', archivo:'y', emoji:'🤙', desc:'Pulgar y meñique extendidos.', tip:'Los otros dedos permanecen cerrados.', nivel:1 },
  { letra:'Z', archivo:'z', emoji:'☝️', desc:'Índice extendido; se traza una "Z" en el aire.', tip:'Movimiento en zigzag.', nivel:3 }
];

const PALABRAS = ['CASA','SOL','LUNA','GATO','MESA','LIBRO','AGUA','FLOR','TREN','PAN','MAR','RANA','PATO','SILLA','NUBE','ISLA','TIGRE','CINE','MOTO','BESO'];

/* ====== 2. ESTADO Y PERSISTENCIA ====== */
const CLAVE = 'aprendeJugando_v1';
const estado = {
  sonido: true,
  tema: 'claro',
  dominadas: {},   // { A:true, ... }
  pesos: {},       // { A: 1.5 } → repetición espaciada simple
  mejorPuntaje: 0,
  mejorRacha: 0
};

function cargarEstado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE) || '{}');
    Object.assign(estado, guardado);
  } catch (e) {}
}
function guardarEstado() {
  try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {}
}
cargarEstado();

/* ====== 3. UTILIDADES ====== */
const $  = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* --- Audio --- */
let audioCtx = null;
function tono(freq, dur, tipo = 'sine', vol = 0.12) {
  if (!estado.sonido) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const g   = audioCtx.createGain();
    osc.type = tipo;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.connect(g).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) {}
}
const sonidoAcierto = () => { tono(660, .12); setTimeout(() => tono(880, .18), 100); };
const sonidoError   = () => { tono(200, .25, 'sawtooth', .1); };
const sonidoClick   = () => { tono(420, .06, 'square', .06); };
const sonidoFlip    = () => { tono(520, .08, 'triangle', .08); };

/* --- Voz --- */
function hablar(texto) {
  if (!estado.sonido || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'es-ES';
    u.rate = 0.95;
    speechSynthesis.speak(u);
  } catch (e) {}
}

/* --- Confeti --- */
function confeti() {
  const colores = ['#6c5ce7','#00b894','#fdcb6e','#e74c3c','#a29bfe','#55efc4'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confeti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colores[Math.floor(Math.random() * colores.length)];
    c.style.animationDelay = Math.random() * 0.4 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2400);
  }
}

/* --- Mezclar array --- */
function mezclar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* --- Render de la seña (imagen + respaldo emoji) --- */
function renderSena(contenedor, item) {
  contenedor.innerHTML = '';
  const img = document.createElement('img');
  img.src = `img/${item.archivo}.jpg`;
  img.alt = `Seña de la letra ${item.letra}`;
  img.loading = 'lazy';
  img.onerror = () => {
    img.remove();
    const fb = document.createElement('div');
    fb.className = 'sena-fallback';
    fb.innerHTML = `<span class="emoji" aria-hidden="true">${item.emoji}</span><span class="letra">${item.letra}</span>`;
    contenedor.appendChild(fb);
  };
  contenedor.appendChild(img);
}

/* --- Encontrar letra --- */
const porLetra = l => ALFABETO.find(x => x.letra === l);

/* ====== 4. NAVEGACIÓN ====== */
let modoActual = 'inicio';
function cambiarModo(modo) {
  modoActual = modo;
  clearInterval(retoTimer);
  clearInterval(memoriaTimer);

  $$('.vista').forEach(v => v.classList.remove('activa'));
  const vista = $('#vista-' + modo);
  if (vista) vista.classList.add('activa');

  $$('.modos button').forEach(b => b.classList.toggle('activo', b.dataset.modo === modo));

  if (modo === 'inicio')      renderInicio();
  if (modo === 'explorador')  renderExplorador();
  if (modo === 'reto')        iniciarReto();
  if (modo === 'deletreo')    iniciarDeletreo();
  if (modo === 'memoria')     iniciarMemoria();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====== 5. INICIO ====== */
function renderInicio() {
  const total = ALFABETO.filter(l => estado.dominadas[l.letra]).length;
  $('#statDominadas').textContent = total;
  $('#statMejor').textContent = estado.mejorPuntaje;
  $('#statRacha').textContent = estado.mejorRacha;
}

/* ====== 6. EXPLORADOR ====== */
let letraSel = null;

function renderExplorador() {
  const grid = $('#gridLetras');
  grid.innerHTML = '';
  ALFABETO.forEach(item => {
    const b = document.createElement('button');
    b.className = 'letra-btn';
    b.textContent = item.letra;
    b.setAttribute('aria-label', 'Letra ' + item.letra);
    if (estado.dominadas[item.letra]) b.classList.add('dominada');
    if (letraSel === item.letra) b.classList.add('activa');
    b.onclick = () => seleccionarLetra(item.letra);
    grid.appendChild(b);
  });
  if (letraSel) mostrarDetalle(letraSel);
}

function seleccionarLetra(letra) {
  letraSel = letra;
  sonidoClick();
  $$('#gridLetras .letra-btn').forEach(b => b.classList.toggle('activa', b.textContent === letra));
  mostrarDetalle(letra);
  hablar(letra);
}

function mostrarDetalle(letra) {
  const item = porLetra(letra);
  if (!item) return;
  const det = $('#detalle');
  det.innerHTML = `
    <div class="letra-grande">${item.letra}</div>
    <div class="sena" id="senaDetalle"></div>
    <p class="desc">${item.desc}</p>
    <p class="tip">💡 ${item.tip}</p>
    <div class="acciones-detalle">
      <button class="btn" id="btnOir">🔊 Escuchar</button>
      <button class="btn primario" id="btnDominada">
        ${estado.dominadas[item.letra] ? '⭐ Dominada' : '☆ Marcar como dominada'}
      </button>
    </div>
  `;
  renderSena($('#senaDetalle'), item);

  $('#btnOir').onclick = () => hablar(item.letra);
  $('#btnDominada').onclick = () => {
    estado.dominadas[item.letra] = !estado.dominadas[item.letra];
    guardarEstado();
    sonidoAcierto();
    if (estado.dominadas[item.letra]) confeti();
    mostrarDetalle(item.letra);
    // actualiza la estrellita del grid
    const btn = $$('#gridLetras .letra-btn').find(b => b.textContent === item.letra);
    if (btn) btn.classList.toggle('dominada', !!estado.dominadas[item.letra]);
  };
}

/* ====== 7. RETO ====== */
const RETO_TOTAL = 10;
let retoTimer = null, retoActual = null, retoPuntos = 0, retoVidas = 3,
    retoStreak = 0, retoPregunta = 0, retoTiempo = 10, retoBloqueado = false;

function elegirLetraPonderada() {
  const items = ALFABETO.map(l => ({ l, w: estado.pesos[l.letra] || 1 }));
  const total = items.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const it of items) { r -= it.w; if (r <= 0) return it.l; }
  return items[items.length - 1].l;
}

function iniciarReto() {
  retoPuntos = 0; retoVidas = 3; retoStreak = 0; retoPregunta = 0; retoBloqueado = false;
  $('#retoJuego').classList.remove('oculto');
  $('#retoFin').classList.add('oculto');
  actualizarHUDReto();
  siguientePreguntaReto();
}

function actualizarHUDReto() {
  $('#retoPuntos').textContent = retoPuntos;
  $('#retoVidas').textContent  = retoVidas;
  $('#retoStreak').textContent = retoStreak;
  $('#retoNum').textContent    = Math.min(retoPregunta + 1, RETO_TOTAL);
}

function siguientePreguntaReto() {
  clearInterval(retoTimer);
  if (retoPregunta >= RETO_TOTAL || retoVidas <= 0) return terminarReto();

  retoBloqueado = false;
  retoActual = elegirLetraPonderada();
  actualizarHUDReto();

  renderSena($('#retoSena'), retoActual);

  // 3 distractores + correcta
  const distractores = mezclar(ALFABETO.filter(l => l.letra !== retoActual.letra)).slice(0, 3);
  const opciones = mezclar([retoActual, ...distractores]);

  const cont = $('#retoOpciones');
  cont.innerHTML = '';
  opciones.forEach(op => {
    const b = document.createElement('button');
    b.className = 'opcion';
    b.textContent = op.letra;
    b.onclick = () => responderReto(op.letra, b);
    cont.appendChild(b);
  });

  iniciarTimerReto();
}

function iniciarTimerReto() {
  retoTiempo = 10;
  const barra = $('#retoBarra');
  barra.style.width = '100%';
  retoTimer = setInterval(() => {
    retoTiempo -= 0.1;
    barra.style.width = Math.max(0, (retoTiempo / 10) * 100) + '%';
    if (retoTiempo <= 0) {
      clearInterval(retoTimer);
      responderReto(null);
    }
  }, 100);
}

function responderReto(letraElegida, boton) {
  if (retoBloqueado) return;
  retoBloqueado = true;
  clearInterval(retoTimer);

  const correcta = letraElegida === retoActual.letra;

  // marcar botones
  $$('#retoOpciones .opcion').forEach(b => {
    b.disabled = true;
    if (b.textContent === retoActual.letra) b.classList.add('correcta');
    else if (b === boton) b.classList.add('incorrecta');
  });

  if (correcta) {
    retoStreak++;
    const bonus = Math.floor(retoTiempo) + retoStreak * 2;
    retoPuntos += 10 + bonus;
    estado.pesos[retoActual.letra] = Math.max(0.5, (estado.pesos[retoActual.letra] || 1) * 0.7);
    estado.dominadas[retoActual.letra] = true;
    if (retoStreak > estado.mejorRacha) estado.mejorRacha = retoStreak;
    sonidoAcierto();
    if (retoStreak % 3 === 0) confeti();
  } else {
    retoStreak = 0;
    retoVidas--;
    estado.pesos[retoActual.letra] = Math.min(4, (estado.pesos[retoActual.letra] || 1) * 1.8);
    sonidoError();
  }

  if (retoPuntos > estado.mejorPuntaje) estado.mejorPuntaje = retoPuntos;
  guardarEstado();
  actualizarHUDReto();

  setTimeout(() => {
    retoPregunta++;
    siguientePreguntaReto();
  }, 1100);
}

function terminarReto() {
  $('#retoJuego').classList.add('oculto');
  $('#retoFin').classList.remove('oculto');

  const aciertos = Math.max(0, retoPregunta - (3 - retoVidas));
  const precision = retoPregunta > 0 ? aciertos / retoPregunta : 0;

  let estrellas = 1;
  if (precision >= 0.6) estrellas = 2;
  if (precision >= 0.85 && retoVidas >= 2) estrellas = 3;

  $('#retoFinTitulo').textContent = retoVidas > 0 ? '¡Completado! 🎉' : 'Se acabaron las vidas';
  $('#retoFinTexto').textContent  = `Puntaje: ${retoPuntos} · Aciertos: ${aciertos}/${retoPregunta}`;
  $('#retoEstrellas').textContent = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);

  if (estrellas === 3) confeti();
  guardarEstado();
}

/* ====== 8. DELETREO ====== */
let delPalabra = '', delIndice = 0, delAciertos = 0, delErrores = 0,
    delNum = 0, delLista = [], delBloqueado = false;

function iniciarDeletreo() {
  delLista = mezclar(PALABRAS).slice(0, 5);
  delNum = 0; delAciertos = 0; delErrores = 0;
  renderTecladoDeletreo();
  cargarPalabraDeletreo();
}

function renderTecladoDeletreo() {
  const cont = $('#delTeclado');
  cont.innerHTML = '';
  ALFABETO.forEach(item => {
    const b = document.createElement('button');
    b.className = 'letra-btn';
    b.textContent = item.letra;
    b.onclick = () => pulsarLetraDeletreo(item.letra, b);
    cont.appendChild(b);
  });
}

function cargarPalabraDeletreo() {
  if (delNum >= delLista.length) return terminarDeletreo();
  delPalabra = delLista[delNum];
  delIndice = 0;
  delBloqueado = false;

  $('#delNum').textContent = delNum + 1;
  $('#delAciertos').textContent = delAciertos;
  $('#delErrores').textContent = delErrores;
  $('#delPista').innerHTML = `Palabra: <strong>${delPalabra}</strong>`;
  pintarCajasDeletreo();
}

function pintarCajasDeletreo() {
  const cont = $('#delCajas');
  cont.innerHTML = '';
  for (let i = 0; i < delPalabra.length; i++) {
    const d = document.createElement('div');
    d.className = 'del-caja';
    if (i < delIndice) { d.classList.add('ok'); d.textContent = delPalabra[i]; }
    else if (i === delIndice) d.classList.add('actual');
    cont.appendChild(d);
  }
}

function pulsarLetraDeletreo(letra, boton) {
  if (delBloqueado) return;

  if (letra === delPalabra[delIndice]) {
    sonidoClick();
    boton.classList.add('correcta');
    setTimeout(() => boton.classList.remove('correcta'), 300);
    delIndice++;
    pintarCajasDeletreo();

    if (delIndice >= delPalabra.length) {
      delBloqueado = true;
      delAciertos++;
      $('#delAciertos').textContent = delAciertos;
      sonidoAcierto();
      confeti();
      hablar(delPalabra);
      setTimeout(() => {
        delNum++;
        cargarPalabraDeletreo();
      }, 1200);
    }
  } else {
    sonidoError();
    delErrores++;
    $('#delErrores').textContent = delErrores;
    boton.classList.add('incorrecta');
    setTimeout(() => boton.classList.remove('incorrecta'), 400);
  }
}

function terminarDeletreo() {
  $('#delCajas').innerHTML = '<p style="padding:20px;font-size:1.1rem;">🎉 ¡Ronda completada!</p>';
  $('#delPista').innerHTML = `Aciertos: <strong>${delAciertos}</strong> · Errores: <strong>${delErrores}</strong>`;
  $('#delTeclado').innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn primario';
  btn.textContent = 'Jugar otra vez';
  btn.onclick = iniciarDeletreo;
  $('#delTeclado').appendChild(btn);
}

/* ====== 9. MEMORIA ====== */
const MEM_PAREJAS = 6;
let memoriaTimer = null, memoriaSegundos = 0, memoriaMov = 0,
    memoriaParejas = 0, memoriaVolteadas = [], memoriaBloqueado = false;

function iniciarMemoria() {
  clearInterval(memoriaTimer);
  memoriaSegundos = 0; memoriaMov = 0; memoriaParejas = 0;
  memoriaVolteadas = []; memoriaBloqueado = false;
  $('#memFin').classList.add('oculto');
  $('#memTablero').classList.remove('oculto');
  $('#memTiempo').textContent = '0s';
  $('#memMov').textContent = '0';
  $('#memParejas').textContent = '0';

  const elegidas = mezclar(ALFABETO).slice(0, MEM_PAREJAS);
  const cartas = [];
  elegidas.forEach(item => {
    cartas.push({ tipo: 'sena',   item });
    cartas.push({ tipo: 'letra',  item });
  });
  const barajadas = mezclar(cartas);

  const tablero = $('#memTablero');
  tablero.innerHTML = '';
  barajadas.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'mem-carta';
    div.dataset.id = i;
    div.dataset.letra = c.item.letra;
    div.dataset.tipo = c.tipo;
    div.innerHTML = `
      <div class="carta-inner">
        <div class="carta-cara carta-atras">?</div>
        <div class="carta-cara carta-frente"></div>
      </div>
    `;
    const frente = div.querySelector('.carta-frente');
    if (c.tipo === 'letra') {
      frente.textContent = c.item.letra;
    } else {
      renderSena(frente, c.item);
    }
    div.onclick = () => voltearCarta(div);
    tablero.appendChild(div);
  });

  memoriaTimer = setInterval(() => {
    memoriaSegundos++;
    $('#memTiempo').textContent = memoriaSegundos + 's';
  }, 1000);
}

function voltearCarta(div) {
  if (memoriaBloqueado) return;
  if (div.classList.contains('volteada')) return;
  if (div.classList.contains('acertada')) return;

  div.classList.add('volteada');
  sonidoFlip();
  memoriaVolteadas.push(div);

  if (memoriaVolteadas.length === 2) {
    memoriaMov++;
    $('#memMov').textContent = memoriaMov;
    memoriaBloqueado = true;
    const [a, b] = memoriaVolteadas;
    const match = a.dataset.letra === b.dataset.letra && a.dataset.tipo !== b.dataset.tipo;

    setTimeout(() => {
      if (match) {
        a.classList.add('acertada');
        b.classList.add('acertada');
        memoriaParejas++;
        $('#memParejas').textContent = memoriaParejas;
        sonidoAcierto();
        if (memoriaParejas === MEM_PAREJAS) terminarMemoria();
      } else {
        a.classList.remove('volteada');
        b.classList.remove('volteada');
        sonidoError();
      }
      memoriaVolteadas = [];
      memoriaBloqueado = false;
    }, match ? 450 : 800);
  }
}

function terminarMemoria() {
  clearInterval(memoriaTimer);
  setTimeout(() => {
    $('#memTablero').classList.add('oculto');
    $('#memFin').classList.remove('oculto');
    $('#memFinTexto').textContent =
      `Terminaste en ${memoriaSegundos} segundos y ${memoriaMov} movimientos.`;
    confeti();
  }, 600);
}

/* ====== 10. TEMA Y SONIDO ====== */
function aplicarTema(t) {
  estado.tema = t;
  document.documentElement.dataset.tema = t;
  $('#btnTema').textContent = t === 'oscuro' ? '☀️' : '🌙';
  guardarEstado();
}

function initTema() {
  if (estado.tema) return aplicarTema(estado.tema);
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarTema(prefiereOscuro ? 'oscuro' : 'claro');
}

function aplicarSonido() {
  $('#btnSonido').textContent = estado.sonido ? '🔊' : '🔇';
  $('#btnSonido').classList.toggle('off', !estado.sonido);
  guardarEstado();
}

/* ====== 11. EVENTOS E INIT ====== */
document.addEventListener('DOMContentLoaded', () => {
  initTema();
  aplicarSonido();

  // Nav superior
  $$('.modos button').forEach(b => {
    b.addEventListener('click', () => cambiarModo(b.dataset.modo));
  });

  // Tarjetas del inicio y botones "data-ir"
  document.addEventListener('click', e => {
    const ir = e.target.closest('[data-ir]');
    if (ir) cambiarModo(ir.dataset.ir);
  });

  // Toggle tema
  $('#btnTema').addEventListener('click', () => {
    aplicarTema(estado.tema === 'oscuro' ? 'claro' : 'oscuro');
  });

  // Toggle sonido
  $('#btnSonido').addEventListener('click', () => {
    estado.sonido = !estado.sonido;
    aplicarSonido();
    if (estado.sonido) sonidoClick();
  });

  // Botones internos de los modos
  $('#btnRetoOtra').addEventListener('click', iniciarReto);
  $('#btnMemReiniciar').addEventListener('click', iniciarMemoria);
  $('#btnMemOtra').addEventListener('click', iniciarMemoria);

  // Vista inicial
  renderInicio();
});
