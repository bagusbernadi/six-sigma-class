/* TAHAP 2 — Lanjutan. Ditambahkan ke GROUPS dan TOPICS yang sudah ada. */
window.GROUPS.push(
  { id: 'six2',  stage: 2, name: 'Six Sigma Lanjutan',       color: '#7c3aed' },
  { id: 'lean2', stage: 2, name: 'Lean Lanjutan',            color: '#d97706' },
  { id: 'ps2',   stage: 2, name: 'Problem Solving Lanjutan', color: '#db2777' }
);

window.TOPICS.push(

{
  id: 'sig-hipotesis', g: 'six2', icon: '⚖️', min: 15,
  title: 'Uji Hipotesis: Beda Nyata atau Kebetulan?',
  tag: 'Cara memutuskan dengan data apakah perbaikan benar-benar berhasil.',
  sec: [
    { h: `
<p>Setelah perbaikan, waktu proses turun dari 50 ke 47 detik. Berhasil? Atau cuma kebetulan karena data memang naik-turun? <b>Uji hipotesis</b> menjawabnya dengan angka, bukan perasaan.</p>
<div class="callout analogy"><b>Analogi: pengadilan.</b> Terdakwa dianggap <i>tidak bersalah</i> sampai bukti cukup kuat. Di statistik: <b>H₀</b> = "tidak ada perbedaan" (praduga tak bersalah). <b>H₁</b> = "ada perbedaan". Data adalah bukti. <b>p-value</b> = seberapa kecil kemungkinan bukti seperti ini muncul <i>kalau H₀ benar</i>. Kalau sangat kecil (di bawah batas α, umumnya 0.05), kita tolak H₀.</div>
<p>Mainkan simulasi. Wilayah merah adalah "zona bukti cukup kuat". Garis vertikal adalah hasil data kamu.</p>` },
    { w: 'ttest' },
    { h: `
<h3>Yang perlu kamu perhatikan</h3>
<ul>
<li><b>Selisih besar</b> lebih mudah terbukti nyata.</li>
<li><b>Variasi kecil</b> membuat selisih lebih mudah terlihat (suara di ruangan sepi lebih mudah didengar).</li>
<li><b>Sampel banyak</b> menambah kekuatan bukti. Coba naikkan n.</li>
</ul>
<div class="callout tip"><b>Hati-hati:</b> "nyata secara statistik" belum tentu "penting secara praktis". Dengan sampel sangat besar, selisih 0.1 detik pun bisa signifikan, tapi mungkin tidak berarti apa-apa bagi bisnis.</div>
<h3>Dua jenis salah keputusan</h3>
<p>Klik kartu untuk penjelasan.</p>` },
    { w: 'cards', data: { items: [
        { i: '🚨', t: 'Type I error (α)', c: 'A', tag: 'Alarm palsu', s: 'Mengira ada beda padahal tidak', d: '<b>Pengadilan:</b> menghukum orang tak bersalah. <b>Pabrik:</b> menyimpulkan perbaikan berhasil, lalu mengubah SOP, padahal hanya kebetulan. Peluangnya = α (misalnya 5%).' },
        { i: '🙈', t: 'Type II error (β)', c: 'P', tag: 'Terlewat', s: 'Gagal melihat beda yang memang ada', d: '<b>Pengadilan:</b> membebaskan pelaku sebenarnya. <b>Pabrik:</b> perbaikan yang sebenarnya efektif dibuang karena sampelnya terlalu sedikit. Menambah sampel mengurangi risiko ini.' }
      ] } },
    { lvl: 'cert', h: `
<h3>Memilih uji yang tepat</h3>
<table class="tbl"><tr><th>Situasi</th><th>Uji (data normal)</th><th>Alternatif non-normal</th></tr>
<tr><td>1 kelompok vs nilai target</td><td>1-sample t</td><td>1-sample Wilcoxon</td></tr>
<tr><td>2 kelompok independen</td><td>2-sample t</td><td>Mann-Whitney</td></tr>
<tr><td>Sebelum vs sesudah, unit sama</td><td>Paired t</td><td>Wilcoxon signed-rank</td></tr>
<tr><td>3 kelompok atau lebih</td><td>One-way ANOVA</td><td>Kruskal-Wallis</td></tr>
<tr><td>Bandingkan variasi</td><td>F-test / Levene</td><td>Levene</td></tr>
<tr><td>Data kategori (cacat ya/tidak)</td><td>Chi-square, 2-proportion</td><td>Fisher exact</td></tr>
</table>
<div class="formula">t = (x̄₁ − x̄₂) / [ sp × √(1/n₁ + 1/n₂) ]    df = n₁ + n₂ − 2<br>Keputusan: p ≤ α → tolak H₀<br>Power = 1 − β   (umumnya target ≥ 0.80)</div>
<ul>
<li><b>Asumsi</b>: independen, kira-kira normal (atau n besar), variansi sama (atau pakai Welch). Cek dengan plot residual dan uji normalitas.</li>
<li><b>Ukuran sampel</b> ditentukan oleh: selisih yang ingin dideteksi (δ), σ, α, dan power. Hitung sebelum mengumpulkan data.</li>
<li><b>Salah kaprah p-value</b>: p BUKAN peluang H₀ benar. p BUKAN ukuran besarnya efek. Selalu laporkan juga confidence interval.</li>
<li><b>Uji berganda</b> menaikkan risiko alarm palsu (20 uji pada α = 0.05 hampir pasti menghasilkan 1 hasil "signifikan" palsu). Gunakan koreksi (Bonferroni/Tukey) atau ANOVA.</li>
<li>Di DMAIC, uji hipotesis dipakai di <b>Analyze</b> (membuktikan X berpengaruh) dan <b>Improve</b> (membuktikan perbaikan nyata).</li>
</ul>` }
  ],
  quiz: [
    { q: 'p-value = 0.03 dengan α = 0.05. Keputusannya?', o: ['Gagal menolak H₀', 'Menolak H₀: ada bukti perbedaan nyata', 'H₀ pasti benar', 'Data harus dibuang'], a: 1, w: 'p lebih kecil dari α, jadi bukti cukup kuat untuk menolak H₀.' },
    { q: 'Type I error artinya...', o: ['Gagal melihat perbedaan yang ada', 'Menyimpulkan ada perbedaan padahal tidak ada', 'Sampel terlalu banyak', 'Alat ukur rusak'], a: 1, w: 'Type I = alarm palsu (menolak H₀ yang sebenarnya benar). Peluangnya sebesar α.' },
    { q: 'Cara paling langsung agar uji lebih mungkin mendeteksi perbedaan kecil yang nyata?', o: ['Menaikkan α menjadi 0.5', 'Menambah jumlah sampel', 'Membuang data yang aneh', 'Mengganti rata-rata dengan median'], a: 1, w: 'Sampel lebih banyak menaikkan power. Menaikkan α sembarangan hanya menambah alarm palsu.' }
  ]
},

{
  id: 'sig-grr', g: 'six2', icon: '📏', min: 12,
  title: 'Gauge R&R: Bisakah Alat Ukurmu Dipercaya?',
  tag: 'Memastikan variasi yang kamu lihat berasal dari produk, bukan dari alat atau cara mengukur.',
  sec: [
    { h: `
<p>Semua analisis (Cpk, control chart, uji hipotesis) bergantung pada data. Kalau <b>alat ukurnya sendiri tidak konsisten</b>, kesimpulannya ikut menyesatkan. Karena itu fase Measure selalu mulai dengan <b>MSA</b> (Measurement System Analysis), dan alat utamanya adalah <b>Gauge R&R</b>.</p>
<div class="callout analogy"><b>Analogi: timbangan badan.</b> Naik timbangan 3 kali berturut-turut, hasilnya 60.2, 61.0, 59.6. Itu <b>repeatability</b> yang buruk (alat tidak konsisten). Lalu kamu dan adikmu menimbang benda yang sama dan angkanya beda. Itu <b>reproducibility</b> yang buruk (beda orang, beda hasil).</div>
<p>Geser tiga sumber variasi dan lihat berapa persen "kebisingan" ukur dibanding total.</p>` },
    { w: 'grr' },
    { h: `
<h3>Cara membaca %GRR</h3>
<table class="tbl"><tr><th>%GRR</th><th>Penilaian</th></tr>
<tr><td>&lt; 10%</td><td>Baik. Sistem ukur dapat diterima.</td></tr>
<tr><td>10% – 30%</td><td>Marginal. Bisa diterima untuk kondisi tertentu (biaya, kepentingan).</td></tr>
<tr><td>&gt; 30%</td><td>Tidak layak. Perbaiki alat/metode sebelum mengambil keputusan.</td></tr>
</table>
<p><b>Perbaikan umum:</b> repeatability buruk → perbaiki/kalibrasi alat, kurangi getaran, ganti alat lebih presisi. Reproducibility buruk → standarkan cara ukur (work instruction), latih operator, buat fixture agar posisi benda sama.</p>` },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<div class="formula">σ²GRR = σ²repeatability + σ²reproducibility<br>σ²total = σ²part + σ²GRR<br>%Contribution = 100 × σ²GRR / σ²total<br>%Study Var = 100 × σGRR / σtotal<br>%Tolerance = 100 × (6 × σGRR) / (USL − LSL)<br>ndc = 1.41 × σpart / σGRR   (target ≥ 5)</div>
<ul>
<li><b>Desain studi standar</b>: 10 part yang mewakili rentang proses × 3 operator × 2–3 pengulangan, urutan diacak, operator tidak tahu part yang mana.</li>
<li><b>Metode</b>: X̄-R, atau ANOVA (lebih disukai karena memisahkan interaksi operator × part).</li>
<li>Selain GRR, MSA mencakup <b>bias</b> (selisih rata-rata ukur vs nilai acuan), <b>linearity</b> (bias berubah menurut rentang), dan <b>stability</b> (drift dari waktu ke waktu).</li>
<li><b>Data atribut</b> (OK/NG): pakai <b>Attribute Agreement Analysis</b> dan statistik Kappa (umumnya ≥ 0.75 baik).</li>
<li>Part yang dipilih harus mencakup rentang variasi proses; kalau semua part hampir sama, %GRR terlihat buruk secara palsu.</li>
<li><b>Destructive test</b>: part tidak bisa diukur ulang, gunakan nested GRR.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Repeatability adalah...', o: ['Konsistensi antar operator', 'Konsistensi saat satu operator mengukur benda yang sama berulang dengan alat sama', 'Kemampuan proses memenuhi spek', 'Ketelitian skala alat'], a: 1, w: 'Repeatability = variasi dari alat/pengukuran berulang dalam kondisi yang sama.' },
    { q: '%GRR sebesar 35%. Tindakan yang tepat?', o: ['Lanjutkan, sudah cukup bagus', 'Perbaiki sistem ukur dulu sebelum mengambil keputusan', 'Hitung ulang Cpk saja', 'Tambah operator'], a: 1, w: 'Di atas 30% sistem ukur tidak layak: kesimpulan dari datanya tidak bisa dipercaya.' },
    { q: 'Gauge R&R paling tepat dilakukan pada fase DMAIC...', o: ['Define', 'Measure', 'Improve', 'Control'], a: 1, w: 'Di Measure, validasi sistem ukur dulu sebelum mengumpulkan data baseline.' }
  ]
},

{
  id: 'sig-doe', g: 'six2', icon: '🧁', min: 14,
  title: 'DOE: Coba Banyak Faktor Sekaligus',
  tag: 'Merancang percobaan agar tahu faktor apa yang berpengaruh, dan bagaimana mereka saling memengaruhi.',
  sec: [
    { h: `
<p>Cara awam mencari setelan terbaik: ubah <b>satu faktor</b> sambil menahan yang lain (OFAT, one factor at a time). Lambat, dan <b>tidak bisa melihat interaksi</b>. <b>DOE (Design of Experiments)</b> mengubah beberapa faktor sekaligus secara terencana.</p>
<div class="callout analogy"><b>Analogi: memanggang kue.</b> Dua faktor: suhu (rendah/tinggi) dan waktu (singkat/lama). Mungkin suhu tinggi menghasilkan kue enak <i>hanya jika waktunya singkat</i>; kalau lama, gosong. Efek suhu bergantung pada waktu. Itulah <b>interaksi</b>, dan OFAT tidak akan menemukannya.</div>
<p>Di bawah ada 4 percobaan (2 faktor × 2 level). Atur skor kualitas kue tiap kombinasi dan lihat efek serta <b>interaction plot</b>. Garis <b>sejajar</b> berarti tidak ada interaksi; garis yang <b>menyilang atau tidak sejajar</b> berarti ada interaksi.</p>` },
    { w: 'doe' },
    { h: `
<h3>Istilah dasar</h3>
<ul>
<li><b>Faktor</b>: hal yang diubah (suhu, waktu). <b>Level</b>: nilai yang dicoba (160 °C / 180 °C). <b>Respons</b>: hasil yang diukur (skor kue).</li>
<li><b>Main effect</b>: rata-rata perubahan respons ketika satu faktor naik dari level rendah ke tinggi.</li>
<li><b>Interaksi</b>: efek satu faktor bergantung pada level faktor lain.</li>
</ul>
<p>Keuntungan: lebih sedikit percobaan untuk informasi lebih banyak, dan menemukan setelan optimal yang tidak ketemu lewat OFAT.</p>` },
    { lvl: 'cert', h: `
<h3>Konsep ujian</h3>
<div class="formula">Full factorial: jumlah run = levelᵏ   (2 level, 3 faktor → 2³ = 8 run)<br>Efek A = [ (y₂ + y₄) − (y₁ + y₃) ] / 2<br>Efek B = [ (y₃ + y₄) − (y₁ + y₂) ] / 2<br>Interaksi AB = [ (y₁ + y₄) − (y₂ + y₃) ] / 2</div>
<ul>
<li><b>Tiga prinsip</b>: <b>Replication</b> (ulang untuk menaksir error acak), <b>Randomization</b> (acak urutan agar faktor tak terduga tersebar), <b>Blocking</b> (kelompokkan percobaan berdasarkan gangguan yang diketahui, misal hari/batch).</li>
<li><b>Fractional factorial</b> (2^(k−p)): mengurangi jumlah run dengan mengorbankan sebagian informasi (<i>aliasing</i>). Resolution III (efek utama bercampur interaksi 2 faktor), IV (efek utama bersih), V (efek utama dan interaksi 2 faktor bersih).</li>
<li><b>Center points</b>: menguji kelengkungan (curvature) dan error murni.</li>
<li><b>Analisis</b>: ANOVA, Pareto of effects, normal plot of effects, residual plot; buang suku yang tidak signifikan (model hierarki).</li>
<li><b>Lanjutan</b>: Response Surface Methodology (Central Composite, Box-Behnken) untuk mencari optimum; <b>Taguchi</b> (robust design, S/N ratio).</li>
<li>Letak di DMAIC: fase <b>Improve</b>, untuk menemukan setelan X terbaik setelah X penting teridentifikasi di Analyze.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Keunggulan utama DOE dibanding mengubah satu faktor per percobaan (OFAT)?', o: ['Selalu lebih murah', 'Bisa mendeteksi interaksi antar faktor dan lebih efisien', 'Tidak butuh data', 'Hasilnya selalu benar'], a: 1, w: 'Hanya dengan mengubah faktor bersamaan secara terencana, interaksi dapat terlihat.' },
    { q: 'Pada interaction plot, kedua garis tidak sejajar (bahkan menyilang). Artinya...', o: ['Tidak ada pengaruh sama sekali', 'Ada interaksi antar faktor', 'Data salah', 'Perlu ulang percobaan'], a: 1, w: 'Garis sejajar = tanpa interaksi. Tidak sejajar = efek satu faktor tergantung level faktor lain.' },
    { q: 'Berapa run untuk full factorial 3 faktor, masing-masing 2 level (tanpa replikasi)?', o: ['6', '8', '9', '12'], a: 1, w: '2 × 2 × 2 = 2³ = 8 run.' }
  ]
},

{
  id: 'sig-fmea', g: 'six2', icon: '🛡️', min: 12,
  title: 'FMEA: Cegah Masalah Sebelum Terjadi',
  tag: 'Mendata apa saja yang bisa salah, lalu memprioritaskan mana yang harus dicegah dulu.',
  sec: [
    { h: `
<p>Kebanyakan alat sebelumnya menjelaskan masalah yang <i>sudah terjadi</i>. <b>FMEA</b> (Failure Mode and Effects Analysis) bersifat <b>proaktif</b>: tim membayangkan apa yang <i>bisa</i> gagal, seberapa parah, seberapa sering, dan seberapa mudah terdeteksi.</p>
<div class="callout analogy"><b>Analogi: persiapan road trip.</b> Sebelum berangkat kamu mendata: ban bocor? aki lemah? bensin habis? rem blong? Lalu menilai mana yang paling berbahaya, mana yang paling sering, dan mana yang tidak ketahuan sampai terlambat. Yang skornya tertinggi, kamu cek dulu.</div>
<p>Tiap risiko diberi skor 1–10 untuk tiga hal:</p>
<ul>
<li><b>Severity (S)</b>: seberapa parah dampaknya (10 = fatal/bahaya).</li>
<li><b>Occurrence (O)</b>: seberapa sering kemungkinan terjadi (10 = hampir pasti).</li>
<li><b>Detection (D)</b>: seberapa sulit terdeteksi sebelum sampai ke pelanggan (10 = hampir tidak mungkin terdeteksi).</li>
</ul>
<p><b>RPN = S × O × D</b>. Ubah skornya dan lihat urutan prioritas berubah.</p>` },
    { w: 'fmea' },
    { h: `
<h3>Aturan praktis</h3>
<ul>
<li><b>Severity 9–10 selalu jadi prioritas</b>, walau RPN-nya kecil (kegagalan yang membahayakan keselamatan tidak boleh diabaikan karena jarang terjadi).</li>
<li>Tindakan perbaikan yang bagus menurunkan <b>O</b> (cegah penyebab, misalnya poka-yoke) atau <b>D</b> (tambah deteksi). Menurunkan <b>S</b> biasanya butuh perubahan desain.</li>
<li>Setelah tindakan, <b>hitung ulang RPN</b> untuk membuktikan risiko turun.</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<ul>
<li><b>Jenis</b>: <b>DFMEA</b> (desain produk) dan <b>PFMEA</b> (proses). PFMEA mengikuti langkah-langkah process flow.</li>
<li><b>Kolom standar</b>: fungsi/langkah proses, failure mode, effect, severity, class, cause, occurrence, current controls (prevention/detection), detection, RPN, recommended action, owner, target date, hasil setelah tindakan.</li>
<li><b>Kelemahan RPN</b>: nilai S, O, D yang berbeda bisa menghasilkan RPN sama (S=10,O=1,D=1 = 10; S=2,O=5,D=1 = 10) padahal risikonya berbeda. Standar AIAG-VDA (2019) mengganti RPN dengan <b>Action Priority (AP: High/Medium/Low)</b>.</li>
<li><b>Skala berperingkat</b> harus disepakati tim dan konsisten dengan kriteria perusahaan/pelanggan.</li>
<li>Hasil FMEA mengalir ke <b>Control Plan</b> dan instruksi kerja; FMEA adalah dokumen hidup yang diperbarui ketika ada perubahan atau keluhan.</li>
<li>Peran di DMAIC: <b>Analyze</b> (prioritas penyebab) dan <b>Improve</b> (evaluasi risiko solusi sebelum implementasi).</li>
</ul>` }
  ],
  quiz: [
    { q: 'Rumus RPN pada FMEA?', o: ['S + O + D', 'S × O × D', 'S × O', '(S + O) / D'], a: 1, w: 'RPN = Severity × Occurrence × Detection.' },
    { q: 'Detection = 10 berarti...', o: ['Mudah sekali terdeteksi', 'Hampir tidak mungkin terdeteksi sebelum sampai pelanggan', 'Sering terjadi', 'Dampaknya ringan'], a: 1, w: 'Skala D dibalik: makin tinggi = makin sulit terdeteksi = makin berisiko.' },
    { q: 'Failure mode dengan Severity 10 tetapi RPN kecil karena sangat jarang terjadi. Sebaiknya...', o: ['Diabaikan', 'Tetap diprioritaskan karena menyangkut keselamatan', 'Dihapus dari daftar', 'Diturunkan skornya'], a: 1, w: 'Severity tinggi (9–10) tidak boleh diabaikan hanya karena RPN-nya kecil.' }
  ]
},

{
  id: 'lean-smed', g: 'lean2', icon: '🏎️', min: 12,
  title: 'SMED: Ganti Setup dalam Hitungan Menit',
  tag: 'Mempercepat pergantian produk agar batch kecil menjadi ekonomis.',
  sec: [
    { h: `
<p>Setiap pergantian produk di mesin (changeover) membuat mesin berhenti. Kalau changeover lama, pabrik terpaksa membuat batch besar supaya sebanding, dan itu memicu inventory berlebih. <b>SMED</b> (Single-Minute Exchange of Die) memotong waktu changeover hingga di bawah 10 menit.</p>
<div class="callout analogy"><b>Analogi: pit stop F1 vs ganti ban di garasi.</b> Di garasi, kamu mengambil dongkrak, mencari kunci, lalu mengerjakan semuanya satu per satu <i>sementara mobil diam</i>. Tim F1 menyiapkan semua alat dan ban baru <i>sebelum</i> mobil masuk pit, lalu hanya mengerjakan yang benar-benar harus dilakukan saat mobil berhenti: 2 detik.</div>
<p>Kuncinya membedakan dua jenis aktivitas:</p>
<ul>
<li><b>Internal setup</b>: hanya bisa dilakukan saat mesin berhenti.</li>
<li><b>External setup</b>: bisa dilakukan saat mesin masih berjalan.</li>
</ul>
<p>Di bawah, centang aktivitas yang bisa dipindah ke luar (saat mesin masih jalan), lalu coba "quick-release clamp".</p>` },
    { w: 'smed' },
    { h: `
<h3>Tiga langkah praktis</h3>
<ol>
<li><b>Pisahkan</b> internal dan external. Biasanya ini saja sudah memotong 30–50%.</li>
<li><b>Pindahkan</b> internal menjadi external (siapkan tooling lebih dulu, panaskan awal, kumpulkan alat di troli).</li>
<li><b>Sederhanakan</b> sisa internal: quick-release clamp (satu putaran, bukan 6 baut), posisi tetap (stopper/guide) pengganti trial-and-error, kerja paralel dua orang.</li>
</ol>
<p>Hasilnya: batch lebih kecil, inventory turun, lebih fleksibel melayani pesanan, dan Availability OEE naik.</p>` },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<ul>
<li><b>Tahapan Shigeo Shingo</b>: Tahap 0 (internal dan external belum dibedakan, amati), Tahap 1 (pisahkan), Tahap 2 (konversi internal → external), Tahap 3 (sederhanakan semua aspek setup).</li>
<li><b>Teknik dokumentasi</b>: rekam video changeover, catat tiap elemen, beri tanda internal/external, lalu cari peluang bersama tim dan operator.</li>
<li><b>Teknik penyederhanaan</b>: functional clamp, one-touch / one-turn fastening, standarisasi dimensi tooling, pre-set tooling, eliminasi penyetelan (adjustment) dengan kondisi setting tetap.</li>
<li><b>OTED</b> (One Touch Exchange of Die) adalah target tertinggi: setup dalam hitungan detik, sedikit tindakan.</li>
<li><b>EPEI</b> (Every Part Every Interval): berapa sering semua varian bisa diproduksi dalam satu siklus. Changeover pendek → EPEI pendek → mendukung Heijunka.</li>
<li><b>Ekonomi lot</b>: lot size ekonomis turun jika biaya setup turun (EOQ ∝ √setup cost).</li>
<li>Tangkap sebagai losses TPM: <b>Setup &amp; Adjustment</b> (Availability loss).</li>
</ul>` }
  ],
  quiz: [
    { q: 'Internal setup adalah aktivitas yang...', o: ['Dilakukan oleh tim internal perusahaan', 'Hanya bisa dilakukan saat mesin berhenti', 'Bisa dilakukan saat mesin masih berjalan', 'Dilakukan di gudang'], a: 1, w: 'Internal = harus saat mesin berhenti. External = bisa saat mesin masih jalan.' },
    { q: 'Langkah pertama paling berdampak dalam SMED?', o: ['Beli mesin baru', 'Memisahkan aktivitas internal dan external', 'Menambah operator', 'Memperbesar ukuran batch'], a: 1, w: 'Memisahkan lalu memindahkan aktivitas ke luar biasanya memotong sepertiga hingga separuh waktu.' },
    { q: 'Manfaat utama changeover cepat bagi Lean?', o: ['Batch kecil jadi ekonomis, inventory turun', 'Jam kerja bertambah', 'Mesin lebih mahal', 'Operator lebih sedikit dilatih'], a: 0, w: 'Setup singkat memungkinkan batch kecil sehingga inventory dan lead time turun.' }
  ]
},

{
  id: 'lean-vsm', g: 'lean2', icon: '🗺️', min: 13,
  title: 'VSM: Peta Aliran dari Pesanan ke Pengiriman',
  tag: 'Melihat seluruh perjalanan produk dan di mana waktunya benar-benar terbuang.',
  sec: [
    { h: `
<p><b>Value Stream Mapping</b> menggambar seluruh langkah, aliran material, dan aliran informasi dari pesanan pelanggan sampai barang dikirim. Fokusnya bukan hanya "berapa lama setiap proses", tapi <b>berapa lama barang menunggu</b>.</p>
<div class="callout analogy"><b>Analogi: paket kiriman.</b> Paketmu menempuh 3 hari. Di aplikasi pelacakan terlihat: dipindai (2 menit), ditumpuk di gudang transit (18 jam), diangkut (5 jam), ditumpuk lagi (20 jam). Waktu "bekerja"-nya sedikit; hampir semua adalah menunggu. VSM membuat pola itu terlihat.</div>
<p>Atur waktu tunggu antar-proses dan perhatikan <b>PCE</b> (Process Cycle Efficiency) yaitu berapa persen lead time yang benar-benar bernilai tambah. Coba centang <b>future state</b> (flow &amp; pull).</p>` },
    { w: 'vsm' },
    { h: `
<h3>Cara memulai (current state)</h3>
<ol>
<li>Pilih satu produk/keluarga produk. Mulai dari <b>pelanggan</b> (permintaan, takt time).</li>
<li>Jalan di gemba dari hilir ke hulu, catat tiap proses: cycle time (C/T), waktu setup, jumlah operator, yield.</li>
<li>Catat <b>inventory</b> antar-proses (segitiga ⚠), lalu konversi ke satuan waktu.</li>
<li>Gambar timeline ladder di bawah peta: waktu tunggu (naik) dan waktu proses (turun).</li>
<li>Gambar <b>future state</b>: hilangkan waste, hubungkan proses dengan flow atau pull (Kanban/FIFO lane).</li>
</ol>
<div class="callout tip"><b>Pelajaran umum:</b> PCE di proses non-lean sering di bawah 5–10%. Memperpendek C/T satu proses jarang berarti banyak; mengurangi <i>menunggu</i> jauh lebih berdampak.</div>` },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<div class="formula">PCE = Value-added time / Total lead time<br>Lead time = Σ (waktu proses) + Σ (waktu tunggu)<br>Waktu tunggu ≈ inventory / demand harian<br>Takt time = waktu tersedia / permintaan pelanggan</div>
<ul>
<li><b>Data box</b> per proses: C/T, C/O (changeover time), uptime, yield, jumlah operator, shift, ukuran batch.</li>
<li><b>Simbol</b>: kotak proses, segitiga inventory, panah push, supermarket (pull), kaizen burst (titik peluang perbaikan), kotak pelanggan/pemasok, aliran informasi (kiriman jadwal).</li>
<li><b>Guideline future state</b>: produksi sesuai takt, flow terus-menerus bila memungkinkan, supermarket pull di tempat flow tidak mungkin, kirim jadwal ke satu titik <i>pacemaker</i>, ratakan mix (heijunka), pitch produksi seragam.</li>
<li><b>Rencana implementasi</b>: bagi future state menjadi loop dan tahap, dengan tujuan, ukuran, dan tenggat.</li>
<li><b>Level proses vs value stream</b>: VSM melihat gambaran besar, lalu proses detail diperbaiki dengan SMED, 5S, TPM, kaizen.</li>
</ul>` }
  ],
  quiz: [
    { q: 'PCE (Process Cycle Efficiency) dihitung dari...', o: ['Waktu proses / jumlah operator', 'Waktu bernilai tambah / total lead time', 'Output / input', 'Takt time / cycle time'], a: 1, w: 'PCE = VA time ÷ lead time. Menunjukkan proporsi waktu yang benar-benar menambah nilai.' },
    { q: 'Dalam banyak proses non-lean, bagian terbesar dari lead time adalah...', o: ['Waktu mengerjakan', 'Waktu menunggu antar-proses', 'Waktu istirahat', 'Waktu pengiriman saja'], a: 1, w: 'Biasanya lebih dari 90% lead time adalah barang menunggu, bukan dikerjakan.' },
    { q: 'Urutan yang benar dalam VSM?', o: ['Future state dulu lalu current state', 'Current state dipetakan dulu, baru future state dirancang', 'Tidak perlu current state', 'Hanya future state'], a: 1, w: 'Kita harus memahami kondisi sekarang sebelum merancang kondisi ideal.' }
  ]
},

{
  id: 'ps-8d', g: 'ps2', icon: '📋', min: 12,
  title: '8D: Laporan Masalah ke Pelanggan',
  tag: 'Kerangka 8 langkah untuk menangani keluhan: lindungi pelanggan dulu, lalu cari akar dan cegah terulang.',
  sec: [
    { h: `
<p>Pelanggan komplain: produk bermasalah. Mereka tidak hanya mau perbaikan, mereka mau <b>bukti</b> bahwa kamu menangani dengan benar. <b>8D</b> (Eight Disciplines) adalah format standar yang diminta banyak pelanggan, terutama otomotif dan elektronik.</p>
<div class="callout analogy"><b>Analogi: pipa bocor di rumah.</b> Pertama kamu <i>tadah air dengan ember</i> dan tutup keran utama (containment). Lalu cari tahu <i>kenapa</i> pipa bocor, bukan hanya di mana airnya menetes (akar masalah). Kemudian ganti sambungan yang rusak secara permanen (corrective action). Terakhir periksa pipa lain di rumah yang usianya sama (pencegahan sebaran).</div>
<p>Klik tiap langkah:</p>` },
    { w: 'stepper', data: {
        steps: [
          { k: 'D0', t: 'Persiapan', q: 'Apakah masalah ini perlu 8D?', a: 'Nilai gejala, tentukan apakah perlu tindakan darurat (emergency response) dan apakah 8D sesuai.', tools: 'Kriteria eskalasi, emergency response action', cert: 'Dilakukan ERA (Emergency Response Action) untuk melindungi pelanggan sebelum analisis dimulai.' },
          { k: 'D1', t: 'Tim', q: 'Siapa yang perlu terlibat?', a: 'Bentuk tim lintas fungsi yang paham produk dan proses, dengan pemimpin dan sponsor jelas.', tools: 'Matriks peran, kontak tim', cert: 'Anggota mencakup keahlian proses, kualitas, rekayasa, dan (bila perlu) pemasok.' },
          { k: 'D2', t: 'Masalah', q: 'Apa tepatnya masalahnya?', a: 'Jelaskan dengan fakta: apa, di mana, kapan, berapa banyak. Bukan opini.', tools: '5W2H, Is / Is Not, foto, data', cert: 'Is / Is Not (Kepner-Tregoe) mempersempit hipotesis: apa yang terkena vs yang tidak.' },
          { k: 'D3', t: 'Containment', q: 'Bagaimana melindungi pelanggan sekarang?', a: 'Tindakan sementara: sortir stok, 100% inspeksi, tahan pengiriman. Bukan solusi permanen.', tools: 'Sortir, stop-ship, inspeksi tambahan', cert: 'Verifikasi efektivitas containment; catat tanggal, jumlah, dan hasil sortir.' },
          { k: 'D4', t: 'Akar masalah', q: 'Kenapa terjadi? Kenapa lolos?', a: 'Cari akar penyebab terjadinya (occurrence) DAN penyebab lolos deteksi (escape point).', tools: 'Fishbone, 5 Why, Is/Is Not, data', cert: 'Verifikasi akar masalah: bisa memunculkan dan menghilangkan masalah dengan mengubah penyebab itu.' },
          { k: 'D5', t: 'Corrective', q: 'Tindakan permanen apa yang dipilih?', a: 'Pilih tindakan yang menghilangkan akar penyebab dan escape point, lalu verifikasi sebelum diterapkan.', tools: 'Poka-yoke, FMEA, perubahan proses', cert: 'Pilih corrective action untuk occurrence dan detection; uji dulu agar tidak menimbulkan masalah baru.' },
          { k: 'D6', t: 'Implementasi', q: 'Sudah diterapkan dan terbukti?', a: 'Terapkan tindakan permanen, hentikan containment, pantau hasilnya.', tools: 'Control chart, audit, data setelah perbaikan', cert: 'Validasi dengan data (misalnya tidak ada kejadian sepanjang periode pemantauan yang disepakati).' },
          { k: 'D7', t: 'Pencegahan', q: 'Apakah masalah serupa bisa terjadi di tempat lain?', a: 'Sebarkan pelajaran ke proses, lini, dan produk serupa. Perbarui standar.', tools: 'SOP, FMEA, control plan, training', cert: 'Update FMEA dan control plan; horizontal deployment ke proses/produk sejenis.' },
          { k: 'D8', t: 'Selesai', q: 'Sudah ditutup dan diapresiasi?', a: 'Tutup laporan, bagikan pembelajaran, dan hargai tim.', tools: 'Lessons learned, laporan akhir', cert: 'Laporan akhir diterima pelanggan; lessons learned masuk database pengetahuan.' }
        ]
    } },
    { h: `
<h3>Tiga jenis tindakan, jangan tertukar</h3>` },
    { w: 'cards', data: { items: [
        { i: '🧯', t: 'Containment', c: 'A', tag: 'Sekarang', s: 'Menahan dampak segera', d: 'Cepat dan sementara. Contoh: sortir 100% stok, tahan pengiriman. Tidak menghilangkan penyebab.' },
        { i: '🔧', t: 'Corrective', c: 'P', tag: 'Permanen', s: 'Menghilangkan akar penyebab', d: 'Mengubah proses/desain agar masalah yang sama tidak terjadi lagi di tempat ini. Contoh: poka-yoke pada fixture.' },
        { i: '🛡️', t: 'Preventive', c: 'Q', tag: 'Menyebar', s: 'Mencegah di tempat lain', d: 'Menerapkan pelajaran ke proses/produk sejenis sebelum mereka bermasalah. Contoh: update FMEA semua lini serupa.' }
      ] } },
    { lvl: 'cert', h: `
<h3>Yang sering diuji</h3>
<ul>
<li>Perbedaan <b>D3</b> (containment) dan <b>D5</b> (corrective). Pelanggan menolak laporan jika D3 dipakai sebagai jawaban akhir.</li>
<li><b>D4</b> harus memuat <b>dua</b> akar: kenapa terjadi dan kenapa tidak terdeteksi (escape). Alat: Fishbone, 5 Why, Is/Is Not, fault tree.</li>
<li><b>Verifikasi vs validasi</b>: verifikasi = apakah tindakan memperbaiki akar penyebab (sebelum diterapkan); validasi = apakah masalah tidak muncul lagi setelah diterapkan (D6).</li>
<li>Variasi: <b>3D–5D</b> untuk masalah kecil, <b>A3</b> untuk perbaikan internal, <b>8D</b> untuk keluhan pelanggan.</li>
<li>Lampirkan bukti (foto, data, laporan uji), tenggat tiap langkah, dan penanggung jawab. Banyak pelanggan menetapkan D3 dalam 24 jam, D5 dalam 10–30 hari.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Langkah D3 pada 8D adalah...', o: ['Mencari akar masalah', 'Tindakan containment sementara untuk melindungi pelanggan', 'Menutup laporan', 'Membentuk tim'], a: 1, w: 'D3 = interim containment action: sementara, cepat, melindungi pelanggan.' },
    { q: 'D4 yang lengkap mencari akar dari...', o: ['Hanya kenapa masalah terjadi', 'Kenapa terjadi DAN kenapa lolos tidak terdeteksi', 'Hanya siapa yang salah', 'Hanya kenapa pelanggan komplain'], a: 1, w: 'Akar masalah punya dua sisi: occurrence (terjadi) dan escape (lolos deteksi).' },
    { q: 'D7 (preventing recurrence) bertujuan...', o: ['Menghentikan containment', 'Menerapkan pelajaran ke proses/produk serupa dan memperbarui standar', 'Menghukum pelaku', 'Menunda laporan'], a: 1, w: 'D7 menyebarkan pembelajaran dan memperbarui SOP, FMEA, control plan agar tidak terulang di tempat lain.' }
  ]
}

);
