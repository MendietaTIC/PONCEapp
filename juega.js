const SIGNS = [
  {id:'A', word:'Amigo', tip:'Puño cerrado con el pulgar hacia un lado.', f:{thumb:1,index:0,middle:0,ring:0,pinky:0}},
  {id:'I', word:'Isla', tip:'Solo el dedo meñique levantado.', f:{thumb:0,index:0,middle:0,ring:0,pinky:1}},
  {id:'L', word:'Luna', tip:'Pulgar e índice extendidos, forman una L.', f:{thumb:1,index:1,middle:0,ring:0,pinky:0}},
  {id:'O', word:'Oso', tip:'Dedos curvados formando un círculo.', f:{thumb:0,index:0,middle:0,ring:0,pinky:0}, closed:true},
  {id:'U', word:'Uva', tip:'Índice y medio juntos hacia arriba.', f:{thumb:0,index:1,middle:1,ring:0,pinky:0}},
  {id:'V', word:'Vaca', tip:'Índice y medio separados, como una V.', f:{thumb:0,index:1,middle:1,ring:0,pinky:0}, wide:true},
  {id:'W', word:'Waffle', tip:'Índice, medio y anular levantados.', f:{thumb:0,index:1,middle:1,ring:1,pinky:0}},
  {id:'Y', word:'Yoyo', tip:'Pulgar y meñique extendidos, resto cerrado.', f:{thumb:1,index:0,middle:0,ring:0,pinky:1}}
];

function handSVG(sign){
  const FX = {index:52, middle:74, ring:96, pinky:118};
  if(sign.wide){ FX.index -= 12; FX.middle += 12; }
  let s = '<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">';
  ['index','middle','ring','pinky'].forEach(k=>{
    const up = sign.f[k];
    const y = up ? 40 : 96, h = up ? 80 : 24;
    s += `<rect x="${FX[k]-8}" y="${y}" width="16" height="${h}" rx="8" fill="var(--finger)"/>`;
  });
  const tUp = sign.f.thumb, ty = tUp?70:118, th = tUp?70:22;
  s += `<rect x="14" y="${ty}" width="20" height="${th}" rx="10" fill="var(--finger)"/>`;
  s += `<rect x="30" y="120" width="100" height="60" rx="26" fill="var(--palm)"/>`;
  if(sign.closed){ s += `<circle cx="80" cy="150" r="30" fill="none" stroke="var(--finger)" stroke-width="6"/>`; }
  s += '</svg>';
  return s;
}

/* ---------- Pestañas ---------- */
const tabs = document.querySelectorAll('nav.tabs button');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  tabs.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+btn.dataset.view).classList.add('active');
}));

/* ---------- Tarjetas (Aprender) ---------- */
let flashIdx = 0;
function renderFlash(){
  const s = SIGNS[flashIdx];
  document.getElementById('flashHand').innerHTML = handSVG(s);
  document.getElementById('flashLetter').textContent = s.id;
  document.getElementById('flashWord').textContent = s.word;
  document.getElementById('flashTip').textContent = s.tip;
  document.getElementById('flashDots').innerHTML = SIGNS.map((_,i)=>`<span class="${i===flashIdx?'on':''}"></span>`).join('');
}
document.getElementById('prevBtn').onclick = ()=>{ flashIdx = (flashIdx-1+SIGNS.length)%SIGNS.length; renderFlash(); };
document.getElementById('nextBtn').onclick = ()=>{ flashIdx = (flashIdx+1)%SIGNS.length; renderFlash(); };
renderFlash();

/* ---------- Memorama ---------- */
let memState = { cards:[], flipped:[], moves:0, pairs:0, lock:false };
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function buildMemorama(){
  let deck = [];
  SIGNS.forEach((s,i)=>{ deck.push({key:i,type:'hand'}); deck.push({key:i,type:'label'}); });
  deck = shuffle(deck);
  memState = { cards:deck, flipped:[], moves:0, pairs:0, lock:false };
  renderMem();
}
function renderMem(){
  const grid = document.getElementById('memGrid');
  grid.innerHTML = '';
  memState.cards.forEach((c,idx)=>{
    const btn = document.createElement('button');
    btn.className = 'mem-tile';
    const isFlipped = memState.flipped.includes(idx) || c.matched;
    if(c.matched) btn.classList.add('matched');
    btn.innerHTML = isFlipped ? (c.type==='hand' ? handSVG(SIGNS[c.key]) : SIGNS[c.key].id) : '?';
    btn.onclick = ()=>flipMem(idx);
    grid.appendChild(btn);
  });
  document.getElementById('memMoves').textContent = 'Movimientos: '+memState.moves;
  document.getElementById('memPairs').textContent = 'Pares: '+memState.pairs+'/'+SIGNS.length;
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

/* ---------- Quiz ---------- */
let quizState = { current:null, score:0, total:0, best:0, answered:false };
try{ quizState.best = Number(localStorage.getItem('ajq_best')||0); }catch(e){}
function newQuestion(){
  const correct = SIGNS[Math.floor(Math.random()*SIGNS.length)];
  let opts = [correct.id];
  while(opts.length<4){
    const cand = SIGNS[Math.floor(Math.random()*SIGNS.length)].id;
    if(!opts.includes(cand)) opts.push(cand);
  }
  opts = shuffle(opts);
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
