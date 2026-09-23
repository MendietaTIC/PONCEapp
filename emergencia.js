/* =========================================================
   PONCE · Modo Emergencia  (versión robusta)
   - El botón DETENER funciona por delegación en document
   - Sin vibración
   - Sirena continua + pulsos + voz
   ========================================================= */

(function () {
  "use strict";

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

  /* ---------------- ESTADO ---------------- */

  let fraseActual = "";
  let modoInvertido = false;
  let soloActivo = false;
  let soloIntervalVoz = null;
  let soloIntervalBeep = null;
  let audioCtx = null;
  let sirenaOsc = null;
  let sirenaLFO = null;
  let sirenaGain = null;
  let vozEspanol = null;

  /* ---------------- HELPERS ---------------- */

  const $ = (id) => document.getElementById(id);

  function log(...a)   { try { console.log("[EMG]", ...a); } catch (_) {} }
  function warn(...a)  { try { console.warn("[EMG]", ...a); } catch (_) {} }

  /* ---------------- VOZ ---------------- */

  function cargarVoces() {
    if (!("speechSynthesis" in window)) return;
    try {
      const voces = speechSynthesis.getVoices();
      vozEspanol =
        voces.find(v => v.lang && v.lang.toLowerCase().startsWith("es")) ||
        voces.find(v => /spanish|español/i.test(v.name)) ||
        null;
      log("Voces cargadas:", voces.length, "· Voz ES:", vozEspanol ? vozEspanol.name : "ninguna");
    } catch (e) { warn("cargarVoces", e); }
  }

  function hablar(texto, fuerte) {
    if (!texto || !String(texto).trim()) return;
    if (!("speechSynthesis" in window)) { warn("TTS no soportado"); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(texto));
      u.lang = "es-ES";
      u.rate = fuerte ? 0.92 : 1;
      u.volume = 1;
      if (vozEspanol) u.voice = vozEspanol;
      speechSynthesis.speak(u);
    } catch (e) { warn("hablar", e); }
  }

  /* ---------------- AUDIO ---------------- */

  function crearAudioCtx() {
    if (audioCtx && audioCtx.state !== "closed") return;
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) { warn("Sin AudioContext"); return; }
      audioCtx = new Ctor();
      log("AudioContext creado:", audioCtx.state);
    } catch (e) { warn("AudioContext error", e); audioCtx = null; }
  }

  function asegurarAudioCtx() {
    crearAudioCtx();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().then(() => log("AudioContext resumed")).catch(() => {});
    }
  }

  function pulsoAtencion() {
    if (!audioCtx || audioCtx.state !== "running") return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = 1100;
      gain.gain.value = 0.0001;
      osc.connect(gain).connect(audioCtx.destination);
      const t = audioCtx.currentTime;
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) { warn("pulsoAtencion", e); }
  }

  /* ---------------- RENDER ---------------- */

  function renderFrases() {
    const grid = $("gridFrases");
    if (!grid) { warn("Falta #gridFrases"); return; }
    grid.innerHTML = "";
    FRASES_EMERGENCIA.forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emg-btn-frase";
      btn.innerHTML =
        '<span class="emg-btn-frase-icono" aria-hidden="true">' + f.icono + '</span>' +
        '<span>' + f.texto + '</span>';
      btn.addEventListener("click", () => abrirFrase(f));
      grid.appendChild(btn);
    });
  }

  function renderRespuestas() {
    const grid = $("gridRespuestas");
    if (!grid) { warn("Falta #gridRespuestas"); return; }
    grid.innerHTML = "";
    RESPUESTAS_RAPIDAS.forEach((r) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "emg-btn-resp";
      btn.textContent = r;
      btn.addEventListener("click", () => mostrarLectura(r));
      grid.appendChild(btn);
    });
  }

  /* ---------------- ACCIONES ---------------- */

  function abrirFrase(f) {
    fraseActual = f.texto;
    const iconoEl   = $("fraseIcono");
    const textoEl   = $("fraseTexto");
    const overlay   = $("overlayFrase");
    if (iconoEl) iconoEl.textContent = f.icono;
    if (textoEl) textoEl.textContent = f.texto;
    if (overlay) { overlay.hidden = false; overlay.classList.remove("emg-invertido"); }
    modoInvertido = false;

    asegurarAudioCtx();
    pulsoAtencion();
    hablar(f.texto, true);
  }

  function cerrarFrase() {
    const overlay = $("overlayFrase");
    if (overlay) overlay.hidden = true;
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (_) {} }
  }

  function abrirRespuesta() {
    const overlay = $("overlayRespuesta");
    const input   = $("inputRespuesta");
    if (overlay) overlay.hidden = false;
    if (input) { input.value = ""; setTimeout(() => input.focus(), 80); }
  }

  function cerrarRespuesta() {
    const overlay = $("overlayRespuesta");
    if (overlay) overlay.hidden = true;
  }

  function mostrarLectura(texto) {
    if (!texto || !String(texto).trim()) return;
    const lecturaEl = $("lecturaTexto");
    const oLec = $("overlayLectura");
    const oResp = $("overlayRespuesta");
    if (lecturaEl) lecturaEl.textContent = String(texto).trim();
    if (oLec) oLec.hidden = false;
    if (oResp) oResp.hidden = true;
    pulsoAtencion();
  }

  function cerrarLectura() {
    const overlay = $("overlayLectura");
    if (overlay) overlay.hidden = true;
  }

  function iniciarDictado() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("El dictado no está disponible en este navegador."); return; }
    try {
      const rec = new SR();
      rec.lang = "es-ES";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const input = $("inputRespuesta");
        if (!input) return;
        const t = e.results[0][0].transcript;
        input.value = (input.value + " " + t).trim();
      };
      rec.start();
    } catch (e) { warn("dictado", e); }
  }

  /* ---------------- MODO SOLO ---------------- */

  function activarSolo() {
    if (soloActivo) return;
    soloActivo = true;
    log("Modo SOLO activado");

    const overlay = $("overlaySolo");
    if (overlay) overlay.hidden = false;

    asegurarAudioCtx();

    // Sirena continua
    try {
      if (audioCtx) {
        sirenaOsc  = audioCtx.createOscillator();
        sirenaGain = audioCtx.createGain();
        sirenaLFO  = audioCtx.createOscillator();
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
        log("Sirena iniciada");
      }
    } catch (e) { warn("sirena", e); }

    // Voz cada 6 s
    const decir = () => hablar("Necesito ayuda. Soy sordo. Por favor ayúdeme.", true);
    decir();
    soloIntervalVoz = setInterval(decir, 6000);

    // Pulsos cada 1.5 s
    soloIntervalBeep = setInterval(pulsoAtencion, 1500);
  }

  function detenerSolo() {
    log("Modo SOLO detenido");
    soloActivo = false;

    // 1) Intervalos primero (CRÍTICO)
    if (soloIntervalVoz)  { clearInterval(soloIntervalVoz);  soloIntervalVoz  = null; }
    if (soloIntervalBeep) { clearInterval(soloIntervalBeep); soloIntervalBeep = null; }

    // 2) Sirena
    try {
      if (sirenaOsc)  { try { sirenaOsc.stop(); }  catch (_) {} try { sirenaOsc.disconnect(); }  catch (_) {} }
      if (sirenaLFO)  { try { sirenaLFO.stop(); }  catch (_) {} try { sirenaLFO.disconnect(); }  catch (_) {} }
      if (sirenaGain) { try { sirenaGain.disconnect(); } catch (_) {} }
    } catch (_) {}
    sirenaOsc = sirenaLFO = sirenaGain = null;

    // 3) Voz
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (_) {} }

    // 4) Overlay
    const overlay = $("overlaySolo");
    if (overlay) overlay.hidden = true;
  }

  /* ---------------- BIND ---------------- */
  /* Delegación global: funciona aunque el HTML cambie o el botón esté dentro de otro elemento */

  function manejarClick(e) {
    // Buscar el elemento con id subiendo por los padres
    let el = e.target;
    while (el && el !== document) {
      if (el.id) {
        switch (el.id) {
          case "btnDetenerSolo":
            e.preventDefault(); e.stopPropagation();
            detenerSolo();
            return;
          case "btnSoloTop":
          case "btnSoloGrande":
            e.preventDefault();
            activarSolo();
            return;
          case "btnCerrarFrase":
          case "btnOkFrase":
            e.preventDefault();
            cerrarFrase();
            return;
          case "btnRepetir":
            e.preventDefault();
            if (fraseActual) hablar(fraseActual, true);
            return;
          case "btnInvertir": {
            e.preventDefault();
            modoInvertido = !modoInvertido;
            const ov = $("overlayFrase");
            if (ov) ov.classList.toggle("emg-invertido", modoInvertido);
            return;
          }
          case "btnAbrirRespuesta":
            e.preventDefault();
            abrirRespuesta();
            return;
          case "btnCerrarRespuesta":
            e.preventDefault();
            cerrarRespuesta();
            return;
          case "btnEnviarRespuesta": {
            e.preventDefault();
            const inp = $("inputRespuesta");
            const txt = inp ? inp.value : "";
            if (txt && txt.trim()) mostrarLectura(txt);
            return;
          }
          case "btnDictar":
            e.preventDefault();
            iniciarDictado();
            return;
          case "btnCerrarLectura":
            e.preventDefault();
            cerrarLectura();
            return;
          case "btnVolver":
            e.preventDefault();
            if (history.length > 1) history.back();
            else location.href = "index.html";
            return;
        }
      }
      el = el.parentNode;
    }
  }

  function bindEvents() {
    // Captura en document: se ejecuta antes que cualquier otro listener
    document.addEventListener("click", manejarClick, true);
    log("Delegación de click activada");

    // Desbloqueo de audio en el primer gesto
    const unlock = () => {
      asegurarAudioCtx();
      log("Primer gesto: audio desbloqueado");
    };
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click",      unlock, { once: true });

    // Voces (algunos navegadores las cargan tarde)
    if ("speechSynthesis" in window) {
      speechSynthesis.onvoiceschanged = cargarVoces;
    }
  }

  /* ---------------- INIT ---------------- */

  function init() {
    log("Init Modo Emergencia");
    renderFrases();
    renderRespuestas();
    cargarVoces();
    bindEvents();
    log("Listo");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
