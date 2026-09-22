/* =========================================================
   PONCE · Modo Frases por Contexto
   Frases con pictogramas + comunicación libre
   Sin GPS, sin contactos, sin almacenamiento
   ========================================================= */

/* ---------------- DATOS: CONTEXTOS Y FRASES ---------------- */

const CONTEXTOS = [
  {
    id: "hospital",
    icono: "🏥",
    nombre: "Hospital",
    frases: [
      { icono: "🤒", texto: "Tengo fiebre" },
      { icono: "🤧", texto: "Soy alérgico a algo" },
      { icono: "🤕", texto: "Me duele la cabeza" },
      { icono: "😖", texto: "Me duele el estómago" },
      { icono: "🩺", texto: "Necesito un médico" },
      { icono: "💊", texto: "Necesito medicina" },
      { icono: "⏰", texto: "¿Cuándo me atienden?" },
      { icono: "🚻", texto: "¿Dónde está el baño?" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "🙋", texto: "Necesito un intérprete de señas" },
      { icono: "💧", texto: "Necesito agua" },
      { icono: "🛏️", texto: "Necesito descansar" }
    ]
  },
  {
    id: "escuela",
    icono: "🏫",
    nombre: "Escuela",
    frases: [
      { icono: "🤔", texto: "No entendí" },
      { icono: "🔁", texto: "¿Puede repetir?" },
      { icono: "🙋", texto: "Necesito ayuda" },
      { icono: "📖", texto: "¿Puede explicarme de otra forma?" },
      { icono: "🚑", texto: "Necesito ir a enfermería" },
      { icono: "📝", texto: "¿Cuál es la tarea?" },
      { icono: "🎒", texto: "No tengo el material" },
      { icono: "🚻", texto: "¿Puedo ir al baño?" },
      { icono: "📞", texto: "Llame a mi tutor" },
      { icono: "👨‍🏫", texto: "¿Puedo hablar con el director?" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "❓", texto: "Tengo una pregunta" }
    ]
  },
  {
    id: "tienda",
    icono: "🛒",
    nombre: "Tienda",
    frases: [
      { icono: "💰", texto: "¿Cuánto cuesta?" },
      { icono: "🛍️", texto: "Quiero comprar esto" },
      { icono: "🎨", texto: "¿Tiene otro color?" },
      { icono: "📏", texto: "¿Tiene otra talla?" },
      { icono: "💳", texto: "¿Aceptan tarjeta?" },
      { icono: "🏪", texto: "¿Dónde está la caja?" },
      { icono: "🙋", texto: "¿Puede ayudarme?" },
      { icono: "🛍️", texto: "¿Tiene bolsa?" },
      { icono: "↩️", texto: "Quiero devolver esto" },
      { icono: "🏷️", texto: "¿Hay descuento?" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "🙏", texto: "Gracias, eso es todo" }
    ]
  },
  {
    id: "transporte",
    icono: "🚌",
    nombre: "Transporte",
    frases: [
      { icono: "🚌", texto: "¿Este bus va a este lugar?" },
      { icono: "💵", texto: "¿Cuánto cuesta el pasaje?" },
      { icono: "🎫", texto: "¿Dónde compro el boleto?" },
      { icono: "🕐", texto: "¿A qué hora sale?" },
      { icono: "🚏", texto: "¿Dónde está la parada?" },
      { icono: "🧭", texto: "Estoy perdido" },
      { icono: "🚕", texto: "Necesito un taxi" },
      { icono: "💺", texto: "¿Este es mi asiento?" },
      { icono: "🔔", texto: "¿Puede avisarme cuando llegue?" },
      { icono: "🎟️", texto: "Perdí mi boleto" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "🙏", texto: "Gracias por su ayuda" }
    ]
  },
  {
    id: "banco",
    icono: "🏦",
    nombre: "Banco",
    frases: [
      { icono: "📝", texto: "Necesito ayuda con este formulario" },
      { icono: "🙋", texto: "¿Dónde me atienden?" },
      { icono: "🎫", texto: "Mi turno es este" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "💳", texto: "Quiero abrir una cuenta" },
      { icono: "💵", texto: "Quiero hacer un depósito" },
      { icono: "⏰", texto: "¿Cuánto tarda?" },
      { icono: "🙋", texto: "Necesito un intérprete" },
      { icono: "🖊️", texto: "¿Puedo firmar aquí?" },
      { icono: "❓", texto: "Tengo una pregunta" },
      { icono: "🙏", texto: "Gracias" },
      { icono: "🚻", texto: "¿Dónde está el baño?" }
    ]
  },
  {
    id: "restaurante",
    icono: "🍽️",
    nombre: "Restaurante",
    frases: [
      { icono: "📋", texto: "Quiero ordenar" },
      { icono: "🖼️", texto: "¿Tiene menú con imágenes?" },
      { icono: "🤧", texto: "Soy alérgico a algo" },
      { icono: "🌶️", texto: "Sin picante, por favor" },
      { icono: "💰", texto: "¿Cuánto cuesta?" },
      { icono: "🧾", texto: "La cuenta, por favor" },
      { icono: "✍️", texto: "¿Puede escribirme?" },
      { icono: "🥡", texto: "Para llevar" },
      { icono: "💧", texto: "Un vaso de agua, por favor" },
      { icono: "🍞", texto: "Más pan, por favor" },
      { icono: "🚻", texto: "¿Dónde está el baño?" },
      { icono: "🙏", texto: "Gracias" }
    ]
  },
  {
    id: "casa",
    icono: "🏠",
    nombre: "Casa",
    frases: [
      { icono: "🙋", texto: "Necesito ayuda" },
      { icono: "📞", texto: "Llame a mi familia" },
      { icono: "🤒", texto: "No me siento bien" },
      { icono: "🚪", texto: "¿Puede venir?" },
      { icono: "🏠", texto: "Estoy en casa" },
      { icono: "💧", texto: "Necesito agua" },
      { icono: "🛏️", texto: "Necesito descansar" },
      { icono: "📢", texto: "Avise a mi familia" },
      { icono: "🍽️", texto: "Tengo hambre" },
      { icono: "🚻", texto: "Necesito ir al baño" },
      { icono: "🥶", texto: "Tengo frío" },
      { icono: "🥵", texto: "Tengo calor" }
    ]
  }
];

const PICTOGRAMAS_LIBRE = [
  "🙋","🙏","👍","👎","❓","❗","✅","❌",
  "🤒","🤕","💊","🩺","🚑","🚓","🚒","🆘",
  "💧","🍽️","🛏️","🚻","🏠","🏫","🏥","🛒",
  "🚌","🚕","🎫","💰","💳","📞","✍️","📝",
  "🕐","⏰","📅","📍","🧭","🔥","⚠️","😊",
  "😢","😡","😴","🥶","🥵","👨‍👩‍👧","👦","👧"
];

/* ---------------- REFERENCIAS ---------------- */

const $ = (id) => document.getElementById(id);

const contextosEl    = $("contextos");
const gridFrasesEl   = $("gridFrases");
const hintContextoEl = $("hintContexto");

const overlayFrase   = $("overlayFrase");
const fraseIcono     = $("fraseIcono");
const fraseTexto     = $("fraseTexto");

const overlayLibre   = $("overlayLibre");
const inputLibre     = $("inputLibre");
const gridPictos     = $("gridPictos");

/* ---------------- ESTADO EN MEMORIA ---------------- */

let contextoActual = CONTEXTOS[0].id;
let fraseActual = "";
let modoInvertido = false;

/* ---------------- VOZ ---------------- */

let vozEspanol = null;

function cargarVoces() {
  if (!("speechSynthesis" in window)) return;
  const voces = speechSynthesis.getVoices();
  vozEspanol =
    voces.find(v => v.lang && v.lang.toLowerCase().startsWith("es")) ||
    voces.find(v => /spanish|español/i.test(v.name)) ||
    null;
}

if ("speechSynthesis" in window) {
  cargarVoces();
  speechSynthesis.onvoiceschanged = cargarVoces;
}

function hablar(texto, { fuerte = false } = {}) {
  if (!texto || !texto.trim()) return;
  if (!("speechSynthesis" in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = fuerte ? 0.95 : 1;
    u.pitch = 1;
    u.volume = 1;
    if (vozEspanol) u.voice = vozEspanol;
    speechSynthesis.speak(u);
  } catch (_) {}
}

/* ---------------- VIBRACIÓN ---------------- */

function vibrar(patron = [80]) {
  if (navigator.vibrate) {
    try { navigator.vibrate(patron); } catch (_) {}
  }
}

/* ---------------- RENDER: CONTEXTOS ---------------- */

function renderContextos() {
  contextosEl.innerHTML = "";
  CONTEXTOS.forEach((ctx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "frs-ctx-btn" + (ctx.id === contextoActual ? " activo" : "");
    btn.setAttribute("aria-label", ctx.nombre);
    btn.innerHTML = `
      <span class="frs-ctx-icono" aria-hidden="true">${ctx.icono}</span>
      <span>${ctx.nombre}</span>
    `;
    btn.addEventListener("click", () => {
      contextoActual = ctx.id;
      vibrar([40]);
      renderContextos();
      renderFrases();
    });
    contextosEl.appendChild(btn);
  });
}

/* ---------------- RENDER: FRASES DEL CONTEXTO ---------------- */

function renderFrases() {
  const ctx = CONTEXTOS.find(c => c.id === contextoActual) || CONTEXTOS[0];
  hintContextoEl.textContent = `Contexto: ${ctx.nombre} · Toca una frase para mostrarla y escucharla.`;

  gridFrasesEl.innerHTML = "";
  ctx.frases.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "frs-btn-frase";
    btn.setAttribute("aria-label", f.texto);
    btn.innerHTML = `
      <span class="frs-btn-frase-icono" aria-hidden="true">${f.icono}</span>
      <span>${f.texto}</span>
    `;
    btn.addEventListener("click", () => abrirFrase(f));
    gridFrasesEl.appendChild(btn);
  });
}

/* ---------------- OVERLAY FRASE ---------------- */

function abrirFrase(frase) {
  fraseActual = frase.texto;
  fraseIcono.textContent = frase.icono;
  fraseTexto.textContent = frase.texto;

  overlayFrase.hidden = false;
  modoInvertido = false;
  overlayFrase.classList.remove("frs-invertido");

  vibrar([80, 40, 80]);
  hablar(frase.texto, { fuerte: true });
}

function cerrarFrase() {
  overlayFrase.hidden = true;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

/* ---------------- RENDER: PICTOGRAMAS ---------------- */

function renderPictos() {
  gridPictos.innerHTML = "";
  PICTOGRAMAS_LIBRE.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "frs-picto";
    btn.setAttribute("aria-label", `Pictograma ${p}`);
    btn.textContent = p;
    btn.addEventListener("click", () => {
      const actual = inputLibre.value;
      const sep = actual && !/\s$/.test(actual) ? " " : "";
      inputLibre.value = actual + sep + p;
      inputLibre.focus();
      vibrar([30]);
    });
    gridPictos.appendChild(btn);
  });
}

/* ---------------- OVERLAY LIBRE ---------------- */

function abrirLibre() {
  overlayLibre.hidden = false;
  setTimeout(() => inputLibre.focus(), 100);
}

function cerrarLibre() {
  overlayLibre.hidden = true;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

function limpiarLibre() {
  inputLibre.value = "";
  inputLibre.focus();
  vibrar([30]);
}

function mostrarLibre() {
  const texto = inputLibre.value.trim();
  if (!texto) { inputLibre.focus(); vibrar([60, 40, 60]); return; }

  // Reutilizamos el overlay de frase para mostrar el mensaje libre
  fraseActual = texto;
  fraseIcono.textContent = "💬";
  fraseTexto.textContent = texto;
  overlayLibre.hidden = true;
  overlayFrase.hidden = false;
  modoInvertido = false;
  overlayFrase.classList.remove("frs-invertido");
  vibrar([80, 40, 80]);
}

function hablarLibre() {
  const texto = inputLibre.value.trim();
  if (!texto) { inputLibre.focus(); vibrar([60, 40, 60]); return; }
  hablar(texto, { fuerte: true });
  vibrar([60]);
}

/* ---------------- DICTADO ---------------- */

function iniciarDictado() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert("El dictado no está disponible en este navegador.");
    return;
  }
  const rec = new SR();
  rec.lang = "es-ES";
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    const texto = e.results[0][0].transcript;
    const actual = inputLibre.value;
    const sep = actual && !/\s$/.test(actual) ? " " : "";
    inputLibre.value = actual + sep + texto;
  };
  rec.onerror = () => {};
  try { rec.start(); } catch (_) {}
}

/* ---------------- EVENTOS ---------------- */

$("btnVolver").addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "index.html";
});

$("btnLibre").addEventListener("click", abrirLibre);
$("btnLibreGrande").addEventListener("click", abrirLibre);
$("btnCerrarLibre").addEventListener("click", cerrarLibre);

$("btnCerrarFrase").addEventListener("click", cerrarFrase);
$("btnOkFrase").addEventListener("click", cerrarFrase);

$("btnRepetir").addEventListener("click", () => {
  if (fraseActual) hablar(fraseActual, { fuerte: true });
});

$("btnInvertir").addEventListener("click", () => {
  modoInvertido = !modoInvertido;
  overlayFrase.classList.toggle("frs-invertido", modoInvertido);
});

$("btnDictar").addEventListener("click", iniciarDictado);
$("btnLimpiar").addEventListener("click", limpiarLibre);
$("btnMostrarLibre").addEventListener("click", mostrarLibre);
$("btnHablarLibre").addEventListener("click", hablarLibre);

/* ---------------- INICIALIZACIÓN ---------------- */

renderContextos();
renderFrases();
renderPictos();