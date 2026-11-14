/* Widget Tahap 2: ttest, grr, doe, fmea, smed, vsm */
(function () {
  'use strict';
  const W = window.WIDGETS, H = W._h;
  const { S, txt, fmt, nf, ctrl, wire, val, out } = H;

  /* ---------- fungsi t-distribution ---------- */
  function lgamma(x) {
    const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let y = x, t = x + 5.5; t -= (x + 0.5) * Math.log(t);
    let s = 1.000000000190015;
    for (let j = 0; j < 6; j++) { y += 1; s += c[j] / y; }
    return -t + Math.log(2.5066282746310005 * s / x);
  }
  function betacf(a, b, x) {
    const FP = 1e-30; let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FP) d = FP; d = 1 / d; let h = d;
    for (let m = 1; m <= 200; m++) {
      const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FP) d = FP; c = 1 + aa / c; if (Math.abs(c) < FP) c = FP; d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FP) d = FP; c = 1 + aa / c; if (Math.abs(c) < FP) c = FP; d = 1 / d;
      const del = d * c; h *= del; if (Math.abs(del - 1) < 3e-7) break;
    }
    return h;
  }
  function betai(a, b, x) {
    if (x <= 0) return 0; if (x >= 1) return 1;
    const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
  }
  const tp2 = (t, df) => betai(df / 2, 0.5, df / (df + t * t));
  const tpdf = (x, df) => Math.exp(lgamma((df + 1) / 2) - lgamma(df / 2)) / Math.sqrt(df * Math.PI) * Math.pow(1 + x * x / df, -(df + 1) / 2);

  /* ============ ttest ============ */
  W.ttest = function (el) {
    el.innerHTML = `<div class="w-title">🧪 Apakah perbaikan benar-benar mempercepat proses?</div>
<p class="note small">Sebelum perbaikan: rata-rata <b>50 detik</b>. Geser rata-rata sesudah perbaikan dan lihat apakah bedanya nyata (α = 0.05).</p>
<div class="w-grid"><div>
${ctrl('mb', 'Rata-rata sesudah perbaikan', 40, 52, 0.5, 47, ' dtk')}
${ctrl('sd', 'Variasi data (σ)', 1, 10, 0.5, 5, ' dtk')}
${ctrl('n', 'Jumlah sampel per kelompok (n)', 3, 60, 1, 10, '')}
</div><div>
<div class="out"><div><b data-o="t">–</b><small>t</small></div><div><b data-o="p">–</b><small>p-value</small></div><div><b data-o="d">–</b><small>selisih</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide"></svg>
<p class="note small">Kurva = sebaran nilai t jika H₀ benar. Area merah = zona "bukti cukup kuat" (5% terluar). Garis = hasil data kamu.</p>`;
    const svg = el.querySelector('svg');
    function upd() {
      const mb = val(el, 'mb'), sd = val(el, 'sd'), n = val(el, 'n');
      const diff = 50 - mb, se = sd * Math.sqrt(2 / n), t = diff / se, df = 2 * n - 2;
      const p = tp2(Math.abs(t), df);
      out(el, 't', fmt(t, 2)); out(el, 'p', p < 0.001 ? '< 0.001' : fmt(p, 3)); out(el, 'd', fmt(diff, 1) + ' dtk');
      let msg;
      if (p < 0.05) { msg = `✅ p &lt; 0.05 → <b>tolak H₀</b>: perbedaannya nyata secara statistik.`; if (Math.abs(diff) < 1) msg += ' Tapi selisihnya kecil, pertimbangkan apakah bermakna secara praktis.'; }
      else msg = `🟡 p ≥ 0.05 → <b>belum cukup bukti</b>; bisa jadi kebetulan. Tambah sampel atau kurangi variasi, lalu uji lagi.`;
      out(el, 'msg', msg);
      let lo = 0, hi = 30; for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (tp2(mid, df) > 0.05) lo = mid; else hi = mid; }
      const tc = hi;
      const Wd = 640, Ht = 200, pad = 26, x0 = -6, x1 = 6, ymax = tpdf(0, df) * 1.15;
      const X = (x) => pad + (x - x0) / (x1 - x0) * (Wd - 2 * pad), Y = (y) => Ht - pad - y / ymax * (Ht - 2 * pad);
      svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`); svg.innerHTML = '';
      const area = (a, b) => { let d = `M${X(a)},${Y(0)}`; for (let i = 0; i <= 40; i++) { const x = a + (b - a) * i / 40; d += `L${X(x)},${Y(tpdf(x, df))}`; } d += `L${X(b)},${Y(0)}Z`; S('path', { d, class: 'bad' }, svg); };
      if (tc < x1) { area(tc, x1); area(x0, -tc); }
      let d = ''; for (let i = 0; i <= 160; i++) { const x = x0 + (x1 - x0) * i / 160; d += (i ? 'L' : 'M') + X(x) + ',' + Y(tpdf(x, df)); }
      S('path', { d, class: 'line' }, svg);
      S('line', { x1: pad, x2: Wd - pad, y1: Y(0), y2: Y(0), class: 'axis' }, svg);
      const tt = Math.max(-5.8, Math.min(5.8, t));
      S('line', { x1: X(tt), x2: X(tt), y1: 18, y2: Y(0), class: p < 0.05 ? 'spec' : 'mean' }, svg);
      txt(svg, X(tt), 12, 't = ' + fmt(t, 2), { 'text-anchor': 'middle', class: 't small' });
      [-4, -2, 0, 2, 4].forEach((v) => txt(svg, X(v), Ht - 8, v, { 'text-anchor': 'middle', class: 't small' }));
    }
    wire(el, upd); upd();
  };

  /* ============ grr ============ */
  W.grr = function (el) {
    el.innerHTML = `<div class="w-title">📏 Dari mana variasi data kamu berasal?</div>
<div class="w-grid"><div>
${ctrl('pv', 'Variasi antar produk yang sebenarnya (σ part)', 1, 10, 0.1, 5, '')}
${ctrl('ev', 'Repeatability: ketidakkonsistenan alat (σ)', 0, 5, 0.1, 1, '')}
${ctrl('av', 'Reproducibility: beda antar operator (σ)', 0, 5, 0.1, 0.8, '')}
</div><div>
<div class="out"><div><b data-o="g">–</b><small>%GRR (study var)</small></div><div><b data-o="c">–</b><small>%Contribution</small></div><div><b data-o="ndc">–</b><small>ndc</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 110"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const pv = val(el, 'pv'), ev = val(el, 'ev'), av = val(el, 'av');
      const grr = Math.sqrt(ev * ev + av * av), tv = Math.sqrt(grr * grr + pv * pv);
      const pg = grr / tv * 100, pc = (grr * grr) / (tv * tv) * 100, ndc = grr > 0 ? Math.floor(1.41 * pv / grr) : 99;
      out(el, 'g', fmt(pg, 1) + '%'); out(el, 'c', fmt(pc, 1) + '%'); out(el, 'ndc', ndc >= 99 ? '≥ 99' : ndc);
      let m;
      if (pg < 10) m = '🟢 Sistem ukur baik (&lt; 10%).';
      else if (pg <= 30) m = '🟡 Marginal (10–30%). Boleh dipakai jika terpaksa, sebaiknya diperbaiki.';
      else m = '🔴 Tidak layak (&gt; 30%). Perbaiki alat/cara ukur sebelum mengambil keputusan.';
      m += ` ${ndc < 5 ? 'ndc &lt; 5: alat tidak cukup membedakan produk.' : 'ndc ≥ 5: cukup membedakan produk.'}`;
      m += ev > av ? ' Masalah terbesar: <b>repeatability</b> (alatnya).' : av > ev ? ' Masalah terbesar: <b>reproducibility</b> (cara/operator).' : '';
      out(el, 'msg', m);
      const tvv = tv * tv, parts = [['Antar produk', pv * pv / tvv, 'bar acc'], ['Repeatability', ev * ev / tvv, 'seg1'], ['Reproducibility', av * av / tvv, 'seg2']];
      svg.innerHTML = ''; txt(svg, 20, 16, 'Pembagian variasi total (% varians):', { class: 't small' });
      let x = 20;
      parts.forEach(([l, f, c]) => {
        const w = 600 * f; S('rect', { x, y: 28, width: Math.max(w, 1), height: 34, class: c }, svg);
        if (w > 70) txt(svg, x + w / 2, 50, fmt(f * 100, 0) + '%', { 'text-anchor': 'middle', class: 't b', fill: '#fff' });
        x += w;
      });
      [['Antar produk (yang kita mau lihat)', 'bar acc'], ['Repeatability', 'seg1'], ['Reproducibility', 'seg2']].forEach(([l, c], i) => {
        S('rect', { x: 20 + i * 200, y: 80, width: 12, height: 12, class: c }, svg); txt(svg, 38 + i * 200, 91, l, { class: 't small' });
      });
    }
    wire(el, upd); upd();
  };

  /* ============ doe ============ */
  W.doe = function (el) {
    el.innerHTML = `<div class="w-title">🧁 Skor kue (0–100) untuk 4 kombinasi percobaan</div>
<div class="w-grid"><div>
${ctrl('y1', 'Suhu rendah · waktu singkat', 0, 100, 1, 60, '')}
${ctrl('y2', 'Suhu tinggi · waktu singkat', 0, 100, 1, 70, '')}
${ctrl('y3', 'Suhu rendah · waktu lama', 0, 100, 1, 65, '')}
${ctrl('y4', 'Suhu tinggi · waktu lama', 0, 100, 1, 95, '')}
</div><div>
<div class="out"><div><b data-o="a">–</b><small>Efek suhu (A)</small></div><div><b data-o="b">–</b><small>Efek waktu (B)</small></div><div><b data-o="ab">–</b><small>Interaksi AB</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 250"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const y1 = val(el, 'y1'), y2 = val(el, 'y2'), y3 = val(el, 'y3'), y4 = val(el, 'y4');
      const A = ((y2 + y4) - (y1 + y3)) / 2, B = ((y3 + y4) - (y1 + y2)) / 2, AB = ((y1 + y4) - (y2 + y3)) / 2;
      out(el, 'a', fmt(A, 1)); out(el, 'b', fmt(B, 1)); out(el, 'ab', fmt(AB, 1));
      const mx = Math.max(Math.abs(A), Math.abs(B)) || 1;
      const best = [['suhu rendah, waktu singkat', y1], ['suhu tinggi, waktu singkat', y2], ['suhu rendah, waktu lama', y3], ['suhu tinggi, waktu lama', y4]].sort((a, b) => b[1] - a[1])[0];
      out(el, 'msg', (Math.abs(AB) > 0.4 * mx ? '🔀 Ada <b>interaksi</b> yang berarti: garis tidak sejajar, jadi efek suhu bergantung pada waktu. ' : '➖ Interaksi kecil: garis hampir sejajar, efek tiap faktor kira-kira berdiri sendiri. ') + `Kombinasi terbaik: <b>${best[0]}</b> (skor ${best[1]}).`);
      svg.innerHTML = '';
      const X1 = 140, X2 = 460, Y = (v) => 210 - v * 1.8;
      [0, 25, 50, 75, 100].forEach((v) => { S('line', { x1: 90, x2: 560, y1: Y(v), y2: Y(v), class: 'grid' }, svg); txt(svg, 80, Y(v) + 4, v, { 'text-anchor': 'end', class: 't small' }); });
      S('line', { x1: X1, x2: X1, y1: Y(0), y2: Y(100), class: 'grid dash' }, svg); S('line', { x1: X2, x2: X2, y1: Y(0), y2: Y(100), class: 'grid dash' }, svg);
      S('polyline', { points: `${X1},${Y(y1)} ${X2},${Y(y2)}`, class: 'line' }, svg);
      S('polyline', { points: `${X1},${Y(y3)} ${X2},${Y(y4)}`, class: 'line2' }, svg);
      [[X1, y1, 'line'], [X2, y2, 'line'], [X1, y3, 'line2'], [X2, y4, 'line2']].forEach(([x, y, c]) => S('circle', { cx: x, cy: Y(y), r: 5, class: c === 'line' ? 'dot ok' : 'dot2' }, svg));
      txt(svg, X1, 236, 'Suhu rendah', { 'text-anchor': 'middle', class: 't' }); txt(svg, X2, 236, 'Suhu tinggi', { 'text-anchor': 'middle', class: 't' });
      txt(svg, 570, Y(y2) + 4, 'waktu singkat', { class: 't small' }); txt(svg, 570, Y(y4) + 4, 'waktu lama', { class: 't small' });
      txt(svg, 90, 14, 'Interaction plot (garis sejajar = tanpa interaksi)', { class: 't small' });
    }
    wire(el, upd); upd();
  };

  /* ============ fmea ============ */
  W.fmea = function (el) {
    const rows = [['Ban bocor', 6, 5, 4], ['Aki lemah', 7, 4, 5], ['Bensin habis', 8, 3, 2], ['Rem blong', 10, 2, 6], ['Radiator bocor', 8, 3, 7]];
    el.innerHTML = `<div class="w-title">🚗 Risiko perjalanan jauh (skor 1–10)</div>
<table class="tbl"><tr><th>Kemungkinan gagal</th><th>S</th><th>O</th><th>D</th><th>RPN</th></tr>
${rows.map((r, i) => `<tr><td>${r[0]}</td>${[1, 2, 3].map((j) => `<td><input type="number" min="1" max="10" value="${r[j]}" data-r="${i}" data-c="${j}" style="width:64px"></td>`).join('')}<td><b data-rpn="${i}">–</b></td></tr>`).join('')}
</table>
<svg class="svgfull wide"></svg><p class="note" data-o="msg"></p>`;
    const svg = el.querySelector('svg');
    function upd() {
      const d = rows.map((r, i) => {
        const g = (c) => Math.min(10, Math.max(1, +el.querySelector(`[data-r="${i}"][data-c="${c}"]`).value || 1));
        const s = g(1), o = g(2), dd = g(3), rpn = s * o * dd;
        el.querySelector(`[data-rpn="${i}"]`).textContent = rpn;
        return { n: r[0], s, o, d: dd, rpn };
      }).sort((a, b) => b.rpn - a.rpn);
      const Wd = 640, rh = 30, Ht = 20 + d.length * rh, mx = d[0].rpn || 1;
      svg.setAttribute('viewBox', `0 0 ${Wd} ${Ht}`); svg.innerHTML = '';
      txt(svg, 10, 14, 'Urutan prioritas (RPN tertinggi di atas):', { class: 't small' });
      d.forEach((r, i) => {
        const w = 380 * r.rpn / mx, y = 22 + i * rh;
        txt(svg, 10, y + 16, r.n, { class: 't' });
        S('rect', { x: 150, y: y + 2, width: Math.max(w, 2), height: 20, rx: 3, class: r.s >= 9 ? 'seg2' : (i === 0 ? 'bar acc' : 'bar') }, svg);
        txt(svg, 156 + w, y + 17, r.rpn + (r.s >= 9 ? '  ⚠ severity tinggi' : ''), { class: 't small' });
      });
      const crit = d.filter((r) => r.s >= 9);
      out(el, 'msg', `Prioritas pertama (RPN): <b>${d[0].n}</b> (${d[0].rpn}).` + (crit.length ? ` Tetap perhatikan <b>${crit.map((r) => r.n).join(', ')}</b>: severity 9–10 harus ditangani walau RPN-nya lebih kecil.` : ''));
    }
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', upd));
    upd();
  };

  /* ============ smed ============ */
  W.smed = function (el) {
    const acts = [
      ['Ambil tooling baru dari gudang', 12, 1], ['Siapkan alat & bahan', 8, 1], ['Atur parameter awal mesin', 6, 1],
      ['Lepas tooling lama', 10, 0], ['Pasang tooling baru', 12, 0, 1], ['Setel posisi (trial & error)', 15, 0, 1],
      ['Uji coba pertama', 10, 0], ['Bersihkan tooling lama', 7, 1]
    ];
    el.innerHTML = `<div class="w-title">🔧 Changeover mesin: kapan tiap aktivitas dikerjakan?</div>
<p class="note small">Kondisi awal: semua dikerjakan saat mesin berhenti. Centang aktivitas yang bisa dipindah ke <b>saat mesin masih jalan</b> (external).</p>
${acts.map((a, i) => `<label class="chk"><input type="checkbox" data-a="${i}" ${a[2] ? '' : 'disabled'}> <span>${a[0]} <b>(${a[1]} mnt)</b> <small class="muted">${a[2] ? '· bisa disiapkan sebelum mesin berhenti' : '· harus saat mesin berhenti'}</small></span></label>`).join('')}
<label class="chk"><input type="checkbox" data-q> Pakai quick-release clamp &amp; posisi tetap (waktu "Pasang" dan "Setel posisi" dipotong separuh)</label>
<div class="out"><div><b data-o="b">–</b><small>Downtime awal</small></div><div><b data-o="a">–</b><small>Downtime sekarang</small></div><div class="big"><b data-o="r">–</b><small>Pengurangan</small></div></div>
<svg class="svgfull wide" viewBox="0 0 640 90"></svg><p class="note" data-o="msg"></p>`;
    const svg = el.querySelector('svg');
    const base = acts.reduce((a, b) => a + b[1], 0);
    function upd() {
      const q = el.querySelector('[data-q]').checked;
      let internal = 0;
      acts.forEach((a, i) => {
        const ext = !!a[2] && el.querySelector(`[data-a="${i}"]`).checked;
        if (!ext) internal += a[1] * (q && a[3] ? 0.5 : 1);
      });
      out(el, 'b', base + ' mnt'); out(el, 'a', fmt(internal, 1) + ' mnt'); out(el, 'r', fmt((1 - internal / base) * 100, 0) + '%');
      svg.innerHTML = '';
      [['Awal', base, 'bar'], ['Sekarang', internal, 'bar acc']].forEach(([l, v, c], i) => {
        txt(svg, 10, 28 + i * 34, l, { class: 't' });
        S('rect', { x: 80, y: 12 + i * 34, width: 540 * v / base, height: 24, rx: 4, class: c }, svg);
        txt(svg, 86 + 540 * v / base, 29 + i * 34, fmt(v, 1) + ' mnt', { class: 't small' });
      });
      out(el, 'msg', internal <= 10 ? '🏁 Di bawah 10 menit: single-minute exchange tercapai!' : `Target SMED: &lt; 10 menit. Masih ${fmt(internal - 10, 1)} menit lagi.`);
    }
    el.querySelectorAll('input').forEach((i) => i.addEventListener('change', upd));
    upd();
  };

  /* ============ vsm ============ */
  W.vsm = function (el) {
    const st = [['Terima pesanan', 5, 8], ['Potong', 20, 16], ['Rakit', 45, 12], ['Uji', 15, 20], ['Kemas', 10, 8]];
    el.innerHTML = `<div class="w-title">🗺️ Timeline ladder: waktu mengerjakan vs waktu menunggu</div>
<div class="w-grid"><div>
${st.map((s, i) => ctrl('w' + i, `Tunggu sebelum "${s[0]}" <small class="muted">(proses ${s[1]} mnt)</small>`, 0, 48, 1, s[2], ' jam')).join('')}
<label class="chk"><input type="checkbox" data-k="fut"> Future state: terapkan flow &amp; pull (waktu tunggu −70%)</label>
</div><div>
<div class="out"><div><b data-o="lt">–</b><small>Lead time</small></div><div><b data-o="va">–</b><small>Waktu bernilai tambah</small></div><div class="big"><b data-o="pce">–</b><small>PCE</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 130"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const f = el.querySelector('[data-k=fut]').checked ? 0.3 : 1;
      const waits = st.map((_, i) => val(el, 'w' + i) * 60 * f), vas = st.map((s) => s[1]);
      const tw = waits.reduce((a, b) => a + b, 0), tv = vas.reduce((a, b) => a + b, 0), lt = tw + tv;
      out(el, 'lt', fmt(lt / 60, 1) + ' jam'); out(el, 'va', tv + ' mnt'); out(el, 'pce', fmt(tv / lt * 100, 2) + '%');
      out(el, 'msg', `Dari <b>${fmt(lt / 60, 0)} jam</b> total, barang hanya dikerjakan <b>${tv} menit</b>. Sisanya (${fmt(tw / lt * 100, 1)}%) menunggu. ${f < 1 ? 'Future state memotong lead time tanpa mempercepat satu mesin pun.' : 'Mempercepat mesin hampir tidak mengubah angka ini; mengurangi menunggu yang berdampak.'}`);
      svg.innerHTML = ''; txt(svg, 20, 16, 'Linimasa produk dari pesanan sampai kirim (oranye = menunggu, hijau = dikerjakan):', { class: 't small' });
      let x = 20; const sc = 600 / lt;
      st.forEach((s, i) => {
        const ww = waits[i] * sc, vw = Math.max(vas[i] * sc, 2.5);
        S('rect', { x, y: 30, width: Math.max(ww, 0.5), height: 28, class: 'seg1' }, svg);
        S('rect', { x: x + ww, y: 30, width: vw, height: 28, class: 'vagreen' }, svg);
        const cx = x + (ww + vw) / 2;
        txt(svg, cx, 80 + (i % 2) * 18, s[0], { 'text-anchor': 'middle', class: 't small' });
        S('line', { x1: cx, x2: cx, y1: 60, y2: 70 + (i % 2) * 18, class: 'grid' }, svg);
        x += ww + vw;
      });
      txt(svg, 20, 124, 'Total: ' + fmt(lt / 60, 1) + ' jam  ·  mengerjakan: ' + tv + ' mnt', { class: 't small' });
    }
    wire(el, upd); el.querySelector('[data-k=fut]').addEventListener('change', upd); upd();
  };
})();
