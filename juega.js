const SIGNS = [
  {id:'A', word:'Amigo', tip:'Puño cerrado con el pulgar hacia un lado.', index:'down', middle:'down', ring:'down', pinky:'down', thumb:'out'},
  {id:'B', word:'Bote', tip:'Mano plana, dedos juntos, pulgar cruzado al frente.', index:'up', middle:'up', ring:'up', pinky:'up', thumb:'across'},
  {id:'C', word:'Casa', tip:'Mano curva, como sosteniendo un vaso.', closed:'C'},
  {id:'D', word:'Dado', tip:'Índice arriba; el pulgar toca los demás dedos doblados.', index:'up', middle:'down', ring:'down', pinky:'down', thumb:'across', mark:'circleTop'},
  {id:'E', word:'Elefante', tip:'Dedos doblados hacia la palma, tocando el pulgar.', index:'bent', middle:'bent', ring:'bent', pinky:'bent', thumb:'across'},
  {id:'F', word:'Flor', tip:'Pulgar e índice se tocan formando un círculo.', index:'down', middle:'up', ring:'up', pinky:'up', thumb:'out', mark:'circleBase'},
  {id:'G', word:'Gato', tip:'Índice y pulgar apuntan hacia el lado.', index:'up', middle:'down', ring:'down', pinky:'down', thumb:'out', rotate:-90},
  {id:'H', word:'Hormiga', tip:'Índice y medio apuntan hacia el lado, juntos.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'out', rotate:-90},
  {id:'I', word:'Isla', tip:'Solo el meñique levantado.', index:'down', middle:'down', ring:'down', pinky:'up', thumb:'down'},
  {id:'J', word:'Jirafa', tip:'Como la I, pero dibuja una pequeña J en el aire.', index:'down', middle:'down', ring:'down', pinky:'up', thumb:'down', motion:true},
  {id:'K', word:'Koala', tip:'Índice y medio arriba en V, pulgar entre ambos.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'between-tall', wide:true},
  {id:'L', word:'Luna', tip:'Pulgar e índice extendidos formando una L.', index:'up', middle:'down', ring:'down', pinky:'down', thumb:'out'},
  {id:'M', word:'Mono', tip:'Puño con el pulgar cubierto por tres dedos.', index:'down', middle:'down', ring:'down', pinky:'down', thumb:'down', dots:3},
  {id:'N', word:'Nube', tip:'Puño con el pulgar cubierto por dos dedos.', index:'down', middle:'down', ring:'down', pinky:'down', thumb:'down', dots:2},
  {id:'O', word:'Oso', tip:'Todos los dedos curvados formando un círculo.', closed:'O'},
  {id:'P', word:'Pato', tip:'Como la K, pero apuntando hacia abajo.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'between-tall', wide:true, rotate:130},
  {id:'Q', word:'Queso', tip:'Como la G, pero apuntando hacia abajo.', index:'up', middle:'down', ring:'down', pinky:'down', thumb:'out', rotate:110},
  {id:'R', word:'Ratón', tip:'Índice y medio cruzados.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'across', crossed:true},
  {id:'S', word:'Sol', tip:'Puño cerrado con el pulgar al frente.', index:'down', middle:'down', ring:'down', pinky:'down', thumb:'across'},
  {id:'T', word:'Tigre', tip:'Puño con el pulgar asomando entre índice y medio.', index:'down', middle:'down', ring:'down', pinky:'down', thumb:'between-short'},
  {id:'U', word:'Uva', tip:'Índice y medio juntos hacia arriba.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'down'},
  {id:'V', word:'Vaca', tip:'Índice y medio separados, como una V.', index:'up', middle:'up', ring:'down', pinky:'down', thumb:'down', wide:true},
  {id:'W', word:'Waffle', tip:'Índice, medio y anular levantados.', index:'up', middle:'up', ring:'up', pinky:'down', thumb:'out'},
  {id:'X', word:'Xilófono', tip:'Índice doblado como un gancho.', index:'bent', middle:'down', ring:'down', pinky:'down', thumb:'out'},
  {id:'Y', word:'Yoyo', tip:'Pulgar y meñique extendidos, resto cerrado.', index:'down', middle:'down', ring:'down', pinky:'up', thumb:'up'},
  {id:'Z', word:'Zorro', tip:'Con el índice, dibuja una Z en el aire.', index:'up', middle:'down', ring:'down', pinky:'down', thumb:'out', motion:true}
];

/* ---------- Generador de manos ilustradas (SVG) ---------- */
function fingerRect(x, state){
  if(state==='up')   return `<rect x="${x-8}" y="38" width="16" height="82" rx="8" fill="url(#fingerGrad)"/>`;
  if(state==='bent') return `<rect x="${x-8}" y="66" width="16" height="54" rx="10" fill="url(#fingerGrad)"/>`;
  return `<rect x="${x-8}" y="100" width="16" height="22" rx="8" fill="url(#fingerGrad)"/>`;
}
function thumbShape(state){
  switch(state){
    case 'out':          return `<rect x="8" y="96" width="22" height="64" rx="11" fill="url(#fingerGrad)"/>`;
    case 'up':            return `<rect x="8" y="60" width="20" height="76" rx="10" fill="url(#fingerGrad)"/>`;
    case 'across':        return `<rect x="24" y="150" width="72" height="18" rx="9" fill="url(#fingerGrad)"/>`;
    case 'between-tall':  return `<rect x="48" y="58" width="16" height="64" rx="8" fill="url(#fingerGrad)"/>`;
    case 'between-short': return `<rect x="58" y="104" width="14" height="30" rx="7" fill="url(#fingerGrad)"/>`;
    default:               return `<rect x="14" y="114" width="16" height="28" rx="8" fill="url(#fingerGrad)"/>`; // down
  }
}
function handSVG(sign){
  const FX = {index:52, middle:74, ring:96, pinky:118};
  if(sign.wide){ FX.index -= 12; FX.middle += 12; }
  if(sign.crossed){ FX.index = 70; FX.middle = 80; }

  let inner = `<rect x="30" y="120" width="100" height="62" rx="26" fill="url(#palmGrad)"/>`;

  if(sign.closed){
    if(sign.closed==='O'){
      inner += `<circle cx="80" cy="150" r="32" fill="none" stroke="var(--finger)" stroke-width="10" stroke-linecap="round"/>`;
    } else { // C
      inner += `<path d="M108 118 A40 40 0 1 0 108 182" fill="none" stroke="var(--finger)" stroke-width="12" stroke-linecap="round"/>`;
    }
  } else {
    ['index','middle','ring','pinky'].forEach(k=>{ inner += fingerRect(FX[k], sign[k]); });
    inner += thumbShape(sign.thumb);
    if(sign.mark==='circleTop') inner += `<circle cx="60" cy="58" r="15" fill="none" stroke="var(--ink-soft)" stroke-width="5"/>`;
    if(sign.mark==='circleBase') inner += `<circle cx="56" cy="108" r="13" fill="none" stroke="var(--ink-soft)" stroke-width="5"/>`;
    if(sign.dots){
      for(let i=0;i<sign.dots;i++){ inner += `<circle cx="${52+i*16}" cy="130" r="5" fill="var(--ink-soft)"/>`; }
    }
  }
  if(sign.motion){
    inner += `<path d="M120 44 Q140 30 122 20" fill="none" stroke="var(--coral)" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 7"/>
               <path d="M118 16 L122 20 L126 14" fill="none" stroke="var(--coral)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const rot = sign.rotate || 0;
  return `<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="palmGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--palm-light)"/><stop offset="1" stop-color="var(--palm)"/>
      </linearGradient>
      <linearGradient id="fingerGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--finger-light)"/><stop offset="1" stop-color="var(--finger)"/>
      </linearGradient>
    </defs>
    <g transform="rotate(${rot} 80 110)">${inner}</g>
  </svg>`;
}

function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }

/* ---------- Pestañas ---------- */
const tabs = document.querySelectorAll('nav.tabs button');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  tabs.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+btn.dataset.view).classList.add('active');
  if(btn.dataset.view!=='reto') stopReto();
}));

/* ---------- Tarjetas (Aprender) ---------- */
let flashIdx = 0;
function renderFlash(){
  const s = SIGNS[flashIdx];
  document.getElementById('flashHand').innerHTML = handSVG(s);
  document.getElementById('flashLetter').textContent = s.id;
  document.getElementById('flashWord').textContent = s.word;
  document.getElementById('flashTip').textContent = s.tip;
  document.getElementById('flashCount').textContent = 'Letra '+(flashIdx+1)+' de '+SIGNS.length;
  document.getElementById('flashBarFill').style.width = ((flashIdx+1)/SIGNS.length*100)+'%';
}
document.getElementById('prevBtn').onclick = ()=>{ flashIdx = (flashIdx-1+SIGNS.length)%SIGNS.length; renderFlash(); };
document.getElementById('nextBtn').onclick = ()=>{ flashIdx = (flashIdx+1)%SIGNS.length; renderFlash(); };
renderFlash();

/* ---------- Memorama (8 letras al azar por partida) ---------- */
let memState = { cards:[], flipped:[], moves:0, pairs:0, lock:false, total:8 };
function buildMemorama(){
  const pool = shuffle([...SIGNS]).slice(0, memState.total);
  let deck = [];
  pool.forEach((s,i)=>{ deck.push({key:s.id,type:'hand'}); deck.push({key:s.id,type:'label'}); });
  deck = shuffle(deck);
  memState = { cards:deck, flipped:[], moves:0, pairs:0, lock:false, total:memState.total };
  renderMem();
}
function signById(id){ return SIGNS.find(s=>s.id===id); }
function renderMem(){
  const grid = document.getElementById('memGrid');
  grid.innerHTML = '';
  memState.cards.forEach((c,idx)=>{
    const btn = document.createElement('button');
    btn.className = 'mem-tile';
    const isFlipped = memState.flipped.includes(idx) || c.matched;
    if(c.matched) btn.classList.add('matched');
    btn.innerHTML = isFlipped ? (c.type==='hand' ? handSVG(signById(c.key)) : c.key) : '?';
    btn.onclick = ()=>flipMem(idx);
    grid.appendChild(btn);
  });
  document.getElementById('memMoves').textContent = 'Movimientos: '+memState.moves;
  document.getElementById('memPairs').textContent = 'Pares: '+memState.pairs+'/'+memState.total;
}
function flipMem(idx){
  if(memState.lock) return;
  const c = memState.cards[idx];
  if(c.matched || memState.flipped.includes(idx)) return;
  memState.flipped.push(idx);
  renderMem();
  if(memState.flipped.length===2){
    memState.lock = true;
    memState.moves++;
    const [a,b] = memState.flipped;
    const ca = memState.cards[a], cb = memState.cards[b];
    if(ca.key===cb.key && ca.type!==cb.type){
      ca.matched = true; cb.matched = true;
      memState.pairs++;
      memState.flipped = [];
      memState.lock = false;
      renderMem();
    } else {
      setTimeout(()=>{ memState.flipped = []; memState.lock = false; renderMem(); }, 700);
    }
  }
}
document.getElementById('memReset').onclick = buildMemorama;
buildMemorama();

/* ---------- Quiz (sin límite de tiempo) ---------- */
let quizState = { current:null, score:0, total:0, best:0, answered:false };
try{ quizState.best = Number(localStorage.getItem('ajq_best')||0); }catch(e){}
function randomOptions(correctId){
  let opts = [correctId];
  while(opts.length<4){
    const cand = SIGNS[Math.floor(Math.random()*SIGNS.length)].id;
    if(!opts.includes(cand)) opts.push(cand);
  }
  return shuffle(opts);
}
function newQuestion(){
  const correct = SIGNS[Math.floor(Math.random()*SIGNS.length)];
  const opts = randomOptions(correct.id);
  quizState.current = correct;
  quizState.answered = false;
  document.getElementById('quizHand').innerHTML = handSVG(correct);
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  opts.forEach(letter=>{
    const b = document.createElement('button');
    b.textContent = letter;
    b.onclick = ()=>answerQuiz(letter,b);
    optWrap.appendChild(b);
  });
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizNext').style.display = 'none';
  updateQuizScore();
}
function answerQuiz(letter, btn){
  if(quizState.answered) return;
  quizState.answered = true;
  quizState.total++;
  const isCorrect = letter === quizState.current.id;
  if(isCorrect){ quizState.score++; btn.classList.add('correct'); }
  else { btn.classList.add('incorrect'); }
  [...document.getElementById('quizOptions').children].forEach(b=>{
    if(b.textContent===quizState.current.id) b.classList.add('correct');
  });
  document.getElementById('quizFeedback').textContent = isCorrect
    ? '¡Correcto! Esa seña forma la letra '+quizState.current.id+'.'
    : 'Casi — era la letra '+quizState.current.id+' ('+quizState.current.word+').';
  if(quizState.score > quizState.best){
    quizState.best = quizState.score;
    try{ localStorage.setItem('ajq_best', String(quizState.best)); }catch(e){}
  }
  document.getElementById('quizNext').style.display = 'block';
  updateQuizScore();
}
function updateQuizScore(){
  document.getElementById('quizScore').textContent = 'Puntaje: '+quizState.score+'/'+quizState.total+' · Mejor: '+quizState.best;
}
document.getElementById('quizNext').onclick = newQuestion;
newQuestion();

/* ---------- Reto contrarreloj ---------- */
const RETO_SECONDS = 45;
let reto = { running:false, timeLeft:RETO_SECONDS, correct:0, timer:null, current:null, best:0 };
try{ reto.best = Number(localStorage.getItem('ajq_reto_best')||0); }catch(e){}
function retoUI(){
  document.getElementById('retoTime').textContent = reto.timeLeft+'s';
  document.getElementById('retoScore').textContent = 'Aciertos: '+reto.correct;
  document.getElementById('retoBest').textContent = 'Mejor reto: '+reto.best;
}
function stopReto(){
  if(reto.timer){ clearInterval(reto.timer); reto.timer = null; }
  reto.running = false;
}
function startReto(){
  stopReto();
  reto.timeLeft = RETO_SECONDS; reto.correct = 0; reto.running = true;
  document.getElementById('retoStart').style.display = 'none';
  document.getElementById('retoBoard').style.display = 'block';
  document.getElementById('retoEnd').style.display = 'none';
  retoUI();
  retoQuestion();
  reto.timer = setInterval(()=>{
    reto.timeLeft--;
    retoUI();
    if(reto.timeLeft<=0) endReto();
  },1000);
}
function retoQuestion(){
  const correct = SIGNS[Math.floor(Math.random()*SIGNS.length)];
  const opts = randomOptions(correct.id);
  reto.current = correct;
  document.getElementById('retoHand').innerHTML = handSVG(correct);
  const wrap = document.getElementById('retoOptions');
  wrap.innerHTML = '';
  opts.forEach(letter=>{
    const b = document.createElement('button');
    b.textContent = letter;
    b.onclick = ()=>retoAnswer(letter);
    wrap.appendChild(b);
  });
}
function retoAnswer(letter){
  if(!reto.running) return;
  if(letter===reto.current.id) reto.correct++;
  retoUI();
  retoQuestion();
}
function endReto(){
  stopReto();
  if(reto.correct > reto.best){
    reto.best = reto.correct;
    try{ localStorage.setItem('ajq_reto_best', String(reto.best)); }catch(e){}
  }
  document.getElementById('retoBoard').style.display = 'none';
  document.getElementById('retoEnd').style.display = 'block';
  document.getElementById('retoEndText').textContent = '¡Tiempo! Acertaste '+reto.correct+' señas.';
  document.getElementById('retoEndBest').textContent = 'Mejor reto: '+reto.best;
  document.getElementById('retoStart').style.display = 'block';
  document.getElementById('retoStart').textContent = 'Jugar de nuevo';
}
document.getElementById('retoStart').onclick = startReto;
retoUI();
