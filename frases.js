/* =========================================================
   PONCE · Modo Frases por Contexto
   Frases con pictogramas + comunicación libre
   Sin GPS, sin contactos, sin almacenamiento
   ========================================================= */

/* ---------------- DATOS: CONTEXTOS → SITUACIONES → FRASES ----------------
   Estructura:
   CONTEXTOS[i].situaciones[j].frases[k]
   Si un contexto NO tiene "situaciones", usa CONTEXTOS[i].frases (compatibilidad).
------------------------------------------------------------------------- */

const CONTEXTOS = [

  /* ==================== ESCUELA ==================== */
  {
    id: "escuela",
    icono: "🏫",
    nombre: "Escuela",
    situaciones: [
      {
        id: "clase",
        icono: "📚",
        nombre: "En clase",
        frases: [
          { icono: "🙋", texto: "Presente" },
          { icono: "🤔", texto: "No entendí" },
          { icono: "🔁", texto: "¿Puede repetir?" },
          { icono: "🐢", texto: "¿Puede hablar más despacio?" },
          { icono: "✋", texto: "Quiero participar" },
          { icono: "🚶", texto: "¿Puedo pasar?" },
          { icono: "❓", texto: "Tengo una pregunta" },
          { icono: "📖", texto: "¿Puede explicarme de otra forma?" },
          { icono: "📝", texto: "¿Cuál es la tarea?" },
          { icono: "✅", texto: "Ya terminé" },
          { icono: "🧑‍🤝‍🧑", texto: "¿Puedo trabajar en equipo?" },
          { icono: "✍️", texto: "¿Puede escribirme?" }
        ]
      },
      {
        id: "permisos",
        icono: "🚪",
        nombre: "Permisos",
        frases: [
          { icono: "🚻", texto: "¿Puedo ir al baño?" },
          { icono: "💧", texto: "¿Puedo tomar agua?" },
          { icono: "🚑", texto: "Necesito ir a enfermería" },
          { icono: "😴", texto: "Me siento cansado" },
          { icono: "🎒", texto: "No tengo el material" },
          { icono: "📞", texto: "Llame a mi tutor" },
          { icono: "🧑‍🏫", texto: "¿Puedo hablar con el director?" },
          { icono: "🙋", texto: "Necesito ayuda" }
        ]
      }
    ]
  },

  /* ==================== TRANSPORTE ==================== */
  {
    id: "transporte",
    icono: "🚌",
    nombre: "Transporte",
    situaciones: [
      {
        id: "bus",
        icono: "🚌",
        nombre: "En el bus",
        frases: [
          { icono: "💵", texto: "¿Cuánto cuesta el pasaje?" },
          { icono: "✋", texto: "¿Puede parar aquí?" },
          { icono: "🕐", texto: "¿Qué hora es?" },
          { icono: "💺", texto: "¿Puedo sentarme?" },
          { icono: "🪑", texto: "¿Este es mi asiento?" },
          { icono: "🚌", texto: "¿Este bus va a este lugar?" },
          { icono: "🔔", texto: "¿Puede avisarme cuando llegue?" },
          { icono: "📍", texto: "¿Dónde me bajo?" },
          { icono: "🎟️", texto: "Perdí mi boleto" },
          { icono: "🙏", texto: "Gracias por su ayuda" }
        ]
      },
      {
        id: "parada",
        icono: "🚏",
        nombre: "En la parada",
        frases: [
          { icono: "🚏", texto: "¿Dónde está la parada?" },
          { icono: "🕐", texto: "¿A qué hora sale?" },
          { icono: "🎫", texto: "¿Dónde compro el boleto?" },
          { icono: "🚕", texto: "Necesito un taxi" },
          { icono: "🧭", texto: "Estoy perdido" },
          { icono: "🙋", texto: "¿Puede ayudarme?" },
          { icono: "✍️", texto: "¿Puede escribirme?" }
        ]
      }
    ]
  },

  /* ==================== MERCADO ==================== */
  {
    id: "mercado",
    icono: "🛒",
    nombre: "Mercado",
    situaciones: [
      {
        id: "precios",
        icono: "💰",
        nombre: "Precios",
        frases: [
          { icono: "💰", texto: "¿Cuánto vale?" },
          { icono: "🏷️", texto: "¿Cuánto cuesta esto?" },
          { icono: "🎁", texto: "¿Hay descuento?" },
          { icono: "📉", texto: "¿Puede bajar el precio?" },
          { icono: "💳", texto: "¿Aceptan tarjeta?" },
          { icono: "🤝", texto: "¿Da crédito?" },
          { icono: "🎨", texto: "¿Tiene otro color?" },
          { icono: "📏", texto: "¿Tiene otra talla?" }
        ]
      },
      {
        id: "comprar",
        icono: "🛍️",
        nombre: "Comprar",
        frases: [
          { icono: "😍", texto: "Me gusta" },
          { icono: "✅", texto: "Lo quiero comprar" },
          { icono: "🛍️", texto: "Quiero llevar esto" },
          { icono: "👜", texto: "¿Tiene bolsa?" },
          { icono: "🏪", texto: "¿Dónde está la caja?" },
          { icono: "↩️", texto: "Quiero devolver esto" },
          { icono: "🙋", texto: "¿Puede ayudarme?" },
          { icono: "✍️", texto: "¿Puede escribirme?" },
          { icono: "🙏", texto: "Gracias, eso es todo" }
        ]
      }
    ]
  },

  /* ==================== HOSPITAL ==================== */
  {
    id: "hospital",
    icono: "🏥",
    nombre: "Hospital",
    situaciones: [
      {
        id: "sintomas",
        icono: "🤒",
        nombre: "Síntomas",
        frases: [
          { icono: "🤒", texto: "Tengo fiebre" },
          { icono: "🤕", texto: "Me duele la cabeza" },
          { icono: "😖", texto: "Me duele el estómago" },
          { icono: "📍", texto: "Me duele aquí" },
          { icono: "🤢", texto: "Tengo náuseas" },
          { icono: "😣", texto: "Me siento mal" },
          { icono: "🤧", texto: "Soy alérgico a algo" }
        ]
      },
      {
        id: "atencion",
        icono: "🩺",
        nombre: "Atención",
        frases: [
          { icono: "🩺", texto: "Necesito un médico" },
          { icono: "💊", texto: "Necesito medicina" },
          { icono: "⏰", texto: "¿Cuándo me atienden?" },
          { icono: "🙋", texto: "Necesito un intérprete de señas" },
          { icono: "✍️", texto: "¿Puede escribirme?" },
          { icono: "📞", texto: "¿Puede llamar a mi familia?" },
          { icono: "💧", texto: "Necesito agua" },
          { icono: "🛏️", texto: "Necesito descansar" },
          { icono: "🚻", texto: "¿Dónde está el baño?" }
        ]
      }
    ]
  },

  /* ==================== BANCO ==================== */
  {
    id: "banco",
    icono: "🏦",
    nombre: "Banco",
    situaciones: [
      {
        id: "tramites",
        icono: "📝",
        nombre: "Trámites",
        frases: [
          { icono: "📝", texto: "Necesito ayuda con este formulario" },
          { icono: "💳", texto: "Quiero abrir una cuenta" },
          { icono: "💵", texto: "Quiero hacer un depósito" },
          { icono: "🏧", texto: "Quiero retirar dinero" },
          { icono: "🖊️", texto: "¿Puedo firmar aquí?" },
          { icono: "⏰", texto: "¿Cuánto tarda?" }
        ]
      },
      {
        id: "atencion",
        icono: "🙋",
        nombre: "Atención",
        frases: [
          { icono: "🙋", texto: "¿Dónde me atienden?" },
          { icono: "🎫", texto: "Mi turno es este" },
          { icono: "🧑‍💼", texto: "Necesito un intérprete" },
          { icono: "✍️", texto: "¿Puede escribirme?" },
          { icono: "❓", texto: "Tengo una pregunta" },
          { icono: "🚻", texto: "¿Dónde está el baño?" },
          { icono: "🙏", texto: "Gracias" }
        ]
      }
    ]
  },

  /* ==================== RESTAURANTE ==================== */
  {
    id: "restaurante",
    icono: "🍽️",
    nombre: "Restaurante",
    situaciones: [
      {
        id: "ordenar",
        icono: "📋",
        nombre: "Ordenar",
        frases: [
          { icono: "📋", texto: "Quiero ordenar" },
          { icono: "🖼️", texto: "¿Tiene menú con imágenes?" },
          { icono: "💧", texto: "Un vaso de agua, por favor" },
          { icono: "🌶️", texto: "Sin picante, por favor" },
          { icono: "🍞", texto: "Más pan, por favor" },
          { icono: "🥡", texto: "Para llevar" },
          { icono: "🧾", texto: "La cuenta, por favor" }
        ]
      },
      {
        id: "alergias",
        icono: "🤧",
        nombre: "Alergias y dudas",
        frases: [
          { icono: "🤧", texto: "Soy alérgico a algo" },
          { icono: "🌾", texto: "Sin gluten, por favor" },
          { icono: "🥛", texto: "Sin lactosa, por favor" },
          { icono: "🥗", texto: "Sin carne, por favor" },
          { icono: "💰", texto: "¿Cuánto cuesta?" },
          { icono: "✍️", texto: "¿Puede escribirme?" },
          { icono: "🚻", texto: "¿Dónde está el baño?" },
          { icono: "🙏", texto: "Gracias" }
        ]
      }
    ]
  },

  /* ==================== CASA ==================== */
  {
    id: "casa",
    icono: "🏠",
    nombre: "Casa",
    situaciones: [
      {
        id: "necesidades",
        icono: "🍽️",
        nombre: "Necesidades",
        frases: [
          { icono: "🍽️", texto: "¿Hay comida?" },
          { icono: "😋", texto: "Tengo hambre" },
          { icono: "💧", texto: "Tengo sed" },
          { icono: "🚻", texto: "Necesito ir al baño" },
          { icono: "🥶", texto: "Tengo frío" },
          { icono: "🥵", texto: "Tengo calor" },
          { icono: "🛏️", texto: "Necesito descansar" },
          { icono: "🤒", texto: "No me siento bien" }
        ]
      },
      {
        id: "familia",
        icono: "👨‍👩‍👧",
        nombre: "Familia",
        frases: [
          { icono: "🙋", texto: "¿En qué puedo ayudar?" },
          { icono: "⏰", texto: "¿Estás ocupado?" },
          { icono: "📅", texto: "¿Qué día es hoy?" },
          { icono: "🕐", texto: "¿Qué hora es?" },
          { icono: "🚶", texto: "¿Dónde vas?" },
          { icono: "🆘", texto: "Necesito ayuda" },
          { icono: "🚪", texto: "¿Puede venir?" },
          { icono: "📞", texto: "Llame a mi familia" },
          { icono: "📢", texto: "Avise a mi familia" },
          { icono: "🏠", texto: "Estoy en casa" }
        ]
      },
      {
        id: "saludos",
        icono: "👋",
        nombre: "Saludos",
        frases: [
          { icono: "👋", texto: "Hola, buenas" },
          { icono: "☀️", texto: "Buenos días" },
          { icono: "🌤️", texto: "Buenas tardes" },
          { icono: "🌙", texto: "Buenas noches" },
          { icono: "👋", texto: "Adiós" },
          { icono: "✨", texto: "Hasta pronto" },
          { icono: "🙏", texto: "Gracias" },
          { icono: "❤️", texto: "Te quiero" }
        ]
      }
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
const situacionesEl  = $("situaciones");
const gridFrasesEl   = $("gridFrases");
const hintContextoEl = $("hintContexto");

const overlayFrase   = $("overlayFrase");
const fraseIcono     = $("fraseIcono");
const fraseTexto     = $("fraseTexto");

const overlayLibre   = $("overlayLibre");
const inputLibre     = $("inputLibre");
const gridPictos     = $("gridPictos");

/* ---------------- ESTADO EN MEMORIA ---------------- */

let contextoActual  = CONTEXTOS[0].id;
let situacionActual = null;   // id de la situación dentro del contexto
let fraseActual     = "";
let modoInvertido   = false;

/* ---------------- HELPERS DE DATOS ---------------- */

function getContexto(id) {
  return CONTEXTOS.find(c => c.id === id) || CONTEXTOS[0];
}

function getSituaciones(ctx) {
  return Array.isArray(ctx.situaciones) ? ctx.situaciones : [];
}

function getSituacionActiva(ctx) {
  const sit = getSituaciones(ctx);
  if (!sit.length) return null;
  return sit.find(s => s.id === situacionActual) || sit[0];
}

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
      if (ctx.id === contextoActual) return;
      contextoActual = ctx.id;
      // Al cambiar de contexto, reiniciar la situación a la primera
      const sit = getSituaciones(ctx);
      situacionActual = sit.length ? sit[0].id : null;
      vibrar([40]);
      renderContextos();
      renderSituaciones();
      renderFrases();
    });
    contextosEl.appendChild(btn);
  });
}

/* ---------------- RENDER: SITUACIONES ---------------- */

function renderSituaciones() {
  const ctx = getContexto(contextoActual);
  const sit = getSituaciones(ctx);

  if (!sit.length) {
    situacionesEl.hidden = true;
    situacionesEl.innerHTML = "";
    situacionActual = null;
    return;
  }

  situacionesEl.hidden = false;
  if (!sit.some(s => s.id === situacionActual)) situacionActual = sit[0].id;

  situacionesEl.innerHTML = "";
  sit.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "frs-sit-btn" + (s.id === situacionActual ? " activo" : "");
    btn.setAttribute("aria-label", s.nombre);
    btn.innerHTML = `
      <span class="frs-sit-icono" aria-hidden="true">${s.icono}</span>
      <span>${s.nombre}</span>
    `;
    btn.addEventListener("click", () => {
      if (s.id === situacionActual) return;
      situacionActual = s.id;
      vibrar([40]);
      renderSituaciones();
      renderFrases();
    });
    situacionesEl.appendChild(btn);
  });
}

/* ---------------- RENDER: FRASES ---------------- */

function renderFrases() {
  const ctx = getContexto(contextoActual);
  const sit = getSituacionActiva(ctx);

  let frases = [];
  let etiqueta = ctx.nombre;

  if (sit) {
    frases = sit.frases || [];
    etiqueta = `${ctx.nombre} · ${sit.nombre}`;
  } else {
    frases = ctx.frases || [];
  }

  hintContextoEl.textContent =
    `${etiqueta} · Toca una frase para mostrarla y escucharla.`;

  gridFrasesEl.innerHTML = "";
  frases.forEach((f) => {
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

situacionActual = getSituaciones(CONTEXTOS[0])[0]?.id ?? null;

renderContextos();
renderSituaciones();
renderFrases();
renderPictos();
