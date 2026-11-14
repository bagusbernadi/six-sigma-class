/* Widget interaktif. Tiap widget: WIDGETS.nama(el, data) */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const W = (window.WIDGETS = {});

  /* ---------- helpers ---------- */
  function S(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, str, attrs) {
    const t = S('text', Object.assign({ x, y, class: 't' }, attrs || {}), parent);
    t.textContent = str;
    return t;
  }
  const fmt = (v, d = 2) => (isFinite(v) ? v.toFixed(d) : '–');
  const nf = (v) => Math.round(v).toLocaleString('id-ID');

  function ctrl(k, label, min, max, step, val, unit) {
    return `<label class="ctrl"><span>${label}</span><input type="range" data-k="${k}" data-u="${unit || ''}" min="${min}" max="${max}" step="${step}" value="${val}"><output>${val}${unit || ''}</output></label>`;
  }
  function wire(el, update) {
    el.querySelectorAll('input[type=range]').forEach((i) => {
      i.addEventListener('input', () => {
        i.nextElementSibling.textContent = i.value + (i.dataset.u || '');
        update();
      });
    });
  }
  const val = (el, k) => +el.querySelector('[data-k="' + k + '"]').value;
  const out = (el, k, v) => { el.querySelector('[data-o="' + k + '"]').innerHTML = v; };

  /* ---------- matematika ---------- */
  function erf(x) {
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const cdf = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const pdf = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
  function invnorm(p) {
    const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    const pl = 0.02425, ph = 1 - pl; let q, r;
    if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > ph) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function gauss(rnd) {
    let u = 0, v = 0;
    while (u === 0) u = rnd();
    while (v === 0) v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /* kurva normal dengan area di luar spesifikasi diwarnai */
  function curve(svg, o) {
    const Wd = 640, Ht = 220, pad = 26;
    const { m, sd, lsl, usl, x0, x1 } = o;
    svg.innerHTML = '';
    svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`);
    const n = 160;
    let ymax = 0;
    for (let i = 0; i <= n; i++) ymax = Math.max(ymax, pdf(x0 + (x1 - x0) * i / n, m, sd));
    ymax *= 1.12;
    const X = (x) => pad + (x - x0) / (x1 - x0) * (Wd - 2 * pad);
    const Y = (y) => Ht - pad - (y / ymax) * (Ht - 2 * pad);
    const region = (a, b, cls) => {
      a = Math.max(a, x0); b = Math.min(b, x1);
      if (b <= a) return;
      const k = 60; let d = `M${X(a)},${Y(0)}`;
      for (let i = 0; i <= k; i++) { const x = a + (b - a) * i / k; d += `L${X(x)},${Y(pdf(x, m, sd))}`; }
      d += `L${X(b)},${Y(0)}Z`;
      S('path', { d, class: cls }, svg);
    };
    const hasL = typeof lsl === 'number', hasU = typeof usl === 'number';
    if (hasL && hasU) { region(x0, lsl, 'bad'); region(lsl, usl, 'good'); region(usl, x1, 'bad'); }
    else if (hasU) { region(x0, usl, 'good'); region(usl, x1, 'bad'); }
    let d = '';
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; d += (i ? 'L' : 'M') + X(x) + ',' + Y(pdf(x, m, sd)); }
    S('path', { d, class: 'line' }, svg);
    S('line', { x1: pad, x2: Wd - pad, y1: Y(0), y2: Y(0), class: 'axis' }, svg);
    const vline = (x, label, cls) => {
      if (x < x0 || x > x1) return;
      S('line', { x1: X(x), x2: X(x), y1: 14, y2: Y(0), class: cls }, svg);
      txt(svg, X(x), 10, label, { 'text-anchor': 'middle', class: 't small' });
    };
    if (hasL) vline(lsl, 'LSL', 'spec');
    if (hasU) vline(usl, 'USL', 'spec');
    if (o.showMean !== false) vline(m, 'μ', 'mean');
  }

  /* ============ 1. variation ============ */
  W.variation = function (el) {
    el.innerHTML = `<div class="w-title">🎯 Simulasi tembakan: akurat vs presisi</div>
<div class="w-grid"><div><svg viewBox="0 0 300 300" class="svgfull"></svg></div><div>
${ctrl('sd', 'Variasi (makin kecil makin presisi)', 2, 60, 1, 15)}
${ctrl('bias', 'Bias dari target (makin kecil makin akurat)', 0, 80, 1, 0)}
<div class="btns"><button class="btn" data-a="shoot">Tembak 50×</button><button class="btn ghost" data-a="reset">Reset</button></div>
<div class="out"><div><b data-o="n">0</b><small>tembakan</small></div><div><b data-o="hit">–</b><small>kena zona hijau</small></div></div>
<p class="note" data-o="msg"></p></div></div>`;
    const svg = el.querySelector('svg');
    [150, 115, 80, 45].forEach((r, i) => S('circle', { cx: 150, cy: 150, r, class: i === 3 ? 'zone' : 'ring' }, svg));
    S('line', { x1: 150, x2: 150, y1: 140, y2: 160, class: 'axis' }, svg);
    S('line', { x1: 140, x2: 160, y1: 150, y2: 150, class: 'axis' }, svg);
    const g = S('g', {}, svg);
    let n = 0, hit = 0, timer = null;
    const rnd = Math.random;
    function msg() {
      const sd = val(el, 'sd'), b = val(el, 'bias');
      let m;
      if (sd <= 12 && b <= 12) m = '✅ Akurat dan presisi: hampir semua kena zona hijau.';
      else if (sd <= 12) m = '🎯 Presisi tapi tidak akurat: hasil rapat tetapi meleset. Cukup <b>geser setelan</b> (mudah diperbaiki).';
      else if (b <= 12) m = '🌫️ Akurat rata-rata tapi tidak presisi: tersebar. Perlu <b>mengurangi variasi</b>. Inilah yang dikejar Six Sigma.';
      else m = '⚠️ Tidak akurat dan tidak presisi: perbaiki variasi dulu, baru koreksi bias.';
      out(el, 'msg', m);
    }
    function shoot() {
      clearInterval(timer);
      let k = 0;
      timer = setInterval(() => {
        if (!el.isConnected || k >= 50) { clearInterval(timer); return; }
        k++; n++;
        const sd = val(el, 'sd'), b = val(el, 'bias');
        const x = 150 + b + gauss(rnd) * sd, y = 150 + gauss(rnd) * sd;
        const inside = Math.hypot(x - 150, y - 150) <= 45;
        if (inside) hit++;
        S('circle', { cx: x, cy: y, r: 3.5, class: inside ? 'dot ok' : 'dot ng' }, g);
        out(el, 'n', n);
        out(el, 'hit', Math.round(hit / n * 100) + '%');
      }, 35);
    }
    el.querySelector('[data-a=shoot]').onclick = shoot;
    el.querySelector('[data-a=reset]').onclick = () => { clearInterval(timer); g.innerHTML = ''; n = 0; hit = 0; out(el, 'n', 0); out(el, 'hit', '–'); };
    wire(el, msg); msg();
  };

  /* ============ 2. stepper (DMAIC & PDCA) ============ */
  W.stepper = function (el, data) {
    const st = data.steps;
    el.innerHTML = `<div class="w-title">🧭 Klik tiap tahap</div>
<div class="track" style="--p:${100 / (st.length * 2)}%"><div class="runner"></div>${st.map((s, i) => `<button class="node" data-i="${i}"><span>${s.k}</span><small>${s.t}</small></button>`).join('')}</div>
<div class="panel"></div>
<div class="btns"><button class="btn ghost" data-a="play">▶ Putar otomatis</button></div>`;
    const nodes = el.querySelectorAll('.node'), runner = el.querySelector('.runner'), panel = el.querySelector('.panel');
    let cur = 0, timer = null;
    function show(i) {
      cur = i;
      nodes.forEach((n, j) => { n.classList.toggle('on', j === i); n.classList.toggle('past', j < i); });
      runner.style.left = (100 / (st.length * 2) + i * (100 / st.length)) + '%';
      const s = st[i];
      panel.innerHTML = `<h4>${s.k} — ${s.t}</h4><p class="q">${s.q}</p><p>💡 ${s.a}</p><p><b>Alat:</b> ${s.tools}</p><p class="cert"><b>🎓 Sertifikasi:</b> ${s.cert}</p>`;
    }
    nodes.forEach((n) => n.addEventListener('click', () => { stop(); show(+n.dataset.i); }));
    function stop() { clearInterval(timer); timer = null; el.querySelector('[data-a=play]').textContent = '▶ Putar otomatis'; }
    el.querySelector('[data-a=play]').onclick = () => {
      if (timer) { stop(); return; }
      el.querySelector('[data-a=play]').textContent = '⏸ Jeda';
      timer = setInterval(() => { if (!el.isConnected) { stop(); return; } show((cur + 1) % st.length); }, 2800);
    };
    show(0);
  };

  /* ============ 3. sigma ============ */
  W.sigma = function (el) {
    el.innerHTML = `<div class="w-title">🧮 Kalkulator DPMO & sigma level</div>
<div class="w-grid"><div>
<label class="num"><span>Jumlah unit diperiksa</span><input type="number" data-n="units" value="1000" min="1"></label>
<label class="num"><span>Peluang salah per unit</span><input type="number" data-n="opp" value="10" min="1"></label>
<label class="num"><span>Total defect ditemukan</span><input type="number" data-n="def" value="65" min="0"></label>
<label class="chk"><input type="checkbox" data-n="shift" checked> Pakai pergeseran 1.5σ (konvensi)</label>
<div class="btns"><button class="btn ghost" data-p="1000,1,10000">99% benar</button><button class="btn ghost" data-p="1000000,1,3.4">6σ</button><button class="btn ghost" data-p="1000,10,5">Contoh kuis</button></div>
</div><div>
<div class="out"><div><b data-o="dpmo">–</b><small>DPMO</small></div><div><b data-o="yield">–</b><small>Yield</small></div><div><b data-o="sig">–</b><small>Sigma level</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide"></svg>
<p class="note small">Kurva normal standar. Area merah = bagian yang menjadi defect (jangka panjang).</p>`;
    const g = (k) => el.querySelector('[data-n="' + k + '"]');
    const svg = el.querySelector('svg');
    function upd() {
      const u = Math.max(1, +g('units').value || 1), op = Math.max(1, +g('opp').value || 1), d = Math.max(0, +g('def').value || 0);
      const dpo = Math.min(1, d / (u * op)), dpmo = dpo * 1e6;
      const yld = (1 - dpo) * 100;
      let sig, z;
      if (dpo <= 0) { sig = '≥ 6.0'; z = 5; }
      else { z = invnorm(1 - dpo); sig = fmt(z + (g('shift').checked ? 1.5 : 0), 2); }
      out(el, 'dpmo', nf(dpmo)); out(el, 'yield', fmt(yld, 3) + '%'); out(el, 'sig', sig + 'σ');
      out(el, 'msg', `DPU = ${fmt(d / u, 3)} defect per unit. ${dpmo > 66807 ? 'Di bawah 3σ: banyak ruang perbaikan.' : dpmo > 6210 ? 'Sekitar 3–4σ: umum di banyak proses.' : dpmo > 233 ? 'Sekitar 4–5σ: proses cukup baik.' : 'Sekitar 5σ atau lebih: kelas dunia.'}`);
      curve(svg, { m: 0, sd: 1, usl: Math.min(z, 4.4), x0: -4, x1: 4.5, showMean: false });
    }
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', upd));
    el.querySelectorAll('[data-p]').forEach((b) => b.onclick = () => { const [u, o, d] = b.dataset.p.split(','); g('units').value = u; g('opp').value = o; g('def').value = d; upd(); });
    upd();
  };

  /* ============ 4. rty ============ */
  W.rty = function (el) {
    const steps = [['Masak', 95], ['Kemas', 97], ['Kirim', 93], ['Diterima benar', 98]];
    el.innerHTML = `<div class="w-title">🍱 RTY: proses pesan-antar makanan</div>
<div class="w-grid"><div>${steps.map((s, i) => ctrl('s' + i, s[0] + ' (FPY)', 70, 100, 0.5, s[1], '%')).join('')}</div>
<div><div class="out"><div><b data-o="avg">–</b><small>Rata-rata FPY</small></div><div><b data-o="rty">–</b><small>RTY (kali)</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 120"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const v = steps.map((_, i) => val(el, 's' + i) / 100);
      const rty = v.reduce((a, b) => a * b, 1), avg = v.reduce((a, b) => a + b, 0) / v.length;
      out(el, 'avg', fmt(avg * 100, 1) + '%'); out(el, 'rty', fmt(rty * 100, 1) + '%');
      out(el, 'msg', `Tiap langkah terlihat ≈ ${fmt(avg * 100, 0)}%, tetapi hanya <b>${fmt(rty * 100, 1)}%</b> pesanan yang sempurna dari awal sampai akhir. Sisanya adalah "pabrik tersembunyi" (rework, ganti rugi).`);
      svg.innerHTML = '';
      let x = 20, w = 600, cur = 1;
      txt(svg, 20, 14, 'Dari 100 pesanan, yang tetap sempurna:', { class: 't small' });
      v.forEach((p, i) => {
        cur *= p;
        const bw = w * cur;
        S('rect', { x: 20, y: 24 + i * 22, width: bw, height: 16, rx: 3, class: 'bar' + (i === v.length - 1 ? ' acc' : '') }, svg);
        txt(svg, 24 + bw, 36 + i * 22, `${steps[i][0]}: ${fmt(cur * 100, 1)}`, { class: 't small', 'text-anchor': bw > 400 ? 'end' : 'start', dx: bw > 400 ? -6 : 4 });
      });
    }
    wire(el, upd); upd();
  };

  /* ============ 5. cpk ============ */
  W.cpk = function (el) {
    el.innerHTML = `<div class="w-title">🚗 Garasi (spesifikasi) vs mobil (sebaran proses)</div>
<div class="w-grid"><div>
${ctrl('m', 'Rata-rata proses (μ)', 88, 112, 0.5, 100)}
${ctrl('sd', 'Variasi (σ)', 0.5, 8, 0.1, 2.5)}
<p class="note small">Spesifikasi tetap: LSL = 90, USL = 110, target = 100.</p></div>
<div><div class="out"><div><b data-o="cp">–</b><small>Cp</small></div><div><b data-o="cpk">–</b><small>Cpk</small></div><div><b data-o="ppm">–</b><small>ppm di luar spek</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide"></svg>`;
    const svg = el.querySelector('svg'), LSL = 90, USL = 110;
    function upd() {
      const m = val(el, 'm'), sd = val(el, 'sd');
      const cp = (USL - LSL) / (6 * sd), cpk = Math.min(USL - m, m - LSL) / (3 * sd);
      const ppm = (cdf((LSL - m) / sd) + 1 - cdf((USL - m) / sd)) * 1e6;
      out(el, 'cp', fmt(cp)); out(el, 'cpk', fmt(cpk)); out(el, 'ppm', nf(ppm));
      let msg;
      if (cpk >= 1.67) msg = '🟢 Sangat mampu.';
      else if (cpk >= 1.33) msg = '🟢 Mampu (memenuhi standar umum 1.33).';
      else if (cpk >= 1) msg = '🟡 Marginal: sebagian kecil produk bisa keluar spesifikasi.';
      else msg = '🔴 Tidak mampu: banyak produk reject.';
      if (cp - cpk > 0.3) msg += ' Cp jauh di atas Cpk, jadi masalahnya <b>rata-rata tidak di tengah</b>: geser setelan.';
      else if (cp < 1) msg += ' Cp rendah, masalahnya <b>variasi terlalu besar</b>.';
      out(el, 'msg', msg);
      curve(svg, { m, sd, lsl: LSL, usl: USL, x0: 78, x1: 122 });
    }
    wire(el, upd); upd();
  };

  /* ============ 6. control chart ============ */
  W.control = function (el) {
    el.innerHTML = `<div class="w-title">📈 Waktu tempuh ke kantor (menit)</div>
${ctrl('shift', 'Pergeseran rata-rata mulai titik 21 (dalam σ)', 0, 3, 0.5, 0)}
<label class="chk"><input type="checkbox" data-k="spike"> Tambah lonjakan (kecelakaan di titik 28)</label>
<div class="btns"><button class="btn ghost" data-a="new">🎲 Data baru</button></div>
<svg class="svgfull wide"></svg>
<ul class="sig" data-o="sig"></ul>`;
    const svg = el.querySelector('svg');
    let seed = 7, z = [];
    const N = 40;
    function gen() { const r = mulberry(seed); z = Array.from({ length: N }, () => gauss(r)); }
    function upd() {
      const shift = val(el, 'shift'), spike = el.querySelector('[data-k=spike]').checked;
      const x = z.map((v, i) => 30 + 2 * v + (i >= 20 ? shift * 2 : 0) + (spike && i === 27 ? 9 : 0));
      const base = x.slice(0, 20), cl = base.reduce((a, b) => a + b, 0) / 20;
      let mr = 0; for (let i = 1; i < 20; i++) mr += Math.abs(base[i] - base[i - 1]); mr /= 19;
      const sg = mr / 1.128, ucl = cl + 3 * sg, lcl = cl - 3 * sg;
      const flag = new Array(N).fill(false), msgs = new Set();
      x.forEach((v, i) => { if (v > ucl || v < lcl) { flag[i] = true; msgs.add('Aturan 1: titik di luar batas kontrol (special cause).'); } });
      for (let i = 7; i < N; i++) {
        const seg = x.slice(i - 7, i + 1);
        if (seg.every((v) => v > cl) || seg.every((v) => v < cl)) { for (let j = i - 7; j <= i; j++) flag[j] = true; msgs.add('Aturan 2: 8 titik berturut-turut di satu sisi garis tengah (rata-rata bergeser).'); }
      }
      for (let i = 5; i < N; i++) {
        let up = true, dn = true;
        for (let j = i - 4; j <= i; j++) { if (!(x[j] > x[j - 1])) up = false; if (!(x[j] < x[j - 1])) dn = false; }
        if (up || dn) { for (let j = i - 5; j <= i; j++) flag[j] = true; msgs.add('Aturan 3: 6 titik naik (atau turun) terus (tren).'); }
      }
      const Wd = 640, Ht = 250, padL = 40, padR = 20, padT = 14, padB = 22;
      const lo = cl - 5 * sg, hi = cl + 5 * sg;
      const X = (i) => padL + i * (Wd - padL - padR) / (N - 1), Y = (v) => padT + (hi - v) / (hi - lo) * (Ht - padT - padB);
      svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`); svg.innerHTML = '';
      [[ucl, 'UCL', 'ucl'], [cl, 'CL', 'cl'], [lcl, 'LCL', 'ucl']].forEach(([v, l, c]) => {
        S('line', { x1: padL, x2: Wd - padR, y1: Y(v), y2: Y(v), class: c }, svg);
        txt(svg, 4, Y(v) + 4, l, { class: 't small' });
      });
      [cl + 2 * sg, cl - 2 * sg].forEach((v) => S('line', { x1: padL, x2: Wd - padR, y1: Y(v), y2: Y(v), class: 'grid' }, svg));
      S('line', { x1: X(19.5), x2: X(19.5), y1: padT, y2: Ht - padB, class: 'grid dash' }, svg);
      txt(svg, X(19.5) - 4, Ht - 8, '← baseline', { class: 't small', 'text-anchor': 'end' });
      txt(svg, X(19.5) + 4, Ht - 8, 'pemantauan →', { class: 't small' });
      S('polyline', { points: x.map((v, i) => X(i) + ',' + Y(v)).join(' '), class: 'line' }, svg);
      x.forEach((v, i) => S('circle', { cx: X(i), cy: Y(v), r: flag[i] ? 5 : 3, class: flag[i] ? 'dot ng' : 'dot ok' }, svg));
      el.querySelector('[data-o=sig]').innerHTML = msgs.size ? [...msgs].map((m) => '<li class="bad">🚨 ' + m + '</li>').join('') : '<li class="good">✅ Tidak ada sinyal: variasi hanya common cause. Jangan setel apa-apa.</li>';
    }
    el.querySelector('[data-a=new]').onclick = () => { seed = Math.floor(Math.random() * 1e6); gen(); upd(); };
    el.querySelector('[data-k=spike]').addEventListener('change', upd);
    wire(el, upd); gen(); upd();
  };

  /* ============ 7. pareto ============ */
  W.pareto = function (el) {
    const rows = [['Makanan dingin', 42], ['Pelayanan lambat', 30], ['Salah pesanan', 14], ['Harga mahal', 8], ['Toilet kotor', 4], ['Lainnya', 2]];
    el.innerHTML = `<div class="w-title">🍽️ Keluhan pelanggan restoran (ubah angkanya)</div>
<div class="rows">${rows.map((r, i) => `<div class="prow"><input type="text" data-t="${i}" value="${r[0]}"><input type="number" data-c="${i}" value="${r[1]}" min="0"></div>`).join('')}</div>
<svg class="svgfull wide"></svg><p class="note" data-o="msg"></p>`;
    const svg = el.querySelector('svg');
    function upd() {
      const d = rows.map((_, i) => ({ n: el.querySelector(`[data-t="${i}"]`).value || '-', c: Math.max(0, +el.querySelector(`[data-c="${i}"]`).value || 0) })).sort((a, b) => b.c - a.c);
      const tot = d.reduce((a, b) => a + b.c, 0) || 1;
      let cum = 0; d.forEach((r) => { cum += r.c; r.cum = cum / tot; });
      const vital = []; let reached = false;
      d.forEach((r) => { if (!reached) vital.push(r); if (r.cum >= 0.8) reached = true; });
      const Wd = 640, Ht = 260, padL = 40, padR = 40, padT = 14, padB = 56, bw = (Wd - padL - padR) / d.length;
      const mx = d[0].c || 1, Y = (v) => padT + (1 - v / mx) * (Ht - padT - padB), Yp = (p) => padT + (1 - p) * (Ht - padT - padB);
      svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`); svg.innerHTML = '';
      S('line', { x1: padL, x2: Wd - padR, y1: Yp(0.8), y2: Yp(0.8), class: 'ucl dash' }, svg);
      txt(svg, Wd - padR + 4, Yp(0.8) + 4, '80%', { class: 't small' });
      S('line', { x1: padL, x2: Wd - padR, y1: Yp(0), y2: Yp(0), class: 'axis' }, svg);
      d.forEach((r, i) => {
        const h = (Ht - padT - padB) * r.c / mx, isV = vital.includes(r);
        S('rect', { x: padL + i * bw + 6, y: Ht - padB - h, width: bw - 12, height: h, rx: 3, class: 'bar' + (isV ? ' acc' : '') }, svg);
        txt(svg, padL + i * bw + bw / 2, Ht - padB - h - 4, r.c, { 'text-anchor': 'middle', class: 't small' });
        const t = txt(svg, padL + i * bw + bw / 2, Ht - padB + 14, r.n.length > 14 ? r.n.slice(0, 13) + '…' : r.n, { 'text-anchor': 'middle', class: 't small' });
        t.setAttribute('transform', `rotate(18 ${padL + i * bw + bw / 2} ${Ht - padB + 14})`);
      });
      S('polyline', { points: d.map((r, i) => (padL + i * bw + bw / 2) + ',' + Yp(r.cum)).join(' '), class: 'line2' }, svg);
      d.forEach((r, i) => S('circle', { cx: padL + i * bw + bw / 2, cy: Yp(r.cum), r: 3.5, class: 'dot2' }, svg));
      txt(svg, 6, padT + 8, mx, { class: 't small' });
      const pct = Math.round(vital[vital.length - 1].cum * 100);
      out(el, 'msg', `<b>Vital few:</b> ${vital.map((r) => r.n).join(' + ')} = <b>${pct}%</b> dari semua keluhan. Mulai selesaikan dari sini.`);
    }
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', upd));
    upd();
  };

  /* ============ 8. oee ============ */
  W.oee = function (el) {
    el.innerHTML = `<div class="w-title">☕ Kedai kopi: ke mana waktu produktif pergi?</div>
<div class="w-grid"><div>
${ctrl('plan', 'Waktu terjadwal', 240, 720, 10, 480, ' mnt')}
${ctrl('down', 'Downtime (rusak + ganti setup)', 0, 240, 5, 60, ' mnt')}
${ctrl('ideal', 'Ideal cycle time', 10, 60, 1, 30, ' dtk')}
${ctrl('total', 'Total produk dibuat', 0, 1000, 5, 700, '')}
${ctrl('rej', 'Produk reject', 0, 200, 1, 35, '')}
</div><div>
<div class="out"><div><b data-o="a">–</b><small>Availability</small></div><div><b data-o="p">–</b><small>Performance</small></div><div><b data-o="q">–</b><small>Quality</small></div><div class="big"><b data-o="oee">–</b><small>OEE</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const plan = val(el, 'plan'), down = Math.min(val(el, 'down'), plan - 10), ideal = val(el, 'ideal');
      const total = val(el, 'total'), rej = Math.min(val(el, 'rej'), total);
      const run = plan - down;
      const A = run / plan, rawP = ideal * total / 60 / run, P = Math.min(1, rawP), Q = total ? (total - rej) / total : 0;
      const oee = A * P * Q;
      out(el, 'a', fmt(A * 100, 1) + '%'); out(el, 'p', fmt(P * 100, 1) + '%'); out(el, 'q', fmt(Q * 100, 1) + '%'); out(el, 'oee', fmt(oee * 100, 1) + '%');
      const worst = [['Availability (mesin berhenti)', A], ['Performance (jalan pelan/macet kecil)', P], ['Quality (reject)', Q]].sort((a, b) => a[1] - b[1])[0][0];
      out(el, 'msg', (rawP > 1 ? '⚠️ Total produk melebihi kapasitas ideal, Performance dibatasi 100%. ' : '') + `${oee >= 0.85 ? '🟢 World class.' : oee >= 0.6 ? '🟡 Rata-rata industri.' : '🔴 Banyak ruang perbaikan.'} Kebocoran terbesar: <b>${worst}</b>.`);
      const Wd = 640, Ht = 200, pad = 20, bw = 110, gap = (Wd - 2 * pad - 4 * bw) / 3;
      const steps = [['Waktu terjadwal', 1], ['Setelah downtime', A], ['Setelah kecepatan', A * P], ['Hanya produk bagus', oee]];
      svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`); svg.innerHTML = '';
      const base = Ht - 40, hmax = Ht - 70;
      steps.forEach(([l, v], i) => {
        const x = pad + i * (bw + gap), h = hmax * v;
        S('rect', { x, y: base - hmax, width: bw, height: hmax, rx: 4, class: 'ghostbar' }, svg);
        S('rect', { x, y: base - h, width: bw, height: h, rx: 4, class: 'bar' + (i === 3 ? ' acc' : '') }, svg);
        txt(svg, x + bw / 2, base - h - 5, fmt(v * 100, 1) + '%', { 'text-anchor': 'middle', class: 't' });
        txt(svg, x + bw / 2, base + 16, l, { 'text-anchor': 'middle', class: 't small' });
        if (i > 0) { const prev = steps[i - 1][1]; txt(svg, x - gap / 2, base - hmax + 14, '−' + fmt((prev - v) * 100, 1), { 'text-anchor': 'middle', class: 't small loss' }); }
      });
    }
    wire(el, upd); upd();
  };

  /* ============ 9. cards ============ */
  W.cards = function (el, data) {
    el.innerHTML = `<div class="cards">${data.items.map((it, i) => `<button class="kcard ${it.c ? 'c-' + it.c : ''}" data-i="${i}"><span class="ic">${it.i}</span><span class="kt"><b>${it.t}</b>${it.tag ? `<em>${it.tag}</em>` : ''}<small>${it.s}</small></span><div class="kd">${it.d}</div></button>`).join('')}</div>`;
    el.querySelectorAll('.kcard').forEach((c) => c.addEventListener('click', () => c.classList.toggle('open')));
  };

  /* ============ 10. flow ============ */
  W.flow = function (el) {
    const names = ['Potong', 'Rakit', 'Uji', 'Kemas'], ct0 = [4, 6, 9, 5];
    el.innerHTML = `<div class="w-title">🏭 Lini produksi 4 stasiun</div>
<div class="w-grid"><div>${names.map((n, i) => ctrl('c' + i, n + ' (waktu proses)', 2, 14, 1, ct0[i], ' dtk')).join('')}
<label class="chk"><input type="checkbox" data-k="kanban"> Batasi WIP (Kanban/CONWIP, maks 6 unit)</label>
<div class="btns"><button class="btn" data-a="go">▶ Mulai</button><button class="btn ghost" data-a="reset">Reset</button></div></div>
<div><div class="out"><div><b data-o="out">0</b><small>unit selesai</small></div><div><b data-o="th">–</b><small>throughput /mnt</small></div><div><b data-o="wip">–</b><small>rata-rata WIP</small></div><div><b data-o="lt">–</b><small>lead time (detik)</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<div class="line" data-o="line"></div>`;
    let q, busy, rem, done, t, wipSum, timer = null;
    function reset() { q = [0, 0, 0, 0]; busy = [false, false, false, false]; rem = [0, 0, 0, 0]; done = 0; t = 0; wipSum = 0; draw(); }
    function step() {
      const ct = names.map((_, i) => val(el, 'c' + i)), kb = el.querySelector('[data-k=kanban]').checked;
      t++;
      for (let i = 3; i >= 0; i--) {
        if (busy[i]) { rem[i]--; if (rem[i] <= 0) { busy[i] = false; if (i === 3) done++; else q[i + 1]++; } }
      }
      const wipNow = () => q.reduce((a, b) => a + b, 0) + busy.filter(Boolean).length;
      for (let i = 0; i < 4; i++) {
        if (busy[i]) continue;
        if (i === 0) { if (kb && wipNow() >= 6) continue; }
        else if (q[i] <= 0) continue; else q[i]--;
        busy[i] = true; rem[i] = ct[i];
      }
      wipSum += wipNow();
      draw();
    }
    function draw() {
      const ct = names.map((_, i) => val(el, 'c' + i)), mx = Math.max(...ct);
      const th = t ? done / t * 60 : 0, wip = t ? wipSum / t : 0, thS = t ? done / t : 0;
      out(el, 'out', done); out(el, 'th', t ? fmt(th, 1) : '–'); out(el, 'wip', t ? fmt(wip, 1) : '–'); out(el, 'lt', thS > 0 ? fmt(wip / thS, 0) : '–');
      const cap = 60 / mx;
      out(el, 'msg', `Bottleneck: <b>${names[ct.indexOf(mx)]}</b> (${mx} dtk). Throughput maksimum teoretis ≈ <b>${fmt(cap, 1)} unit/menit</b>.`);
      el.querySelector('[data-o=line]').innerHTML = names.map((n, i) => {
        const pct = busy[i] ? Math.round((ct[i] - rem[i]) / ct[i] * 100) : 0;
        const sq = i === 0 ? '' : `<div class="queue">${'<i></i>'.repeat(Math.min(q[i], 18))}${q[i] > 18 ? '<b>+' + (q[i] - 18) + '</b>' : ''}</div>`;
        return `<div class="stn">${sq}<div class="box ${ct[i] === mx ? 'bn' : ''} ${busy[i] ? 'busy' : ''}"><b>${n}</b><small>${ct[i]} dtk</small><div class="pg"><span style="width:${pct}%"></span></div></div></div>${i < 3 ? '<span class="arr">➜</span>' : ''}`;
      }).join('') + `<span class="arr">➜</span><div class="stn"><div class="box outbox"><b>${done}</b><small>selesai</small></div></div>`;
    }
    function stop() { clearInterval(timer); timer = null; el.querySelector('[data-a=go]').textContent = '▶ Mulai'; }
    el.querySelector('[data-a=go]').onclick = () => {
      if (timer) { stop(); return; }
      el.querySelector('[data-a=go]').textContent = '⏸ Jeda';
      timer = setInterval(() => { if (!el.isConnected) { stop(); return; } step(); }, 90);
    };
    el.querySelector('[data-a=reset]').onclick = () => { stop(); reset(); };
    wire(el, reset); el.querySelector('[data-k=kanban]').addEventListener('change', reset);
    reset();
  };

  /* ============ 11. fivewhy ============ */
  W.fivewhy = function (el) {
    const sc = {
      'Mobil tidak mau hidup': { w: ['Aki (baterai) kosong.', 'Alternator tidak mengisi daya.', 'Belt alternator aus dan kendor.', 'Belt tidak pernah diganti, jadwal servis terlewat.', 'Tidak ada pengingat servis; jadwal hanya diingat di kepala.'], root: 'Tidak ada sistem pengingat servis.', fix: 'Pasang pengingat kalender berdasarkan kilometer/tanggal. (Mengganti aki saja hanya memadamkan api.)' },
      'Laporan bulanan selalu telat': { w: ['Data lengkap baru tersedia tanggal 25.', 'Menunggu data dari 3 departemen.', 'Tiap departemen mengirim format berbeda, digabung manual.', 'Tidak ada template standar.', 'Tidak ada yang ditunjuk sebagai pemilik laporan.'], root: 'Tidak ada process owner dan standar format.', fix: 'Tunjuk pemilik laporan, buat template standar, dan tetapkan tenggat per departemen.' },
      'Mesin packing berhenti 3× per shift': { w: ['Sensor produk macet.', 'Sensor tertutup serbuk.', 'Tidak ada pembersihan terjadwal.', 'Pembersihan tidak ada di checklist operator.', 'Checklist tidak diperbarui setelah modifikasi mesin.'], root: 'Tidak ada proses review checklist saat mesin dimodifikasi.', fix: 'Tambahkan pembersihan sensor ke checklist (Autonomous Maintenance) dan wajibkan review checklist tiap modifikasi (management of change).' }
    };
    const keys = Object.keys(sc);
    el.innerHTML = `<div class="w-title">❓ Latihan 5 Why</div>
<label class="num"><span>Masalah</span><select data-s>${keys.map((k) => `<option>${k}</option>`).join('')}</select></label>
<ol class="why" data-o="why"></ol>
<div class="btns"><button class="btn" data-a="next">Kenapa? →</button><button class="btn ghost" data-a="reset">Ulang</button></div>
<div class="callout tip" data-o="root" style="display:none"></div>`;
    let n = 0;
    const sel = el.querySelector('[data-s]');
    function draw() {
      const s = sc[sel.value];
      el.querySelector('[data-o=why]').innerHTML = `<li class="problem">⚠️ ${sel.value}</li>` + s.w.slice(0, n).map((w, i) => `<li><em>Kenapa #${i + 1}?</em> ${w}</li>`).join('');
      const r = el.querySelector('[data-o=root]');
      if (n >= s.w.length) { r.style.display = ''; r.innerHTML = `<b>Akar penyebab:</b> ${s.root}<br><b>Tindakan permanen:</b> ${s.fix}`; el.querySelector('[data-a=next]').disabled = true; }
      else { r.style.display = 'none'; el.querySelector('[data-a=next]').disabled = false; }
    }
    el.querySelector('[data-a=next]').onclick = () => { n++; draw(); };
    el.querySelector('[data-a=reset]').onclick = () => { n = 0; draw(); };
    sel.onchange = () => { n = 0; draw(); };
    draw();
  };

  /* ============ 12. fishbone ============ */
  W.fishbone = function (el) {
    const cats = [
      ['Man', ['Kru kurang', 'Belum dilatih']], ['Machine', ['Kompor rusak', 'Printer order macet']], ['Method', ['Urutan masak tak standar', 'Tak ada prioritas']],
      ['Material', ['Bahan habis', 'Supplier telat']], ['Measurement', ['Tak ada timer', 'Waktu tunggu tak dicatat']], ['Mother Nature', ['Dapur sempit', 'Jam makan siang padat']]
    ];
    el.innerHTML = `<div class="w-title">🐟 Contoh: "Pesanan restoran terlambat" (klik kategori untuk menyorot)</div><svg class="svgfull wide"></svg>`;
    const svg = el.querySelector('svg'), Wd = 760, Ht = 340, sy = 170;
    svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`);
    S('line', { x1: 20, x2: 630, y1: sy, y2: sy, class: 'spine' }, svg);
    S('rect', { x: 630, y: sy - 28, width: 120, height: 56, rx: 8, class: 'head' }, svg);
    txt(svg, 690, sy - 4, 'Pesanan', { 'text-anchor': 'middle', class: 't b' });
    txt(svg, 690, sy + 14, 'terlambat', { 'text-anchor': 'middle', class: 't b' });
    const xs = [220, 420, 610];
    cats.forEach(([name, causes], idx) => {
      const top = idx < 3, bx = xs[idx % 3], y0 = top ? 36 : Ht - 36;
      const gp = S('g', { class: 'fb' }, svg);
      S('line', { x1: bx - 70, y1: y0, x2: bx, y2: sy, class: 'bone' }, gp);
      const lb = S('rect', { x: bx - 70 - 46, y: y0 - (top ? 20 : -2), width: 92, height: 20, rx: 10, class: 'catbox' }, gp);
      txt(gp, bx - 70, y0 - (top ? 6 : -16), name, { 'text-anchor': 'middle', class: 't small b' });
      causes.forEach((c, j) => {
        const f = 0.42 + j * 0.28, x = bx - 70 + 70 * f, y = top ? y0 + (sy - y0) * f : y0 - (y0 - sy) * f;
        S('line', { x1: x - 14, x2: x, y1: y, y2: y, class: 'tick' }, gp);
        txt(gp, x - 18, y + 4, c, { 'text-anchor': 'end', class: 't small' });
      });
      gp.addEventListener('click', () => { const on = gp.classList.contains('hl'); svg.querySelectorAll('.fb').forEach((x) => x.classList.remove('hl')); svg.classList.toggle('dim', !on); if (!on) gp.classList.add('hl'); });
    });
  };
  W._h = { S, txt, fmt, nf, ctrl, wire, val, out, cdf, pdf, invnorm, gauss, mulberry };
})();
