/* =========================================================
   PONCE · Modo Emergencia
   Lógica de frases, TTS, respuestas, dictado y modo SOLO
   Sin vibración · Con sirena y pulsos de sonido
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

const gridFrases       = $("gridFrases");
const overlayFrase     = $("overlayFrase");
const fraseIcono       = $("fraseIcono");
const fraseTexto       = $("fraseTexto");
const overlayRespuesta = $("overlayRespuesta");
const gridRespuestas   = $("gridRespuestas");
const inputRespuesta   = $("inputRespuesta");
const overlayLectura   = $("overlayLectura");
const lecturaTexto     = $("lecturaTexto");
const overlaySolo      = $("overlaySolo");

/* ---------------- ESTADO ---------------- */

let fraseActual    = "";
let modoInvertido  = false;
let soloActivo     = false;
let soloIntervalVoz = null;
let soloIntervalBeep = null;

let audioCtx    = null;
let sirenaOsc   = null;
let sirenaLFO   = null;
let sirenaGain  = null;

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
  if (!texto || !texto.trim()) return;
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

/* ---------------- AUDIO: PULSO DE ATENCIÓN ---------------- */

function pitidoAtencion() {
  if (!audioCtx || audioCtx.state === "closed") return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.value = 1100;
    gain.gain.value = 0.0001;
    osc.connect(gain).connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    osc.start(t);
    osc.stop(t + 0.25);
  } catch (_) {}
}

/* ---------------- RENDER FRASES ---------------- */

function renderFrases() {
  gridFrases.innerHTML = "";
  FRASES_EMERGENCIA.forEach((f) => {
    const btn = document.createElement("button");
    btn.className = "emg-btn-frase";
    btn.type = "button";
    btn.setAttribute("aria-label", f.texto);
    btn.innerHTML = `
      <span class="emg-btn-frase-icono" aria-hidden="true">${f.icono}</span>
      <span>${f.texto}</span>
    `;
    btn.addEventListener("click", () => abrirFrase(f));
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

function abrirFrase(frase) {
  fraseActual = frase.texto;
  fraseIcono.textContent = frase.icono;
  fraseTexto.textContent = frase.texto;

  overlayFrase.hidden = false;
  modoInvertido = false;
  overlayFrase.classList.remove("emg-invertido");

  // Aseguramos que exista el AudioContext (gesto del usuario)
  asegurarAudioCtx();
  pitidoAtencion();

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
  lecturaTexto.textContent = texto.trim();
  overlayLectura.hidden = false;
  overlayRespuesta.hidden = true;
  pitidoAtencion();
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

/* ---------------- AUDIO CONTEXT ---------------- */

function asegurarAudioCtx() {
  if (!audioCtx || audioCtx.state === "closed") {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) { audioCtx = null; }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

/* ---------------- MODO SOLO ---------------- */

function activarSolo() {
  if (soloActivo) return;
  soloActivo = true;

  overlaySolo.hidden = false;

  // 1) AudioContext
  asegurarAudioCtx();

  // 2) Sirena continua (oscilador + LFO)
  try {
    if (audioCtx) {
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
    }
  } catch (_) {}

  // 3) Voz repetida
  const decirSolo = () => hablar("Necesito ayuda. Soy sordo. Por favor ayúdeme.", { fuerte: true });
  decirSolo();
  soloIntervalVoz = setInterval(decirSolo, 6000);

  // 4) Pulsos de atención cada 1.5 s (por encima de la sirena)
  soloIntervalBeep = setInterval(pitidoAtencion, 1500);
}

function detenerSolo() {
  // 1) Marcar como inactivo
  soloActivo = false;

  // 2) Cancelar intervalos PRIMERO (clave para que no se reactive)
  if (soloIntervalVoz)  { clearInterval(soloIntervalVoz);  soloIntervalVoz  = null; }
  if (soloIntervalBeep) { clearInterval(soloIntervalBeep); soloIntervalBeep = null; }

  // 3) Detener sirena y liberar nodos
  try {
    if (sirenaOsc)  { try { sirenaOsc.stop(); }  catch (_) {} try { sirenaOsc.disconnect(); }  catch (_) {} }
    if (sirenaLFO)  { try { sirenaLFO.stop(); }  catch (_) {} try { sirenaLFO.disconnect(); }  catch (_) {} }
    if (sirenaGain) { try { sirenaGain.disconnect(); } catch (_) {} }
  } catch (_) {}

  sirenaOsc = sirenaLFO = sirenaGain = null;

  // 4) Detener voz
  if ("speechSynthesis" in window) {
    try { speechSynthesis.cancel(); } catch (_) {}
  }

  // 5) Ocultar overlay
  overlaySolo.hidden = true;
}

/* ---------------- EVENTOS ---------------- */

$("btnVolver").addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "index.html";
});

$("btnSoloTop").addEventListener("click", activarSolo);
$("btnSoloGrande").addEventListener("click", activarSolo);

$("btnDetenerSolo").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  detenerSolo();
});

$("btnCerrarFrase").addEventListener("click", cerrarFrase);
$("btnOkFrase") && $("btnOkFrase").addEventListener("click", cerrarFrase);

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
  else inputRespuesta.focus();
});

$("btnDictar").addEventListener("click", iniciarDictado);
$("btnCerrarLectura").addEventListener("click", cerrarLectura);

/* ---------------- INICIALIZACIÓN ---------------- */

renderFrases();
renderRespuestas();

// Desbloquea el audio en el primer toque (requisito de navegadores móviles)
document.addEventListener("touchstart", asegurarAudioCtx, { once: true });
document.addEventListener("click",      asegurarAudioCtx, { once: true });

// Evita zoom accidental por gestos
document.addEventListener("gesturestart", (e) => e.preventDefault());
