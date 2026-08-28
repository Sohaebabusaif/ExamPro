(() => {
// ══════════════════════════════════════════════
//  CONSTANTS & STATE
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
//  DEVELOPER SIGNATURE — PROTECTED (PCX-12)
//  EduDesk Solutions | صهيب ابو سيف
// ══════════════════════════════════════════════
(function(){
  // _k يجب أن يكون أكبر من أعلى قيمة Unicode مستخدمة (0x64a=1610)
  // نستخدم 0xD00=3328 ليعطي فرقاً موجباً دائماً
  const _k=0xD00;
  // _s: القيم المشفّرة = _k - charCode الأصلي
  const _s=[0x6cb,0x6b9,0x6b6,0x6d8,0xce0,0x6d9,0x6d8,0x6b8,0xce0,0x6cd,0x6b6,0x6bf];
  const _d=_s.map(c=>String.fromCharCode(_k-c)).join('');
  // نتحقق باستخدام نفس المصفوفة (لا حاجة لـ fp منفصل)
  const _ok=_d.length===12&&_d.charCodeAt(0)===0x635;
  if(!_ok) return; // فشل التحقق — لا نوقف النظام، فقط نتجاهل
  // تثبيت الاسم محمياً (writable:false)
  try{Object.defineProperty(window,'_X_DEV',{value:_d,writable:false,configurable:false,enumerable:false});}catch(e){}
  try{Object.defineProperty(window,'DEV_CONST',{get:()=>_d,set:()=>{},configurable:false,enumerable:false});}catch(e){}
})();
const DEV = window._X_DEV || (()=>{const k=0xD00,s=[0x6cb,0x6b9,0x6b6,0x6d8,0xce0,0x6d9,0x6d8,0x6b8,0xce0,0x6cd,0x6b6,0x6bf];return s.map(c=>String.fromCharCode(k-c)).join('');})();

// ══════════════════════════════════════════════
//  INTEGRITY GUARDIAN — PCX-12
//  يحمي توقيع المطوّر من الحذف والتعديل
// ══════════════════════════════════════════════
(function _guardian(){
  const _enc=[0x635,0x647,0x64a,0x628,0x20,0x627,0x628,0x648,0x20,0x633,0x64a,0x641];
  const _name=_enc.map(c=>String.fromCharCode(c)).join('');
  const _label='EduDesk · PCX-12 · '+_enc.map(c=>'&#x'+c.toString(16)+';').join('');

  function _renderSig(){
    if(!document.body) return;
    let el=document.getElementById('_pcx_sig');
    if(!el){
      el=document.createElement('div');
      el.id='_pcx_sig';
      el.className='_dev_hidden';
      el.setAttribute('aria-hidden','true');
      el.setAttribute('data-v','2LXZh9mK2Kgg2KfYqNmIINiz2YrZgQ==');
      document.body.appendChild(el);
    }
    el.innerHTML=_label;
    // حماية ضد الحذف — نحاول مرة واحدة فقط (try/catch لمنع "Cannot redefine")
    try{Object.defineProperty(el,'remove',{value:()=>{},configurable:false,writable:false});}catch(e){}
  }

  function _init(){
    _renderSig();
    // MutationObserver يعيد الإدراج إذا حُذف العنصر
    try{
      const obs=new MutationObserver(()=>{if(!document.getElementById('_pcx_sig'))_renderSig();});
      obs.observe(document.body,{childList:true,subtree:false});
    }catch(e){}
    // التوقيع في صفحة البداية
    const sd=document.getElementById('_splash_dev_el');
    if(sd) sd.innerHTML='EduDesk Solutions &middot; PCX-12 &middot; <span style="letter-spacing:1px;opacity:.55">'+_label+'</span>';
    // توقيع مخفي في cert footer
    const cf=document.querySelector('.cert-footer');
    if(cf&&!cf.querySelector('[data-author]')){
      const sp=document.createElement('span');
      sp.style.cssText='position:absolute;opacity:0;font-size:0;pointer-events:none;user-select:none';
      sp.setAttribute('data-author',_name);
      sp.className='_dev_hidden no-print';
      cf.style.position='relative';
      cf.appendChild(sp);
    }
  }

  // انتظر اكتمال DOM قبل أي عملية
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',_init);
  else _init();

  // فحص دوري كل 10 ثوانٍ
  setInterval(()=>{
    if(document.body&&!document.getElementById('_pcx_sig')) _renderSig();
    try{
      const m=document.querySelector('meta[name="author"]');
      if(m&&m.getAttribute('data-dev')!==_name) m.setAttribute('data-dev',_name);
    }catch(e){}
  },10000);
})();
const LS_CFG = 'ep4_cfg'; const LS_Q = 'ep4_q_enc'; const LS_SES = 'ep4_ses';
const LS_RES = 'ep4_results'; 
const LETTERS = ['أ','ب','ج','د'];

let CFG = {
  schoolName:'', teacherName: DEV, subjectName:'امتحان نهائي', examTitle:'الامتحان الإلكتروني',
  logo: null, timerMins: 30, noTimer: false,
  displayCount: 20, 
  calcMode: 'total', 
  totalExamMark: 100, 
  markPerQ: 5,        
  passPct: 50,
  shuffleQ: true, shuffleO: true, autoAdvance: false, allowBack: true,
  showCorrectLive: false, showReview: true, allowFlag: true, allowRetry: true,
  negativeMarking: false, negativePenalty: 0.25, 
  preventLeave: true, forceFS: true, mouseWarn: true,
  noRight: true, noDevTools: true, autoSS: true, cheatLimit: 3,
  warn30: true, warn15: true, warn10: true, warn5: true, warn1: true,
  // ── Advanced Proctoring Settings ──
  enableWebcam: true, enableFaceTracking: true, enableMic: true,
  enableWatermark: true, enableExtBlocker: true, snapInterval: 60,
  passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
};

// ── Proctoring State ──
const PROCTOR = {
  snapshots: [], cheatEvents: [], faceAlerts: 0, noiseAlerts: 0, extAlerts: 0,
  webcamStream: null, micStream: null, audioCtxP: null, micAnalyser: null,
  snapIV: null, faceIV: null, noiseIV: null, wmIV: null, extObserver: null,
  faceApiReady: false, cheatWarnCooldown: false, faceAlertCooldown: 0
};

let QUESTIONS = [];
let RESULTS_ARCHIVE = [];
let EXAM_QS = [], ANSWERS = [], FLAGS = [], CURRENT = 0;
let CONFIDENCE = []; // FIXED BUG: Added Confidence Array
let STUDENT = {name:'', cls:'', section:''};
let TIMER_IV = null, TIME_LEFT = 0, TIME_SPENT = 0;
let EXAM_ACTIVE = false, CHEAT_COUNT = 0;
let EDITING_IDX = -1;
let WARNED_MINS = new Set();
let AUTO_SAVE_IV = null;
let CURRENT_Q_IMG = null;

// Base64 Helpers for local encryption/obfuscation
const SECRET_KEY = "EdU_D3sk_S3cr3t_2026!";
function encodeData(str) { return CryptoJS.AES.encrypt(str, SECRET_KEY).toString(); }
function decodeData(str) { try { const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY); return bytes.toString(CryptoJS.enc.Utf8); } catch(e) { return null; } }

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function normalizeArabic(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/[أإآا]/g, 'ا')
             .replace(/[يى]/g, 'ي')
             .replace(/[ةه]/g, 'ه')
             .replace(/ـ/g, '')
             .replace(/\s+/g, ' ')
             .trim();
}

// ══════════════════════════════════════════════
//  INDEXED-DB ENGINE
// ══════════════════════════════════════════════
const DB_NAME = 'ExamPro_DB';
const DB_VER = 1;
function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if(!db.objectStoreNames.contains('store')) db.createObjectStore('store');
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = () => reject();
  });
}
async function idbSet(k, v) {
  try {
    const db = await initDB();
    return new Promise(r => { const tx = db.transaction('store','readwrite'); tx.objectStore('store').put(v, k); tx.oncomplete = r; });
  } catch(e) { console.error('IDB Set Error', e); }
}
async function idbGet(k) {
  try {
    const db = await initDB();
    return new Promise(r => { const tx = db.transaction('store','readonly'); const req = tx.objectStore('store').get(k); req.onsuccess = ()=>r(req.result); req.onerror = ()=>r(null); });
  } catch(e) { return null; }
}
async function idbRemove(k) {
  try {
    const db = await initDB();
    return new Promise(r => { const tx = db.transaction('store','readwrite'); tx.objectStore('store').delete(k); tx.oncomplete = r; });
  } catch(e) {}
}

// ══════════════════════════════════════════════
//  INIT & STORAGE
// ══════════════════════════════════════════════
async function init() {
  // --- Migration from LocalStorage ---
  try {
    if (localStorage.getItem(LS_Q) && !(await idbGet(LS_Q))) {
      await idbSet(LS_CFG, JSON.parse(localStorage.getItem(LS_CFG)||'{}'));
      const oldQ = localStorage.getItem(LS_Q) || localStorage.getItem('ep4_q');
      if (oldQ) {
         if (oldQ.startsWith('[')) await idbSet(LS_Q, JSON.parse(oldQ)); 
         else await idbSet(LS_Q, JSON.parse(decodeData(oldQ))); 
      }
      await idbSet(LS_RES, JSON.parse(localStorage.getItem(LS_RES)||'[]'));
      const oldSes = localStorage.getItem(LS_SES); if (oldSes) await idbSet(LS_SES, JSON.parse(oldSes));
    }
  } catch(e) {}
  
  // --- Load from IDB ---
  const cfg = await idbGet(LS_CFG); if(cfg) CFG = {...CFG, ...cfg};
  const qs = await idbGet(LS_Q); if(qs) QUESTIONS = qs;
  const res = await idbGet(LS_RES); if(res) RESULTS_ARCHIVE = res;

  if(CFG.showConfidence === undefined) CFG.showConfidence = false;
  if(CFG.allowRetry === undefined) CFG.allowRetry = true;
  if(CFG.negativeMarking === undefined) CFG.negativeMarking = false;
  if(CFG.negativePenalty === undefined) CFG.negativePenalty = 0.25;
  if(CFG.calcMode === undefined) CFG.calcMode = 'total';
  if(CFG.totalExamMark === undefined) CFG.totalExamMark = 100;
  // Proctoring defaults
  if(CFG.enableWebcam      === undefined) CFG.enableWebcam      = true;
  if(CFG.enableFaceTracking=== undefined) CFG.enableFaceTracking= true;
  if(CFG.enableMic         === undefined) CFG.enableMic         = true;
  if(CFG.enableWatermark   === undefined) CFG.enableWatermark   = true;
  if(CFG.enableExtBlocker  === undefined) CFG.enableExtBlocker  = true;
  if(CFG.snapInterval      === undefined) CFG.snapInterval      = 60;
  
  if(CFG.themeColor) {
    document.documentElement.style.setProperty('--blue', CFG.themeColor);
    document.documentElement.style.setProperty('--blue2', CFG.themeColor);
  }
  
  applyLogoEverywhere(CFG.logo);
  updateSplash();
  await checkResume();
  showScreen('s-splash');
}

async function trySave(key, data, successMsg) {
  try {
    await idbSet(key, data);
    if(successMsg) showToast(successMsg, 'success');
  } catch (e) {
    showToast('⚠️ خطأ في الحفظ بقاعدة البيانات.', 'error');
  }
}

async function saveToStorage() { await trySave(LS_CFG, CFG); }
async function saveQToStorage() { await trySave(LS_Q, QUESTIONS); }
async function saveResultsToStorage() { await trySave(LS_RES, RESULTS_ARCHIVE); }
async function saveSession() {
  if (!EXAM_ACTIVE) return;
  await trySave(LS_SES, {
    student: STUDENT, qs: EXAM_QS, ans: ANSWERS, flags: FLAGS, conf: CONFIDENCE,
    cur: CURRENT, timeLeft: TIME_LEFT, timeSpent: TIME_SPENT,
    warned: [...WARNED_MINS],
    markPerQ: CFG.markPerQ,
    totalExamMark: CFG.totalExamMark
  });
}

async function checkResume() {
  const d = await idbGet(LS_SES);
  if (!d) {
    const gearBtn = document.getElementById('gear-btn');
    if (gearBtn) gearBtn.style.display = 'flex';
    return;
  }
  
  // Hide settings if an exam is active
  const gearBtn = document.getElementById('gear-btn');
  if (gearBtn) gearBtn.style.display = 'none';
  
  try {
    const rb = document.getElementById('splash-resume');
    rb.innerHTML = `<div class="resume-bar">
      <div class="rb-icon">⚠️</div>
      <div class="rb-text">امتحان محفوظ للطالب: <span class="rb-name">${d.student?.name||''}</span></div>
      <div class="rb-btns">
        <button type="button" class="rb-btn resume" onclick="resumeExam()">▶ إكمال</button>
        <button type="button" class="rb-btn cancel" onclick="clearResume()">✕</button>
      </div>
    </div>`;
  } catch(e) {}
}

async function resumeExam() {
  const d = await idbGet(LS_SES);
  if (!d) return;
  STUDENT = d.student;
  EXAM_QS = d.qs; ANSWERS = d.ans; FLAGS = d.flags;
  CONFIDENCE = d.conf || new Array(EXAM_QS.length).fill(null);
  CURRENT = d.cur; TIME_LEFT = d.timeLeft; TIME_SPENT = d.timeSpent;
  WARNED_MINS = new Set(d.warned || []);
  CFG.markPerQ = d.markPerQ || CFG.markPerQ;
  CFG.totalExamMark = d.totalExamMark || CFG.totalExamMark;
  CHEAT_COUNT = 0; EXAM_ACTIVE = true;
  
  // لضمان الحماية، نقوم بتفريغ الذاكرة مجدداً في حال الإكمال
  QUESTIONS = [];

  setupExamHeader();
  startTimer();
  setupAntiCheat();
  renderQuestion();
  showScreen('s-exam');
  tryFullscreen();
  clearInterval(AUTO_SAVE_IV);
  AUTO_SAVE_IV = setInterval(saveSession, 5000);
}

async function clearResume() {
  await idbRemove(LS_SES);
  document.getElementById('splash-resume').innerHTML = '';
  const gearBtn = document.getElementById('gear-btn');
  if (gearBtn) gearBtn.style.display = 'flex';
}

// ══════════════════════════════════════════════
//  SCREEN NAVIGATION
// ══════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 's-questions') renderQList();
  if (id === 's-settings') { 
    document.getElementById('s-calc-mode').value = CFG.calcMode || 'total';
    document.getElementById('s-total-exam-mark').value = CFG.totalExamMark || 100;
    document.getElementById('s-calc-mark-per-q').value = CFG.markPerQ || 5;
    toggleCalcMode();
    renderResultsArchive(); 
  }
}
function goSplash() { 
  updateSplash(); 
  showScreen('s-splash'); 
  checkResume(); // Will hide gear if session exists, else show it
}

function goStudent() {
  if (!QUESTIONS.length) { showToast('⚠️ لا توجد أسئلة في البنك! أضف أسئلة أولاً', 'error'); return; }
  // Hide gear when starting
  const gearBtn = document.getElementById('gear-btn');
  if (gearBtn) gearBtn.style.display = 'none';
  
  updateStudentCard();
  showScreen('s-student');
  setTimeout(() => document.getElementById('inp-name').focus(), 200);
}

// ══════════════════════════════════════════════
//  UPDATE UIs
// ══════════════════════════════════════════════
function updateSplash() {
  const el = id => document.getElementById(id);
  const sr = el('splash-ring');
  if (CFG.logo) sr.innerHTML = `<img src="${CFG.logo}" alt="شعار">`;
  else sr.innerHTML = '<span class="logo-icon">🏫</span>';
  el('splash-school').textContent = CFG.schoolName || '';
  el('splash-teacher').textContent = CFG.teacherName ? `المعلم: ${CFG.teacherName}` : DEV;
  el('splash-subject').textContent = CFG.subjectName || '';
  
  let totalQ = 1;
  if (CFG.displayCount === 'all' || !CFG.smartPooling) {
    totalQ = (CFG.displayCount === 'all' ? QUESTIONS.length : Math.min(parseInt(CFG.displayCount)||20, QUESTIONS.length)) || 1;
  } else {
    // محاكاة السحب الذكي لضمان دقة عدد الأسئلة في شاشة الترحيب
    const cats = {};
    QUESTIONS.forEach(q => { const c = q.category || 'بدون تصنيف'; if(!cats[c]) cats[c]=[]; cats[c].push(q); });
    const catKeys = Object.keys(cats);
    const cnt = Math.min(parseInt(CFG.displayCount)||20, QUESTIONS.length);
    let picked = 0;
    while(picked < cnt) {
       let addedInRound = false;
       for(let k of catKeys) {
          if (picked >= cnt) break;
          if (cats[k].length > 0) {
             cats[k].pop();
             picked++;
             addedInRound = true;
          }
       }
       if (!addedInRound) break; 
    }
    totalQ = picked || 1;
  }

  let totalMark = 0;
  if (CFG.calcMode === 'total') {
    totalMark = CFG.totalExamMark || 100;
  } else {
    totalMark = Math.round((totalQ * (CFG.markPerQ || 1)) * 100) / 100;
  }
  const passMark = Math.round(((CFG.passPct / 100) * totalMark) * 100) / 100;
  
  el('splash-chips').innerHTML = `
    <span class="info-chip blue"><i class="fas fa-question-circle"></i>${totalQ} سؤال</span>
    <span class="info-chip gold"><i class="fas fa-star"></i>العلامة: ${totalMark}</span>
    <span class="info-chip green"><i class="fas fa-check-circle"></i>النجاح: ${passMark} (${CFG.passPct}%)</span>
    <span class="info-chip red"><i class="fas fa-stopwatch"></i>${CFG.noTimer ? 'بدون توقيت' : CFG.timerMins + ' دقيقة'}</span>
  `;
}
function updateStudentCard() {
  const el = id => document.getElementById(id);
  const lr = el('sc-logo-ring');
  if (CFG.logo) lr.innerHTML = `<img src="${CFG.logo}" alt="شعار">`;
  else lr.innerHTML = '<span style="font-size:28px">🏫</span>';
  el('sc-school').textContent = CFG.schoolName || '';
  el('sc-exam-title').textContent = CFG.examTitle || 'بيانات الطالب';
  let meta = [];
  if (CFG.teacherName) meta.push('المعلم: ' + CFG.teacherName);
  if (CFG.subjectName) meta.push(CFG.subjectName);
  el('sc-meta').textContent = meta.join(' | ');
}
function applyLogoEverywhere(b64) {
  ['splash-ring','sc-logo-ring','etb-logo','cert-logo-box','logo-preview-el'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'logo-preview-el') {
      el.innerHTML = b64 ? `<img src="${b64}" alt="شعار">` : '<span style="font-size:24px">🏫</span>';
    } else if (id === 'etb-logo') {
      el.innerHTML = b64 ? `<img src="${b64}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px">` : '<span style="font-size:16px">🏫</span>';
    } else if (id === 'cert-logo-box') {
      el.innerHTML = b64 ? `<img src="${b64}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:16px">` : '<span style="font-size:26px">🏫</span>';
    } else if (id === 'splash-ring') {
      el.innerHTML = b64 ? `<img src="${b64}" alt="" style="position:relative;z-index:1;width:100%;height:100%;object-fit:cover;border-radius:50%">` : '<span class="logo-icon" style="position:relative;z-index:1">🏫</span>';
    } else if (id === 'sc-logo-ring') {
      el.innerHTML = b64 ? `<img src="${b64}" alt="">` : '<span style="font-size:28px">🏫</span>';
    }
  });
}

// ══════════════════════════════════════════════
//  BEGIN EXAM
// ══════════════════════════════════════════════
function beginExam() {
  const name = document.getElementById('inp-name').value.trim();
  const cls = document.getElementById('inp-class').value.trim();
  const sec = document.getElementById('inp-section').value.trim();
  if (!name) { showToast('⚠️ أدخل اسم الطالب', 'error'); return; }
  if (!cls) { showToast('⚠️ أدخل الصف', 'error'); return; }
  if (!sec) { showToast('⚠️ أدخل رقم الشعبة', 'error'); return; }
  STUDENT = {name, cls, section: sec};
  
  // حساب الأسئلة والعلامات مسبقاً للعرض في التعليمات
  let pool = JSON.parse(JSON.stringify(QUESTIONS));
  let finalPool = [];
  
  if (CFG.smartPooling && CFG.displayCount !== 'all') {
    // السحب العشوائي الموزون حسب الفئات
    const cats = {};
    pool.forEach(q => { const c = q.category || 'بدون تصنيف'; if(!cats[c]) cats[c]=[]; cats[c].push(q); });
    const catKeys = Object.keys(cats);
    if (CFG.shuffleQ) catKeys.forEach(k => cats[k] = shuffleArr(cats[k]));
    
    const cnt = Math.min(parseInt(CFG.displayCount)||20, pool.length);
    let picked = 0;
    while(picked < cnt) {
       let addedInRound = false;
       for(let k of catKeys) {
          if (picked >= cnt) break;
          if (cats[k].length > 0) {
             finalPool.push(cats[k].pop());
             picked++;
             addedInRound = true;
          }
       }
       if (!addedInRound) break; // no more questions left in any category
    }
  } else {
    finalPool = pool;
  }
  
  if (CFG.shuffleQ) finalPool = shuffleArr(finalPool);
  if (CFG.shuffleO) finalPool.forEach(q => q.options = shuffleArr(q.options));
  
  const cnt = CFG.displayCount === 'all' ? finalPool.length : Math.min(parseInt(CFG.displayCount)||20, finalPool.length);
  EXAM_QS = finalPool.slice(0, cnt);
  if (EXAM_QS.length > 0) {
    if (CFG.calcMode === 'total') CFG.markPerQ = CFG.totalExamMark / EXAM_QS.length;
    else CFG.totalExamMark = CFG.markPerQ * EXAM_QS.length;
  }

  // ── عرض شاشة التعليمات ──
  showInstructionsScreen();
}

function showInstructionsScreen() {
  // تحديث معلومات الطالب
  document.getElementById('inst-student-name').textContent = STUDENT.name + ' | ' + STUDENT.cls + ' | شعبة ' + STUDENT.section;

  // الشعار
  const logoBox = document.getElementById('inst-logo-box');
  if (CFG.logo) logoBox.innerHTML = `<img src="${CFG.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;

  // إحصائيات الامتحان
  const totalMark = Math.round(CFG.totalExamMark * 100) / 100;
  const passMark  = Math.round(((CFG.passPct / 100) * totalMark) * 100) / 100;
  document.getElementById('inst-q-count').textContent    = EXAM_QS.length;
  document.getElementById('inst-time-val').textContent   = CFG.noTimer ? '∞' : CFG.timerMins + 'د';
  document.getElementById('inst-total-mark').textContent = totalMark;
  document.getElementById('inst-pass-mark').textContent  = passMark + ' (' + CFG.passPct + '%)';

  // قائمة القواعد الديناميكية
  const rules = [
    { icon: '🕐', cls: 'gold',   title: 'الوقت',         body: CFG.noTimer ? 'الامتحان مفتوح بدون قيد زمني.' : `مدة الامتحان <strong>${CFG.timerMins} دقيقة</strong>. يبدأ العدّ التنازلي فور الضغط على زر البدء.` },
    { icon: '📝', cls: 'blue',   title: 'الأسئلة',       body: `يتألف الامتحان من <strong>${EXAM_QS.length} سؤال</strong> — علامة كل سؤال: <strong>${Math.round(CFG.markPerQ*100)/100}</strong> — المجموع الكلي: <strong>${totalMark}</strong>.` },
    { icon: '🎯', cls: 'green',  title: 'شرط النجاح',    body: `الحد الأدنى للنجاح: <strong>${passMark} نقطة (${CFG.passPct}%)</strong> من إجمالي العلامات.` },
    { icon: '🔀', cls: 'purple', title: 'الترتيب',        body: (CFG.shuffleQ ? 'ترتيب الأسئلة عشوائي' : 'ترتيب الأسئلة ثابت') + (CFG.shuffleO ? ' — الخيارات مختلطة.' : '.') },
    { icon: CFG.allowBack ? '↩' : '⛔', cls: CFG.allowBack ? 'blue' : 'red', title: 'التنقل', body: CFG.allowBack ? 'يمكنك الرجوع للأسئلة السابقة وتغيير الإجابة.' : 'لا يمكنك الرجوع. اختر بعناية قبل المتابعة.' },
    { icon: '💾', cls: 'green',  title: 'الحفظ التلقائي', body: 'إجاباتك تُحفظ تلقائياً كل 5 ثوانٍ. في حال انقطع الاتصال يمكنك الاستئناف من نفس الجهاز.' },
    { icon: '⚠️', cls: 'red',    title: 'الغش محظور',     body: `أي محاولة للغش تُسجَّل. الحد المسموح: <strong>${CFG.cheatLimit} تحذير</strong> قبل التسليم التلقائي.` },
  ];
  if (CFG.negativeMarking) rules.push({ icon: '⛔', cls: 'red', title: 'خصم العلامات', body: `الإجابة الخاطئة تُخصم منها <strong>${CFG.negativePenalty * 100}%</strong> من علامة السؤال.` });
  if (CFG.autoAdvance) rules.push({ icon: '⚡', cls: 'gold', title: 'انتقال تلقائي', body: 'ستنتقل تلقائياً للسؤال التالي فور اختيار إجابة.' });

  document.getElementById('inst-rules-list').innerHTML = rules.map(r => `
    <div class="inst-rule">
      <div class="inst-rule-icon ${r.cls}">${r.icon}</div>
      <div class="inst-rule-text"><strong>${r.title}</strong><span>${r.body}</span></div>
    </div>`).join('');

  // بطاقة المراقبة
  const procItems = [
    { icon: '📷', label: 'كاميرا', en: CFG.enableWebcam },
    { icon: '🤖', label: 'كشف الوجه', en: CFG.enableFaceTracking && CFG.enableWebcam },
    { icon: '🎤', label: 'ميكروفون', en: CFG.enableMic },
    { icon: '💧', label: 'علامة مائية', en: CFG.enableWatermark },
    { icon: '🛡', label: 'حماية DOM', en: CFG.enableExtBlocker },
    { icon: '🔒', label: 'حظر النسخ', en: CFG.preventLeave },
  ];
  const hasAnyProctor = procItems.some(p => p.en);
  document.getElementById('inst-proctor-card').style.display = hasAnyProctor ? '' : 'none';
  document.getElementById('inst-proctor-grid').innerHTML = procItems.map(p => `
    <div class="inst-proctor-item${p.en ? '' : ' off'}">
      <div class="inst-proctor-icon">${p.icon}</div>
      <div class="inst-proctor-label">${p.label}</div>
      <div class="inst-proctor-status ${p.en ? 'on' : 'off'}">${p.en ? '● مفعّل' : '○ معطّل'}</div>
    </div>`).join('');

  // إعادة تعيين مربع الموافقة
  document.getElementById('inst-agree-cb').checked = false;
  document.getElementById('btn-inst-start').disabled = true;

  showScreen('s-instructions');
}

function actuallyStartExam() {
  ANSWERS = []; FLAGS = []; CURRENT = 0; TIME_SPENT = 0; CHEAT_COUNT = 0; EXAM_ACTIVE = true; WARNED_MINS = new Set();
  ANSWERS = new Array(EXAM_QS.length).fill(null);
  FLAGS = new Array(EXAM_QS.length).fill(false);
  CONFIDENCE = new Array(EXAM_QS.length).fill(null);
  TIME_LEFT = CFG.noTimer ? 999999 : CFG.timerMins * 60;

  // تنظيف الذاكرة المباشر (Anti-Cheat Memory Wipe)
  EXAM_QS.forEach(q => {
     delete q.correct;
     delete q.explanation;
  });
  QUESTIONS = []; // تدمير بنك الأسئلة من الذاكرة الحية


  // إعادة تعيين حالة المراقبة
  PROCTOR.snapshots = []; PROCTOR.cheatEvents = []; PROCTOR.faceAlerts = 0;
  PROCTOR.noiseAlerts = 0; PROCTOR.extAlerts = 0; PROCTOR.cheatWarnCooldown = false; PROCTOR.faceAlertCooldown = 0;

  setupExamHeader();
  renderQuestion();
  startTimer();
  setupAntiCheat();
  setupKeyboardNav();
  showScreen('s-exam');
  tryFullscreen();
  clearInterval(AUTO_SAVE_IV);
  AUTO_SAVE_IV = setInterval(saveSession, 5000);

  // تشغيل أنظمة المراقبة المتقدمة
  if (CFG.enableWebcam) startProctoringWebcam();
  if (CFG.enableMic)    startProctoringMic();
  if (CFG.enableWatermark) startProctoringWatermark();
  if (CFG.enableExtBlocker) startExtBlocker();
}

function setupExamHeader() {
  document.getElementById('etb-exam-name').textContent = CFG.examTitle || CFG.subjectName || 'الامتحان';
  document.getElementById('etb-student').textContent = `${STUDENT.name} | ${STUDENT.cls} | الشعبة ${STUDENT.section}`;
  if (CFG.logo) {
    document.getElementById('etb-logo').innerHTML = `<img src="${CFG.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:10px">`;
  }
  document.getElementById('btn-grid').style.display = CFG.allowBack ? '' : 'none';
  if (CFG.noTimer) document.getElementById('timer-widget').style.display = 'none';
}

// ══════════════════════════════════════════════
//  RENDER QUESTION
// ══════════════════════════════════════════════
function renderQuestion() {
  const q = EXAM_QS[CURRENT];
  if (!q) return;
  const answered = ANSWERS[CURRENT] !== null;
  document.getElementById('q-cur').textContent = CURRENT + 1;
  document.getElementById('q-tot').textContent = EXAM_QS.length;
  const pct = (CURRENT / EXAM_QS.length) * 100;
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('footer-prog').style.width = pct + '%';
    const answeredCountP = ANSWERS.filter(a => a !== null).length;
    if (document.getElementById('exam-progress-el')) document.getElementById('exam-progress-el').style.width = ((answeredCountP / Math.max(1, EXAM_QS.length)) * 100) + '%';
  // Update answered counter
  const answeredCount = ANSWERS.filter(a => a !== null).length;
  const cv = document.getElementById('ans-count-val');
  const ct = document.getElementById('ans-count-tot');
  if (cv) cv.textContent = answeredCount;
  if (ct) ct.textContent = EXAM_QS.length;
  
  document.getElementById('btn-prev').disabled = !CFG.allowBack || CURRENT === 0;
  const isLast = CURRENT === EXAM_QS.length - 1;
  document.getElementById('btn-next').style.display = isLast ? 'none' : '';
  document.getElementById('btn-submit-top').style.display = isLast ? '' : 'none';
  
  const markVal = Math.round(CFG.markPerQ * 100) / 100; 
  
  let optHtml = '';
  if (q.type === 'short') {
    const val = ANSWERS[CURRENT] || '';
    optHtml = `
      <div style="margin-top:20px; text-align:right;">
        <label style="font-weight:700;margin-bottom:8px;display:block;color:var(--text2)">اكتب إجابتك هنا:</label>
        <input type="text" value="${escHtml(val)}" oninput="handleShortAnsInput(this.value)" class="s-input" style="width:100%;font-size:1.1rem;padding:12px;text-align:right;">
      </div>
    `;
  } else {
    q.options.forEach((opt, i) => {
      let cls = 'opt-btn';
      let icon = '';
      const isMsq = q.type === 'msq';
      let isMine = false;

      if (answered && ANSWERS[CURRENT] !== null) {
        if (isMsq) {
           if (Array.isArray(ANSWERS[CURRENT]) && ANSWERS[CURRENT].includes(opt)) { isMine = true; }
        } else {
           if (ANSWERS[CURRENT] === opt) { isMine = true; }
        }
      }
      
      if (isMine) {
          cls += ' selected';
          icon = ''; 
      }
      
      optHtml += `<button type="button" class="${cls}" onclick="selectOption('${escHtml(opt)}', ${isMsq})"><i class="${isMsq ? (isMine?'fas fa-check-square':'far fa-square') : 'fas fa-check-circle'} opt-btn-check"></i>
        ${q.type === 'tf' ? '' : `<div class="opt-letter">${LETTERS[i]}</div>`}
        <span style="flex:1">${escHtml(opt)}</span>
        ${icon}
      </button>`;
    });
  }

  const imgHtml = q.image ? `<div class="q-image-container"><img src="${q.image}" alt="صورة السؤال"></div>` : '';
  
  // UI for confidence levels
  const cVal = CONFIDENCE[CURRENT];
  const confHtml = `<div class="confidence-row">
      <div class="conf-label">ما مدى ثقتك بإجابتك؟</div>
      <div style="display:flex;gap:8px;flex:1;">
        <button type="button" class="conf-btn sure ${cVal === 'sure' ? 'active' : ''}" onclick="setConfidence('sure')">متأكد ✅</button>
        <button type="button" class="conf-btn unsure ${cVal === 'unsure' ? 'active' : ''}" onclick="setConfidence('unsure')">غير متأكد 🤔</button>
        <button type="button" class="conf-btn guess ${cVal === 'guess' ? 'active' : ''}" onclick="setConfidence('guess')">تخمين 🎲</button>
      </div>
    </div>`;

  const card = document.getElementById('q-card');
  const diffBadge = q.difficulty ? ({'easy':'<span style="font-size:.7rem;font-weight:800;color:var(--green2);border:1px solid rgba(16,185,129,.3);border-radius:6px;padding:2px 8px">🟢 سهل</span>','medium':'<span style="font-size:.7rem;font-weight:800;color:var(--gold);border:1px solid rgba(245,158,11,.3);border-radius:6px;padding:2px 8px">🟡 متوسط</span>','hard':'<span style="font-size:.7rem;font-weight:800;color:var(--red2);border:1px solid rgba(239,68,68,.3);border-radius:6px;padding:2px 8px">🔴 صعب</span>'}[q.difficulty]||'') : '';
  const catTag = q.category ? `<span style="font-size:.7rem;color:var(--cyan);border:1px solid rgba(6,182,212,.25);border-radius:6px;padding:2px 8px">${escHtml(q.category)}</span>` : '';
  
  card.innerHTML = `
    <div class="q-meta-row">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <div class="q-badge">السؤال <span class="qb-num">${CURRENT + 1}</span> من ${EXAM_QS.length}</div>
        ${diffBadge}${catTag}
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        ${CFG.allowFlag ? `<button type="button" class="flag-btn ${FLAGS[CURRENT] ? 'flagged' : ''}" onclick="toggleFlag()" id="flag-btn-el">
          <i class="${FLAGS[CURRENT] ? 'fas' : 'far'} fa-flag"></i>
          <span>${FLAGS[CURRENT] ? 'محدد للمراجعة' : 'للمراجعة'}</span>
        </button>` : ''}
        <div class="mark-pill"><i class="fas fa-star" style="font-size:.7rem"></i>${markVal} نقطة</div>
      </div>
    </div>
    ${imgHtml}
    <div class="q-text">${escHtml(q.text)}</div>
    <div class="opts-grid">${optHtml}</div>
    ${(answered && CFG.showConfidence) ? confHtml : ''}
  `;

  requestAnimationFrame(() => {
    // Only animate if it's a newly navigated question to prevent screen shaking
    if (window._lastRenderedQ !== CURRENT) {
        card.style.animation = 'none';
        card.classList.remove('anim-up');
        void card.offsetWidth;
        card.style.animation = '';
        card.classList.add('anim-up');
        window._lastRenderedQ = CURRENT;
    }
    card.classList.remove('has-answer','has-flag');
    if (ANSWERS[CURRENT] !== null) card.classList.add('has-answer');
    if (FLAGS[CURRENT]) card.classList.add('has-flag');
  });
}

function selectOption(val, isMsq = false) {
  if (CFG.showCorrectLive && ANSWERS[CURRENT] !== null) return; // Only lock if live correct is shown
  
  if (isMsq) {
     if (!Array.isArray(ANSWERS[CURRENT])) ANSWERS[CURRENT] = [];
     const idx = ANSWERS[CURRENT].indexOf(val);
     if (idx >= 0) ANSWERS[CURRENT].splice(idx, 1);
     else ANSWERS[CURRENT].push(val);
     renderQuestion();
     return;
  }

  if (ANSWERS[CURRENT] === val) return; // do nothing if clicked the same option
  
  ANSWERS[CURRENT] = val;
  renderQuestion();
  
  if (CFG.autoAdvance && CURRENT < EXAM_QS.length - 1) {
    setTimeout(() => { CURRENT++; renderQuestion(); }, 400);
  }
}

function handleShortAnsInput(val) {
   ANSWERS[CURRENT] = val.trim();
   // Do not re-render to avoid losing focus
}

function setConfidence(val) {
  CONFIDENCE[CURRENT] = val;
  renderQuestion();
}

function nextQ() { if (CURRENT < EXAM_QS.length - 1) { CURRENT++; renderQuestion(); } }
function prevQ() { if (CFG.allowBack && CURRENT > 0) { CURRENT--; renderQuestion(); } }
function toggleFlag() { FLAGS[CURRENT] = !FLAGS[CURRENT]; renderQuestion(); }

function setupKeyboardNav() {
  document.addEventListener('keydown', function examKeyNav(e) {
    if (!EXAM_ACTIVE) { document.removeEventListener('keydown', examKeyNav); return; }
    if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      if (e.key === 'ArrowLeft' && !document.getElementById('btn-next')?.style.display?.includes('none')) nextQ();
      if (e.key === 'ArrowRight' && CFG.allowBack) prevQ();
      e.preventDefault();
    }
    if (['1','2','3','4'].includes(e.key)) {
      const idx = parseInt(e.key) - 1;
      const q = EXAM_QS[CURRENT];
      if (q && q.options[idx] !== undefined) {
        selectOption(q.options[idx]); // Allow changing even via keyboard
      }
    }
    if (e.key === 'f' || e.key === 'F') toggleFlag();
  });
}

// ══════════════════════════════════════════════
//  TIMER
// ══════════════════════════════════════════════
function startTimer() {
  clearInterval(TIMER_IV);
  if (CFG.noTimer) { document.getElementById('timer-widget').style.display = 'none'; return; }
  updateTimerDisplay();
  TIMER_IV = setInterval(() => {
    if (!EXAM_ACTIVE) return;
    TIME_LEFT--; TIME_SPENT++;
    updateTimerDisplay();
    checkTimeWarnings();
    if (TIME_LEFT <= 0) { clearInterval(TIMER_IV); autoSubmit(); }
  }, 1000);
}
function updateTimerDisplay() {
  const h = Math.floor(TIME_LEFT / 3600);
  const m = Math.floor((TIME_LEFT % 3600) / 60);
  const s = TIME_LEFT % 60;
  const disp = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  const el = document.getElementById('timer-val');
  el.textContent = disp;
  if (TIME_LEFT <= 60) { el.className = 'timer-val urgent'; }
  else if (TIME_LEFT <= 300) { el.className = 'timer-val warn'; }
  else { el.className = 'timer-val'; }
}
function checkTimeWarnings() {
  const total = CFG.noTimer ? 999999 : CFG.timerMins * 60;
  if (TIME_LEFT > total * 0.96) return; 
  const mins = Math.floor(TIME_LEFT / 60);
  const warns = [
    {m: 30, key: 'warn30', lvl: 'normal'},
    {m: 15, key: 'warn15', lvl: 'normal'},
    {m: 10, key: 'warn10', lvl: 'normal'},
    {m: 5, key: 'warn5', lvl: 'danger'},
    {m: 3, key: null, lvl: 'danger'},
    {m: 1, key: 'warn1', lvl: 'danger'},
  ];
  warns.forEach(w => {
    if (mins === w.m && !WARNED_MINS.has(w.m) && (w.key === null || CFG[w.key])) {
      WARNED_MINS.add(w.m);
      showTimeWarn(w.m, w.lvl);
      playBeep(w.lvl === 'danger' ? 3 : 1);
    }
  });
}
function showTimeWarn(mins, lvl) {
  const msg = mins <= 1 ? '⚠️ تبقى دقيقة واحدة فقط!' : mins <= 5 ? `🚨 تبقى ${mins} دقائق!` : `⏱ تنبيه: تبقى ${mins} دقيقة`;
  const sub = mins <= 3 ? 'أسرع في الإجابة!' : 'راجع إجاباتك';
  const exist = document.querySelector('.time-warn-popup');
  if (exist) exist.remove();
  const el = document.createElement('div');
  el.className = `time-warn-popup warn-${lvl === 'danger' ? 'danger' : 'normal'}`;
  el.innerHTML = `<div class="twp-icon">${mins <= 3 ? '🚨' : '⏱'}</div><div class="twp-text">${msg}<small>${sub}</small></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}
function playBeep(times = 1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < times; i++) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = times > 1 ? 880 : 660;
      g.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.4 + 0.25);
      o.start(ctx.currentTime + i * 0.4); o.stop(ctx.currentTime + i * 0.4 + 0.3);
    }
  } catch(e) {}
}
function autoSubmit() { showToast('⏰ انتهى الوقت! جاري التسليم التلقائي...', 'warning'); setTimeout(submitExam, 2000); }

// ══════════════════════════════════════════════
//  SUBMIT
// ══════════════════════════════════════════════
function confirmSubmit() {
  const unanswered = ANSWERS.filter(a => a === null).length;
  const flagged = FLAGS.filter(f => f).length;
  
  const un = [], fl = [];
  let html = '';
  EXAM_QS.forEach((q, i) => {
    const ans = ANSWERS[i], flag = FLAGS[i];
    const none = ans === null;
    if (none) un.push(i+1);
    if (flag) fl.push(i+1);
    
    // Better UI for items
    const sCls = none ? 'empty' : (flag ? 'flag' : 'done');
    const sTxt = none ? '⬜ لم يُجَب' : (flag ? '🚩 مراجعة' : '✅ مجاب');
    const ic = 'review-submit-item' + (none ? ' unanswered' : flag ? ' flagged-item' : '');
    
    html += `<div class="${ic}" onclick="jumpToQ(${i})" style="cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; height:100%; border:1px solid var(--border); border-radius:12px; padding:12px; background:var(--card); transition:all 0.2s;">
      <span class="rsi-text" style="font-size:0.9rem; font-weight:600; margin-bottom:8px; line-height:1.5;">س${i+1}: ${escHtml(q.text.substring(0, 45))}${q.text.length > 45 ? '…' : ''}</span>
      <span class="rsi-status ${sCls}" style="font-size:0.8rem; font-weight:700; padding:4px 8px; border-radius:6px; text-align:center; display:inline-block; margin-top:auto;">${sTxt}</span>
    </div>`;
  });
  
  const done = ANSWERS.filter(a => a !== null).length;
  let warn = '';
  if (un.length) warn += `<div style="color:#f87171;font-weight:800;margin-bottom:6px;font-size:1.05rem;">⚠️ ${un.length} أسئلة لم تُجب عنها: (${un.join('، ')})</div>`;
  if (fl.length) warn += `<div style="color:#fbbf24;font-weight:800;font-size:1.05rem;">🚩 ${fl.length} أسئلة محددة للمراجعة: (${fl.join('، ')})</div>`;

  const sumBar = `<div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;background:var(--bg2);border:2px dashed var(--border);border-radius:14px;padding:16px;margin-bottom:18px;font-size:1rem;font-weight:800">
    <span style="color:var(--green2)">✅ مجاب: ${done}</span>
    <span style="color:#f87171">⬜ لم يُجَب: ${un.length}</span>
    <span style="color:#fbbf24">🚩 للمراجعة: ${fl.length}</span>
    <span style="color:var(--text2)">📊 إجمالي: ${EXAM_QS.length}</span></div>`;

  const warnBox = warn ? `<div style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:12px;padding:14px;margin-bottom:20px">${warn}</div>` : '';
  
  // Grid container instead of list
  const qList = `<div style="max-height:40vh;overflow-y:auto;padding-right:5px;">
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:12px; text-align:right;">
      ${html}
    </div>
  </div>`;

  document.getElementById('confirm-submit-msg').innerHTML = sumBar + warnBox + qList + '<div style="margin-top:20px; font-weight:700; font-size:1.1rem;">هل أنت متأكد من تسليم الامتحان نهائياً؟</div>';
  document.getElementById('modal-confirm').classList.add('show');
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function jumpToQ(i) { closeModal('modal-confirm'); CURRENT = i; renderQuestion(); }

async function submitExam() {
  closeModal('modal-confirm');
  EXAM_ACTIVE = false;
  clearInterval(TIMER_IV);
  clearInterval(AUTO_SAVE_IV);
  teardownAntiCheat();
  stopAllProctoring();
  
  const ac = document.getElementById('ans-counter'); if (ac) ac.remove();
  const cb = document.getElementById('cheat-hdr-badge'); if (cb) cb.remove();
  
  await idbRemove(LS_SES);
  document.getElementById('cheat-overlay').classList.remove('show');
  try { document.fullscreenElement && document.exitFullscreen().catch(()=>{}); } catch(e) {}
  
  await calcAndShowResults();
  showScreen('s-results');
  // عرض تقرير المراقبة
  setTimeout(renderProctoringReport, 600);
  if (CFG.autoSS) setTimeout(() => captureScreenshot(true), 1800);
}

// ══════════════════════════════════════════════
//  ADVANCED RESULTS & GRADING ALGORITHM
// ══════════════════════════════════════════════
async function calcAndShowResults() {
  // جلب الإجابات الأصلية من قاعدة البيانات للتصحيح السري
  QUESTIONS = (await idbGet(LS_Q)) || [];

  let correct = 0, wrong = 0, empty = 0;
  let qStatsArr = [];
  EXAM_QS.forEach((q, i) => {
    // استعادة الإجابة الصحيحة والتفسير
    const oq = QUESTIONS.find(o => (q.id && o.id === q.id) || o.text === q.text);
    if (oq) {
       q.correct = oq.correct;
       q.explanation = oq.explanation;
    }

    let isCorrect = false;
    const a = ANSWERS[i];
    if (a === null || a === '' || (Array.isArray(a) && a.length === 0)) {
       empty++;
    } else {
       if (q.type === 'msq') {
          const arr = Array.isArray(a) ? a : [a];
          let correctSelected = arr.filter(x => q.correct.includes(x)).length;
          let wrongSelected = arr.filter(x => !q.correct.includes(x)).length;
          let fraction = Math.max(0, (correctSelected - wrongSelected) / q.correct.length);
          
          correct += fraction;
          wrong += (1 - fraction);
          
          if (fraction === 1) isCorrect = true;
          else if (fraction > 0) isCorrect = "partial";
       } else if (q.type === 'short') {
          if (normalizeArabic(a).toLowerCase() === normalizeArabic(q.correct).toLowerCase()) { correct++; isCorrect = true; }
          else { wrong++; }
       } else {
          if (a === q.correct) { correct++; isCorrect = true; }
          else { wrong++; }
       }
    }

    // إحصائيات السؤال للبنك
    qStatsArr.push({ qText: q.text, correct: isCorrect });
  });
  
  const totalMark = Math.round(CFG.totalExamMark * 100) / 100;
  let earnedBase = correct * CFG.markPerQ;
  
  let penaltyTotal = 0;
  if (CFG.negativeMarking) {
    penaltyTotal = wrong * (CFG.markPerQ * CFG.negativePenalty);
    earnedBase -= penaltyTotal;
    if (earnedBase < 0) earnedBase = 0;
  }
  
  // لضمان عدم وجود كسور غريبة تسبب تناقضاً: تقريب للعلامة النهائية في حال كانت قريبة جداً من الصحيح
  let earned = Math.round(earnedBase * 100) / 100;
  if (Math.abs(earned - Math.round(earned)) < 0.02) earned = Math.round(earned);
  if (correct === EXAM_QS.length && !CFG.negativeMarking) earned = totalMark; // ضمان 100% في حال الإجابة الكاملة
  let pct = totalMark > 0 ? Math.round((earned / totalMark) * 100) : 0;
  const passed = pct >= CFG.passPct;
  
  let gradeLetter = 'F';
  let gradeBadgeClass = 'fail';
  let gradeBadgeText = '❌ راسـب';
  
  if (pct >= 95)      { gradeLetter = 'A+'; gradeBadgeClass = 'excellent'; gradeBadgeText = '🏆 مـمـتـاز+'; }
  else if (pct >= 90) { gradeLetter = 'A';  gradeBadgeClass = 'excellent'; gradeBadgeText = '🏆 مـمـتـاز'; }
  else if (pct >= 85) { gradeLetter = 'B+'; gradeBadgeClass = 'vgood';    gradeBadgeText = '🌟 جيد جداً+'; }
  else if (pct >= 75) { gradeLetter = 'B';  gradeBadgeClass = 'vgood';    gradeBadgeText = '🌟 جيد جداً'; }
  else if (pct >= 65) { gradeLetter = 'C+'; gradeBadgeClass = 'good';     gradeBadgeText = '👍 جيد+'; }
  else if (pct >= 55) { gradeLetter = 'C';  gradeBadgeClass = 'good';     gradeBadgeText = '👍 جـيـد'; }
  else if (passed)    { gradeLetter = 'D';  gradeBadgeClass = 'pass';     gradeBadgeText = '✅ مـقـبـول'; }
  
  // PUSH TO LOCAL ARCHIVE DB
  const dateStr = new Date().toLocaleString('ar-SA');
  RESULTS_ARCHIVE.push({
    date: dateStr,
    name: STUDENT.name,
    cls: STUDENT.cls,
    sec: STUDENT.section,
    score: earned,
    totalMark: totalMark,
    pct: pct,
    passed: passed,
    cheat: CHEAT_COUNT,
    qStats: qStatsArr
  });
  saveResultsToStorage();
  
  const ring = document.getElementById('grade-ring-circle');
  const circumference = 427.26;
  const offset = circumference - (pct / 100) * circumference;
  ring.style.strokeDashoffset = offset;
  
  let ringColor = 'var(--red)';
  if (pct >= 90) ringColor = 'var(--blue2)';
  else if (pct >= 75) ringColor = 'var(--green2)';
  else if (pct >= 65) ringColor = 'var(--gold)';
  else if (passed) ringColor = 'var(--green)';
  ring.style.stroke = ringColor;
  
  document.getElementById('ring-score').textContent = earned.toString().replace(/\.0$/,'');
  document.getElementById('ring-total').textContent = `/ ${totalMark.toString().replace(/\.0$/,'')}`;
  
  const pctEl = document.getElementById('cert-pct');
  pctEl.textContent = pct + '%';
  pctEl.className = 'score-pct ' + (passed ? 'pass' : 'fail');
  // Override color by grade range for better visual
  if      (pct >= 90) pctEl.style.color = 'var(--blue2)';
  else if (pct >= 75) pctEl.style.color = 'var(--green2)';
  else if (pct >= 55) pctEl.style.color = 'var(--gold)';
  else if (!passed)   pctEl.style.color = 'var(--red2)';
  else                pctEl.style.color = '';
  
  const gl = document.getElementById('cert-grade-letter');
  gl.textContent = gradeLetter;
  gl.className = 'score-letter-grade ' + gradeLetter.replace('+','').trim();
  
  const badge = document.getElementById('cert-pass-badge');
  badge.textContent = gradeBadgeText;
  badge.className = 'cert-badge ' + gradeBadgeClass;
  
  document.getElementById('st-correct').textContent = correct;
  document.getElementById('st-wrong').textContent = wrong;
  document.getElementById('st-empty').textContent = empty;
  const ms = TIME_SPENT;
  document.getElementById('st-time').textContent = `${Math.floor(ms/60)}:${pad2(ms%60)}`;
  // Avg time per question
  const answered = EXAM_QS.length - empty;
  const avgSec = answered > 0 ? Math.round(ms / EXAM_QS.length) : 0;
  const avgEl = document.getElementById('st-avg-time');
  if (avgEl) avgEl.textContent = avgSec >= 60 ? `${Math.floor(avgSec/60)}:${pad2(avgSec%60)}` : `${avgSec}ث`;
  // Accuracy (correct out of answered)
  const accEl = document.getElementById('st-accuracy');
  if (accEl) accEl.textContent = answered > 0 ? Math.round((correct / answered) * 100) + '%' : '—';
  
  document.getElementById('cert-h2').textContent = CFG.examTitle || CFG.subjectName;
  document.getElementById('cert-h3').textContent = CFG.schoolName || '';
  document.getElementById('cert-teacher').textContent = CFG.teacherName || '';
  document.getElementById('cert-student-name').textContent = STUDENT.name;
  document.getElementById('cert-student-meta').textContent = `الصف: ${STUDENT.cls} | الشعبة: ${STUDENT.section}`;
  document.getElementById('cert-date-val').textContent = new Date().toLocaleDateString('ar-SA', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
  document.getElementById('cert-ref-val').textContent = `#EXM-${Math.floor(Math.random()*900000+100000)}`;
  if (CFG.logo) { document.getElementById('cert-logo-box').innerHTML = `<img src="${CFG.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:16px">`; }
  
  if (CONFIDENCE && CONFIDENCE.filter(Boolean).length > 0) {
    const cs = {sure:0, unsure:0, guess:0};
    CONFIDENCE.forEach(c => { if (c) cs[c]++; });
    const statsEl = document.querySelector('.cert-stats');
    if (statsEl) {
      const cr = document.createElement('div');
      cr.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px';
      cr.className = 'no-print';
      cr.innerHTML = `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;text-align:center;flex:1"><div style="font-size:.63rem;color:var(--text3);margin-bottom:3px;text-transform:uppercase">متأكد</div><div style="color:var(--green2);font-size:1.4rem;font-weight:900">${cs.sure}</div></div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;text-align:center;flex:1"><div style="font-size:.63rem;color:var(--text3);margin-bottom:3px;text-transform:uppercase">غير متأكد</div><div style="color:var(--gold);font-size:1.4rem;font-weight:900">${cs.unsure}</div></div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;text-align:center;flex:1"><div style="font-size:.63rem;color:var(--text3);margin-bottom:3px;text-transform:uppercase">تخمين</div><div style="color:var(--red2);font-size:1.4rem;font-weight:900">${cs.guess}</div></div>`;
      statsEl.insertAdjacentElement('afterend', cr);
    }
  }

  // Populate performance analysis bar
  const perfBar = document.getElementById('perf-bar');
  if (perfBar) {
    perfBar.style.display = '';
    const correctPct = EXAM_QS.length > 0 ? Math.round((correct / EXAM_QS.length) * 100) : 0;
    const wrongPct   = EXAM_QS.length > 0 ? Math.round((wrong   / EXAM_QS.length) * 100) : 0;
    const emptyPct   = 100 - correctPct - wrongPct;
    document.getElementById('perf-bar-inner').innerHTML = `
      <div style="display:flex;border-radius:8px;overflow:hidden;height:22px;margin-bottom:10px">
        <div style="width:${correctPct}%;background:var(--green);transition:width .8s ease" title="صحيح ${correctPct}%"></div>
        <div style="width:${wrongPct}%;background:var(--red);transition:width .8s ease .1s" title="خطأ ${wrongPct}%"></div>
        <div style="width:${emptyPct}%;background:var(--border2);transition:width .8s ease .2s" title="لم يُجَب ${emptyPct}%"></div>
      </div>
      <div style="display:flex;gap:16px;font-size:.75rem;font-weight:700">
        <span style="color:var(--green2)">✅ صحيح ${correctPct}%</span>
        <span style="color:var(--red2)">❌ خطأ ${wrongPct}%</span>
        <span style="color:var(--text3)">⬜ غير مجاب ${emptyPct}%</span>
      </div>`;
  }

  if (CHEAT_LOG.length > 0 || CHEAT_COUNT > 0) {
    const rv = document.getElementById('review-section');
    const ld = document.createElement('div');
    ld.className = 'review-section no-print';
    ld.style.marginBottom = '22px';
    ld.innerHTML = `<div class="review-hdr" style="background:rgba(239,68,68,.08);border-bottom-color:rgba(239,68,68,.25)"><div class="review-title" style="color:#f87171"><i class="fas fa-shield-exclamation"></i> سجل المخالفات الأمنية</div><div class="review-stats"><span style="color:#f87171">${CHEAT_LOG.length} حدث مسجل</span></div></div>
      <div class="review-list"><div style="display:flex;gap:12px;flex-wrap:wrap;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px;margin-bottom:10px;font-size:.8rem;font-weight:700"><span style="color:var(--text2)">محاولات النسخ: <span style="color:#f87171">${copyAttempts}</span></span><span style="color:var(--text2)">محاولات اللصق: <span style="color:#f87171">${pasteAttempts}</span></span><span style="color:var(--text2)">إجمالي التحذيرات: <span style="color:#fbbf24">${CHEAT_COUNT}</span></span></div>
      ${CHEAT_LOG.map((e, i) => `<div class="cheat-log-item"><span class="cli-num">#${i+1}</span><span class="cli-time">${e.time}</span><span class="cli-reason">${e.reason}</span><span style="color:var(--text3);font-size:.7rem">س${e.q}</span></div>`).join('')}
      </div>`;
    if (rv && rv.parentNode) rv.parentNode.insertBefore(ld, rv);
  }

  const reviewSec = document.getElementById('review-section');
  if (CFG.showReview) {
    reviewSec.style.display = '';
    document.getElementById('rv-correct').textContent = correct;
    document.getElementById('rv-wrong').textContent = wrong;
    let reviewHtml = '';
    
    EXAM_QS.forEach((q, i) => {
      const ans = ANSWERS[i];
      const ok = ans === q.correct;
      const none = ans === null;
      const cls = none ? 'unanswered' : ok ? 'correct' : 'wrong';
      const imgTag = q.image ? `<img src="${q.image}" class="ri-qimg" alt="صورة للسؤال">` : '';
      
      let markEarned = ok ? CFG.markPerQ : (none ? 0 : (CFG.negativeMarking ? -(CFG.markPerQ * CFG.negativePenalty) : 0));
      let formatMark = Math.round(markEarned * 100) / 100;
      let formatBase = Math.round(CFG.markPerQ * 100) / 100;
      let pointsTxt = `<span style="font-size:0.75rem; font-weight:800; color: ${markEarned > 0 ? 'var(--green)' : (markEarned < 0 ? 'var(--red)' : 'var(--text3)')}; padding: 2px 6px; background: var(--bg3); border-radius: 6px; margin-right:auto;">
        ${markEarned > 0 ? '+' : ''}${formatMark} / ${formatBase} نقطة
      </span>`;
      
      reviewHtml += `<div class="review-item ${cls}" id="rev-item-${i}">
        <div class="ri-q-row">
          <div class="ri-num">${i+1}</div>
          ${imgTag}
          <div style="flex:1">
            <div class="ri-qtext">${escHtml(q.text)}</div>
            ${q.difficulty ? `<span style="font-size:.68rem;font-weight:800;padding:1px 7px;border-radius:5px;margin-top:4px;display:inline-block;${q.difficulty==='easy'?'color:var(--green2);border:1px solid rgba(16,185,129,.3)':q.difficulty==='hard'?'color:var(--red2);border:1px solid rgba(239,68,68,.3)':'color:var(--gold);border:1px solid rgba(245,158,11,.3)'}">${q.difficulty==='easy'?'سهل':q.difficulty==='hard'?'صعب':'متوسط'}</span>` : ''}
            ${q.category ? `<span style="font-size:.68rem;color:var(--cyan);border:1px solid rgba(6,182,212,.3);border-radius:5px;padding:1px 7px;margin-top:4px;margin-right:4px;display:inline-block">${escHtml(q.category)}</span>` : ''}
          </div>
        </div>
        <div class="ri-ans-row" style="align-items:center;">
          ${none 
            ? `<span class="ans-chip empty" id="my-ans-${i}">⬜ لم يتم الإجابة</span>` 
            : `<span class="ans-chip ${ok ? 'mine-correct' : 'mine-wrong'}" id="my-ans-${i}">${ok ? '✅' : '❌'} إجابتك: ${escHtml(ans)}</span>
               ${ok && CFG.showConfidence && CONFIDENCE[i] === 'guess' ? '<span class="ans-chip" style="background:rgba(16,185,129,.1);color:var(--green);border:1px solid rgba(16,185,129,.2); margin-right:8px;" title="إجابة صحيحة ولكن باختيار (تخمين)">🍀 تخمين صحيح</span>' : ''}`
          }
          
          ${!ok ? `
            ${CFG.allowRetry !== false ? `
              <div class="retry-actions no-print" id="retry-acts-${i}" style="display:inline-flex;gap:8px;margin-right:auto;">
                <button type="button" class="qm-btn blue" style="padding:5px 12px;font-size:0.75rem;" onclick="openRetryModal(${i})">
                  <i class="fas fa-redo"></i> أعد المحاولة
                </button>
                <button type="button" class="qm-btn gray" style="padding:5px 12px;font-size:0.75rem;" onclick="revealAnswer(${i})">
                  <i class="fas fa-eye"></i> إظهار الإجابة
                </button>
              </div>
              <span class="ans-chip correct-hint" id="correct-ans-${i}" style="display:none;margin-right:auto;">
                ✔ الإجابة الصحيحة: ${escHtml(q.correct)}
              </span>
            ` : `
              <span class="ans-chip correct-hint" style="margin-right:auto;display:inline-flex;background:rgba(16,185,129,.1);color:var(--green);border:1px solid rgba(16,185,129,.2)">
                ✔ الإجابة الصحيحة: ${escHtml(q.correct)}
              </span>
            `}
          ` : pointsTxt}
          
          ${(!ok && CFG.allowRetry !== false) ? pointsTxt.replace('margin-right:auto;', 'margin-right:10px;') : ''}
        </div>
        ${q.explanation ? `<div style="margin-top:12px;padding:10px 14px;background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:10px;font-size:.82rem;color:var(--gold2);line-height:1.65"><i class="fas fa-lightbulb" style="margin-left:6px;color:var(--gold)"></i>${escHtml(q.explanation)}</div>` : ''}
      </div>`;
    });
    document.getElementById('review-list').innerHTML = reviewHtml;
  } else { reviewSec.style.display = 'none'; }
  
  if (passed && typeof confetti !== 'undefined') {
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: [CFG.themeColor || '#3b82f6', '#10b981', '#f59e0b', '#ffffff']
      });
    }, 500);
  }
}

// ══════════════════════════════════════════════
//  RETRY LOGIC (CORRECTION Mode)
// ══════════════════════════════════════════════
let currentRetryIdx = -1;

function openRetryModal(i) {
  currentRetryIdx = i;
  const q = EXAM_QS[i];
  
  if (q.image) {
    document.getElementById('retry-q-img').innerHTML = `<img src="${q.image}" style="max-height:200px;border-radius:10px;border:1px solid var(--border)">`;
  } else {
    document.getElementById('retry-q-img').innerHTML = '';
  }
  
  document.getElementById('retry-q-text').textContent = q.text;
  const optsGrid = document.getElementById('retry-opts');
  optsGrid.innerHTML = '';
  
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'opt-btn';
    btn.style.padding = '12px 18px';
    btn.innerHTML = `
      <div class="opt-letter">${LETTERS[idx]}</div>
      <span style="flex:1;text-align:right;font-weight:600;">${escHtml(opt)}</span>
    `;
    btn.onclick = () => checkRetryAnswer(btn, opt, q.correct, i);
    optsGrid.appendChild(btn);
  });
  
  document.getElementById('retry-msg').innerHTML = '';
  document.getElementById('modal-retry').classList.add('show');
}

function checkRetryAnswer(btn, selected, correct, i) {
  const msgBox = document.getElementById('retry-msg');
  if (selected === correct) {
    btn.classList.add('correct-ans');
    msgBox.innerHTML = '<span style="color:var(--green2)">✅ أحسنت! لقد اكتشفت الإجابة الصحيحة.</span>';
    document.querySelectorAll('#retry-opts .opt-btn').forEach(b => b.classList.add('locked'));
    setTimeout(() => {
      closeModal('modal-retry');
      document.getElementById(`retry-acts-${i}`).style.display = 'none';
      const revItem = document.getElementById(`rev-item-${i}`);
      revItem.classList.remove('wrong', 'unanswered');
      revItem.classList.add('correct');
      revItem.style.borderColor = 'var(--blue)'; 
      const myAns = document.getElementById(`my-ans-${i}`);
      myAns.className = 'ans-chip mine-correct';
      myAns.style.borderColor = 'var(--blue)';
      myAns.innerHTML = `🔄 صُححت: ${escHtml(correct)}`;
    }, 1500);
  } else {
    btn.classList.add('wrong-ans', 'locked'); 
    msgBox.innerHTML = '<span style="color:var(--red2)">❌ إجابة خاطئة، ركز وحاول مرة أخرى.</span>';
    btn.style.animation = 'none';
    setTimeout(() => btn.style.animation = 'shake .4s ease', 10);
  }
}

function revealAnswer(i) {
  document.getElementById(`retry-acts-${i}`).style.display = 'none';
  const ansHint = document.getElementById(`correct-ans-${i}`);
  ansHint.style.display = 'inline-flex';
  ansHint.style.opacity = 1;
}

function newStudent() {
  CHEAT_LOG.length = 0; CHEAT_COUNT = 0; CONFIDENCE = [];
  copyAttempts = 0; pasteAttempts = 0; examStartTime = null;
  // Reset proctoring state
  PROCTOR.snapshots = []; PROCTOR.cheatEvents = []; PROCTOR.faceAlerts = 0;
  PROCTOR.noiseAlerts = 0; PROCTOR.extAlerts = 0; PROCTOR.cheatWarnCooldown = false;
  document.getElementById('inst-agree-cb').checked = false;
  document.getElementById('btn-inst-start').disabled = true;
  document.getElementById('inp-name').value = '';
  document.getElementById('inp-class').value = '';
  document.getElementById('inp-section').value = '';
  clearResume();
  const cheatSecs = document.querySelectorAll('#s-results .review-section');
  cheatSecs.forEach((el, i) => { if (i > 0) el.remove(); });
  const confRows = document.querySelectorAll('#s-results > .results-wrap > div[style*="flex"]');
  confRows.forEach(el => el.remove());
  updateSplash();
  showScreen('s-student');
  setTimeout(() => document.getElementById('inp-name').focus(), 150);
}

function printResults() { window.print(); }

function shareResults() {
  const pct = document.getElementById('cert-pct')?.textContent || '';
  const grade = document.getElementById('cert-grade-letter')?.textContent || '';
  const name = STUDENT.name || '';
  const exam = CFG.examTitle || CFG.subjectName || 'الامتحان';
  const text = `📋 نتيجة ${name}\n🎓 ${exam}\n📊 النسبة: ${pct} | التقدير: ${grade}`;
  if (navigator.share) {
    navigator.share({ title: `نتيجة ${name}`, text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('✅ تم نسخ ملخص النتيجة', 'success')).catch(() => showToast('⚠️ تعذر النسخ', 'error'));
  } else {
    showToast('⚠️ المشاركة غير مدعومة في هذا المتصفح', 'error');
  }
}

function captureScreenshot(auto = false) {
  if (typeof html2canvas === 'undefined') { if (!auto) showToast('⚠️ تحتاج اتصالاً بالإنترنت', 'error'); return; }
  const el = document.getElementById('cert-card');
  el.style.background = '#111827';
  html2canvas(el, {
    backgroundColor: '#111827', scale: 2.5,
    useCORS: true, allowTaint: true, logging: false,
    ignoreElements: el2 => el2.classList.contains('no-print')
  }).then(canvas => {
    el.style.background = '';
    const a = document.createElement('a');
    a.download = 'نتيجة_' + (STUDENT.name || 'طالب') + '_' + new Date().toLocaleDateString('ar-SA').replace(/\//g,'-') + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
    if (!auto) showToast('✅ تم حفظ صورة النتيجة', 'success');
  }).catch(() => { el.style.background = ''; if (!auto) showToast('⚠️ تعذر التقاط الصورة', 'error'); });
}

// ══════════════════════════════════════════════
//  GRID MODAL
// ══════════════════════════════════════════════
function openGrid() {
  if (!CFG.allowBack) return;
  const wrap = document.getElementById('grid-buttons-area');
  wrap.innerHTML = '';
  EXAM_QS.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isAns = ANSWERS[i] !== null;
    const isFlag = FLAGS[i];
    const isCur = i === CURRENT;
    let cls = 'grid-btn';
    if (isFlag) cls += ' flagged';
    else if (isAns) cls += ' answered';
    if (isCur) cls += ' current';
    btn.className = cls;
    btn.textContent = i + 1;
    btn.onclick = () => { CURRENT = i; closeModal('modal-grid'); renderQuestion(); };
    wrap.appendChild(btn);
  });
  document.getElementById('modal-grid').classList.add('show');
}

// ══════════════════════════════════════════════
//  CALCULATOR
// ══════════════════════════════════════════════
function toggleCalc() {
  const el = document.getElementById('calc-float');
  if (el.style.display === 'none' || !el.style.display) {
    el.style.display = 'block';
    document.getElementById('calc-display').value = '0';
  } else { el.style.display = 'none'; }
}
function calcAction(v) {
  const d = document.getElementById('calc-display');
  if (v === 'C') { d.value = '0'; return; }
  if (v === '=') {
    try {
      const sanitized = d.value.replace(/[^0-9+\-*/.%()]/g, '');
      if (sanitized !== d.value) throw new Error("Invalid chars");
      const r = Function('"use strict";return (' + sanitized + ')')();
      d.value = isFinite(r) ? +r.toFixed(8) : 'Error';
    } catch(e) { d.value = 'Error'; setTimeout(() => d.value = '0', 1200); }
    return;
  }
  d.value = (d.value === '0' && !isNaN(v)) ? v : d.value + v;
}

// ══════════════════════════════════════════════
//  SETTINGS LOCK & RESULTS ARCHIVE UI
// ══════════════════════════════════════════════
function openLock() { document.getElementById('lock-pass-inp').value = ''; document.getElementById('lock-err').textContent = ''; showScreen('s-lock'); setTimeout(() => document.getElementById('lock-pass-inp').focus(), 100); }
function checkLockPass() {
  const v = document.getElementById('lock-pass-inp').value;
  const hashed = CryptoJS.SHA256(v).toString();
  if (CFG.password) {
    CFG.passwordHash = CryptoJS.SHA256(CFG.password).toString();
    delete CFG.password;
    saveToStorage();
  }
  if (hashed === CFG.passwordHash) { document.getElementById('lock-err').textContent = ''; openSettingsPanel(); }
  else { document.getElementById('lock-err').textContent = '❌ كلمة المرور غير صحيحة'; document.getElementById('lock-pass-inp').value = ''; document.getElementById('lock-pass-inp').focus(); }
}

function toggleCalcMode() {
  const mode = document.getElementById('s-calc-mode').value;
  const totalInp = document.getElementById('s-total-exam-mark');
  const perQInp = document.getElementById('s-calc-mark-per-q');
  
  if (mode === 'total') {
    totalInp.disabled = false;
    totalInp.style.background = 'var(--bg3)';
    totalInp.style.color = 'var(--text)';
    perQInp.disabled = true;
    perQInp.style.background = 'var(--bg2)';
    perQInp.style.color = 'var(--blue2)';
  } else {
    totalInp.disabled = true;
    totalInp.style.background = 'var(--bg2)';
    totalInp.style.color = 'var(--blue2)';
    perQInp.disabled = false;
    perQInp.style.background = 'var(--bg3)';
    perQInp.style.color = 'var(--text)';
  }
  updateMarksCalc();
}

function updateMarksCalc() {
  const mode = document.getElementById('s-calc-mode').value;
  const countVal = document.getElementById('s-display-count').value;
  let qc = countVal === 'all' ? (QUESTIONS.length || 1) : (parseInt(countVal) || 1);
  if (qc === 0) qc = 1;
  
  const totalInp = document.getElementById('s-total-exam-mark');
  const perQInp = document.getElementById('s-calc-mark-per-q');
  
  let totalMark = 0;
  let mpq = 0;

  if (mode === 'total') {
    totalMark = parseFloat(totalInp.value) || 100;
    mpq = totalMark / qc;
    perQInp.value = Math.round(mpq * 100) / 100;
  } else {
    mpq = parseFloat(perQInp.value) || 1;
    totalMark = mpq * qc;
    totalInp.value = Math.round(totalMark * 100) / 100;
  }
  
  const pp = parseInt(document.getElementById('s-pass-pct').value) || 50;
  const passMark = Math.round(((pp / 100) * totalMark) * 100) / 100;
  
  document.getElementById('mc-total').textContent = Math.round(totalMark * 100) / 100;
  document.getElementById('mc-pass').textContent = passMark;
}

function openSettingsPanel() {
  const g = id => document.getElementById(id);
  g('s-school-name').value = CFG.schoolName || '';
  g('s-teacher-name').value = CFG.teacherName || '';
  g('s-subject-name').value = CFG.subjectName || '';
  g('s-exam-title').value = CFG.examTitle || '';
  g('s-timer-mins').value = CFG.timerMins;
  g('s-no-timer').checked = CFG.noTimer;
  g('s-timer-mins').disabled = CFG.noTimer;
  g('s-display-count').value = CFG.displayCount;
  
  g('s-calc-mode').value = CFG.calcMode || 'total';
  g('s-total-exam-mark').value = CFG.totalExamMark || 100;
  g('s-calc-mark-per-q').value = CFG.markPerQ || 5;
  
  g('s-pass-pct').value = CFG.passPct;
  g('s-shuffle-q').checked = CFG.shuffleQ;
  g('s-smart-pooling').checked = CFG.smartPooling;
  g('s-shuffle-o').checked = CFG.shuffleO;
  g('s-auto-advance').checked = CFG.autoAdvance;
  g('s-allow-back').checked = CFG.allowBack;
  g('s-show-confidence').checked = CFG.showConfidence;
  g('s-show-review').checked = CFG.showReview;
  g('s-allow-retry').checked = CFG.allowRetry !== false;
  g('s-allow-flag').checked = CFG.allowFlag;
  g('s-theme-color').value = CFG.themeColor || '#3b82f6';
  
  g('s-neg-mark').checked = CFG.negativeMarking === true;
  g('s-neg-pen').disabled = !CFG.negativeMarking;
  g('s-neg-pen').value = CFG.negativePenalty || 0.25;

  g('s-prevent-leave').checked = CFG.preventLeave;
  g('s-force-fullscreen').checked = CFG.forceFS;
  g('s-mouse-warn').checked = CFG.mouseWarn;
  g('s-no-right').checked = CFG.noRight;
  g('s-no-devtools').checked = CFG.noDevTools;
  g('s-auto-ss').checked = CFG.autoSS;
  g('s-cheat-limit').value = CFG.cheatLimit;
  g('s-warn-30').checked = CFG.warn30;
  g('s-warn-15').checked = CFG.warn15;
  g('s-warn-10').checked = CFG.warn10;
  g('s-warn-5').checked = CFG.warn5;
  g('s-warn-1').checked = CFG.warn1;
  // Proctoring
  g('s-enable-webcam').checked     = CFG.enableWebcam !== false;
  g('s-enable-facetrack').checked  = CFG.enableFaceTracking !== false;
  g('s-enable-mic').checked        = CFG.enableMic !== false;
  g('s-enable-watermark').checked  = CFG.enableWatermark !== false;
  g('s-enable-extblock').checked   = CFG.enableExtBlocker !== false;
  g('s-snap-interval').value       = CFG.snapInterval || 60;
  applyLogoEverywhere(CFG.logo);
  toggleCalcMode();
  renderResultsArchive();
  showScreen('s-settings');
}

function renderResultsArchive() {
  const tbody = document.querySelector('#res-archive-table tbody');
  if (RESULTS_ARCHIVE.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text3);padding:20px">لا توجد نتائج مسجلة حتى الآن.</td></tr>';
    return;
  }
  tbody.innerHTML = RESULTS_ARCHIVE.slice().reverse().map(r => `
    <tr>
      <td style="font-family:monospace;font-size:.75rem;color:var(--text3)">${r.date}</td>
      <td style="font-weight:700">${escHtml(r.name)}</td>
      <td>${escHtml(r.cls)} / ${escHtml(r.sec)}</td>
      <td>${r.score} من ${r.totalMark}</td>
      <td class="${r.passed ? 'pass' : 'fail'}">${r.pct}%</td>
      <td style="color:${r.cheat > 0 ? 'var(--red)' : 'var(--text3)'}">${r.cheat > 0 ? r.cheat + ' تحذير' : 'سليم'}</td>
    </tr>
  `).join('');
}

function exportResultsCSV() {
  if (RESULTS_ARCHIVE.length === 0) { showToast('لا توجد نتائج للتصدير', 'error'); return; }
  let csv = '\uFEFFالتاريخ,اسم الطالب,الصف,الشعبة,العلامة,العلامة الكلية,النسبة المئوية,حالة النجاح,مخالفات الغش\n';
  RESULTS_ARCHIVE.forEach(r => {
    csv += `"${r.date}","${r.name}","${r.cls}","${r.sec}",${r.score},${r.totalMark},${r.pct}%,${r.passed?'ناجح':'راسب'},${r.cheat}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `سجل_نتائج_الطلاب_${Date.now()}.csv`;
  a.click();
  showToast('✅ تم تصدير سجل النتائج بنجاح', 'success');
}

function clearResultsArchive() {
  if (!confirm('⚠️ هل أنت متأكد من مسح جميع نتائج الطلاب المسجلة؟ (لا يمكن التراجع)')) return;
  RESULTS_ARCHIVE = [];
  saveResultsToStorage();
  renderResultsArchive();
  showToast('🗑️ تم مسح السجل', 'success');
}

function saveSettings() {
  const g = id => document.getElementById(id);
  CFG.schoolName = g('s-school-name').value.trim();
  CFG.teacherName = g('s-teacher-name').value.trim() || DEV;
  CFG.subjectName = g('s-subject-name').value.trim() || 'امتحان نهائي';
  CFG.examTitle = g('s-exam-title').value.trim() || 'الامتحان الإلكتروني';
  CFG.timerMins = parseInt(g('s-timer-mins').value) || 30;
  CFG.noTimer = g('s-no-timer').checked;
  
  CFG.displayCount = g('s-display-count').value;
  
  CFG.calcMode = g('s-calc-mode').value;
  // الحفظ الدائم لكلتا القيمتين لتجنب فقدانها عند التبديل
  CFG.totalExamMark = parseFloat(g('s-total-exam-mark').value) || 100;
  CFG.markPerQ = parseFloat(g('s-calc-mark-per-q').value) || 1;
  
  CFG.passPct = parseInt(g('s-pass-pct').value) || 50;
  CFG.shuffleQ = g('s-shuffle-q').checked;
  CFG.smartPooling = g('s-smart-pooling').checked;
  CFG.shuffleO = g('s-shuffle-o').checked;
  CFG.autoAdvance = g('s-auto-advance').checked;
  CFG.allowBack = g('s-allow-back').checked;
  CFG.showConfidence = g('s-show-confidence').checked;
  CFG.showReview = g('s-show-review').checked;
  CFG.allowRetry = g('s-allow-retry').checked;
  CFG.allowFlag = g('s-allow-flag').checked;
  
  CFG.themeColor = g('s-theme-color').value;
  document.documentElement.style.setProperty('--blue', CFG.themeColor);
  document.documentElement.style.setProperty('--blue2', CFG.themeColor);
  
  CFG.negativeMarking = g('s-neg-mark').checked;
  CFG.negativePenalty = parseFloat(g('s-neg-pen').value) || 0.25;

  CFG.preventLeave = g('s-prevent-leave').checked;
  CFG.forceFS = g('s-force-fullscreen').checked;
  CFG.mouseWarn = g('s-mouse-warn').checked;
  CFG.noRight = g('s-no-right').checked;
  CFG.noDevTools = g('s-no-devtools').checked;
  CFG.autoSS = g('s-auto-ss').checked;
  CFG.cheatLimit = parseInt(g('s-cheat-limit').value) || 3;
  CFG.warn30 = g('s-warn-30').checked; CFG.warn15 = g('s-warn-15').checked;
  CFG.warn10 = g('s-warn-10').checked; CFG.warn5 = g('s-warn-5').checked;
  CFG.warn1 = g('s-warn-1').checked;
  // Proctoring settings
  CFG.enableWebcam      = g('s-enable-webcam').checked;
  CFG.enableFaceTracking= g('s-enable-facetrack').checked;
  CFG.enableMic         = g('s-enable-mic').checked;
  CFG.enableWatermark   = g('s-enable-watermark').checked;
  CFG.enableExtBlocker  = g('s-enable-extblock').checked;
  CFG.snapInterval      = parseInt(g('s-snap-interval').value) || 60;
  saveToStorage();
  showToast('✅ تم حفظ الإعدادات بنجاح', 'success');
  setTimeout(goSplash, 800);
}
function changePassword() {
  const old = document.getElementById('s-old-pass').value;
  const np = document.getElementById('s-new-pass').value;
  const cp = document.getElementById('s-confirm-pass').value;
  if (CryptoJS.SHA256(old).toString() !== CFG.passwordHash) { showToast('❌ كلمة المرور الحالية غير صحيحة', 'error'); return; }
  if (np.length < 4) { showToast('⚠️ كلمة المرور قصيرة جداً (4 أحرف+)', 'error'); return; }
  if (np !== cp) { showToast('❌ كلمتا المرور غير متطابقتان', 'error'); return; }
  CFG.passwordHash = CryptoJS.SHA256(np).toString(); saveToStorage();
  document.getElementById('s-old-pass').value = '';
  document.getElementById('s-new-pass').value = '';
  document.getElementById('s-confirm-pass').value = '';
  showToast('✅ تم تغيير كلمة المرور', 'success');
}
function resetAll() { if (!confirm('⚠️ سيتم حذف جميع البيانات (بما فيها سجل النتائج) والأسئلة والإعدادات. هل أنت متأكد؟')) return; localStorage.clear(); location.reload(); }
function handleLogoUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 320; let w = img.width, h = img.height;
      if (w > MAX || h > MAX) { if (w > h) { h = h * MAX / w; w = MAX; } else { w = w * MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      CFG.logo = canvas.toDataURL('image/jpeg', 0.85);
      applyLogoEverywhere(CFG.logo);
      showToast('✅ تم رفع الشعار', 'success');
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ══════════════════════════════════════════════
//  QUESTION MANAGER
// ══════════════════════════════════════════════
function switchQMTab(tab) {
  ['bank','add','import'].forEach(t => {
    document.getElementById('qm-tab-' + t).classList.toggle('active', t === tab);
    document.getElementById('tab-btn-' + t).classList.toggle('active', t === tab);
  });
}
function renderQList() {
  const cnt = QUESTIONS.length;
  document.getElementById('qm-count-badge').textContent = cnt;
  document.getElementById('tab-q-cnt').textContent = cnt;
  const search = (document.getElementById('q-search-inp')?.value || '').toLowerCase();
  const wrap = document.getElementById('q-list-container');
  if (!cnt) { wrap.innerHTML = '<div style="text-align:center;color:var(--text3);padding:40px;font-size:.9rem">لا توجد أسئلة. ابدأ بإضافة الأسئلة.</div>'; return; }
  
  const isSearchActive = !!search;

  let qStatsMap = {};
  RESULTS_ARCHIVE.forEach(res => {
     if(res.qStats && Array.isArray(res.qStats)) {
        res.qStats.forEach(qs => {
           if(!qStatsMap[qs.qText]) qStatsMap[qs.qText] = { total: 0, correct: 0 };
           qStatsMap[qs.qText].total++;
           if(qs.correct) qStatsMap[qs.qText].correct++;
        });
     }
  });

  wrap.innerHTML = QUESTIONS.map((q, i) => {
    if (search && !q.text.toLowerCase().includes(search)) return '';
    const imgIcon = q.image ? '<i class="fas fa-image" style="color:var(--blue2); margin-left:5px;"></i> ' : '';
    const diffMap = {easy:'<span style="color:var(--green2);font-size:.7rem;font-weight:800;border:1px solid rgba(16,185,129,.3);border-radius:5px;padding:1px 6px">سهل</span>', medium:'<span style="color:var(--gold);font-size:.7rem;font-weight:800;border:1px solid rgba(245,158,11,.3);border-radius:5px;padding:1px 6px">متوسط</span>', hard:'<span style="color:var(--red2);font-size:.7rem;font-weight:800;border:1px solid rgba(239,68,68,.3);border-radius:5px;padding:1px 6px">صعب</span>'};
    const diffBadge = q.difficulty ? (diffMap[q.difficulty] || '') : '';
    const catBadge = q.category ? `<span style="color:var(--cyan);font-size:.7rem;font-weight:700;border:1px solid rgba(6,182,212,.3);border-radius:5px;padding:1px 6px">${escHtml(q.category)}</span>` : '';
    const expIcon = q.explanation ? '<i class="fas fa-lightbulb" style="color:var(--gold);font-size:.7rem;margin-left:4px" title="يحتوي تفسيراً"></i>' : '';
    
    const stat = qStatsMap[q.text];
    let statBadge = '';
    if (stat && stat.total > 0) {
      const p = Math.round((stat.correct / stat.total) * 100);
      let color = p >= 75 ? 'var(--green2)' : (p >= 50 ? 'var(--gold)' : '#f87171');
      let label = p >= 75 ? 'سهل' : (p >= 50 ? 'متوسط' : 'صعب');
      statBadge = `<span style="color:${color};font-size:.7rem;font-weight:700;border:1px solid ${color}44;border-radius:5px;padding:1px 6px" title="أجاب ${stat.correct} من أصل ${stat.total} طالب بشكل صحيح">📊 ${label} (${p}%)</span>`;
    }
    
    const dragProps = isSearchActive ? '' : `draggable="true" ondragstart="handleDragStart(event, ${i})" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondrop="handleDrop(event, ${i})" ondragenter="handleDragEnter(event)" ondragleave="handleDragLeave(event)"`;
    const dragHandle = isSearchActive ? '' : `<div class="drag-handle" style="cursor:grab;color:var(--text3);padding:0 5px;margin-left:8px;display:flex;align-items:center;font-size:1.1rem;"><i class="fas fa-grip-lines"></i></div>`;

    return `<div class="q-list-item" ${dragProps} style="transition: all 0.2s ease;">
      ${dragHandle}
      <div class="q-num-badge">${i + 1}</div>
      <div class="q-list-content">
        <div class="q-list-text">${imgIcon}${expIcon}${escHtml(q.text)}</div>
        <div style="display:flex;gap:6px;margin-bottom:5px;flex-wrap:wrap">${statBadge}${diffBadge}${catBadge}</div>
        <div class="q-list-opts">${q.options.map((o, oi) => `<span class="q-opt-chip ${o === q.correct ? 'correct' : ''}">${LETTERS[oi]}) ${escHtml(o)} ${o === q.correct ? '✓' : ''}</span>`).join('')}</div>
      </div>
      <div class="q-list-actions">
        ${!isSearchActive ? `
        <div style="display:flex;flex-direction:column;gap:3px;margin-left:8px;">
          <button type="button" class="q-act-btn move" onclick="moveQuestionUp(${i})" ${i === 0 ? 'disabled style="opacity:0.3;cursor:not-allowed"' : ''} title="تحريك لأعلى"><i class="fas fa-chevron-up"></i></button>
          <button type="button" class="q-act-btn move" onclick="moveQuestionDown(${i})" ${i === cnt - 1 ? 'disabled style="opacity:0.3;cursor:not-allowed"' : ''} title="تحريك لأسفل"><i class="fas fa-chevron-down"></i></button>
        </div>` : ''}
        <button type="button" class="q-act-btn edit" onclick="editQuestion(${i})"><i class="fas fa-pen"></i></button>
        <button type="button" class="q-act-btn del" onclick="deleteQuestion(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`;
  }).join('');
}

function handleQImageUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 600; let w = img.width, h = img.height;
      if (w > MAX || h > MAX) { if (w > h) { h = h * MAX / w; w = MAX; } else { w = w * MAX / h; h = MAX; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      CURRENT_Q_IMG = canvas.toDataURL('image/jpeg', 0.75); // Compress for local storage
      const preview = document.getElementById('q-img-preview-el');
      preview.src = CURRENT_Q_IMG;
      preview.style.display = 'block';
      document.getElementById('q-img-remove-btn').style.display = 'block';
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function removeQImage() {
  CURRENT_Q_IMG = null;
  const preview = document.getElementById('q-img-preview-el');
  preview.src = '';
  preview.style.display = 'none';
  document.getElementById('q-img-remove-btn').style.display = 'none';
  document.getElementById('q-img-file').value = '';
}

function handleQTypeChange() {
  const type = document.getElementById('q-type').value;
  const optsArea = document.getElementById('opts-area');
  const shortArea = document.getElementById('short-ans-area');
  const cGroup = document.getElementById('correct-group');
  const oGrid = document.getElementById('opts-form-grid');
  
  if (type === 'short') {
    optsArea.style.display = 'none';
    shortArea.style.display = 'block';
  } else {
    optsArea.style.display = 'block';
    shortArea.style.display = 'none';
    
    if (type === 'tf') {
      oGrid.style.display = 'none';
      cGroup.innerHTML = `
        <label class="correct-radio"><input type="radio" name="correct-opt" value="0" checked><div class="cr-box" style="width:80px">صح</div></label>
        <label class="correct-radio"><input type="radio" name="correct-opt" value="1"><div class="cr-box" style="width:80px">خطأ</div></label>
      `;
    } else if (type === 'msq') {
      oGrid.style.display = 'grid';
      cGroup.innerHTML = `
        <label class="correct-radio"><input type="checkbox" name="correct-opt" value="0"><div class="cr-box">أ</div></label>
        <label class="correct-radio"><input type="checkbox" name="correct-opt" value="1"><div class="cr-box">ب</div></label>
        <label class="correct-radio"><input type="checkbox" name="correct-opt" value="2"><div class="cr-box">ج</div></label>
        <label class="correct-radio"><input type="checkbox" name="correct-opt" value="3"><div class="cr-box">د</div></label>
      `;
    } else { // mcq
      oGrid.style.display = 'grid';
      cGroup.innerHTML = `
        <label class="correct-radio"><input type="radio" name="correct-opt" value="0" checked><div class="cr-box">أ</div></label>
        <label class="correct-radio"><input type="radio" name="correct-opt" value="1"><div class="cr-box">ب</div></label>
        <label class="correct-radio"><input type="radio" name="correct-opt" value="2"><div class="cr-box">ج</div></label>
        <label class="correct-radio"><input type="radio" name="correct-opt" value="3"><div class="cr-box">د</div></label>
      `;
    }
  }
}

function insertMathEquation() {
  const eq = prompt('أدخل معادلة LaTeX (مثال: x^2 + y^2 = z^2)');
  if(eq) {
     const span = document.createElement('span');
     span.contentEditable = false;
     span.style.display = 'inline-block';
     span.style.margin = '0 5px';
     katex.render(eq, span, {throwOnError: false});
     document.getElementById('q-text-inp').appendChild(span);
     document.getElementById('q-text-inp').appendChild(document.createTextNode(' '));
  }
}

function submitQuestion() {
  const type = document.getElementById('q-type').value || 'mcq';
  const text = document.getElementById('q-text-inp').innerHTML.trim();
  if (!text || text === '<br>') { showToast('⚠️ أدخل نص السؤال', 'error'); return; }

  let opts = [];
  let correct = null;

  if (type === 'short') {
    correct = document.getElementById('short-ans-inp').value.trim();
    if (!correct) { showToast('⚠️ أدخل الإجابة النموذجية', 'error'); return; }
  } else if (type === 'tf') {
    opts = ['صح', 'خطأ'];
    const correctEl = document.querySelector('input[name="correct-opt"]:checked');
    if (!correctEl) { showToast('⚠️ اختر الإجابة الصحيحة (صح أم خطأ)', 'error'); return; }
    correct = opts[parseInt(correctEl.value)];
  } else if (type === 'msq') {
    opts = ['a','b','c','d'].map(l => document.getElementById('opt-inp-' + l).value.trim());
    if (opts.some(o => !o)) { showToast('⚠️ أدخل جميع الخيارات الأربعة', 'error'); return; }
    const checkedEls = Array.from(document.querySelectorAll('input[name="correct-opt"]:checked'));
    if (!checkedEls.length) { showToast('⚠️ اختر إجابة صحيحة واحدة على الأقل', 'error'); return; }
    correct = checkedEls.map(el => opts[parseInt(el.value)]);
  } else { // mcq
    opts = ['a','b','c','d'].map(l => document.getElementById('opt-inp-' + l).value.trim());
    if (opts.some(o => !o)) { showToast('⚠️ أدخل جميع الخيارات الأربعة', 'error'); return; }
    const correctEl = document.querySelector('input[name="correct-opt"]:checked');
    if (!correctEl) { showToast('⚠️ اختر الإجابة الصحيحة', 'error'); return; }
    correct = opts[parseInt(correctEl.value)];
  }

  const q = {type, text, options: opts, correct};
  if (CURRENT_Q_IMG) q.image = CURRENT_Q_IMG;
  const exp = document.getElementById('q-explanation')?.value?.trim();
  if (exp) q.explanation = exp;
  const diff = document.getElementById('q-difficulty')?.value;
  if (diff) q.difficulty = diff;
  const cat = document.getElementById('q-category')?.value?.trim();
  if (cat) q.category = cat;
  
  if (EDITING_IDX >= 0) {
    if (QUESTIONS[EDITING_IDX] && QUESTIONS[EDITING_IDX].id) {
      q.id = QUESTIONS[EDITING_IDX].id;
    } else {
      q.id = generateUUID();
    }
    QUESTIONS[EDITING_IDX] = q; 
    EDITING_IDX = -1; 
  } else {
    q.id = generateUUID();
    QUESTIONS.push(q);
  }
  saveQToStorage();
  clearAddForm();
  renderQList();
  switchQMTab('bank');
  showToast('✅ تم حفظ السؤال', 'success');
}

function clearAddForm() {
  document.getElementById('q-type').value = 'mcq';
  handleQTypeChange();
  document.getElementById('q-text-inp').innerHTML = '';
  document.getElementById('short-ans-inp').value = '';
  ['a','b','c','d'].forEach(l => document.getElementById('opt-inp-' + l).value = '');
  document.querySelectorAll('input[name="correct-opt"]').forEach(r => r.checked = false);
  document.getElementById('editing-idx').value = '-1';
  document.getElementById('add-form-label').innerHTML = '<i class="fas fa-plus-circle" style="color:var(--blue2)"></i> إضافة سؤال جديد';
  document.getElementById('add-q-btn-el').innerHTML = '<i class="fas fa-plus-circle"></i> إضافة السؤال للبنك';
  document.getElementById('cancel-edit-btn').style.display = 'none';
  EDITING_IDX = -1;
  removeQImage();
  if (document.getElementById('q-explanation')) document.getElementById('q-explanation').value = '';
  if (document.getElementById('q-difficulty')) document.getElementById('q-difficulty').value = 'medium';
  if (document.getElementById('q-category')) document.getElementById('q-category').value = '';
}

function editQuestion(i) {
  const q = QUESTIONS[i];
  const type = q.type || 'mcq';
  document.getElementById('q-type').value = type;
  handleQTypeChange();

  document.getElementById('q-text-inp').innerHTML = q.text;
  
  if (type === 'short') {
    document.getElementById('short-ans-inp').value = q.correct;
  } else if (type === 'msq') {
    ['a','b','c','d'].forEach((l, li) => { document.getElementById('opt-inp-' + l).value = q.options[li] || ''; });
    const cbs = document.querySelectorAll('input[name="correct-opt"]');
    cbs.forEach(cb => cb.checked = false);
    if(Array.isArray(q.correct)) {
      q.correct.forEach(cVal => {
        const ci = q.options.indexOf(cVal);
        if (ci >= 0 && cbs[ci]) cbs[ci].checked = true;
      });
    }
  } else if (type === 'tf') {
    const ci = q.options.indexOf(q.correct);
    if (ci >= 0) { const r = document.querySelectorAll('input[name="correct-opt"]')[ci]; if (r) r.checked = true; }
  } else {
    ['a','b','c','d'].forEach((l, li) => { document.getElementById('opt-inp-' + l).value = q.options[li] || ''; });
    const ci = q.options.indexOf(q.correct);
    if (ci >= 0) { const r = document.querySelectorAll('input[name="correct-opt"]')[ci]; if (r) r.checked = true; }
  }
  if (q.image) {
    CURRENT_Q_IMG = q.image;
    const preview = document.getElementById('q-img-preview-el');
    preview.src = CURRENT_Q_IMG;
    preview.style.display = 'block';
    document.getElementById('q-img-remove-btn').style.display = 'block';
  } else {
    removeQImage();
  }
  if (document.getElementById('q-explanation')) document.getElementById('q-explanation').value = q.explanation || '';
  if (document.getElementById('q-difficulty')) document.getElementById('q-difficulty').value = q.difficulty || 'medium';
  if (document.getElementById('q-category')) document.getElementById('q-category').value = q.category || '';
  
  EDITING_IDX = i;
  document.getElementById('add-form-label').innerHTML = '<i class="fas fa-edit" style="color:var(--gold)"></i> تعديل السؤال';
  document.getElementById('add-q-btn-el').innerHTML = '<i class="fas fa-save"></i> حفظ التعديل';
  document.getElementById('cancel-edit-btn').style.display = '';
  switchQMTab('add');
}
function cancelEdit() { clearAddForm(); switchQMTab('bank'); }
function deleteQuestion(i) { 
  if (!confirm(`حذف السؤال ${i + 1}؟`)) return; 
  QUESTIONS.splice(i, 1); 
  saveQToStorage(); 
  renderQList(); 
  showToast('🗑️ تم حذف السؤال وإعادة الترتيب التلقائي', 'success'); 
}
function clearAllQuestions() { if (!confirm('⚠️ حذف جميع الأسئلة؟')) return; QUESTIONS = []; saveQToStorage(); renderQList(); showToast('🗑️ تم حذف كل الأسئلة', 'success'); }

// ══════════════════════════════════════════════
//  QUESTION REORDERING (DRAG & DROP)
// ══════════════════════════════════════════════
function moveQuestionUp(i) {
  if (i <= 0) return;
  const temp = QUESTIONS[i];
  QUESTIONS[i] = QUESTIONS[i-1];
  QUESTIONS[i-1] = temp;
  saveQToStorage(); renderQList();
}
function moveQuestionDown(i) {
  if (i >= QUESTIONS.length - 1) return;
  const temp = QUESTIONS[i];
  QUESTIONS[i] = QUESTIONS[i+1];
  QUESTIONS[i+1] = temp;
  saveQToStorage(); renderQList();
}

let draggedQIndex = -1;
function handleDragStart(e, index) {
  draggedQIndex = index;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => { if(e.target) e.target.classList.add('dragging'); }, 0);
}
function handleDragEnd(e) {
  if(e.target) e.target.classList.remove('dragging');
  document.querySelectorAll('.q-list-item').forEach(el => el.classList.remove('drag-over', 'dragging'));
  draggedQIndex = -1;
}
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}
function handleDragEnter(e) {
  e.preventDefault();
  const item = e.target.closest('.q-list-item');
  if(item) item.classList.add('drag-over');
}
function handleDragLeave(e) {
  const item = e.target.closest('.q-list-item');
  if(item) item.classList.remove('drag-over');
}
function handleDrop(e, index) {
  e.preventDefault();
  e.stopPropagation();
  
  document.querySelectorAll('.q-list-item').forEach(el => el.classList.remove('drag-over', 'dragging'));

  if (draggedQIndex !== -1 && draggedQIndex !== index) {
    const movedQ = QUESTIONS.splice(draggedQIndex, 1)[0];
    QUESTIONS.splice(index, 0, movedQ);
    saveQToStorage();
    renderQList();
    showToast('↕️ تم إعادة الترتيب والترقيم بنجاح', 'success');
  }
  draggedQIndex = -1;
}

// ══════════════════════════════════════════════
//  SMART IMPORT & EXPORT
// ══════════════════════════════════════════════
function parseSmartText() {
  const raw = document.getElementById('txt-import-area').value.trim();
  if (!raw) { showToast('⚠️ أدخل نصاً أولاً', 'error'); return; }

  let lines = raw.split(/\n/).map(l => l.trim()).filter(l => l.length > 0);
  let blocks = raw.split(/\n{2,}/);
  
  if (blocks.length === 1 && lines.length > 5) {
      let newBlocks = [];
      let currentBlock = [];
      for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          if (/^(س\d+|Q\d+|\d+)[.\-):]\s*/i.test(line)) {
              if (currentBlock.length > 0) newBlocks.push(currentBlock.join('\n'));
              currentBlock = [line];
          } else {
              currentBlock.push(line);
          }
      }
      if (currentBlock.length > 0) newBlocks.push(currentBlock.join('\n'));
      blocks = newBlocks;
  }

  let added = 0, failed = 0;
  let unparsedBlocks = [];

  blocks.forEach(block => {
    const bLines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    if (bLines.length < 3) { failed++; unparsedBlocks.push(block); return; }
    
    const qText = bLines[0].replace(/^(س\d+|Q\d+|\d+)[.\-):]\s*/i,'').trim();
    let options = [], correct = null;
    const ansLine = bLines.find(l => /^(الجواب|الإجابة|correct|answer|الحل)\s*[=:]/i.test(l));
    
    bLines.slice(1).forEach(line => {
      if (/^(الجواب|الإجابة|correct|answer|الحل)\s*[=:]/i.test(line)) return;
      const isMarked = /^[*#>✓]/.test(line.trim()) || /\[صح\]|\[correct\]|\(صح\)/i.test(line);
      const cleaned = line.replace(/^[أبجدabcd١-٤1-4][.\-):]\s*/i,'').replace(/^[*#>✓\s]+/,'').replace(/\s*\[صح\]|\s*\[correct\]|\s*\(صح\)/gi,'').replace(/\s*\*$/,'').trim();
      if (cleaned) { options.push(cleaned); if (isMarked) correct = cleaned; }
    });
    
    if (ansLine && !correct) {
      const marker = ansLine.split(/[=:]/)[1].trim();
      const idx = ['أ','ب','ج','د','a','b','c','d'].indexOf(marker.toLowerCase());
      if (idx >= 0 && options[idx % 4]) correct = options[idx % 4];
      else correct = options.find(o => o.includes(marker)) || null;
    }
    
    if (options.length >= 2 && correct) { 
        QUESTIONS.push({text: qText, options: options.slice(0,4), correct}); 
        added++; 
    } else { 
        failed++; 
        unparsedBlocks.push(block); 
    }
  });

  saveQToStorage(); 
  renderQList(); 
  
  if (unparsedBlocks.length > 0) {
      document.getElementById('txt-import-area').value = unparsedBlocks.join('\n\n');
      showToast(`✅ تمت إضافة ${added} سؤال. ⚠️ لم يتم التعرف على ${failed} أجزاء (بقيت في الصندوق)`, 'warning');
  } else {
      document.getElementById('txt-import-area').value = '';
      showToast(`✅ تمت إضافة ${added} سؤال بنجاح!`, 'success');
  }
}
function parseExcelPaste() {
  const raw = document.getElementById('excel-import-area').value.trim();
  if (!raw) { showToast('⚠️ الصق جدول Excel أولاً', 'error'); return; }
  const rows = raw.split('\n').filter(r => r.trim());
  let added = 0, failed = 0;
  rows.forEach(row => {
    const cols = row.split('\t').map(c => c.trim());
    if (cols.length < 5) { failed++; return; }
    const [q, a, b, c, d, marker] = cols;
    if (!q || !a) { failed++; return; }
    const opts = [a,b,c,d].filter(Boolean);
    let correct = opts[0];
    if (marker) { const ci = parseInt(marker) - 1; if (ci >= 0 && ci < opts.length) correct = opts[ci]; else { const li = ['أ','ب','ج','د','a','b','c','d'].indexOf(marker.toLowerCase()); if (li >= 0) correct = opts[li % 4] || opts[0]; } }
    QUESTIONS.push({text: q, options: opts, correct}); added++;
  });
  saveQToStorage(); renderQList(); document.getElementById('excel-import-area').value = '';
  showToast(`✅ تمت إضافة ${added} سؤال`, 'success');
}
function parseJSONText() {
  const raw = document.getElementById('json-import-area').value.trim();
  if (!raw) { showToast('⚠️ أدخل JSON أولاً', 'error'); return; }
  try {
    let data;
    if (raw.startsWith('EPX:')) {
      const decoded = decodeData(raw.substring(4));
      data = JSON.parse(decoded);
    } else {
      let parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) && parsed.encrypted_data && parsed.encrypted_data.startsWith('EPX:')) {
        const decoded = decodeData(parsed.encrypted_data.substring(4));
        data = JSON.parse(decoded);
      } else {
        data = parsed;
      }
    }
    if (!Array.isArray(data)) throw new Error();
    let added = 0;
    data.forEach(q => {
      const text = q.text || q.q || q.question;
      const options = q.options || q.choices || q.answers;
      const correct = q.correct || q.answer || (Array.isArray(options) && options[q.correctIndex ?? q.correct_index ?? 0]);
      if (text && Array.isArray(options) && correct) { 
        QUESTIONS.push({text, options, correct, image: q.image || null, id: q.id || generateUUID()}); added++; 
      }
    });
    saveQToStorage(); renderQList(); document.getElementById('json-import-area').value = '';
    showToast(`✅ تمت إضافة ${added} سؤال`, 'success');
  } catch(e) { showToast('❌ صيغة الملف غير صحيحة', 'error'); }
}
function importJSONFile(e) { 
  const f = e.target.files[0]; if (!f) return; 
  const r = new FileReader(); 
  r.onload = ev => { 
    document.getElementById('json-import-area').value = ev.target.result; 
    parseJSONText(); 
  }; 
  r.readAsText(f); 
}
function exportQuestions() {
  if (!QUESTIONS.length) { showToast('لا توجد أسئلة للتصدير', 'error'); return; }
  const encryptedData = 'EPX:' + encodeData(JSON.stringify(QUESTIONS));
  const exportPayload = {
    _meta: "ExamPro Encrypted Question Bank",
    encrypted_data: encryptedData
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {type: 'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `أسئلة_${Date.now()}.json`; a.click();
  showToast('✅ تم تصدير الأسئلة بنجاح (مشفرة)', 'success');
}
function exportEncryptedQuestions() {
  if (!QUESTIONS.length) { showToast('لا توجد أسئلة للتصدير', 'error'); return; }
  const encoded = 'EPX:' + encodeData(JSON.stringify(QUESTIONS));
  const blob = new Blob([encoded], {type: 'text/plain'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `امتحان_مشفر_${Date.now()}.epx`; a.click();
  showToast('✅ تم تصدير ملف الامتحان المشفر للطلاب', 'success');
}

// ══════════════════════════════════════════════
//  TEMPLATES
// ══════════════════════════════════════════════
function dlText(content, filename, type) {
  const blob = new Blob(['\uFEFF' + content], {type: type + ';charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
}
function downloadTextTemplate() {
  let c = `# قالب إدخال أسئلة الاختيار من متعدد — ExamPro PCX-12\n# المطور: صهيب ابو سيف\n# الصيغة: السؤال في السطر الأول، ثم الخيارات. ضع * قبل الإجابة الصحيحة. سطر فارغ بين كل سؤال.\n\n`;
  for (let i = 1; i <= 100; i++) c += `سؤال رقم ${i}: اكتب نص السؤال هنا\n* الإجابة الصحيحة\nالخيار الثاني\nالخيار الثالث\nالخيار الرابع\n\n`;
  dlText(c, 'قالب_100_سؤال.txt', 'text/plain');
}
function downloadCSVTemplate() {
  let c = 'السؤال\tأ\tب\tج\tد\tرقم_الصواب_(1-4)\n';
  for (let i = 1; i <= 30; i++) c += `سؤال رقم ${i}\tالخيار أ\tالخيار ب\tالخيار ج\tالخيار د\t1\n`;
  dlText(c, 'قالب_Excel.csv', 'text/csv');
}
function downloadJSONTemplate() {
  const s = [{text:'ما هي عاصمة المملكة الأردنية الهاشمية؟',options:['عمان','إربد','العقبة','الزرقاء'],correct:'عمان'},{text:'كم عدد أيام الأسبوع؟',options:['5','6','7','8'],correct:'7'}];
  dlText(JSON.stringify(s, null, 2), 'قالب_JSON.json', 'application/json');
}
function downloadInstructions() {
  const c = `دليل الاستيراد — ExamPro PCX-12\nالمطور: صهيب ابو سيف | EduDesk Solutions\n\n1. TXT: السؤال+خيارات+* قبل الصواب+سطر فارغ\n2. Excel: السؤال|أ|ب|ج|د|رقم الصواب\n3. JSON: [{text,options,correct}]\n`;
  dlText(c, 'دليل_الاستيراد.txt', 'text/plain');
}
function copyPromptChatGPT() {
  const promptText = `أنت صانع أسئلة خبير. قم بتحليل النص التالي واستخرج منه أسئلة اختيار من متعدد (4 خيارات لكل سؤال). يجب أن تنسق الأسئلة بالضبط حسب هذا القالب لتسهيل استيرادها:
سؤال رقم 1: نص السؤال هنا؟
الخيار الأول
الخيار الثاني
* الخيار الثالث الصحيح (ضع نجمة قبل الإجابة الصحيحة)
الخيار الرابع

سؤال رقم 2: نص السؤال الثاني؟
* الخيار الأول الصحيح
الخيار الثاني
الخيار الثالث
الخيار الرابع

(يجب ترك سطر فارغ واحد على الأقل بين كل سؤال وآخر).
النص الذي ستستخرج منه الأسئلة:
`;
  navigator.clipboard.writeText(promptText).then(() => {
    showToast('🤖 تم نسخ البرومبت! اذهب إلى ChatGPT والصقه', 'success');
  }).catch(() => {
    showToast('⚠️ فشل النسخ، الرجاء المحاولة مرة أخرى', 'error');
  });
}
function copyFilePromptChatGPT() {
  const promptText = `أنت صانع أسئلة خبير. لقد قمت بإرفاق ملف لك.
الرجاء قراءة محتوى الملف المرفق واستخراج أسئلة اختيار من متعدد (4 خيارات لكل سؤال) بحيث تغطي أهم المفاهيم. 
يجب أن تنسق الأسئلة بالضبط حسب هذا القالب لتسهيل استيرادها:

سؤال رقم 1: نص السؤال هنا؟
الخيار الأول
الخيار الثاني
* الخيار الثالث الصحيح (ضع نجمة قبل الإجابة الصحيحة)
الخيار الرابع

سؤال رقم 2: نص السؤال الثاني؟
* الخيار الأول الصحيح
الخيار الثاني
الخيار الثالث
الخيار الرابع

(يجب ترك سطر فارغ واحد على الأقل بين كل سؤال وآخر).
استخرج أكبر قدر ممكن من الأسئلة من الملف المرفق.`;
  navigator.clipboard.writeText(promptText).then(() => {
    showToast('📄 تم نسخ برومبت الملفات! اذهب إلى ChatGPT وأرفق الملف', 'success');
  }).catch(() => {
    showToast('⚠️ فشل النسخ، الرجاء المحاولة مرة أخرى', 'error');
  });
}

// ══════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════
function shuffleArr(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function escHtml(str) { if (!str) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function pad2(n) { return n.toString().padStart(2, '0'); }
const genId = () => Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

function normalizeArabic(text) {
  if (!text) return '';
  return text.toLowerCase()
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove diacritics (tashkeel)
    .replace(/ـ/g, '') // Remove tatweel
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}
let toastTO;
function showToast(msg, type = '') {
  const ex = document.querySelector('.toast-msg'); if (ex) ex.remove(); clearTimeout(toastTO);
  const el = document.createElement('div'); el.className = 'toast-msg ' + type; el.innerHTML = msg;
  document.body.appendChild(el); toastTO = setTimeout(() => el.remove(), 3200);
}

// ══════════════════════════════════════════════
//  ENHANCED ANTI-CHEAT v2 — 9 LAYERS
// ══════════════════════════════════════════════
const CHEAT_LOG = [];
let devToolsTimer = null, devToolsOpen = false;
let examStartTime = null;
let copyAttempts = 0, pasteAttempts = 0;
let lastWinW = window.innerWidth, lastWinH = window.innerHeight;

function setupAntiCheat() {
  examStartTime = Date.now();
  CHEAT_LOG.length = 0;
  copyAttempts = 0; pasteAttempts = 0;

  document.addEventListener('keydown',         strictKeyBlock, true);
  document.addEventListener('copy',            blockCopyPaste, true);
  document.addEventListener('cut',             blockCopyPaste, true);
  document.addEventListener('paste',           blockCopyPaste, true);
  document.addEventListener('contextmenu',     blockContext,   true);
  document.addEventListener('dragstart',       blockDrag,      true);
  document.addEventListener('drop',            blockDrag,      true);
  document.addEventListener('selectstart',     blockSelect,    true);
  document.addEventListener('visibilitychange',strictVis);
  window.addEventListener('blur',              strictBlur);
  window.addEventListener('focus',             onWinFocus);
  document.addEventListener('mouseleave',      strictMouse);
  window.addEventListener('resize',            detectResize);
  window.addEventListener('beforeunload',      beforeUnload2);
  document.addEventListener('fullscreenchange',         onFSChange);
  document.addEventListener('webkitfullscreenchange',   onFSChange);

  devToolsTimer = setInterval(detectDevTools, 1200);
  tryFullscreen();
  updateCheatBadge();
}

function teardownAntiCheat() {
  document.removeEventListener('keydown',         strictKeyBlock, true);
  document.removeEventListener('copy',            blockCopyPaste, true);
  document.removeEventListener('cut',             blockCopyPaste, true);
  document.removeEventListener('paste',           blockCopyPaste, true);
  document.removeEventListener('contextmenu',     blockContext,   true);
  document.removeEventListener('dragstart',       blockDrag,      true);
  document.removeEventListener('drop',            blockDrag,      true);
  document.removeEventListener('selectstart',     blockSelect,    true);
  document.removeEventListener('visibilitychange',strictVis);
  window.removeEventListener('blur',              strictBlur);
  window.removeEventListener('focus',             onWinFocus);
  document.removeEventListener('mouseleave',      strictMouse);
  window.removeEventListener('resize',            detectResize);
  window.removeEventListener('beforeunload',      beforeUnload2);
  document.removeEventListener('fullscreenchange',         onFSChange);
  document.removeEventListener('webkitfullscreenchange',   onFSChange);
  clearInterval(devToolsTimer);
}

function strictKeyBlock(e) {
  const k = e.key;
  if (CFG.noDevTools && k === 'F12') { e.preventDefault(); e.stopPropagation(); logC('محاولة فتح DevTools (F12)'); return; }
  if (CFG.preventLeave && k === 'PrintScreen') { e.preventDefault(); e.stopPropagation(); logC('محاولة التقاط الشاشة'); return; }
  if (CFG.preventLeave && e.altKey) { e.preventDefault(); e.stopPropagation(); return; }
  if (CFG.noDevTools && e.shiftKey && k === 'F10') { e.preventDefault(); e.stopPropagation(); return; }
  
  if (e.ctrlKey || e.metaKey) {
    if (CFG.preventLeave) {
      if (k.toUpperCase() === 'C') { e.preventDefault(); e.stopPropagation(); copyAttempts++; logC('نسخ نص (Ctrl+C)'); return; }
      if (k.toUpperCase() === 'V') { e.preventDefault(); e.stopPropagation(); pasteAttempts++; logC('لصق نص (Ctrl+V)'); return; }
      if (k.toUpperCase() === 'X') { e.preventDefault(); e.stopPropagation(); copyAttempts++; logC('قص نص (Ctrl+X)'); return; }
      if (k.toUpperCase() === 'A') { e.preventDefault(); e.stopPropagation(); return; }
      if (['T','N'].includes(k.toUpperCase())) { e.preventDefault(); e.stopPropagation(); logC('محاولة فتح تبويب (Ctrl+' + k + ')'); return; }
    }
    if (CFG.noDevTools) {
      if (['I','J','U'].includes(k.toUpperCase())) { e.preventDefault(); e.stopPropagation(); logC('فتح أدوات المطور'); return; }
    }
  }
  if (k === 'Escape' && EXAM_ACTIVE) { e.preventDefault(); e.stopPropagation(); setTimeout(tryFullscreen, 150); }
}

function blockCopyPaste(e) {
  if (CFG.preventLeave) {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'copy' || e.type === 'cut') copyAttempts++;
    else pasteAttempts++;
  }
}
function blockContext(e) { if (CFG.noRight) { e.preventDefault(); e.stopPropagation(); } }
function blockDrag(e) { if (CFG.preventLeave) { e.preventDefault(); e.stopPropagation(); } }
function blockSelect(e) { if (EXAM_ACTIVE && CFG.preventLeave) e.preventDefault(); }

let visCool = false;
let visTimer = null;
function strictVis() {
  if (!CFG.preventLeave || !EXAM_ACTIVE || visCool) return;
  if (window.fsGrace || (Date.now() - examStartTime < 3000)) return;
  if (document.hidden) {
    // 2-second grace period for mobile notifications
    visTimer = setTimeout(() => {
        visCool = true;
        logC('إخفاء النافذة / تبديل التبويب');
        fireCheat('tab_switch');
        setTimeout(() => visCool = false, 2800);
    }, 2000); 
  } else {
    clearTimeout(visTimer);
  }
}

let blurCool = false;
let blurTimer = null;
function strictBlur() {
  if (!CFG.preventLeave || !EXAM_ACTIVE || blurCool || document.hidden) return;
  if (window.fsGrace || (Date.now() - examStartTime < 3000)) return;
  // 2-second grace period for unexpected blurs (like system dialogs)
  blurTimer = setTimeout(() => {
      blurCool = true;
      logC('فقدان تركيز النافذة');
      fireCheat('blur');
      setTimeout(() => blurCool = false, 2800);
  }, 2000);
}
function onWinFocus() { 
    clearTimeout(blurTimer); 
    if (EXAM_ACTIVE) tryFullscreen(); 
}

let mouseCool = false;
function strictMouse(e) {
  if (!CFG.mouseWarn || !EXAM_ACTIVE || mouseCool) return;
  if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
    mouseCool = true;
    logC('خروج المؤشر خارج حدود الامتحان');
    fireCheat('mouse');
    setTimeout(() => mouseCool = false, 3000);
  }
}

let resCool = false;
function detectResize() {
  if (!CFG.forceFS || !EXAM_ACTIVE || resCool) return;
  if (window.fsGrace || (Date.now() - examStartTime < 3000)) return;
  const dw = Math.abs(window.innerWidth - lastWinW);
  const dh = Math.abs(window.innerHeight - lastWinH);
  if (dw > 120 || dh > 120) {
    resCool = true;
    lastWinW = window.innerWidth; lastWinH = window.innerHeight;
    logC('تغيير حجم النافذة (تقسيم الشاشة؟)');
    fireCheat('resize');
    setTimeout(() => { resCool = false; tryFullscreen(); }, 3000);
  }
}

function detectDevTools() {
  if (!CFG.noDevTools || !EXAM_ACTIVE) return;
  const th = 170;
  const open = (window.outerWidth - window.innerWidth > th) || (window.outerHeight - window.innerHeight > th);
  if (open && !devToolsOpen) { devToolsOpen = true; logC('فتح أدوات المطور (تم رصد الشاشة)'); fireCheat('devtools'); }
  else if (!open) devToolsOpen = false;
}

function onFSChange() {
  if (!CFG.forceFS || !EXAM_ACTIVE) return;
  if (window.fsGrace || (Date.now() - examStartTime < 3000)) return;
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    logC('الخروج من وضع الشاشة الكاملة');
    fireCheat('fullscreen');
    setTimeout(tryFullscreen, 400);
  }
}

function beforeUnload2(e) { if (EXAM_ACTIVE && CFG.preventLeave) { e.preventDefault(); e.returnValue = 'لا يمكن مغادرة الامتحان!'; } }

function logC(reason) {
  const now = new Date();
  const ts = pad2(now.getHours()) + ':' + pad2(now.getMinutes()) + ':' + pad2(now.getSeconds());
  const el = examStartTime ? Math.floor((Date.now() - examStartTime) / 1000) : 0;
  CHEAT_LOG.push({ time: ts, elapsed: Math.floor(el/60) + ':' + pad2(el%60), reason, q: CURRENT + 1 });
}

let cheatCool = false;
function fireCheat(type) {
  if (!EXAM_ACTIVE || cheatCool) return;
  cheatCool = true;
  CHEAT_COUNT++;
  updateCheatBadge();
  const remain = CFG.cheatLimit - CHEAT_COUNT;
  const reasonMap = {
    tab_switch: 'تبديل التبويب أو إخفاء الامتحان',
    blur: 'فقدان تركيز النافذة',
    mouse: 'خروج المؤشر من حدود الامتحان',
    resize: 'تغيير حجم النافذة',
    devtools: 'فتح أدوات المطور',
    fullscreen: 'الخروج من وضع الشاشة الكاملة'
  };
  const reasonTxt = reasonMap[type] || 'مخالفة أمنية';
  const msgEl = document.getElementById('cheat-count-msg');
  if (remain > 0) {
    msgEl.innerHTML = '<span style="display:block;color:#fbbf24;margin-bottom:6px;font-size:.9rem">📌 ' + reasonTxt + '</span><span style="color:#f87171">تحذير ' + CHEAT_COUNT + ' من ' + CFG.cheatLimit + ' — متبقي ' + remain + ' محاولات</span>';
  } else {
    msgEl.innerHTML = '<span style="color:#f87171;font-size:1rem">⛔ تجاوزت الحد — سيتم التسليم الفوري</span>';
  }
  document.getElementById('cheat-overlay').classList.add('show');
  if (CHEAT_COUNT >= CFG.cheatLimit) {
    setTimeout(() => {
      document.getElementById('cheat-overlay').classList.remove('show');
      logC('تسليم تلقائي — تجاوز حد التحذيرات');
      submitExam();
    }, 4000);
  } else {
    setTimeout(() => cheatCool = false, 3000);
  }
}

function triggerCheat(type) { fireCheat(type); }
function dismissCheat() {
  document.getElementById('cheat-overlay').classList.remove('show');
  cheatCool = false;
  setTimeout(tryFullscreen, 200);
}

function updateCheatBadge() {
  let b = document.getElementById('cheat-hdr-badge');
  if (!b) {
    b = document.createElement('div');
    b.id = 'cheat-hdr-badge';
    b.className = 'cheat-hdr-badge';
    const t = document.getElementById('etb-tools');
    if (t) t.appendChild(b);
  }
  b.style.display = CHEAT_COUNT > 0 ? 'flex' : 'none';
  b.innerHTML = '<i class="fas fa-shield-exclamation"></i> تحذير ' + CHEAT_COUNT + '/' + CFG.cheatLimit;
}

function tryFullscreen() {
  if (!CFG.forceFS || !EXAM_ACTIVE) return;
  if (document.fullscreenElement || document.webkitFullscreenElement) return;
  window.fsGrace = true; setTimeout(() => window.fsGrace = false, 3500);
  try { const p = document.documentElement.requestFullscreen?.(); if (p) p.catch(() => {}); } catch(e) {}
  try { document.documentElement.webkitRequestFullscreen?.(); } catch(e) {}
}

console.log('%c ExamPro Elite v8.0 — Full Proctoring + Instructions ', 'background:#8b5cf6;color:#fff;font-weight:900;padding:4px 8px;border-radius:4px');

// ══════════════════════════════════════════════
//  PROCTORING SYSTEM v2 — 5 LAYERS
// ══════════════════════════════════════════════

// ─── Layer 1: Webcam + Silent Snapshots ───────
async function startProctoringWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video:{ width:320, height:240, facingMode:'user' }, audio:false });
    PROCTOR.webcamStream = stream;
    const vid = document.getElementById('webcam-video');
    vid.srcObject = stream;
    document.getElementById('webcam-pip').style.display = 'block';
    logProcEvent('system','📷 تم تفعيل مراقبة الكاميرا');
    // أول لقطة بعد 15 ثانية
    setTimeout(takeSilentSnapshot, 15000);
    PROCTOR.snapIV = setInterval(takeSilentSnapshot, (CFG.snapInterval || 60) * 1000);
    // تشغيل كشف الوجه إذا مفعّل
    if (CFG.enableFaceTracking && typeof faceapi !== 'undefined') startFaceTracking();
  } catch(e) {
    logProcEvent('warning','⚠️ رُفض إذن الكاميرا أو غير متوفرة');
  }
}

function takeSilentSnapshot() {
  if (!EXAM_ACTIVE) return;
  const vid = document.getElementById('webcam-video');
  const cvs = document.getElementById('snap-cvs');
  const ctx = cvs.getContext('2d');
  ctx.save(); ctx.scale(-1,1); ctx.drawImage(vid,-320,0,320,240); ctx.restore();
  const url = cvs.toDataURL('image/jpeg', 0.6);
  const ts  = new Date().toLocaleTimeString('ar-SA');
  PROCTOR.snapshots.push({ url, ts });
  const sc = document.getElementById('snap-count'); if(sc) sc.textContent = PROCTOR.snapshots.length;
}

// ─── Layer 2: AI Face Tracking ────────────────
async function startFaceTracking() {
  try {
    const MODEL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL);
    PROCTOR.faceApiReady = true;
    logProcEvent('system','🤖 محرك كشف الوجه AI جاهز');
    PROCTOR.faceIV = setInterval(runFaceDetect, 5000);
  } catch(e) {
    try {
      const MODEL2 = 'https://justadudewhohacks.github.io/face-api.js/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL2);
      PROCTOR.faceApiReady = true;
      PROCTOR.faceIV = setInterval(runFaceDetect, 5000);
    } catch(e2) { logProcEvent('warning','⚠️ تعذّر تحميل نماذج كشف الوجه'); }
  }
}

async function runFaceDetect() {
  if (!EXAM_ACTIVE || !PROCTOR.faceApiReady) return;
  if (PROCTOR.faceAlertCooldown > 0) { PROCTOR.faceAlertCooldown--; return; }
  const vid = document.getElementById('webcam-video');
  try {
    const det = await faceapi.detectAllFaces(vid, new faceapi.TinyFaceDetectorOptions({ scoreThreshold:.45 }));
    const pip = document.getElementById('webcam-pip');
    if (det.length === 0) {
      PROCTOR.faceAlerts++; PROCTOR.faceAlertCooldown = 2;
      pip.classList.add('face-warn');
      const t = new Date().toLocaleTimeString('ar-SA');
      logProcEvent('face',`👻 [${t}] اختفاء وجه الطالب`);
      fireProcAlert('face','⚠ وجه غير مرئي','لم يُرصد وجهك أمام الكاميرا — الابتعاد المتكرر يُسجَّل في تقرير الغش.');
    } else if (det.length > 1) {
      PROCTOR.faceAlerts++; PROCTOR.faceAlertCooldown = 3;
      pip.classList.add('face-warn');
      const t = new Date().toLocaleTimeString('ar-SA');
      logProcEvent('face',`👥 [${t}] رُصد ${det.length} وجوه`);
      fireProcAlert('face','⚠ وجه إضافي مكتشف',`تم رصد ${det.length} وجوه في إطار الكاميرا. التلقين من شخص آخر مخالفة صريحة.`);
    } else { pip.classList.remove('face-warn'); }
  } catch(e) {}
}

// ─── Layer 3: Microphone Noise Detection ──────
async function startProctoringMic() {
  try {
    const ms = await navigator.mediaDevices.getUserMedia({ audio:true, video:false });
    PROCTOR.micStream = ms;
    const actx = new (window.AudioContext||window.webkitAudioContext)();
    PROCTOR.audioCtxP = actx;
    const src = actx.createMediaStreamSource(ms);
    const ana = actx.createAnalyser(); ana.fftSize = 512;
    src.connect(ana); PROCTOR.micAnalyser = ana;
    document.getElementById('mic-vumeter').style.display = 'flex';
    logProcEvent('system','🎤 مراقبة الميكروفون نشطة');
    const data = new Uint8Array(ana.frequencyBinCount);
    const THRESH = 28, SECS = 3;
    let noiseDur = 0;
    PROCTOR.noiseIV = setInterval(() => {
      if (!EXAM_ACTIVE) return;
      ana.getByteFrequencyData(data);
      const avg = data.reduce((a,b)=>a+b,0)/data.length;
      const pct = Math.min(100,(avg/80)*100);
      const fill = document.getElementById('mic-bar-fill');
      const icon = document.getElementById('mic-icon-el');
      if (fill) { fill.style.height = pct+'%'; fill.style.background = avg>THRESH+20?'var(--red)':avg>THRESH?'var(--gold)':'var(--green)'; }
      if (icon) icon.style.color = avg > THRESH ? 'var(--gold)' : 'var(--text3)';
      if (avg > THRESH) {
        noiseDur += 0.3;
        if (noiseDur >= SECS) {
          noiseDur = 0; PROCTOR.noiseAlerts++;
          const t = new Date().toLocaleTimeString('ar-SA');
          logProcEvent('noise',`🔊 [${t}] رُصد صوت/همس مستمر`);
          fireProcAlert('noise','⚠ ضجيج مستمر مكتشف','تم رصد صوت مستمر قد يكون همساً أو تلقيناً. يُسجَّل هذا في تقرير المراقبة.');
        }
      } else { noiseDur = Math.max(0, noiseDur - 0.1); }
    }, 300);
  } catch(e) { logProcEvent('warning','⚠️ رُفض إذن الميكروفون'); }
}

// ─── Layer 4: Dynamic Watermark ───────────────
function startProctoringWatermark() {
  const el = document.getElementById('dyn-watermark');
  el.style.display = 'block';
  renderWatermark();
  PROCTOR.wmIV = setInterval(renderWatermark, 4500);
}

function renderWatermark() {
  const el = document.getElementById('dyn-watermark');
  if (!el || !EXAM_ACTIVE) return;
  const name = STUDENT.name || 'طالب';
  const ref  = `#EXM-${STUDENT.cls||''}`;
  const time = new Date().toLocaleTimeString('ar-SA');
  const txt  = `${name}  ·  ${ref}  ·  ${time}`;
  el.innerHTML = '';
  for (let r=0; r<6; r++) for (let c=0; c<3; c++) {
    const d = document.createElement('div');
    d.className = 'wm-line';
    d.textContent = txt;
    d.style.top  = `${(r*100/6)+(Math.random()*6-3)}%`;
    d.style.left = `${(c*100/3)+(Math.random()*12-6)}%`;
    d.style.opacity = (0.045 + Math.random()*0.03).toFixed(3);
    d.style.fontSize = (14+Math.random()*5)+'px';
    el.appendChild(d);
  }
}

// ─── Layer 5: DOM Extension Blocker ───────────
const BLOCKED_SRC = [/translate/i,/grammarly/i,/chatgpt/i,/openai/i,/copilot/i,/chrome-extension/i,/moz-extension/i,/gTranslateWidget/i];

function startExtBlocker() {
  PROCTOR.extObserver = new MutationObserver(muts => {
    if (!EXAM_ACTIVE) return;
    for (const mut of muts) {
      for (const node of mut.addedNodes) {
        if (node.nodeType !== 1) continue;
        const src = node.src||node.href||'';
        const id  = node.id||''; const cls = (node.className||'').toString();
        if (BLOCKED_SRC.some(p => p.test(src)||p.test(id)||p.test(cls))) {
          try { node.remove(); } catch(e){}
          PROCTOR.extAlerts++;
          const t = new Date().toLocaleTimeString('ar-SA');
          logProcEvent('ext',`🛡 [${t}] حظر حقن خارجي: ${src||id||node.tagName}`);
          document.getElementById('ext-block-wall').style.display='flex';
          EXAM_ACTIVE = false;
        }
      }
    }
    if (document.documentElement.lang && document.documentElement.lang !== 'ar' && EXAM_ACTIVE) {
      logProcEvent('ext',`🌐 تغيير لغة الصفحة (امتداد ترجمة)`);
      document.documentElement.lang = 'ar';
    }
  });
  PROCTOR.extObserver.observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:['lang'] });
  const ow = document.write.bind(document);
  document.write = s => { if (/<script/i.test(s)) { logProcEvent('ext','🛡 حقن عبر document.write — محظور'); return; } ow(s); };
}

// ─── Proctor Helpers ──────────────────────────
function logProcEvent(type, msg) {
  PROCTOR.cheatEvents.push({ type, msg, time: new Date().toLocaleTimeString('ar-SA') });
}

function fireProcAlert(type, title, desc) {
  if (PROCTOR.cheatWarnCooldown || !EXAM_ACTIVE) return;
  PROCTOR.cheatWarnCooldown = true;
  setTimeout(() => PROCTOR.cheatWarnCooldown = false, 18000);
  // نُطلق تحذير الغش الموجود في النظام
  logC(`[مراقبة] ${title}`);
}

function stopAllProctoring() {
  if (PROCTOR.snapIV)  clearInterval(PROCTOR.snapIV);
  if (PROCTOR.faceIV)  clearInterval(PROCTOR.faceIV);
  if (PROCTOR.noiseIV) clearInterval(PROCTOR.noiseIV);
  if (PROCTOR.wmIV)    clearInterval(PROCTOR.wmIV);
  if (PROCTOR.extObserver) PROCTOR.extObserver.disconnect();
  if (PROCTOR.webcamStream) PROCTOR.webcamStream.getTracks().forEach(t=>t.stop());
  if (PROCTOR.audioCtxP) PROCTOR.audioCtxP.close().catch(()=>{});
  if (PROCTOR.micStream) PROCTOR.micStream.getTracks().forEach(t=>t.stop());
  document.getElementById('webcam-pip').style.display  = 'none';
  document.getElementById('mic-vumeter').style.display = 'none';
  document.getElementById('dyn-watermark').style.display = 'none';
  document.getElementById('dyn-watermark').innerHTML   = '';
}

// ─── Render Proctor Report in Results ─────────
function renderProctoringReport() {
  const wrap = document.getElementById('proctor-report-wrap');
  if (!wrap) return;
  const hasData = PROCTOR.snapshots.length > 0 || PROCTOR.cheatEvents.filter(e=>e.type!=='system').length > 0 || CFG.enableWebcam || CFG.enableMic;
  if (!hasData) { wrap.style.display='none'; return; }
  wrap.style.display = '';

  // إحصائيات
  document.getElementById('pr-snaps').textContent = PROCTOR.snapshots.length;
  document.getElementById('pr-faces').textContent = PROCTOR.faceAlerts;
  document.getElementById('pr-noise').textContent = PROCTOR.noiseAlerts;
  document.getElementById('pr-ext').textContent   = PROCTOR.extAlerts;

  const total = PROCTOR.faceAlerts + PROCTOR.noiseAlerts + PROCTOR.extAlerts;
  document.getElementById('proctor-summary-text').textContent = total === 0
    ? '✅ لم تُرصد أي مخالفات'
    : `⚠ ${total} حدث مسجل — راجع التفاصيل أدناه`;

  // اللقطات
  const snapsGrid = document.getElementById('proctor-snaps-grid');
  if (PROCTOR.snapshots.length > 0) {
    snapsGrid.innerHTML = PROCTOR.snapshots.map(s =>
      `<div style="text-align:center"><img src="${s.url}" class="proctor-snap-img" title="${s.ts}"><div style="font-size:.62rem;color:var(--text3);margin-top:3px">${s.ts}</div></div>`
    ).join('');
  }

  // سجل الأحداث
  const evList = document.getElementById('proctor-events-list');
  const real = PROCTOR.cheatEvents.filter(e=>e.type!=='system');
  if (real.length > 0) {
    const cols = { face:'var(--gold)',noise:'var(--purple)',ext:'var(--red2)',warning:'var(--cyan)' };
    evList.innerHTML = real.map(ev =>
      `<div class="proctor-event"><span style="color:${cols[ev.type]||'var(--text2)'};font-size:.8rem">${ev.msg}</span></div>`
    ).join('');
  }
}

init();




// ══════════════════════════════════════════════
// UI & DESIGN ENHANCEMENTS
// ══════════════════════════════════════════════

// Theme Toggle
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('ep4_theme', isLight ? 'light' : 'dark');
  updateThemeIcons();
}

function updateThemeIcons() {
  const isLight = document.body.classList.contains('light-mode');
  document.querySelectorAll('.theme-toggle i').forEach(icon => {
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// Load theme on startup
if (localStorage.getItem('ep4_theme') === 'light') {
  document.body.classList.add('light-mode');
}
updateThemeIcons();

// Ripple Effect
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}

// Sync Indicator
let syncTimeout;
function showSyncIndicator() {
  const ind = document.getElementById('sync-indicator');
  if (ind) {
    ind.classList.add('active');
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      ind.classList.remove('active');
    }, 1500);
  }
}

// Settings Tabs
function switchSettingsTab(tabId) {
  document.querySelectorAll('.s-tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.s-tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  const activeBtn = Array.from(document.querySelectorAll('.s-tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
  if(activeBtn) activeBtn.classList.add('active');
}

// High-Res PDF Export
async function printResultsPDF() {
  const printZone = document.getElementById('results-printzone');
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التصدير...';
  btn.style.pointerEvents = 'none';

  try {
    const canvas = await html2canvas(printZone, { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: document.body.classList.contains('light-mode') ? '#f8fafc' : '#05080f' 
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    
    // Calculate A4 size
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(شهادة_امتحان_.pdf);
    
    showToast('تم تصدير الشهادة كملف PDF بنجاح!', 'success');
  } catch(e) {
    console.error(e);
    showToast('حدث خطأ أثناء تصدير PDF', 'error');
  } finally {
    btn.innerHTML = originalText;
    btn.style.pointerEvents = 'auto';
  }
}


// Expose UI functions
const _globalFunctions = { getAppQuestions: () => QUESTIONS, getAppCfg: () => CFG, toggleTheme, createRipple, switchSettingsTab, printResultsPDF, actuallyStartExam, beginExam, calcAction, cancelEdit, captureScreenshot, changePassword, checkLockPass, clearAllQuestions, clearResultsArchive, closeModal, confirmSubmit, dismissCheat, downloadCSVTemplate, downloadTextTemplate, exportEncryptedQuestions, exportQuestions, exportResultsCSV, goSplash, goStudent, handleLogoUpload, handleQImageUpload, importJSONFile, newStudent, nextQ, openGrid, openLock, parseExcelPaste, parseSmartText, prevQ, printResults, removeQImage, resetAll, saveSettings, shareResults, showScreen, submitExam, submitQuestion, switchQMTab, toggleCalc, toggleCalcMode, updateMarksCalc, selectOption, setConfidence, toggleFlag, resumeExam, clearResume, openRetryModal, revealAnswer, jumpToQ, editQuestion, deleteQuestion, copyPromptChatGPT, copyFilePromptChatGPT, moveQuestionUp, moveQuestionDown, handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleQTypeChange, insertMathEquation, handleShortAnsInput };
Object.assign(window, _globalFunctions);
})();