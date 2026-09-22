/* =========================================================
   PONCE · Modo Emergencia
   Lógica de frases, TTS, respuestas, dictado y modo SOLO
   ========================================================= */

/* ---------------- DATOS ---------------- */

const FRASES_EMERGENCIA = [
  { icono: "🆘", texto: "Necesito ayuda" },
  { icono: "🚑", texto: "Llame a una ambulancia" },
  { icono: "🚓", texto: "Llame a la policía" },
  { icono: "🔥", texto: "Hay un incendio" },
  { icono: "🤒", texto: "Me siento mal" },
  { icono: "💔", texto: "Tengo mucho dolor" },
  { icono: "😮‍💨", texto: "No puedo respirar" },
  { icono: "🧭", texto: "Estoy perdido" },
  { icono: "👨‍👩‍👧", texto: "Llame a mi familia" },
  { icono: "🦽", texto: "No puedo moverme" },
  { icono: "⚠️", texto: "Estoy en peligro" },
  { icono: "🩺", texto: "Necesito un médico" }
];

const RESPUESTAS_RAPIDAS = [
  "Ya llamé a una ambulancia",
  "Estoy llamando ahora",
  "Tranquilo, ya viene ayuda",
  "Te voy a ayudar",
  "¿Dónde te duele?",
  "¿Puedes caminar?",
  "¿Cómo te llamas?",
  "Un momento, por favor",
  "No te muevas",
  "Respira despacio",
  "Sí",
  "No"
];

/* ---------------- REFERENCIAS ---------------- */

const $ = (id) => document.getElementById(id);

const gridFrases        = $("gridFrases");
const overlayFrase      = $("overlayFrase");
const fraseIcono        = $("fraseIcono");
const fraseTexto        = $("fraseTexto");
const overlayRespuesta  = $("overlayRespuesta");
const gridRespuestas    = $("gridRespuestas");
const inputRespuesta    = $("inputRespuesta");
const overlayLectura    = $("overlayLectura");
const lecturaTexto      = $("lecturaTexto");
const overlaySolo       = $("overlaySolo");

/* ---------------- ESTADO ---------------- */

let fraseActual = "";
let modoInvertido = false;
let soloActivo = false;
let soloIntervalVoz = null;
let soloIntervalVib = null;

let audioCtx = null;
let sirenaOsc = null;
let sirenaLFO = null;
let sirenaGain = null;

/* ---------------- VOZ (TTS) ---------------- */

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

function hablar(texto, { fuerte = false, repetir = 1 } = {}) {
  if (!("speechSynthesis" in window)) return;
  try {
    speechSynthesis.cancel();
    for (let i = 0; i < repetir; i++) {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "es-ES";
      u.rate = fuerte ? 0.92 : 1;
      u.pitch = fuerte ? 1.05 : 1;
      u.volume = 1;
      if (vozEspanol) u.voice = vozEspanol;
      speechSynthesis.speak(u);
    }
  } catch (_) {}
}

/* ---------------- VIBRACIÓN ---------------- */

function vibrar(patron = [200]) {
  if (navigator.vibrate) {
    try { navigator.vibrate(patron); } catch (_) {}
  }
}

/* ---------------- RENDER FRASES ---------------- */

function renderFrases() {
  gridFrases.innerHTML = "";
  FRASES_EMERGENCIA.forEach((f, i) => {
    const btn = document.createElement("button");
    btn.className = "emg-btn-frase";
    btn.type = "button";
    btn.setAttribute("aria-label", f.texto);
    btn.innerHTML = `
      <span class="emg-btn-frase-icono" aria-hidden="true">${f.icono}</span>
      <span>${f.texto}</span>
    `;
    btn.addEventListener("click", () => abrirFrase(f, i));
    gridFrases.appendChild(btn);
  });
}

/* ---------------- RENDER RESPUESTAS ---------------- */

function renderRespuestas() {
  gridRespuestas.innerHTML = "";
  RESPUESTAS_RAPIDAS.forEach((r) => {
    const btn = document.createElement("button");
    btn.className = "emg-btn-resp";
    btn.type = "button";
    btn.textContent = r;
    btn.addEventListener("click", () => mostrarLectura(r));
    gridRespuestas.appendChild(btn);
  });
}

/* ---------------- OVERLAY FRASE ---------------- */

function abrirFrase(frase, idx) {
  fraseActual = frase.texto;
  fraseIcono.textContent = frase.icono;
  fraseTexto.textContent = frase.texto;

  overlayFrase.hidden = false;
  modoInvertido = false;
  overlayFrase.classList.remove("emg-invertido");

  vibrar([120, 60, 120]);
  hablar(frase.texto, { fuerte: true });
}

function cerrarFrase() {
  overlayFrase.hidden = true;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}

/* ---------------- OVERLAY RESPUESTA ---------------- */

function abrirRespuesta() {
  overlayRespuesta.hidden = false;
  inputRespuesta.value = "";
}

function cerrarRespuesta() {
  overlayRespuesta.hidden = true;
}

function mostrarLectura(texto) {
  if (!texto || !texto.trim()) return;
  const limpio = texto.trim();
  lecturaTexto.textContent = limpio;
  overlayLectura.hidden = false;
  overlayRespuesta.hidden = true;
  vibrar([100, 50, 100]);
}

function cerrarLectura() {
  overlayLectura.hidden = true;
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
    inputRespuesta.value = (inputRespuesta.value + " " + texto).trim();
  };
  rec.onerror = () => {};
  try { rec.start(); } catch (_) {}
}

/* ---------------- MODO SOLO ---------------- */

function activarSolo() {
  if (soloActivo) return;
  soloActivo = true;

  overlaySolo.hidden = false;
  vibrar([400, 150, 400, 150, 400]);

  // Sirena con Web Audio API
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    sirenaOsc = audioCtx.createOscillator();
    sirenaGain = audioCtx.createGain();
    sirenaLFO = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();

    sirenaOsc.type = "sawtooth";
    sirenaOsc.frequency.value = 700;
    lfoGain.gain.value = 420;
    sirenaLFO.frequency.value = 1.6;

    sirenaGain.gain.value = 0.18;

    sirenaLFO.connect(lfoGain);
    lfoGain.connect(sirenaOsc.frequency);
    sirenaOsc.connect(sirenaGain).connect(audioCtx.destination);

    sirenaOsc.start();
    sirenaLFO.start();
  } catch (_) {}

  // Voz repetida
  const decirSolo = () => hablar("Necesito ayuda. Soy sordo. Por favor ayúdeme.", { fuerte: true });
  decirSolo();
  soloIntervalVoz = setInterval(decirSolo, 6000);

  // Vibración repetida
  soloIntervalVib = setInterval(() => vibrar([500, 200, 500, 200]), 2000);
}

function detenerSolo() {
  soloActivo = false;
  overlaySolo.hidden = true;

  try {
    if (sirenaOsc) { sirenaOsc.stop(); sirenaOsc.disconnect(); }
    if (sirenaLFO) { sirenaLFO.stop(); sirenaLFO.disconnect(); }
    if (sirenaGain) { sirenaGain.disconnect(); }
    if (audioCtx) { audioCtx.close(); }
  } catch (_) {}

  sirenaOsc = sirenaLFO = sirenaGain = audioCtx = null;

  clearInterval(soloIntervalVoz);
  clearInterval(soloIntervalVib);
  soloIntervalVoz = soloIntervalVib = null;

  if ("speechSynthesis" in window) speechSynthesis.cancel();
  if (navigator.vibrate) navigator.vibrate(0);
}

/* ---------------- EVENTOS ---------------- */

$("btnVolver").addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "index.html";
});

$("btnSoloTop").addEventListener("click", activarSolo);
$("btnSoloGrande").addEventListener("click", activarSolo);
$("btnDetenerSolo").addEventListener("click", detenerSolo);

$("btnCerrarFrase").addEventListener("click", cerrarFrase);

$("btnRepetir").addEventListener("click", () => {
  if (fraseActual) hablar(fraseActual, { fuerte: true });
});

$("btnInvertir").addEventListener("click", () => {
  modoInvertido = !modoInvertido;
  overlayFrase.classList.toggle("emg-invertido", modoInvertido);
});

$("btnAbrirRespuesta").addEventListener("click", abrirRespuesta);
$("btnCerrarRespuesta").addEventListener("click", cerrarRespuesta);

$("btnEnviarRespuesta").addEventListener("click", () => {
  const texto = inputRespuesta.value;
  if (texto && texto.trim()) mostrarLectura(texto);
  else {
    inputRespuesta.focus();
    vibrar([80, 40, 80]);
  }
});

$("btnDictar").addEventListener("click", iniciarDictado);
$("btnCerrarLectura").addEventListener("click", cerrarLectura);

/* ---------------- INICIALIZACIÓN ---------------- */

renderFrases();
renderRespuestas();

// Bloquear gestos de zoom accidental en overlays de emergencia
document.addEventListener("gesturestart", (e) => e.preventDefault());
