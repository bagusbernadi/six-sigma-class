/* Konten belajar. Tambah topik baru = tambah objek di TOPICS.
   sec: {h:'html', lvl:'cert'?} atau {w:'namaWidget', data?, lvl?}  */
window.GROUPS = [
  { id: 'six',  stage: 1, name: 'Six Sigma',       color: '#2563eb' },
  { id: 'tpm',  stage: 1, name: 'TPM',             color: '#059669' },
  { id: 'lean', stage: 1, name: 'Lean',            color: '#d97706' },
  { id: 'ps',   stage: 1, name: 'Problem Solving', color: '#7c3aed' }
];

window.TOPICS = [

/* ============================ SIX SIGMA ============================ */
{
  id: 'sig-variasi', g: 'six', icon: '🎯', min: 10,
  title: 'Variasi: Musuh Utama Kualitas',
  tag: 'Kenapa rata-rata saja tidak cukup, dan apa yang sebenarnya dikejar Six Sigma.',
  sec: [
    { h: `
<p>Tidak ada dua hal yang persis sama. Waktu tempuh ke kantor kamu hari ini 28 menit, kemarin 31, lusa 35. Perbedaan itu disebut <b>variasi</b>. <b>Six Sigma pada dasarnya adalah ilmu memperkecil variasi</b>, bukan sekadar memperbaiki angka rata-rata.</p>
<div class="callout analogy"><b>Analogi: dua kedai kopi.</b> Kedai A dan B sama-sama punya rata-rata waktu layanan 5 menit. Di A, pesananmu selalu jadi dalam 4 sampai 6 menit. Di B, kadang 1 menit, kadang 15 menit. Kamu pasti memilih A. Pelanggan merasakan <i>variasi</i>, bukan rata-rata.</div>
<h3>Coba sendiri</h3>
<p>Geser slider dan tekan <b>Tembak 50×</b>. Zona hijau adalah "spesifikasi pelanggan".</p>` },
    { w: 'variation' },
    { h: `
<h3>Akurat vs Presisi</h3>
<ul>
<li><b>Akurasi (accuracy)</b>: rata-rata hasil dekat dengan target. Masalahnya <i>bias</i>, biasanya mudah dikoreksi dengan menggeser setelan (adjust).</li>
<li><b>Presisi (precision)</b>: hasil berkumpul rapat satu sama lain. Masalahnya <i>variasi</i>, dan ini jauh lebih sulit diperbaiki karena butuh perubahan proses.</li>
</ul>
<div class="callout tip"><b>Intinya:</b> proses yang presisi tapi meleset mudah diperbaiki (geser setelan). Proses yang akurat tapi acak-acakan tidak bisa diperbaiki dengan "geser setelan", harus dicari sumber variasinya.</div>
<h3>Dua jenis penyebab variasi</h3>
<div class="two">
<div class="card"><b>Common cause</b><br>Variasi bawaan sistem yang selalu ada, kecil, dan acak. Contoh: lalu lintas harian yang kadang lancar kadang padat. Perbaikannya butuh perubahan sistem (misalnya berangkat lebih pagi).</div>
<div class="card"><b>Special cause</b><br>Kejadian khusus yang tidak biasa. Contoh: kecelakaan yang menutup jalan. Perbaikannya: cari kejadiannya dan cegah terulang.</div>
</div>
<p>Salah satu kesalahan paling umum di pabrik: <b>bereaksi berlebihan terhadap common cause</b> (menyalahkan operator karena naik-turun biasa), atau sebaliknya <b>mengabaikan special cause</b> karena dianggap "biasa". Control chart (topik berikutnya) dibuat untuk membedakan keduanya.</p>` },
    { lvl: 'cert', h: `
<h3>Mengukur variasi</h3>
<p>Standar deviasi sampel: <code>s = √[ Σ(xᵢ − x̄)² / (n − 1) ]</code>. Untuk data berdistribusi normal berlaku aturan empiris:</p>
<table class="tbl"><tr><th>Rentang</th><th>Cakupan data</th><th>Di luar rentang</th></tr>
<tr><td>x̄ ± 1s</td><td>68.27%</td><td>31.73%</td></tr>
<tr><td>x̄ ± 2s</td><td>95.45%</td><td>4.55%</td></tr>
<tr><td>x̄ ± 3s</td><td>99.73%</td><td>0.27% (2,700 ppm)</td></tr>
</table>
<ul>
<li><b>Short-term (within) vs long-term (overall) variation</b>: short-term hanya variasi common cause dalam subgroup (σ within, dipakai di Cp/Cpk). Long-term mencakup drift antar-waktu (σ overall, dipakai di Pp/Ppk). Selisih besar antara Cpk dan Ppk menandakan proses tidak stabil dari waktu ke waktu.</li>
<li><b>Distribusi tidak normal</b>: sebelum menghitung capability, uji normalitas (Anderson-Darling, p &gt; 0.05 artinya data konsisten dengan normal). Jika tidak normal, transformasi (Box-Cox/Johnson) atau pakai distribusi non-normal.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Dua kedai kopi sama-sama rata-rata 5 menit. A melayani 4–6 menit, B melayani 1–15 menit. Menurut Six Sigma mana yang lebih baik?', o: ['B, karena kadang sangat cepat', 'A, karena variasinya kecil', 'Sama saja, rata-ratanya sama', 'Tidak bisa dinilai'], a: 1, w: 'Pelanggan merasakan variasi. Proses dengan variasi kecil lebih dapat diprediksi dan lebih sedikit yang keluar dari harapan.' },
    { q: 'Tembakan berkumpul rapat tapi jauh dari pusat target. Kesimpulannya?', o: ['Presisi tinggi, akurasi rendah', 'Akurasi tinggi, presisi rendah', 'Akurat dan presisi', 'Tidak akurat dan tidak presisi'], a: 0, w: 'Berkumpul rapat berarti presisi. Jauh dari target berarti bias (tidak akurat). Cukup geser setelan.' },
    { q: 'Jalan macet total karena ada kecelakaan hari ini saja. Ini jenis penyebab variasi apa?', o: ['Common cause', 'Special cause', 'Bukan variasi', 'Measurement error'], a: 1, w: 'Kejadian khusus yang tidak biasa terjadi disebut special cause (assignable cause).' }
  ]
},

{
  id: 'sig-dmaic', g: 'six', icon: '🧭', min: 12,
  title: 'DMAIC: Peta Perbaikan 5 Langkah',
  tag: 'Kerangka standar Six Sigma untuk menyelesaikan masalah dengan data, bukan tebak-tebakan.',
  sec: [
    { h: `
<p><b>DMAIC</b> = Define, Measure, Analyze, Improve, Control. Ini urutan kerja yang memaksa kita memahami masalah dan penyebabnya <i>sebelum</i> mencari solusi.</p>
<div class="callout analogy"><b>Analogi: renovasi dapur.</b> Kamu tidak langsung beli lemari. Pertama tulis keluhannya (Define), ukur dapur dan catat berapa lama masak (Measure), cari tahu kenapa dapur terasa sempit (Analyze), uji coba tata letak pakai karton sebelum bongkar (Improve), lalu buat aturan agar tidak berantakan lagi (Control).</div>
<p>Klik tiap tahap atau tekan <b>Putar otomatis</b>.</p>` },
    { w: 'stepper', data: {
        steps: [
          { k: 'D', t: 'Define', q: 'Apa masalahnya, dan apa yang diinginkan pelanggan?', a: 'Tulis keluhan dulu, bukan langsung beli lemari baru.', tools: 'Project Charter, SIPOC, Voice of Customer (VOC) → CTQ', cert: 'Deliverable: problem & goal statement SMART, SIPOC, CTQ (Y) terdefinisi, charter disetujui sponsor.' },
          { k: 'M', t: 'Measure', q: 'Seberapa parah kondisi sekarang?', a: 'Ukur luas dapur dan catat waktu masak. Tanpa angka awal, kamu tidak bisa membuktikan perbaikan.', tools: 'Data collection plan, process map, MSA/Gauge R&R, baseline capability', cert: 'Validasi sistem ukur dulu (Gauge R&R: %GRR &lt; 10% baik, 10–30% marginal, &gt; 30% tidak layak). Lalu hitung baseline sigma level/Cpk.' },
          { k: 'A', t: 'Analyze', q: 'Apa akar penyebabnya?', a: 'Seperti dokter: bedakan gejala dengan penyakit. Demam bukan penyebab.', tools: 'Fishbone, 5 Why, Pareto, scatter plot, hypothesis test', cert: 'Y = f(X): temukan "vital few X". Buktikan dengan uji statistik (t-test, ANOVA, regresi), p &lt; 0.05.' },
          { k: 'I', t: 'Improve', q: 'Solusi apa yang terbukti berhasil?', a: 'Uji layout dengan karton dulu (pilot) sebelum membongkar dapur.', tools: 'Brainstorming, DOE, pilot, FMEA, poka-yoke', cert: 'Optimalkan setting dengan DOE, uji pilot, evaluasi risiko dengan FMEA (RPN = S×O×D), hitung cost-benefit.' },
          { k: 'C', t: 'Control', q: 'Bagaimana agar tidak balik seperti semula?', a: 'Jadwal bersih-bersih dan checklist, supaya dapur tidak berantakan lagi.', tools: 'Control chart, SOP, control plan, poka-yoke, training', cert: 'Control plan + reaction plan, handover ke process owner, verifikasi penghematan oleh finance.' }
        ]
    } },
    { h: `
<h3>Kesalahan yang sering terjadi</h3>
<ul>
<li><b>Lompat ke Improve</b> tanpa Analyze. Hasilnya solusi yang tidak menyentuh akar masalah.</li>
<li><b>Tidak ada baseline</b> di Measure, jadi klaim "sudah membaik" tidak bisa dibuktikan.</li>
<li><b>Berhenti di Improve</b>. Tanpa Control, performa merosot dalam 3–6 bulan.</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Hal yang diujikan di sertifikasi</h3>
<ul>
<li><b>DMAIC vs DMADV</b>: DMAIC memperbaiki proses yang sudah ada. DMADV (Define, Measure, Analyze, Design, Verify) merancang proses/produk baru (DFSS).</li>
<li><b>Tingkat sabuk</b>: Yellow (anggota tim), Green (memimpin proyek kecil, paruh waktu), Black (memimpin proyek besar, penuh waktu, mentor Green), Master Black (strategi & pelatihan).</li>
<li><b>Pemilihan proyek</b>: terkait strategi bisnis, terukur, ada data, penyebab belum diketahui, dan solusi belum ditentukan di awal.</li>
<li><b>Y = f(X)</b>: output (Y) ditentukan oleh input proses (X). Fokus proyek mencari X yang berpengaruh besar.</li>
<li><b>Hard vs soft savings</b>: hard savings muncul di laporan keuangan (kurangi scrap), soft savings tidak langsung (hemat waktu).</li>
</ul>` }
  ],
  quiz: [
    { q: 'Tahap mana yang memastikan alat ukur dapat dipercaya dan menetapkan kondisi awal?', o: ['Define', 'Measure', 'Improve', 'Control'], a: 1, w: 'Measure: validasi sistem ukur (MSA) dan tetapkan baseline.' },
    { q: 'Tim langsung memasang sensor baru sebelum tahu penyebab cacat. Tahap apa yang dilewati?', o: ['Define', 'Measure', 'Analyze', 'Control'], a: 2, w: 'Analyze mencari akar penyebab. Melewatinya membuat solusi berbasis asumsi.' },
    { q: 'SOP, control chart, dan control plan dibuat di tahap...', o: ['Define', 'Analyze', 'Improve', 'Control'], a: 3, w: 'Control menjaga hasil perbaikan agar tidak kembali ke kondisi lama.' }
  ]
},

{
  id: 'sig-sigma', g: 'six', icon: '📊', min: 12,
  title: 'Sigma Level, DPMO & Yield',
  tag: 'Cara menyatakan "seberapa sering salah" dalam satu angka yang bisa dibandingkan.',
  sec: [
    { h: `
<p><b>DPMO</b> (Defects Per Million Opportunities) menghitung jumlah kesalahan per sejuta kesempatan. Angka ini adil untuk dibandingkan antar proses, karena mempertimbangkan berapa banyak <i>kesempatan salah</i> di tiap produk.</p>
<div class="callout analogy"><b>Analogi: surat dan pesawat.</b> "Akurasi 99%" terdengar bagus. Tapi 99% artinya 10,000 kesalahan per sejuta. Kalau bandara dengan akurasi 99%, itu sekitar 2 pendaratan bermasalah per hari. Proses 6σ hanya 3.4 per sejuta.</div>
<p>Isi angka sendiri, atau coba preset:</p>` },
    { w: 'sigma' },
    { h: `
<h3>Tabel acuan (dengan konvensi pergeseran 1.5σ)</h3>
<table class="tbl"><tr><th>Sigma level</th><th>DPMO</th><th>Yield</th><th>Setara</th></tr>
<tr><td>2σ</td><td>308,538</td><td>69.1%</td><td>3 dari 10 salah</td></tr>
<tr><td>3σ</td><td>66,807</td><td>93.3%</td><td>1 dari 15 salah</td></tr>
<tr><td>4σ</td><td>6,210</td><td>99.38%</td><td>1 dari 160 salah</td></tr>
<tr><td>5σ</td><td>233</td><td>99.977%</td><td>1 dari 4,300 salah</td></tr>
<tr><td>6σ</td><td>3.4</td><td>99.99966%</td><td>1 dari 294,000 salah</td></tr>
</table>
<p>Jangan terpaku pada "harus 6σ". Tujuan sebenarnya: tahu posisi sekarang, lalu turunkan DPMO sesuai kebutuhan pelanggan dan biaya.</p>` },
    { lvl: 'cert', h: `
<h3>Rumus yang perlu hafal</h3>
<div class="formula">DPU = total defect / jumlah unit<br>DPO = defect / (unit × opportunities per unit)<br>DPMO = DPO × 1,000,000<br>Yield = 1 − DPO<br>Sigma level (long-term z) = NORM.S.INV(1 − DPO)<br>Sigma level (konvensi) = z + 1.5</div>
<ul>
<li><b>Pergeseran 1.5σ</b>: asumsi bahwa dalam jangka panjang rata-rata proses bergeser hingga 1.5σ dari target. Karena itu 6σ = 3.4 DPMO, bukan 0.002 ppb (yang berlaku jika proses sempurna terpusat).</li>
<li><b>FPY (First Pass Yield)</b> = unit lolos pertama kali / total unit, tidak menghitung rework. <b>RTY (Rolled Throughput Yield)</b> = hasil perkalian FPY tiap langkah. RTY mengungkap "pabrik tersembunyi" (rework).</li>
</ul>
<p>Mainkan RTY di bawah. Perhatikan: banyak langkah yang masing-masing "cukup bagus" menghasilkan keseluruhan yang buruk.</p>` },
    { lvl: 'cert', w: 'rty' }
  ],
  quiz: [
    { q: 'Ada 1,000 unit, tiap unit punya 10 peluang salah, ditemukan 5 defect. Berapa DPMO?', o: ['500', '5,000', '50', '5'], a: 0, w: 'DPO = 5 / (1000 × 10) = 0.0005, dikali 1,000,000 = 500 DPMO.' },
    { q: 'Yield 99% setara dengan sekitar berapa sigma level (dengan shift 1.5)?', o: ['6σ', '5σ', '3.8σ', '2σ'], a: 2, w: '99% = 10,000 DPMO ≈ 3.8σ. Terlihat tinggi, tapi masih jauh dari 6σ.' },
    { q: 'Sigma level 6 (konvensi) setara dengan berapa DPMO?', o: ['3.4', '34', '233', '6,210'], a: 0, w: 'Six Sigma = 3.4 DPMO, memperhitungkan pergeseran 1.5σ.' }
  ]
},

{
  id: 'sig-cpk', g: 'six', icon: '🚗', min: 12,
  title: 'Cp & Cpk: Seberapa Mampu Prosesmu?',
  tag: 'Mengukur apakah proses muat di dalam batas spesifikasi pelanggan.',
  sec: [
    { h: `
<p><b>Process capability</b> menjawab satu pertanyaan: <i>apakah proses kita mampu menghasilkan produk di dalam batas spesifikasi (LSL–USL) secara konsisten?</i></p>
<div class="callout analogy"><b>Analogi: mobil masuk garasi.</b> Lebar garasi = rentang spesifikasi (USL − LSL). Lebar mobil = sebaran proses (6σ). <b>Cp</b> = lebar garasi ÷ lebar mobil: "muat atau tidak kalau parkir pas di tengah?". <b>Cpk</b> memperhitungkan kenyataan: mobil bisa parkir miring ke satu sisi. Garasi muat tapi parkir mepet dinding, bodinya tetap lecet.</div>
<p>Geser <b>rata-rata</b> (mobil bergeser) dan <b>variasi</b> (mobil melebar), lalu perhatikan Cp, Cpk, dan area merah (produk reject).</p>` },
    { w: 'cpk' },
    { h: `
<h3>Cara membaca hasil</h3>
<table class="tbl"><tr><th>Cpk</th><th>Artinya</th></tr>
<tr><td>&lt; 1.00</td><td>Tidak mampu. Banyak produk keluar spesifikasi.</td></tr>
<tr><td>1.00 – 1.33</td><td>Marginal. Perlu pengawasan ketat.</td></tr>
<tr><td>≥ 1.33</td><td>Mampu (standar umum).</td></tr>
<tr><td>≥ 1.67</td><td>Sangat mampu. Sering diminta untuk karakteristik kritis.</td></tr>
</table>
<ul>
<li><b>Cp tinggi, Cpk rendah</b>: proses bisa bagus tapi <i>off-center</i>. Solusi: geser setelan.</li>
<li><b>Cp dan Cpk sama-sama rendah</b>: variasi terlalu besar. Solusi: kurangi variasi (inti Six Sigma).</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Rumus & konsep ujian</h3>
<div class="formula">Cp  = (USL − LSL) / (6σ)<br>Cpk = min[ (USL − μ)/(3σ) , (μ − LSL)/(3σ) ]<br>Pp, Ppk: sama, tapi σ = standar deviasi overall (long-term)<br>Cpm  = Cp / √[1 + ((μ − T)/σ)²]  (memperhitungkan target T)<br>Sigma level (short-term) = 3 × Cpk</div>
<ul>
<li><b>Prasyarat</b>: proses stabil (terkendali di control chart) dan data mendekati normal. Menghitung Cpk pada proses tidak stabil menyesatkan.</li>
<li><b>Cpk ≥ Ppk</b> biasanya. Jika Ppk jauh lebih kecil dari Cpk, ada drift antar-subgroup (special cause).</li>
<li><b>Cpk = 1.33</b> setara jarak 4σ dari rata-rata ke batas terdekat. Cpk = 2.0 setara 6σ short-term.</li>
<li>Untuk spesifikasi satu sisi, pakai hanya Cpu atau Cpl.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Cp = 1.8 tetapi Cpk = 0.7. Apa yang terjadi?', o: ['Variasi terlalu besar', 'Proses off-center (rata-rata bergeser)', 'Data tidak cukup', 'Sistem ukur rusak'], a: 1, w: 'Cp hanya menilai lebar sebaran. Cpk jauh lebih kecil artinya rata-rata mepet ke salah satu batas.' },
    { q: 'Batas spek 90–110, rata-rata 100, σ = 2.5. Berapa Cp?', o: ['0.67', '1.33', '2.00', '0.80'], a: 1, w: 'Cp = (110−90) / (6 × 2.5) = 20 / 15 = 1.33.' },
    { q: 'Nilai Cpk minimal yang umum dianggap proses "mampu"?', o: ['0.50', '1.00', '1.33', '3.00'], a: 2, w: 'Standar umum industri adalah Cpk ≥ 1.33.' }
  ]
},

{
  id: 'sig-control', g: 'six', icon: '📈', min: 12,
  title: 'Control Chart: Alarm Dini Proses',
  tag: 'Membedakan naik-turun biasa dari masalah sungguhan.',
  sec: [
    { h: `
<p><b>Control chart</b> adalah grafik data dari waktu ke waktu dengan tiga garis: garis tengah (rata-rata) dan dua batas kontrol (UCL, LCL) di ±3σ. Batas ini berasal dari <i>proses itu sendiri</i> ("suara proses"), bukan dari keinginan pelanggan (spesifikasi).</p>
<div class="callout analogy"><b>Analogi: berat badan harian.</b> Timbangan naik-turun 0.5 kg setiap hari itu normal (common cause). Kalau tiba-tiba +3 kg dalam semalam, atau naik terus 6 hari berturut-turut, ada sesuatu yang berubah (special cause). Kamu tidak panik pada fluktuasi biasa, tapi bereaksi pada sinyal.</div>
<p>Data di bawah adalah <b>waktu tempuh ke kantor (menit)</b>. 20 titik pertama dipakai menentukan batas. Coba tambahkan pergeseran (misalnya jalan baru ditutup) dan lonjakan sesaat, lalu lihat sinyalnya.</p>` },
    { w: 'control' },
    { h: `
<h3>Aturan membaca sinyal</h3>
<ol>
<li><b>Satu titik di luar UCL/LCL</b>: kejadian khusus. Cari penyebabnya sekarang.</li>
<li><b>8 titik berturut-turut di satu sisi garis tengah</b>: rata-rata proses sudah bergeser.</li>
<li><b>6 titik naik terus (atau turun terus)</b>: ada tren, misalnya keausan alat.</li>
</ol>
<div class="callout tip"><b>Aturan emas:</b> jangan "menyetel" proses jika tidak ada sinyal. Over-adjustment justru menambah variasi.</div>` },
    { lvl: 'cert', h: `
<h3>Memilih jenis chart & rumus</h3>
<table class="tbl"><tr><th>Data</th><th>Chart</th></tr>
<tr><td>Variabel (ukuran), n = 1</td><td>I-MR</td></tr>
<tr><td>Variabel, subgroup 2–9</td><td>X̄-R</td></tr>
<tr><td>Variabel, subgroup ≥ 10</td><td>X̄-S</td></tr>
<tr><td>Atribut: proporsi cacat (n bervariasi)</td><td>p chart</td></tr>
<tr><td>Atribut: jumlah cacat (n tetap)</td><td>np chart</td></tr>
<tr><td>Atribut: defect per unit</td><td>u chart / c chart</td></tr>
</table>
<div class="formula">I chart: CL = x̄, UCL/LCL = x̄ ± 2.66 × MR̄  (σ ≈ MR̄ / 1.128)<br>X̄ chart: UCL/LCL = X̿ ± A₂ × R̄<br>R chart: UCL = D₄ × R̄, LCL = D₃ × R̄<br>p chart: UCL/LCL = p̄ ± 3√[p̄(1 − p̄)/n]</div>
<ul>
<li><b>Rational subgroup</b>: kelompokkan sampel agar variasi <i>dalam</i> subgroup hanya common cause, variasi <i>antar</i> subgroup menangkap special cause.</li>
<li><b>Fase I vs II</b>: Fase I menetapkan batas dari data stabil; Fase II memantau proses berjalan dengan batas tersebut.</li>
<li><b>Control limit ≠ spec limit</b>. Proses bisa terkendali tapi tetap tidak capable (Cpk rendah), atau sebaliknya.</li>
<li>Tambahan aturan Western Electric/Nelson: 2 dari 3 titik di luar 2σ (sisi sama), 4 dari 5 titik di luar 1σ, 15 titik berturut-turut dalam ±1σ (stratifikasi).</li>
</ul>` }
  ],
  quiz: [
    { q: 'Batas kontrol UCL/LCL pada control chart ditentukan oleh...', o: ['Permintaan pelanggan', 'Data dan variasi proses itu sendiri', 'Keputusan manajer', 'Spesifikasi desain'], a: 1, w: 'Batas kontrol adalah "suara proses" (±3σ dari data), berbeda dengan batas spesifikasi.' },
    { q: 'Satu titik berada di atas UCL. Itu menandakan...', o: ['Common cause', 'Special cause', 'Proses sempurna', 'Sampel terlalu sedikit'], a: 1, w: 'Titik di luar ±3σ sangat jarang terjadi jika hanya ada common cause, sehingga perlu diselidiki.' },
    { q: '8 titik berturut-turut di sisi atas garis tengah. Artinya...', o: ['Kebetulan biasa', 'Rata-rata proses bergeser', 'Alat ukur rusak', 'Variasi mengecil'], a: 1, w: 'Peluang 8 titik berturut-turut di satu sisi hanya sekitar 0.4%, sinyal pergeseran rata-rata.' }
  ]
},

/* ============================ TPM ============================ */
{
  id: 'tpm-oee', g: 'tpm', icon: '⚙️', min: 12,
  title: 'OEE: Seberapa Produktif Mesinmu?',
  tag: 'Satu angka untuk menilai pemakaian mesin: ketersediaan × kecepatan × kualitas.',
  sec: [
    { h: `
<p><b>TPM (Total Productive Maintenance)</b> adalah cara agar mesin selalu siap, cepat, dan menghasilkan produk bagus, dengan melibatkan <i>semua orang</i>, terutama operator. Alat ukurnya adalah <b>OEE (Overall Equipment Effectiveness)</b>.</p>
<div class="callout analogy"><b>Analogi: kedai kopi 8 jam.</b> Kedai buka 480 menit. Sebagian waktu mesin espresso rusak atau ganti biji (<b>Availability</b> hilang). Saat berjalan, barista membuat kopi lebih lambat dari kemampuan ideal (<b>Performance</b> hilang). Sebagian kopi salah pesanan dan dibuang (<b>Quality</b> hilang). Yang tersisa dari 480 menit adalah waktu yang <i>benar-benar produktif</i>, itulah OEE.</div>
<div class="formula">OEE = Availability × Performance × Quality</div>
<p>Geser angka di bawah dan lihat "bocor" mana yang paling besar:</p>` },
    { w: 'oee' },
    { h: `
<h3>Cara membaca</h3>
<ul>
<li><b>Availability</b> = waktu mesin benar-benar jalan ÷ waktu terjadwal. Bocor oleh kerusakan dan setup.</li>
<li><b>Performance</b> = kecepatan aktual ÷ kecepatan ideal. Bocor oleh macet kecil dan jalan pelan.</li>
<li><b>Quality</b> = produk bagus ÷ total produk. Bocor oleh scrap dan rework.</li>
</ul>
<p>Benchmark: <b>85%</b> dianggap world class, 60% rata-rata industri, di bawah 40% banyak ruang perbaikan. Karena dikalikan, tiga angka "lumayan" (90%, 90%, 90%) sudah menghasilkan hanya 73%.</p>` },
    { lvl: 'cert', h: `
<h3>Rumus lengkap & konsep lanjut</h3>
<div class="formula">Planned Production Time = Shift − break terjadwal<br>Run Time = Planned Production Time − Downtime<br>Availability = Run Time / Planned Production Time<br>Performance = (Ideal Cycle Time × Total Count) / Run Time<br>Quality = Good Count / Total Count<br>MTBF = Run Time / jumlah kegagalan<br>MTTR = total waktu perbaikan / jumlah kegagalan<br>Availability (inheren) = MTBF / (MTBF + MTTR)</div>
<ul>
<li><b>TEEP</b> (Total Effective Equipment Performance) = OEE × Utilization (Planned / waktu kalender 24/7). TEEP menunjukkan potensi kapasitas tersisa.</li>
<li><b>Ideal cycle time</b> harus berasal dari desain mesin/kecepatan terbaik terbukti, bukan rata-rata aktual, kalau tidak Performance akan terlihat bagus palsu.</li>
<li>OEE diukur <b>per mesin/bottleneck</b>. Jangan rata-ratakan seluruh pabrik; OEE mesin non-bottleneck tidak menaikkan output.</li>
<li><b>Takt time</b> = waktu tersedia / permintaan pelanggan. Bandingkan dengan cycle time mesin.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Availability 90%, Performance 95%, Quality 98%. Berapa OEE?', o: ['94.3%', '83.8%', '75.0%', '90.0%'], a: 1, w: '0.90 × 0.95 × 0.98 = 0.838, yaitu 83.8%.' },
    { q: 'Mesin jalan tapi lebih pelan dari kecepatan idealnya. Faktor OEE yang turun?', o: ['Availability', 'Performance', 'Quality', 'Utilization'], a: 1, w: 'Kecepatan di bawah ideal dan macet kecil masuk ke Performance loss.' },
    { q: 'OEE yang umumnya dianggap world class?', o: ['40%', '60%', '85%', '100%'], a: 2, w: 'Benchmark world class adalah 85% (A ≈ 90%, P ≈ 95%, Q ≈ 99%).' }
  ]
},

{
  id: 'tpm-loss', g: 'tpm', icon: '🕳️', min: 12,
  title: '6 Big Losses & 8 Pilar TPM',
  tag: 'Daftar "kebocoran" produktivitas dan kerangka kerja untuk menutupnya.',
  sec: [
    { h: `
<p>OEE hanya angka. Untuk memperbaikinya, kita perlu tahu <i>kebocoran apa</i> yang terjadi. TPM mengelompokkannya menjadi <b>6 Big Losses</b>. Klik kartu untuk melihat contoh sehari-hari.</p>
<div class="callout analogy"><b>Analogi: ember bocor.</b> Waktu terjadwal adalah air penuh di ember. Setiap loss adalah lubang di sisi ember. Kamu tidak akan menambah air lebih banyak; kamu menambal lubang terbesar dulu.</div>` },
    { w: 'cards', data: { items: [
        { i: '🔧', t: 'Equipment Failure', c: 'A', tag: 'Availability', s: 'Mesin rusak mendadak', d: '<b>Dapur:</b> kompor mati saat jam makan siang. <b>Pabrik:</b> motor terbakar, sensor rusak. Solusi: perawatan terencana, deteksi dini (getaran, suhu).' },
        { i: '🛠️', t: 'Setup & Adjustment', c: 'A', tag: 'Availability', s: 'Ganti produk, setel ulang', d: '<b>Dapur:</b> mengganti menu dari nasi goreng ke pasta, membersihkan wajan. <b>Pabrik:</b> ganti tooling/model. Solusi: SMED (mempercepat changeover), persiapan di luar mesin.' },
        { i: '⏱️', t: 'Idling & Minor Stoppage', c: 'P', tag: 'Performance', s: 'Berhenti-jalan singkat', d: '<b>Dapur:</b> printer order macet 30 detik, berulang. <b>Pabrik:</b> produk tersangkut di conveyor. Sering tidak tercatat karena "sebentar". Solusi: bersihkan, rapikan jalur, poka-yoke.' },
        { i: '🐌', t: 'Reduced Speed', c: 'P', tag: 'Performance', s: 'Jalan lebih lambat dari ideal', d: '<b>Dapur:</b> kompor dikecilkan karena panci sudah tua. <b>Pabrik:</b> kecepatan diturunkan agar tidak cacat. Solusi: cari tahu kenapa tidak bisa jalan di kecepatan desain.' },
        { i: '🗑️', t: 'Process Defects', c: 'Q', tag: 'Quality', s: 'Scrap & rework saat produksi', d: '<b>Dapur:</b> pesanan salah dan dibuat ulang. <b>Pabrik:</b> produk reject, perlu rework. Solusi: Six Sigma, standar kerja, poka-yoke.' },
        { i: '🌱', t: 'Reduced Yield (Startup)', c: 'Q', tag: 'Quality', s: 'Hasil buruk saat awal produksi', d: '<b>Dapur:</b> beberapa gorengan pertama gosong sebelum minyak stabil. <b>Pabrik:</b> produk awal setelah start-up tidak layak. Solusi: standarkan prosedur warm-up.' }
      ] } },
    { h: `
<h3>8 Pilar TPM</h3>
<p>Kerangka kerja untuk menutup kebocoran secara sistematis. Klik untuk membuka.</p>` },
    { w: 'cards', data: { items: [
        { i: '🧑‍🔧', t: 'Autonomous Maintenance', s: 'Operator merawat mesinnya', d: 'Seperti pemilik motor yang rutin cek oli dan rantai sendiri, tidak menunggu bengkel. Operator membersihkan, melumasi, dan memeriksa (CLIT) mesin sehari-hari.' },
        { i: '📅', t: 'Planned Maintenance', s: 'Servis terjadwal', d: 'Servis berkala sebelum rusak, seperti ganti oli tiap 5,000 km. Menggunakan data MTBF/MTTR.' },
        { i: '🔍', t: 'Focused Improvement (Kobetsu Kaizen)', s: 'Proyek perbaikan loss terbesar', d: 'Tim lintas fungsi menyerang loss tertentu memakai alat seperti 5 Why, Fishbone, DMAIC.' },
        { i: '✅', t: 'Quality Maintenance', s: 'Kualitas dibangun di mesin', d: 'Mengendalikan kondisi mesin yang menentukan kualitas (Q = f(kondisi mesin)) agar cacat tidak muncul.' },
        { i: '🚀', t: 'Early Equipment Management', s: 'Mesin baru bebas masalah lama', d: 'Belajar dari mesin lama saat mendesain atau membeli mesin baru, supaya cepat stabil.' },
        { i: '🎓', t: 'Training & Education', s: 'Kompetensi semua orang', d: 'Operator belajar merawat, teknisi belajar menganalisis, supervisor belajar memimpin perbaikan.' },
        { i: '🏢', t: 'Office TPM', s: 'TPM untuk fungsi pendukung', d: 'Mengurangi pemborosan di administrasi, pembelian, perencanaan yang ikut menentukan produksi.' },
        { i: '🦺', t: 'Safety, Health & Environment', s: 'Nol kecelakaan', d: 'Perawatan yang baik juga membuat tempat kerja lebih aman. Target: nol kecelakaan, nol polusi.' }
      ] } },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<ul>
<li><b>Pemetaan Loss → OEE</b>: Failure + Setup → Availability. Minor stoppage + Reduced speed → Performance. Defects + Startup yield → Quality.</li>
<li><b>Autonomous Maintenance: 7 langkah</b> — (1) Initial cleaning, (2) Atasi sumber kotoran & area sulit dijangkau, (3) Standar bersih-lumas-periksa, (4) Inspeksi umum, (5) Inspeksi otonom, (6) Standardisasi, (7) Manajemen mandiri penuh.</li>
<li><b>Jenis perawatan</b>: Breakdown (reaktif), Preventive (waktu), Predictive/Condition-based (kondisi), Proactive (akar penyebab).</li>
<li><b>Kurva bak mandi</b> (bathtub curve): kegagalan awal (infant mortality) → masa pakai (random) → aus (wear-out). Strategi perawatan berbeda di tiap fase.</li>
<li><b>Red tag</b> untuk menandai abnormalitas mesin; <b>OPL (One Point Lesson)</b> untuk berbagi pengetahuan singkat.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Penggantian tooling antar produk yang memakan waktu termasuk loss kategori...', o: ['Performance', 'Quality', 'Availability', 'Safety'], a: 2, w: 'Setup & adjustment membuat mesin berhenti, jadi masuk Availability loss.' },
    { q: 'Pilar TPM di mana operator membersihkan, melumasi, dan memeriksa mesinnya sendiri?', o: ['Planned Maintenance', 'Autonomous Maintenance', 'Office TPM', 'Early Equipment Management'], a: 1, w: 'Autonomous Maintenance memberi kepemilikan mesin kepada operator.' },
    { q: 'Minor stoppage dan reduced speed memengaruhi faktor OEE...', o: ['Availability', 'Performance', 'Quality', 'Tidak ada'], a: 1, w: 'Keduanya membuat mesin jalan di bawah output ideal.' }
  ]
},

/* ============================ LEAN ============================ */
{
  id: 'lean-waste', g: 'lean', icon: '🗑️', min: 10,
  title: '8 Waste (Muda): Pemborosan Tersembunyi',
  tag: 'Delapan jenis aktivitas yang memakan sumber daya tapi tidak ditambahi nilai pelanggan.',
  sec: [
    { h: `
<p>Lean berpusat pada satu pertanyaan: <b>"Apakah pelanggan mau membayar untuk langkah ini?"</b> Aktivitas yang tidak bernilai disebut <b>muda</b> (pemborosan). Ada 8 jenis, diingat dengan singkatan <b>DOWNTIME</b>.</p>
<div class="callout analogy"><b>Analogi: dapur restoran.</b> Pelanggan membayar untuk makanan lezat yang datang cepat. Mereka tidak membayar untuk koki yang berjalan bolak-balik ke gudang, bahan yang membusuk di freezer, atau masakan yang dibuang karena salah pesanan.</div>
<p>Klik tiap kartu untuk contoh di dapur, kantor, dan pabrik.</p>` },
    { w: 'cards', data: { items: [
        { i: '❌', t: 'D — Defects', s: 'Cacat & pekerjaan ulang', d: '<b>Dapur:</b> pesanan salah, masak ulang. <b>Kantor:</b> laporan penuh typo, direvisi 3 kali. <b>Pabrik:</b> scrap dan rework.' },
        { i: '📦', t: 'O — Overproduction', s: 'Membuat lebih dari yang dibutuhkan', d: '<b>Dapur:</b> masak 100 porsi, terjual 60. <b>Kantor:</b> laporan yang tidak dibaca siapa pun. <b>Pabrik:</b> produksi di luar jadwal pesanan. Dianggap pemborosan terburuk karena memicu waste lain.' },
        { i: '⏳', t: 'W — Waiting', s: 'Menunggu', d: '<b>Dapur:</b> koki menunggu bahan datang. <b>Kantor:</b> menunggu persetujuan atasan 3 hari. <b>Pabrik:</b> operator menunggu mesin selesai.' },
        { i: '🧠', t: 'N — Non-utilized talent', s: 'Bakat tidak dipakai', d: '<b>Dapur:</b> koki berpengalaman hanya disuruh mengupas bawang. <b>Kantor:</b> ide staf tidak didengar. <b>Pabrik:</b> operator tidak dilibatkan dalam perbaikan.' },
        { i: '🚚', t: 'T — Transportation', s: 'Memindahkan barang tak perlu', d: '<b>Dapur:</b> bahan dipindah 3 kali antar rak. <b>Kantor:</b> dokumen kirim bolak-balik. <b>Pabrik:</b> material berpindah jauh antar proses.' },
        { i: '🏬', t: 'I — Inventory', s: 'Stok berlebih', d: '<b>Dapur:</b> sayur menumpuk lalu busuk. <b>Kantor:</b> tumpukan berkas menunggu diproses. <b>Pabrik:</b> WIP dan barang jadi menumpuk (memakan modal & ruang).' },
        { i: '🚶', t: 'M — Motion', s: 'Gerakan orang tak perlu', d: '<b>Dapur:</b> koki bolak-balik mengambil pisau. <b>Kantor:</b> mencari file di folder berantakan. <b>Pabrik:</b> operator menjangkau/jalan jauh ambil alat. (Orang bergerak = Motion; barang berpindah = Transportation.)' },
        { i: '🔁', t: 'E — Extra-processing', s: 'Proses berlebih', d: '<b>Dapur:</b> mengiris tipis sampai 1 mm padahal pelanggan tidak butuh. <b>Kantor:</b> 5 tanda tangan untuk pembelian kecil. <b>Pabrik:</b> memoles lebih halus dari spesifikasi.' }
      ] } },
    { h: `
<h3>Cara mulai</h3>
<p>Berjalanlah di proses (<b>gemba walk</b>) dengan stopwatch dan catatan, lalu beri label setiap langkah: <b>VA</b> (value-added), <b>NVA-necessary</b> (tidak menambah nilai tapi wajib, misalnya inspeksi regulasi), atau <b>NVA/waste</b>. Biasanya VA hanya 5–10% dari total lead time. Itu berarti peluangnya besar.</p>` },
    { lvl: 'cert', h: `
<h3>Konsep tambahan</h3>
<ul>
<li><b>3M</b>: <b>Muda</b> (pemborosan), <b>Mura</b> (ketidakrataan/fluktuasi beban), <b>Muri</b> (kelebihan beban orang/mesin). Ketiganya saling memicu.</li>
<li><b>Value Stream Mapping (VSM)</b>: peta aliran material & informasi dari pelanggan ke pemasok. Hitung <b>Process Time (PT)</b> dan <b>Lead Time (LT)</b>; <b>PCE (Process Cycle Efficiency)</b> = VA time / Lead time. PCE &lt; 10% umum di proses non-lean.</li>
<li><b>Takt time</b> = waktu tersedia per hari / permintaan per hari. Ritme produksi yang diminta pelanggan.</li>
<li><b>Heijunka</b>: perataan jadwal produksi (volume dan mix) untuk mengurangi mura.</li>
<li><b>5 prinsip Lean</b>: Specify value → Map value stream → Create flow → Establish pull → Pursue perfection.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Membuat lebih banyak dari yang dibutuhkan pelanggan disebut...', o: ['Waiting', 'Overproduction', 'Motion', 'Extra-processing'], a: 1, w: 'Overproduction sering disebut pemborosan terburuk karena menyebabkan inventory, transportasi, dan waiting.' },
    { q: 'Operator berjalan bolak-balik mengambil alat yang letaknya jauh. Ini waste...', o: ['Transportation', 'Motion', 'Inventory', 'Defects'], a: 1, w: 'Gerakan manusia yang tidak perlu = Motion. Pemindahan barang = Transportation.' },
    { q: 'Tumpukan berkas menunggu diproses di meja termasuk...', o: ['Inventory', 'Overproduction', 'Defects', 'Waiting saja'], a: 0, w: 'Pekerjaan setengah jadi yang menumpuk adalah inventory (WIP).' }
  ]
},

{
  id: 'lean-5s', g: 'lean', icon: '🧹', min: 8,
  title: '5S & Kaizen: Mulai dari Meja Sendiri',
  tag: 'Dasar tempat kerja yang rapi, aman, dan siap diperbaiki terus-menerus.',
  sec: [
    { h: `
<p><b>5S</b> adalah lima langkah menata tempat kerja. Kata-katanya dari bahasa Jepang, semua berawalan "S".</p>
<div class="callout analogy"><b>Analogi: merapikan lemari pakaian.</b> Singkirkan baju yang tidak pernah dipakai (Seiri), atur supaya yang sering dipakai paling mudah diambil (Seiton), bersihkan (Seiso), buat aturan (Seiketsu), lalu jaga kebiasaannya (Shitsuke).</div>` },
    { w: 'cards', data: { items: [
        { i: '1️⃣', t: 'Seiri — Sort', s: 'Pilah', d: 'Pisahkan yang dibutuhkan dari yang tidak. Yang tidak perlu diberi <b>red tag</b> dan disingkirkan. <i>Rumah:</i> donasi baju yang 1 tahun tidak dipakai.' },
        { i: '2️⃣', t: 'Seiton — Set in order', s: 'Tata', d: 'Tempat tetap untuk setiap barang, label jelas, yang sering dipakai paling dekat. <i>Aturan:</i> mudah ditemukan dalam 30 detik.' },
        { i: '3️⃣', t: 'Seiso — Shine', s: 'Bersihkan', d: 'Bersihkan sambil memeriksa. Kotoran sering menyembunyikan kebocoran atau retak. Pembersihan adalah inspeksi.' },
        { i: '4️⃣', t: 'Seiketsu — Standardize', s: 'Standarkan', d: 'Jadikan 3S pertama sebagai standar visual: foto kondisi ideal, checklist, kode warna.' },
        { i: '5️⃣', t: 'Shitsuke — Sustain', s: 'Disiplin', d: 'Kebiasaan rutin dan audit berkala. Bagian tersulit; 5S sering hanya bertahan sebulan tanpa dukungan pemimpin.' }
      ] } },
    { h: `
<h3>Kaizen: perbaikan kecil, terus-menerus</h3>
<p><b>Kaizen</b> berarti "berubah menjadi lebih baik". Filosofinya: perbaikan kecil setiap hari oleh <i>semua orang</i> mengalahkan satu proyek besar sesekali.</p>
<div class="callout analogy"><b>Analogi: menabung.</b> Menyisihkan Rp10,000 per hari terasa kecil, tapi setahun jadi Rp3.6 juta. Satu ide kecil per orang per bulan di pabrik 100 orang = 1,200 perbaikan per tahun.</div>
<ul>
<li><b>Gemba</b> = tempat kerja sebenarnya. Perbaikan dimulai dengan melihat langsung, bukan dari ruang rapat.</li>
<li>Mulai dari yang paling mengganggu di area sendiri, dan biarkan pekerja yang mengusulkan solusi.</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Lanjutan</h3>
<ul>
<li><b>6S</b>: tambahan <b>Safety</b>. Banyak perusahaan menjadikannya bagian dari audit.</li>
<li><b>Audit 5S</b>: skor per area (misal skala 0–4 per S), dibandingkan antar area dan antar waktu, dengan tindakan korektif.</li>
<li><b>Kaizen event (blitz)</b>: 3–5 hari, tim lintas fungsi memperbaiki satu area, hasil terukur. <b>Kaizen harian</b>: ide kecil dari operator lewat sistem saran.</li>
<li><b>Kaikaku</b>: perubahan radikal (kontras dengan kaizen yang bertahap).</li>
<li><b>Visual management</b>: andon, shadow board, floor marking sehingga kondisi normal dan abnormal terlihat dalam hitungan detik.</li>
<li>Siklus <b>PDCA</b> adalah mesin di balik kaizen (lihat topik 5 Why, Fishbone & PDCA).</li>
</ul>` }
  ],
  quiz: [
    { q: 'Arti Seiri dalam 5S?', o: ['Menata', 'Memilah', 'Membersihkan', 'Mendisiplinkan'], a: 1, w: 'Seiri = Sort: memilah dan menyingkirkan yang tidak diperlukan.' },
    { q: 'Urutan 5S yang benar?', o: ['Seiton, Seiri, Seiso, Shitsuke, Seiketsu', 'Seiri, Seiton, Seiso, Seiketsu, Shitsuke', 'Seiso, Seiri, Seiton, Seiketsu, Shitsuke', 'Seiri, Seiso, Seiton, Shitsuke, Seiketsu'], a: 1, w: 'Sort → Set in order → Shine → Standardize → Sustain.' },
    { q: 'Filosofi kaizen paling tepat dirangkum sebagai...', o: ['Satu proyek besar tiap tahun', 'Perbaikan kecil terus-menerus oleh semua orang', 'Perubahan hanya oleh manajer', 'Beli mesin baru'], a: 1, w: 'Kaizen = perbaikan berkelanjutan, dari langkah kecil yang konsisten.' }
  ]
},

{
  id: 'lean-flow', g: 'lean', icon: '🏭', min: 12,
  title: 'Flow, Bottleneck & WIP',
  tag: 'Kenapa mempercepat semua mesin tidak menambah output, dan apa itu Kanban.',
  sec: [
    { h: `
<p>Lini produksi bekerja seperti pipa air: <b>aliran maksimum ditentukan oleh bagian yang paling sempit</b>. Stasiun paling lambat disebut <b>bottleneck</b>.</p>
<div class="callout analogy"><b>Analogi: antrean kasir supermarket.</b> Kalau hanya 1 kasir yang buka, secepat apa pun orang mengambil belanjaan, antrean menumpuk di kasir. Mempercepat petugas pengisi rak tidak membuat orang keluar lebih cepat.</div>
<h3>Simulasi lini produksi</h3>
<ol>
<li>Tekan <b>Mulai</b>. Perhatikan di mana antrean (kotak kecil) menumpuk.</li>
<li>Percepat stasiun yang <i>bukan</i> bottleneck. Output tidak naik, hanya antrean yang membesar.</li>
<li>Percepat bottleneck. Output naik, dan bottleneck pindah ke stasiun lain.</li>
<li>Centang <b>Batasi WIP (Kanban)</b>. Output sama, tetapi tumpukan dan lead time turun.</li>
</ol>` },
    { w: 'flow' },
    { h: `
<h3>Pelajaran dari simulasi</h3>
<ul>
<li><b>Throughput ditentukan bottleneck</b>, bukan rata-rata kecepatan semua stasiun.</li>
<li><b>WIP (Work In Process)</b> berlebih tidak menaikkan output; ia hanya memperpanjang waktu tunggu dan menutupi masalah.</li>
<li><b>Kanban (sistem tarik / pull)</b>: stasiun hanya mulai bekerja ketika ada ruang di hilir. Seperti restoran sushi berjalan: koki mengisi piring hanya ketika ada piring kosong di sabuk.</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Little's Law & Theory of Constraints</h3>
<div class="formula">WIP = Throughput × Lead time   (Little's Law)<br>Lead time = WIP / Throughput<br>Takt time = waktu tersedia / permintaan pelanggan</div>
<p>Pada simulasi, lead time yang ditampilkan dihitung dari hukum ini. Menurunkan WIP dengan throughput tetap otomatis menurunkan lead time.</p>
<p><b>Theory of Constraints (TOC) — 5 Focusing Steps</b>:</p>
<ol>
<li><b>Identify</b> constraint (bottleneck).</li>
<li><b>Exploit</b>: pastikan constraint tidak pernah menganggur (OEE bottleneck dimaksimalkan).</li>
<li><b>Subordinate</b>: semua proses lain mengikuti ritme constraint.</li>
<li><b>Elevate</b>: tambah kapasitas constraint (investasi/lembur/mesin).</li>
<li><b>Repeat</b>: constraint baru akan muncul, jangan biarkan inersia.</li>
</ol>
<p><b>Drum-Buffer-Rope</b>: drum = ritme bottleneck, buffer = penyangga di depan bottleneck, rope = sinyal pelepasan material ke awal lini.</p>
<p>Perbedaan: <b>CONWIP</b> membatasi total WIP di seluruh lini (seperti simulasi); <b>Kanban</b> membatasi WIP per stasiun dengan kartu/penanda.</p>` }
  ],
  quiz: [
    { q: 'Output sebuah lini seri ditentukan oleh...', o: ['Stasiun tercepat', 'Rata-rata semua stasiun', 'Stasiun paling lambat (bottleneck)', 'Stasiun pertama'], a: 2, w: 'Aliran maksimum tidak bisa melebihi kapasitas bagian tersempit.' },
    { q: 'Mempercepat stasiun yang bukan bottleneck akan...', o: ['Menaikkan output lini', 'Hanya menumpuk WIP di depan bottleneck', 'Menurunkan lead time', 'Menghilangkan bottleneck'], a: 1, w: 'Stasiun lebih cepat tidak bisa mengirim lebih banyak daripada yang bisa diterima bottleneck.' },
    { q: "Little's Law menyatakan WIP sama dengan...", o: ['Throughput × Lead time', 'Throughput / Lead time', 'Lead time − Throughput', 'Takt time × 2'], a: 0, w: 'WIP = TH × LT. Karena itu menurunkan WIP pada TH tetap akan memperpendek lead time.' }
  ]
},

/* ============================ PROBLEM SOLVING ============================ */
{
  id: 'ps-pareto', g: 'ps', icon: '📉', min: 8,
  title: 'Pareto: Fokus ke yang Paling Berpengaruh',
  tag: 'Prinsip 80/20 untuk memilih masalah mana yang diselesaikan lebih dulu.',
  sec: [
    { h: `
<p>Ahli ekonomi Vilfredo Pareto menemukan pola: sekitar <b>80% akibat berasal dari 20% penyebab</b>. Di dunia kerja: sebagian kecil jenis masalah menyumbang sebagian besar kerugian.</p>
<div class="callout analogy"><b>Analogi: pakaian di lemari.</b> Kita memakai sekitar 20% baju untuk 80% waktu. Kalau mau membereskan lemari, mulai dari yang paling sering dipakai, bukan satu per satu secara acak.</div>
<p><b>Pareto chart</b>: batang diurutkan dari terbesar ke terkecil, ditambah garis persentase kumulatif. Di bawah ini data keluhan sebuah restoran. <b>Ubah angkanya</b> dan lihat "vital few" berubah.</p>` },
    { w: 'pareto' },
    { h: `
<h3>Langkah membuat Pareto</h3>
<ol>
<li>Kumpulkan data kategori masalah (check sheet) selama periode tertentu.</li>
<li>Hitung jumlah (atau biaya) per kategori.</li>
<li>Urutkan menurun, hitung % kumulatif.</li>
<li>Tandai kategori yang mencapai ±80% (<b>vital few</b>); sisanya <b>trivial many</b>.</li>
<li>Selidiki penyebab kategori terbesar dengan 5 Why atau Fishbone.</li>
</ol>
<div class="callout tip"><b>Tips:</b> ukur dengan <i>biaya</i> bila memungkinkan. Satu jenis cacat yang jarang tapi mahal bisa lebih penting daripada cacat sering tapi murah.</div>` },
    { lvl: 'cert', h: `
<h3>Hal yang diujikan</h3>
<ul>
<li>Pareto adalah salah satu <b>7 Basic Quality Tools</b>: Check sheet, Histogram, Pareto, Fishbone, Scatter diagram, Control chart, Stratification (atau Flowchart).</li>
<li><b>Stratifikasi</b>: pecah data (per shift, mesin, operator) untuk menemukan pola tersembunyi. Pareto bertingkat (Pareto of Pareto) dipakai untuk menelusuri lebih dalam.</li>
<li>Pareto tidak menjelaskan <i>kenapa</i>. Ia hanya menunjukkan <i>di mana</i> mencari.</li>
<li>Pareto "sebelum dan sesudah" digunakan untuk membuktikan efek perbaikan.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Prinsip 80/20 pada Pareto berarti...', o: ['80% waktu dipakai rapat', 'Sebagian kecil penyebab menimbulkan sebagian besar masalah', 'Semua penyebab sama pentingnya', '20% pekerja menyebabkan masalah'], a: 1, w: 'Sedikit penyebab (vital few) menyumbang sebagian besar efek.' },
    { q: 'Batang pada Pareto chart disusun...', o: ['Alfabetis', 'Menurun dari terbesar ke terkecil', 'Berdasarkan waktu', 'Acak'], a: 1, w: 'Pengurutan menurun membuat vital few langsung terlihat.' },
    { q: 'Setelah menemukan kategori terbesar di Pareto, langkah selanjutnya?', o: ['Abaikan, karena sudah jelas', 'Selidiki akar penyebabnya (5 Why / Fishbone)', 'Beli mesin baru', 'Hapus kategori lain'], a: 1, w: 'Pareto menunjukkan di mana mencari. Akar penyebab dicari dengan alat lain.' }
  ]
},

{
  id: 'ps-root', g: 'ps', icon: '🔎', min: 14,
  title: '5 Why, Fishbone & PDCA',
  tag: 'Tiga alat paling sering dipakai untuk mencari akar masalah dan memperbaikinya.',
  sec: [
    { h: `
<h3>1. 5 Why — gali sampai ke akar</h3>
<p>Tanyakan "kenapa?" berulang kali (sekitar 5 kali) sampai bertemu penyebab yang bisa ditindak, biasanya sebuah <i>sistem atau aturan</i>, bukan "kelalaian orang".</p>
<div class="callout analogy"><b>Analogi: dokter.</b> Pasien demam (gejala). Dokter bertanya: kenapa demam? infeksi. Kenapa infeksi? bakteri. Kenapa masuk? luka tidak dibersihkan. Mengobati demam saja tidak menyembuhkan.</div>
<p>Pilih skenario, lalu tekan <b>Kenapa?</b> berkali-kali.</p>` },
    { w: 'fivewhy' },
    { h: `
<h3>2. Fishbone (Ishikawa) — petakan semua kemungkinan penyebab</h3>
<p>Dipakai saat penyebabnya banyak dan belum jelas. "Kepala ikan" adalah masalah; "tulang" adalah kategori penyebab. Kategori standar manufaktur adalah <b>6M</b>: Man, Machine, Method, Material, Measurement, Mother Nature (lingkungan).</p>` },
    { w: 'fishbone' },
    { h: `
<p>Fishbone hanya <i>hipotesis</i>. Setiap kemungkinan penyebab harus diverifikasi dengan data (Pareto, pengamatan, uji) sebelum dianggap akar masalah.</p>
<h3>3. PDCA — siklus perbaikan</h3>
<p>Setelah tahu akar masalah, perbaiki dengan siklus <b>Plan–Do–Check–Act</b>. Satu putaran = satu pembelajaran. Putar terus, tingkat standar naik terus.</p>
<div class="callout analogy"><b>Analogi: mencoba resep baru.</b> Rencanakan perubahan (kurangi gula), coba masak kecil-kecilan, cicipi dan bandingkan, lalu tetapkan resep baru atau ubah lagi.</div>` },
    { w: 'stepper', data: {
        steps: [
          { k: 'P', t: 'Plan', q: 'Apa yang mau diubah dan hasil apa yang diharapkan?', a: 'Tentukan target, penyebab yang akan diatasi, dan rencana percobaan.', tools: 'Pareto, 5 Why, Fishbone, rencana aksi (5W1H)', cert: 'Target SMART, hipotesis terukur, metrik keberhasilan ditetapkan sebelum percobaan.' },
          { k: 'D', t: 'Do', q: 'Jalankan rencana dalam skala kecil.', a: 'Coba di satu lini/shift/mesin dulu agar risiko kecil.', tools: 'Pilot, data collection sheet', cert: 'Catat penyimpangan dari rencana dan data selama percobaan.' },
          { k: 'C', t: 'Check', q: 'Apakah hasilnya sesuai target?', a: 'Bandingkan hasil dengan target dan kondisi sebelum perubahan.', tools: 'Control chart, grafik sebelum/sesudah, Pareto before/after', cert: 'Analisis statistik (apakah beda nyata?), identifikasi efek samping.' },
          { k: 'A', t: 'Act', q: 'Standarkan yang berhasil atau perbaiki lagi.', a: 'Berhasil: jadikan standar (SOP/OPL) dan sebarkan. Gagal: pelajari dan ulangi dari Plan.', tools: 'SOP, training, poka-yoke', cert: 'Standardisasi + horizontal deployment ke area serupa; mulai siklus PDCA berikutnya.' }
        ]
    } },
    { lvl: 'cert', h: `
<h3>Alat lanjutan</h3>
<ul>
<li><b>8D (Eight Disciplines)</b>: D0 persiapan, D1 bentuk tim, D2 deskripsikan masalah, D3 <i>containment</i> (tindakan sementara), D4 akar penyebab, D5 pilih tindakan korektif permanen, D6 implementasi & validasi, D7 pencegahan sebaran, D8 apresiasi tim.</li>
<li><b>Containment vs Corrective vs Preventive</b>: containment menahan dampak sekarang; corrective menghilangkan akar penyebab; preventive mencegah masalah serupa di tempat lain.</li>
<li><b>Escape point</b>: pertanyaan "kenapa cacat lolos ke pelanggan?" (deteksi) selain "kenapa cacat terjadi?" (penyebab). Akar masalah punya dua sisi: occurrence dan detection.</li>
<li><b>Is / Is Not analysis</b> (Kepner-Tregoe): apa, di mana, kapan, berapa banyak — masalah terjadi vs tidak terjadi — untuk mempersempit hipotesis.</li>
<li><b>A3 report</b>: ringkasan satu lembar kertas A3 yang mengikuti alur PDCA (latar belakang, kondisi saat ini, target, analisis, countermeasure, rencana, tindak lanjut).</li>
<li><b>FMEA</b>: RPN = Severity × Occurrence × Detection (skala 1–10). Prioritaskan RPN tertinggi, dan severity tinggi tetap diprioritaskan walau RPN kecil.</li>
<li>Syarat 5 Why: berbasis fakta di gemba, bisa bercabang, dan akhirnya dibalik untuk uji logika ("karena X, maka Y").</li>
</ul>` }
  ],
  quiz: [
    { q: '5 Why dianggap selesai ketika...', o: ['Sudah menanyakan tepat 5 kali', 'Menemukan penyebab sistemik yang bisa ditindak', 'Menemukan orang yang salah', 'Atasan sudah puas'], a: 1, w: 'Jumlah "kenapa" fleksibel. Berhenti saat tiba pada akar yang bisa dicegah dengan tindakan nyata.' },
    { q: 'Kategori 6M pada Fishbone adalah...', o: ['Man, Machine, Method, Material, Measurement, Mother Nature', 'Money, Machine, Market, Material, Management, Motion', 'Man, Money, Method, Mind, Machine, Marketing', 'Machine, Method, Meeting, Material, Mistake, Measure'], a: 0, w: 'Man, Machine, Method, Material, Measurement, dan Mother Nature (environment).' },
    { q: 'Pada PDCA, tahap "Check" berarti...', o: ['Menjalankan rencana', 'Membandingkan hasil dengan target', 'Menetapkan standar', 'Menyusun rencana'], a: 1, w: 'Check = evaluasi hasil terhadap target dan kondisi sebelumnya.' }
  ]
}

];
