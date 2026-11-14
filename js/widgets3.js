/* Widget baru: yamazumi, mtbf, regress, power, nonnormal, ctq */
(function () {
  'use strict';
  const W = window.WIDGETS, H = W._h;
  const { S, txt, fmt, nf, ctrl, wire, val, out, cdf, pdf, invnorm, gauss, mulberry } = H;

  /* ============ yamazumi ============ */
  W.yamazumi = function (el) {
    const names = ['Operator 1', 'Operator 2', 'Operator 3', 'Operator 4'], d0 = [40, 55, 48, 35];
    el.innerHTML = `<div class="w-title">⚖️ Pembagian kerja 4 operator (yamazumi)</div>
<div class="w-grid"><div>${names.map((n, i) => ctrl('c' + i, n + ' (waktu kerja)', 10, 90, 1, d0[i], ' dtk')).join('')}
${ctrl('takt', 'Takt time (ritme permintaan)', 30, 90, 1, 50, ' dtk')}</div>
<div><div class="out"><div><b data-o="eff">–</b><small>Line balance</small></div><div><b data-o="cap">–</b><small>kapasitas /jam</small></div><div><b data-o="need">–</b><small>kebutuhan /jam</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 220"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const ct = names.map((_, i) => val(el, 'c' + i)), tk = val(el, 'takt'), mx = Math.max(...ct), sum = ct.reduce((a, b) => a + b, 0);
      const eff = sum / (ct.length * mx) * 100, cap = 3600 / mx, need = 3600 / tk;
      out(el, 'eff', fmt(eff, 0) + '%'); out(el, 'cap', fmt(cap, 0)); out(el, 'need', fmt(need, 0));
      const over = ct.map((c, i) => c > tk ? names[i] : null).filter(Boolean);
      out(el, 'msg', (over.length ? `🔴 <b>${over.join(', ')}</b> melebihi takt: lini tidak bisa memenuhi permintaan. Pindahkan sebagian pekerjaan ke operator yang waktunya paling pendek. ` : '🟢 Semua operator di bawah takt: lini mampu memenuhi permintaan. ') + (eff < 85 ? 'Beban masih timpang (balance &lt; 85%).' : 'Beban relatif seimbang.'));
      svg.innerHTML = '';
      const base = 190, hmax = 150, scale = hmax / 100;
      [0, 25, 50, 75, 100].forEach((v) => { S('line', { x1: 50, x2: 620, y1: base - v * scale, y2: base - v * scale, class: 'grid' }, svg); txt(svg, 44, base - v * scale + 4, v, { 'text-anchor': 'end', class: 't small' }); });
      const bw = 90, gap = (570 - 4 * bw) / 3;
      ct.forEach((c, i) => {
        const x = 55 + i * (bw + gap);
        S('rect', { x, y: base - c * scale, width: bw, height: c * scale, rx: 4, class: c > tk ? 'seg2' : (c === mx ? 'bar acc' : 'bar') }, svg);
        txt(svg, x + bw / 2, base - c * scale - 5, c + ' dtk', { 'text-anchor': 'middle', class: 't small' });
        txt(svg, x + bw / 2, base + 16, names[i], { 'text-anchor': 'middle', class: 't small' });
      });
      S('line', { x1: 50, x2: 620, y1: base - tk * scale, y2: base - tk * scale, class: 'ucl' }, svg);
      txt(svg, 618, base - tk * scale - 5, 'takt ' + tk + ' dtk', { 'text-anchor': 'end', class: 't small' });
    }
    wire(el, upd); upd();
  };

  /* ============ mtbf ============ */
  W.mtbf = function (el) {
    el.innerHTML = `<div class="w-title">⏱️ Satu bulan operasi mesin (720 jam)</div>
<div class="w-grid"><div>
${ctrl('n', 'Jumlah kerusakan', 1, 20, 1, 4, '×')}
${ctrl('dt', 'Total waktu perbaikan', 1, 120, 1, 24, ' jam')}
</div><div>
<div class="out"><div><b data-o="mtbf">–</b><small>MTBF</small></div><div><b data-o="mttr">–</b><small>MTTR</small></div><div><b data-o="av">–</b><small>Availability</small></div><div><b data-o="rel">–</b><small>Peluang 8 jam aman</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 100"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const n = val(el, 'n'), dt = val(el, 'dt'), run = 720 - dt;
      const mtbf = run / n, mttr = dt / n, av = mtbf / (mtbf + mttr), rel = Math.exp(-8 / mtbf);
      out(el, 'mtbf', fmt(mtbf, 1) + ' jam'); out(el, 'mttr', fmt(mttr, 1) + ' jam'); out(el, 'av', fmt(av * 100, 1) + '%'); out(el, 'rel', fmt(rel * 100, 0) + '%');
      out(el, 'msg', mttr > mtbf / 6 ? '🔧 Perbaikan terlalu lama dibanding waktu jalan. Fokus: <b>turunkan MTTR</b> (suku cadang siap, prosedur perbaikan standar).' : '🛡️ Perbaikan cepat tapi sering rusak. Fokus: <b>naikkan MTBF</b> (pelumasan, autonomous maintenance, akar penyebab).');
      svg.innerHTML = ''; txt(svg, 20, 16, 'Garis waktu: hijau = jalan, merah = berhenti karena rusak', { class: 't small' });
      S('rect', { x: 20, y: 28, width: 600, height: 30, rx: 4, class: 'vagreen' }, svg);
      const seg = 600 / n, w = Math.max(600 * mttr / 720, 3);
      for (let i = 0; i < n; i++) S('rect', { x: 20 + seg * (i + 0.7) - w / 2, y: 28, width: w, height: 30, class: 'seg2' }, svg);
      [0, 180, 360, 540, 720].forEach((h) => txt(svg, 20 + 600 * h / 720, 76, h + ' j', { 'text-anchor': 'middle', class: 't small' }));
    }
    wire(el, upd); upd();
  };

  /* ============ regress ============ */
  W.regress = function (el) {
    el.innerHTML = `<div class="w-title">🍵 Suhu udara vs penjualan es teh</div>
<div class="w-grid"><div>
${ctrl('sl', 'Kekuatan hubungan (kemiringan)', 0, 3, 0.1, 1.5, '')}
${ctrl('nz', 'Noise / acak', 0.5, 8, 0.5, 3, '')}
<label class="chk"><input type="checkbox" data-k="out"> Tambah 1 outlier di kanan bawah</label>
<div class="btns"><button class="btn ghost" data-a="new">🎲 Data baru</button></div></div>
<div><div class="out"><div><b data-o="r">–</b><small>r</small></div><div><b data-o="r2">–</b><small>R²</small></div><div><b data-o="eq">–</b><small>persamaan</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 260"></svg>`;
    const svg = el.querySelector('svg'); let seed = 11, z = [], xs = [];
    function gen() { const r = mulberry(seed); xs = Array.from({ length: 25 }, (_, i) => 0.4 + i * 9.2 / 24 + (r() - 0.5) * 0.5); z = xs.map(() => gauss(r)); }
    function stat(p) {
      const n = p.length, mx = p.reduce((a, b) => a + b[0], 0) / n, my = p.reduce((a, b) => a + b[1], 0) / n;
      let sxx = 0, sxy = 0, syy = 0; p.forEach(([x, y]) => { sxx += (x - mx) ** 2; sxy += (x - mx) * (y - my); syy += (y - my) ** 2; });
      const b = sxy / sxx; return { b, a: my - b * mx, r: syy ? sxy / Math.sqrt(sxx * syy) : 0 };
    }
    function upd() {
      const sl = val(el, 'sl'), nz = val(el, 'nz'), o = el.querySelector('[data-k=out]').checked;
      const base = xs.map((x, i) => [x, 5 + sl * x + nz * z[i]]);
      const pts = base.slice(); if (o) pts.push([9.6, 5 + sl * 9.6 - 22]);
      const s0 = stat(base), s = stat(pts);
      out(el, 'r', fmt(s.r, 2)); out(el, 'r2', fmt(s.r * s.r * 100, 0) + '%'); out(el, 'eq', 'y = ' + fmt(s.a, 1) + (s.b >= 0 ? ' + ' : ' − ') + fmt(Math.abs(s.b), 2) + 'x');
      const k = Math.abs(s.r); let m = k >= 0.7 ? '💪 Hubungan linear kuat. ' : k >= 0.3 ? '〰️ Hubungan sedang. ' : '🌫️ Hubungan lemah / hampir tidak ada. ';
      if (o) m += `Satu outlier menggeser r dari <b>${fmt(s0.r, 2)}</b> menjadi <b>${fmt(s.r, 2)}</b>.`; else m += 'Korelasi tidak membuktikan sebab-akibat.';
      out(el, 'msg', m);
      const ys = pts.map((p) => p[1]), y0 = Math.min(...ys) - 2, y1 = Math.max(...ys) + 2;
      const X = (x) => 50 + x / 10 * 560, Y = (y) => 225 - (y - y0) / (y1 - y0) * 205;
      svg.innerHTML = '';
      S('line', { x1: 50, x2: 610, y1: 225, y2: 225, class: 'axis' }, svg); S('line', { x1: 50, x2: 50, y1: 20, y2: 225, class: 'axis' }, svg);
      txt(svg, 330, 250, 'Suhu udara →', { 'text-anchor': 'middle', class: 't small' }); txt(svg, 8, 16, 'Penjualan ↑', { class: 't small' });
      S('line', { x1: X(0), x2: X(10), y1: Y(s.a), y2: Y(s.a + s.b * 10), class: 'line2' }, svg);
      pts.forEach((p, i) => S('circle', { cx: X(p[0]), cy: Y(p[1]), r: o && i === pts.length - 1 ? 6 : 4, class: o && i === pts.length - 1 ? 'dot ng' : 'dot ok' }, svg));
    }
    el.querySelector('[data-a=new]').onclick = () => { seed = Math.floor(Math.random() * 1e6); gen(); upd(); };
    el.querySelector('[data-k=out]').addEventListener('change', upd);
    wire(el, upd); gen(); upd();
  };

  /* ============ power ============ */
  W.power = function (el) {
    el.innerHTML = `<div class="w-title">🔊 Kurva power: seberapa besar peluang uji berhasil?</div>
<div class="w-grid"><div>
${ctrl('d', 'Selisih yang ingin dideteksi (δ)', 0.5, 10, 0.5, 3, '')}
${ctrl('sd', 'Variasi (σ)', 1, 10, 0.5, 5, '')}
${ctrl('a', 'Tingkat α', 0.01, 0.1, 0.01, 0.05, '')}
${ctrl('n', 'Sampel per kelompok (n)', 3, 100, 1, 15, '')}
</div><div>
<div class="out"><div><b data-o="pw">–</b><small>Power saat ini</small></div><div class="big"><b data-o="nr">–</b><small>n untuk power 80%</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 230"></svg>`;
    const svg = el.querySelector('svg');
    function upd() {
      const d = val(el, 'd'), sd = val(el, 'sd'), a = val(el, 'a'), n = val(el, 'n'), zc = invnorm(1 - a / 2);
      const pw = (m) => { const dz = d / (sd * Math.sqrt(2 / m)); return cdf(dz - zc) + cdf(-dz - zc); };
      const nr = Math.ceil(2 * Math.pow((zc + 0.8416) * sd / d, 2)), p = pw(n);
      out(el, 'pw', fmt(p * 100, 0) + '%'); out(el, 'nr', nr);
      out(el, 'msg', p >= 0.8 ? '✅ Power cukup (≥ 80%). Uji ini cukup sensitif.' : `⚠️ Power rendah: ada risiko besar melewatkan perbedaan nyata. Tambah n hingga sekitar <b>${nr}</b>, atau kurangi variasi.`);
      const X = (m) => 50 + (m - 2) / 98 * 560, Y = (v) => 195 - v * 170;
      svg.innerHTML = '';
      [0, 0.25, 0.5, 0.75, 1].forEach((v) => { S('line', { x1: 50, x2: 610, y1: Y(v), y2: Y(v), class: 'grid' }, svg); txt(svg, 44, Y(v) + 4, Math.round(v * 100) + '%', { 'text-anchor': 'end', class: 't small' }); });
      S('line', { x1: 50, x2: 610, y1: Y(0.8), y2: Y(0.8), class: 'ucl' }, svg); txt(svg, 612, Y(0.8) + 4, '80%', { class: 't small' });
      let dd = ''; for (let m = 2; m <= 100; m++) dd += (m === 2 ? 'M' : 'L') + X(m) + ',' + Y(pw(m));
      S('path', { d: dd, class: 'line' }, svg);
      S('circle', { cx: X(n), cy: Y(p), r: 6, class: 'dot ng' }, svg);
      if (nr <= 100) { S('line', { x1: X(nr), x2: X(nr), y1: Y(0.8), y2: 195, class: 'mean' }, svg); txt(svg, X(nr), 212, 'n = ' + nr, { 'text-anchor': 'middle', class: 't small' }); }
      [2, 25, 50, 75, 100].forEach((m) => txt(svg, X(m), 226, m, { 'text-anchor': 'middle', class: 't small' }));
      txt(svg, 330, 14, 'Power vs jumlah sampel per kelompok', { 'text-anchor': 'middle', class: 't small' });
    }
    wire(el, upd); upd();
  };

  /* ============ nonnormal ============ */
  W.nonnormal = function (el) {
    el.innerHTML = `<div class="w-title">🐍 Waktu tempuh (menit): data miring vs kurva normal</div>
<div class="w-grid"><div>
${ctrl('s', 'Kemiringan data', 0.1, 0.8, 0.05, 0.5, '')}
${ctrl('usl', 'Batas atas spesifikasi (USL)', 15, 40, 1, 22, ' mnt')}
<p class="note small">Batas bawah alami: 0 menit (tidak mungkin negatif).</p></div>
<div><div class="out"><div><b data-o="pn">–</b><small>ppm &gt; USL (asumsi normal)</small></div><div><b data-o="pe">–</b><small>ppm &gt; USL (kenyataan)</small></div><div><b data-o="neg">–</b><small>"waktu negatif" menurut normal</small></div></div>
<p class="note" data-o="msg"></p></div></div>
<svg class="svgfull wide" viewBox="0 0 640 240"></svg>`;
    const svg = el.querySelector('svg'), N = 4000, r = mulberry(5), zs = Array.from({ length: N }, () => gauss(r));
    function upd() {
      const s = val(el, 's'), usl = val(el, 'usl'), xs = zs.map((z) => 10 * Math.exp(s * z));
      const m = xs.reduce((a, b) => a + b, 0) / N, sd = Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (N - 1));
      const pn = (1 - cdf((usl - m) / sd)) * 1e6, pe = xs.filter((x) => x > usl).length / N * 1e6, neg = cdf((0 - m) / sd) * 100;
      out(el, 'pn', nf(pn)); out(el, 'pe', nf(pe)); out(el, 'neg', fmt(neg, 1) + '%');
      out(el, 'msg', neg > 0.1 ? `⚠️ Kurva normal memprediksi <b>${fmt(neg, 1)}%</b> waktu negatif, yang mustahil. Prediksi di ekor kanan (${nf(pn)} vs ${nf(pe)} ppm) juga meleset.` : 'Data hampir simetris: asumsi normal masih bisa dipakai.');
      const bins = 40, xmax = 40, cnt = new Array(bins).fill(0); xs.forEach((x) => { const b = Math.floor(x / xmax * bins); if (b < bins) cnt[b]++; });
      const bw = xmax / bins, dens = cnt.map((c) => c / N / bw), ymax = Math.max(...dens, pdf(m, m, sd)) * 1.1;
      const X = (x) => 40 + x / xmax * 570, Y = (y) => 205 - y / ymax * 180;
      svg.innerHTML = '';
      dens.forEach((d, i) => S('rect', { x: X(i * bw) + 1, y: Y(d), width: 570 / bins - 2, height: 205 - Y(d), class: 'bar' }, svg));
      let dd = ''; for (let i = 0; i <= 160; i++) { const x = -5 + (xmax + 5) * i / 160, px = Math.max(40, X(x)); dd += (i ? 'L' : 'M') + (x < 0 ? Math.max(0, 40 + x / xmax * 570) : px) + ',' + Y(pdf(x, m, sd)); }
      S('path', { d: dd, class: 'line2' }, svg);
      S('line', { x1: 40, x2: 610, y1: 205, y2: 205, class: 'axis' }, svg);
      S('line', { x1: X(usl), x2: X(usl), y1: 15, y2: 205, class: 'spec' }, svg); txt(svg, X(usl), 12, 'USL', { 'text-anchor': 'middle', class: 't small' });
      S('line', { x1: 40, x2: 40, y1: 15, y2: 205, class: 'mean' }, svg); txt(svg, 44, 12, '0', { class: 't small' });
      [0, 10, 20, 30, 40].forEach((v) => txt(svg, X(v), 222, v, { 'text-anchor': 'middle', class: 't small' }));
      txt(svg, 330, 236, 'Biru = data sebenarnya · Oranye = kurva normal yang dipasang paksa', { 'text-anchor': 'middle', class: 't small' });
    }
    wire(el, upd); upd();
  };

  /* ============ ctq ============ */
  W.ctq = function (el) {
    const sc = {
      'Restoran': { voc: '"Makanan saya datang lama dan sudah dingin."', need: 'Makanan cepat disajikan dan masih hangat', drv: ['Waktu memasak', 'Waktu antar ke meja', 'Suhu saat disajikan'], ctq: ['Waktu pesan → meja ≤ 12 menit', 'Suhu saji ≥ 65 °C', 'Pesanan benar ≥ 99%'] },
      'Layanan IT': { voc: '"Laptop saya rusak dan lama sekali baru beres."', need: 'Gangguan cepat diatasi dan tidak berulang', drv: ['Kecepatan respons tiket', 'Waktu perbaikan', 'Ketepatan diagnosis pertama'], ctq: ['Respons ≤ 30 menit', 'Selesai ≤ 4 jam kerja', 'First-time-fix ≥ 85%'] },
      'Pengiriman barang': { voc: '"Kardus yang sampai sering penyok dan kotor."', need: 'Produk tiba utuh dan bersih', drv: ['Kekuatan kemasan', 'Cara menumpuk palet', 'Kebersihan area kemas'], ctq: ['Kekuatan tekan karton ≥ spesifikasi', 'Tinggi tumpukan ≤ 1.5 m', 'Kerusakan kemasan ≤ 1%'] }
    };
    const keys = Object.keys(sc);
    el.innerHTML = `<div class="w-title">🌳 Dari keluhan menjadi ukuran</div>
<label class="num"><span>Pilih konteks</span><select data-s>${keys.map((k) => `<option>${k}</option>`).join('')}</select></label>
<ol class="why" data-o="tree"></ol>
<div class="btns"><button class="btn" data-a="next">Turunkan →</button><button class="btn ghost" data-a="reset">Ulang</button></div>`;
    let n = 0; const sel = el.querySelector('[data-s]');
    function draw() {
      const s = sc[sel.value]; const items = [`<li class="problem">🗣️ <em>Keluhan (VOC):</em> ${s.voc}</li>`];
      if (n >= 1) items.push(`<li><em>Kebutuhan:</em> ${s.need}</li>`);
      if (n >= 2) items.push(`<li><em>Driver:</em> ${s.drv.join(' · ')}</li>`);
      if (n >= 3) items.push(`<li style="border-color:var(--good)"><em>CTQ terukur:</em> ${s.ctq.join(' · ')}</li>`);
      el.querySelector('[data-o=tree]').innerHTML = items.join('');
      el.querySelector('[data-a=next]').disabled = n >= 3;
    }
    el.querySelector('[data-a=next]').onclick = () => { n++; draw(); };
    el.querySelector('[data-a=reset]').onclick = () => { n = 0; draw(); };
    sel.onchange = () => { n = 0; draw(); };
    draw();
  };
})();
