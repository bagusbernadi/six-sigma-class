/* Router, tahap, progress, kuis, highlight istilah */
(function () {
  'use strict';
  const T = window.TOPICS, G = window.GROUPS, W = window.WIDGETS, GLOSS = window.GLOSSARY;
  const byId = {}; T.forEach((t) => (byId[t.id] = t));
  const gmap = {}; G.forEach((g) => (gmap[g.id] = g));
  const stageOf = (t) => gmap[t.g].stage;
  const $ = (s, r) => (r || document).querySelector(s);
  const main = $('#main'), side = $('#side');

  const store = {
    get(k, d) { try { const v = localStorage.getItem('ci_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ci_' + k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
  };
  const st = { level: store.get('level', 'basic'), stage: store.get('stage', 1), done: store.get('done', {}), scores: store.get('scores', {}), theme: store.get('theme', '') };

  function applyPrefs() {
    document.body.dataset.level = st.level;
    document.body.dataset.stage = st.stage;
    if (st.theme) document.documentElement.dataset.theme = st.theme; else delete document.documentElement.dataset.theme;
    document.querySelectorAll('[data-lvl]').forEach((b) => b.classList.toggle('on', b.dataset.lvl === st.level));
    document.querySelectorAll('[data-stage]').forEach((b) => {
      const n = +b.dataset.stage, ts = T.filter((t) => stageOf(t) === n), d = ts.filter((t) => st.done[t.id]).length;
      b.classList.toggle('on', n === st.stage);
      b.querySelector('small').textContent = ({ 1: 'Dasar', 2: 'Lanjutan', 3: 'Mahir' }[n]) + ' · ' + d + '/' + ts.length + ' selesai';
    });
  }
  function setLevel(l) { st.level = l; store.set('level', l); applyPrefs(); }
  function setStage(n) { st.stage = n; store.set('stage', n); applyPrefs(); }

  /* ---------- sidebar ---------- */
  function renderSide(activeId) {
    side.innerHTML = `<a class="sl home ${!activeId ? 'on' : ''}" href="#home">🏠 Beranda</a>` +
      G.filter((g) => g.stage === st.stage).map((g) => `<div class="sg"><h5 style="--c:${g.color}">${g.name}</h5>` +
        T.filter((t) => t.g === g.id).map((t) => `<a class="sl ${t.id === activeId ? 'on' : ''}" href="#t-${t.id}"><span>${t.icon} ${t.title}</span>${st.done[t.id] ? '<i class="ck">✓</i>' : ''}</a>`).join('') + '</div>').join('') +
      `<div class="sg"><h5>Referensi</h5><a class="sl ${activeId === '_rumus' ? 'on' : ''}" href="#rumus">∑ Lembar rumus</a><a class="sl ${activeId === '_glosarium' ? 'on' : ''}" href="#glosarium">📖 Glosarium</a></div>`;
  }

  /* ---------- beranda ---------- */
  function home() {
    const ts = T.filter((t) => stageOf(t) === st.stage), done = ts.filter((t) => st.done[t.id]).length, pct = Math.round(done / ts.length * 100);
    const intro = {
      1: { h: 'Belajar Continuous Improvement', p: 'Six Sigma, TPM, Lean, dan problem solving, dijelaskan dengan analogi sehari-hari, simulasi interaktif, dan kuis. Tanpa instalasi, bisa dibuka offline.' },
      2: { h: 'Tahap 2 · Lanjutan', p: 'Alat statistik dan metode yang lebih dalam: uji hipotesis, Gauge R&R, DOE, FMEA, SMED, VSM, 8D, poka-yoke, dan perawatan mesin. Disarankan setelah Tahap 1.' },
      3: { h: 'Tahap 3 · Mahir', p: 'Statistik yang lebih dalam (regresi, ukuran sampel, data tidak normal) dan fondasi proyek (charter, SIPOC, CTQ). Cocok untuk persiapan Green/Black Belt.' }
    }[st.stage];
    main.innerHTML = `
<section class="hero">
  <h1>${intro.h}</h1>
  <p class="lead">${intro.p}</p>
  <div class="prog"><div class="bar"><span style="width:${pct}%"></span></div><small>${done} dari ${ts.length} topik selesai (${pct}%)</small></div>
  <div class="lvlbox">
    <div class="lv"><b>🌱 Pemula</b><span>Konsep, analogi, dan simulasi. Cukup untuk memahami cara berpikirnya.</span></div>
    <div class="lv"><b>🎓 Sertifikasi</b><span>Menambahkan rumus, aturan, dan istilah yang diujikan (Green/Black Belt, TPM, Lean). Aktifkan lewat tombol di pojok atas.</span></div>
  </div>
  <p class="small muted">💡 Kata yang bergaris titik-titik di dalam teks bisa diklik untuk melihat penjelasannya.</p>
</section>
<h2>Peta belajar</h2>
${G.filter((g) => g.stage === st.stage).map((g) => `<div class="grp" style="--c:${g.color}"><h3>${g.name}</h3><div class="tgrid">` +
      T.filter((t) => t.g === g.id).map((t) => `<a class="tcard ${st.done[t.id] ? 'done' : ''}" href="#t-${t.id}"><span class="ti">${t.icon}</span><b>${t.title}</b><small>${t.tag}</small><em>~${t.min} menit ${st.done[t.id] ? '· ✓ selesai' : st.scores[t.id] != null ? '· skor ' + st.scores[t.id] : ''}</em></a>`).join('') + '</div></div>').join('')}`;
    renderSide(null);
  }

  /* ---------- highlight istilah ---------- */
  const entries = GLOSS.map((e) => ({ t: e[0], d: e[1], a: e[2] || '', al: e[3] || [] }));
  const keyMap = {};
  entries.forEach((e, i) => [...e.t.split(' / '), ...e.al].forEach((k) => { k = k.trim(); if (k && !(k in keyMap)) keyMap[k] = i; }));
  const keys = Object.keys(keyMap).sort((a, b) => b.length - a.length);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let RX;
  try { RX = new RegExp('(?<![\\p{L}\\p{N}_])(' + keys.map(esc).join('|') + ')(?![\\p{L}\\p{N}_])', 'gu'); }
  catch (e) { RX = new RegExp('\\b(' + keys.map(esc).join('|') + ')\\b', 'g'); }

  function highlight(root, seen) {
    const nodes = [], tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) {
      const n = tw.currentNode;
      if (n.nodeValue.trim() && !n.parentElement.closest('h1,h2,h3,h4,h5,code,button,a,.formula,.cbadge,.w,.gl,svg,th')) nodes.push(n);
    }
    nodes.forEach((n) => {
      const text = n.nodeValue; let last = 0, frag = null;
      for (const m of text.matchAll(RX)) {
        const idx = keyMap[m[1]];
        if (idx == null || seen.has(idx)) continue;
        seen.add(idx);
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const s = document.createElement('span');
        s.className = 'gl'; s.tabIndex = 0; s.setAttribute('role', 'button'); s.dataset.g = idx; s.textContent = m[1];
        frag.appendChild(s); last = m.index + m[0].length;
      }
      if (frag) { frag.appendChild(document.createTextNode(text.slice(last))); n.parentNode.replaceChild(frag, n); }
    });
  }

  const pop = document.createElement('div');
  pop.id = 'pop'; pop.hidden = true; pop.setAttribute('role', 'dialog'); document.body.appendChild(pop);
  function showPop(el) {
    const e = entries[+el.dataset.g];
    pop.innerHTML = `<button class="x" aria-label="Tutup">×</button><b>${e.t}</b><p>${e.d}</p>${e.a ? `<p class="an">💡 ${e.a}</p>` : ''}<a href="#glosarium">Buka glosarium →</a>`;
    pop.hidden = false;
    const r = el.getBoundingClientRect(), pw = Math.min(330, innerWidth - 16);
    pop.style.width = pw + 'px';
    let left = r.left + scrollX; left = Math.max(8 + scrollX, Math.min(left, scrollX + innerWidth - pw - 8));
    let top = r.bottom + scrollY + 8;
    if (r.bottom + pop.offsetHeight + 12 > innerHeight && r.top > pop.offsetHeight + 12) top = r.top + scrollY - pop.offsetHeight - 8;
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  document.addEventListener('click', (ev) => {
    const g = ev.target.closest && ev.target.closest('.gl');
    if (g) { ev.preventDefault(); showPop(g); return; }
    if (ev.target.closest && (ev.target.closest('#pop .x') || !ev.target.closest('#pop') || ev.target.closest('#pop a'))) pop.hidden = true;
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') pop.hidden = true;
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('gl')) { ev.preventDefault(); showPop(ev.target); }
  });

  /* ---------- kuis ---------- */
  function quiz(t, box) {
    const qs = t.quiz; let answered = 0, correct = 0;
    box.innerHTML = `<h2>📝 Kuis singkat</h2>` + qs.map((q, i) => `<div class="q" data-q="${i}"><p><b>${i + 1}.</b> ${q.q}</p>${q.o.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join('')}<div class="why" hidden></div></div>`).join('') + '<div class="result" hidden></div>';
    box.querySelectorAll('.q').forEach((qe) => {
      const q = qs[+qe.dataset.q];
      qe.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        if (qe.dataset.done) return; qe.dataset.done = 1; answered++;
        const ok = +b.dataset.j === q.a; if (ok) correct++;
        qe.querySelectorAll('.opt').forEach((x, k) => { x.disabled = true; if (k === q.a) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        const w = qe.querySelector('.why'); w.hidden = false; w.innerHTML = (ok ? '✅ Benar. ' : '❌ Kurang tepat. ') + q.w;
        if (answered === qs.length) {
          const r = box.querySelector('.result'); r.hidden = false;
          const best = st.scores[t.id] != null ? Math.max(parseInt(st.scores[t.id]), correct) : correct;
          st.scores[t.id] = best + '/' + qs.length; store.set('scores', st.scores);
          const pass = correct >= Math.ceil(qs.length * 0.67);
          if (pass && !st.done[t.id]) { st.done[t.id] = true; store.set('done', st.done); syncDone(t.id); renderSide(t.id); applyPrefs(); }
          r.innerHTML = `<b>Skor: ${correct}/${qs.length}</b> — ${pass ? '🎉 Bagus! Topik ditandai selesai.' : 'Baca ulang bagian yang kurang, lalu coba lagi.'} <button class="btn ghost" data-a="retry">Ulangi kuis</button>`;
          r.querySelector('[data-a=retry]').onclick = () => quiz(t, box);
        }
      }));
    });
  }
  function syncDone(id) {
    const b = $('#donebtn'); if (!b) return;
    b.textContent = st.done[id] ? '✓ Selesai (klik untuk batalkan)' : 'Tandai selesai';
    b.classList.toggle('on', !!st.done[id]);
  }

  /* ---------- halaman topik ---------- */
  function topic(id) {
    const t = byId[id]; if (!t) return home();
    const g = gmap[t.g];
    if (st.stage !== g.stage) setStage(g.stage);
    const list = T.filter((x) => stageOf(x) === g.stage), i = list.indexOf(t), prev = list[i - 1], next = list[i + 1];
    main.innerHTML = `<div class="crumb"><a href="#home">Beranda</a> › Tahap ${g.stage} › ${g.name}</div>
<h1>${t.icon} ${t.title}</h1><p class="lead">${t.tag}</p>
<div class="meta"><span class="chip" style="--c:${g.color}">${g.name}</span><span>⏱ ~${t.min} menit</span><button id="donebtn" class="btn ghost small"></button></div>
<div id="secs"></div><div class="quiz" id="quiz"></div>
<div class="pn">${prev ? `<a href="#t-${prev.id}">← ${prev.title}</a>` : '<span></span>'}${next ? `<a href="#t-${next.id}">${next.title} →</a>` : '<span></span>'}</div>`;
    const secs = $('#secs'), els = [];
    t.sec.forEach((s) => {
      const d = document.createElement('section'); d.className = 'sec' + (s.lvl === 'cert' ? ' cert' : '');
      if (s.lvl === 'cert') d.innerHTML = '<div class="cbadge">🎓 Level sertifikasi</div>';
      if (s.h) d.insertAdjacentHTML('beforeend', s.h);
      if (s.w) {
        const box = document.createElement('div'); box.className = 'w'; d.appendChild(box);
        try { W[s.w](box, s.data); } catch (e) { box.textContent = 'Widget gagal dimuat: ' + e.message; console.error(e); }
      }
      secs.appendChild(d); els.push([d, s.lvl === 'cert']);
    });
    const seen = new Set();
    els.filter((x) => !x[1]).forEach((x) => highlight(x[0], seen));
    els.filter((x) => x[1]).forEach((x) => highlight(x[0], seen));
    quiz(t, $('#quiz'));
    $('#donebtn').onclick = () => { st.done[id] = !st.done[id]; store.set('done', st.done); syncDone(id); renderSide(id); applyPrefs(); };
    syncDone(id); renderSide(id); applyPrefs(); pop.hidden = true; window.scrollTo(0, 0);
  }

  /* ---------- referensi ---------- */
  function rumus() {
    main.innerHTML = `<h1>∑ Lembar rumus</h1><p class="lead">Ringkasan rumus utama. Pegangan cepat untuk belajar dan ujian.</p>` +
      window.FORMULAS.map((g) => `<h3>${g.g}</h3><table class="tbl">${g.items.map((r) => `<tr><td>${r[0]}</td><td><code>${r[1]}</code></td></tr>`).join('')}</table>`).join('');
    renderSide('_rumus');
  }
  function glosarium() {
    main.innerHTML = `<h1>📖 Glosarium</h1><p class="muted">${entries.length} istilah. Ketik untuk mencari.</p><input class="search" id="q" placeholder="Cari istilah…"><dl id="gl"></dl>`;
    const sorted = entries.slice().sort((a, b) => a.t.localeCompare(b.t, 'id'));
    const draw = (f) => {
      f = f.toLowerCase();
      $('#gl').innerHTML = sorted.filter((e) => (e.t + e.d + e.al.join(' ')).toLowerCase().includes(f)).map((e) => `<dt>${e.t}</dt><dd>${e.d}${e.a ? `<br><span class="an">💡 ${e.a}</span>` : ''}</dd>`).join('') || '<p class="muted">Tidak ditemukan.</p>';
    };
    $('#q').addEventListener('input', (e) => draw(e.target.value)); draw('');
    renderSide('_glosarium');
  }

  /* ---------- router ---------- */
  function route() {
    const h = location.hash.replace(/^#/, '');
    document.body.classList.remove('menu');
    pop.hidden = true;
    if (!h || h === 'home') home();
    else if (h.startsWith('t-')) topic(h.slice(2));
    else if (h === 'rumus') rumus();
    else if (h === 'glosarium') glosarium();
    else home();
    applyPrefs();
  }

  document.querySelectorAll('[data-lvl]').forEach((b) => b.addEventListener('click', () => setLevel(b.dataset.lvl)));
  document.querySelectorAll('[data-stage]').forEach((b) => b.addEventListener('click', () => {
    setStage(+b.dataset.stage);
    if (location.hash === '#home' || !location.hash) route(); else location.hash = '#home';
  }));
  $('#theme').addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    st.theme = dark ? 'light' : 'dark'; store.set('theme', st.theme); applyPrefs();
  });
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu'));
  window.addEventListener('hashchange', route);
  applyPrefs(); route();
})();
