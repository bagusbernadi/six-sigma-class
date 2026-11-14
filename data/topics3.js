/* Tambahan Tahap 2 (3 topik) dan seluruh Tahap 3 (4 topik). */
window.GROUPS.push(
  { id: 'tpm2',  stage: 2, name: 'TPM Lanjutan',                 color: '#059669' },
  { id: 'six3',  stage: 3, name: 'Statistik Mahir',              color: '#0d9488' },
  { id: 'ps3',   stage: 3, name: 'Proyek & Define',              color: '#0891b2' }
);

window.TOPICS.push(

/* ===================== TAHAP 2 (tambahan) ===================== */
{
  id: 'lean-pokayoke', g: 'lean2', icon: '🧩', min: 13,
  title: 'Poka-yoke & Standard Work',
  tag: 'Mendesain proses agar sulit salah, lalu menetapkan cara kerja terbaik sebagai standar.',
  sec: [
    { h: `
<p>Menyuruh orang "lebih hati-hati" hampir tidak pernah menyelesaikan kesalahan berulang. <b>Poka-yoke</b> membuat kesalahan <i>mustahil</i> dilakukan, atau <i>langsung ketahuan</i> saat terjadi.</p>
<div class="callout analogy"><b>Analogi: colokan USB dan pompa bensin.</b> Selang pompa solar tidak muat di lubang tangki mobil bensin. Pintu microwave tidak bisa menyala saat terbuka. Kartu ATM harus keluar dulu sebelum uang keluar, supaya kartu tidak tertinggal. Semuanya bukan pengingat, tapi <i>desain</i> yang mencegah kesalahan.</div>
<h3>Dua fungsi poka-yoke</h3>
<ul>
<li><b>Prevention</b>: kesalahan tidak bisa terjadi (colokan hanya muat satu arah).</li>
<li><b>Detection</b>: kesalahan langsung terdeteksi dan proses berhenti/alarm (sensor bunyi saat sabuk belum dipasang).</li>
</ul>
<p>Klik kartu untuk tiga metode dan contohnya:</p>` },
    { w: 'cards', data: { items: [
        { i: '🖐️', t: 'Metode kontak', c: 'A', tag: 'Bentuk / ukuran', s: 'Memeriksa bentuk atau dimensi', d: 'Bagian yang salah tidak bisa masuk karena bentuknya. <b>Rumah:</b> colokan, SIM card yang bevel di satu sisi. <b>Pabrik:</b> pin pada fixture agar komponen hanya bisa dipasang satu arah.' },
        { i: '🔢', t: 'Metode nilai tetap', c: 'P', tag: 'Jumlah / hitungan', s: 'Memastikan jumlah atau gerakan lengkap', d: 'Proses tidak lanjut kalau jumlah belum sesuai. <b>Rumah:</b> kotak obat mingguan 7 sekat. <b>Pabrik:</b> baki berisi tepat 10 sekrup; kalau sisa, ada yang terlewat.' },
        { i: '🪜', t: 'Metode urutan gerak', c: 'Q', tag: 'Langkah berurutan', s: 'Memastikan langkah dilakukan berurutan', d: 'Langkah berikutnya terkunci sampai langkah sebelumnya selesai. <b>Rumah:</b> kartu ATM keluar dulu baru uang. <b>Pabrik:</b> mesin tidak mulai sebelum pintu pengaman tertutup.' }
      ] } },
    { h: `
<h3>Standard Work: cara terbaik yang disepakati</h3>
<p><b>Standard work</b> adalah cara kerja paling aman, cepat, dan berkualitas yang sudah disepakati, lengkap dengan urutan dan waktunya. Tanpa standar, perbaikan hanya akan hilang karena tiap orang punya caranya sendiri.</p>
<div class="callout analogy"><b>Analogi: resep dan estafet.</b> Resep memastikan rasa masakan sama siapa pun yang memasak. Estafet berjalan cepat kalau tiap pelari menempuh jarak seimbang. Jika satu pelari harus berlari dua kali lebih jauh, dialah yang menahan tim.</div>
<p>Tiga elemen standard work: <b>takt time</b> (ritme yang diminta pelanggan), <b>urutan kerja</b>, dan <b>standard WIP</b> (stok minimum yang diperlukan agar proses jalan).</p>
<p>Simulasi di bawah menunjukkan pembagian kerja antar-operator (yamazumi). Operator yang melewati garis takt menjadi penghambat.</p>` },
    { w: 'yamazumi' },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<div class="formula">Line balance efficiency = Σ cycle time operator / (N operator × cycle time terpanjang)<br>Balance delay = 1 − efficiency<br>Jumlah operator minimum = Σ waktu kerja / takt time (dibulatkan ke atas)</div>
<ul>
<li><b>Jidoka (autonomation)</b>: mesin/proses berhenti sendiri saat abnormal, ditambah <b>andon</b> sebagai sinyal. Pasangan poka-yoke di prinsip Toyota.</li>
<li><b>Tiga tingkat inspeksi Shingo</b>: judgment inspection (menemukan cacat setelah terjadi), informative inspection (data untuk koreksi proses), <b>source inspection</b> (cek penyebab sebelum cacat terjadi; paling efektif).</li>
<li><b>Standard work documents</b>: Process Capacity Sheet, Standard Work Combination Table (manual vs mesin vs berjalan), Standard Work Chart (tata letak dan urutan).</li>
<li><b>SDCA vs PDCA</b>: Standardize-Do-Check-Act mempertahankan standar; PDCA menaikkan standar. Keduanya bergantian: perbaikan lalu distandarkan lagi.</li>
<li>Pada FMEA, poka-yoke menurunkan <b>Occurrence</b> (prevention) atau <b>Detection</b> (detection).</li>
<li>Efektivitas urut: eliminasi proses &gt; mustahil salah (prevention) &gt; mudah terdeteksi &gt; pelatihan &amp; peringatan.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Selang pompa solar tidak muat di tangki mobil bensin. Ini contoh...', o: ['Pelatihan operator', 'Poka-yoke metode kontak (prevention)', 'Inspeksi akhir', 'Kaizen blitz'], a: 1, w: 'Bentuk/ukuran mencegah kesalahan terjadi sama sekali: poka-yoke prevention dengan metode kontak.' },
    { q: 'Tiga elemen utama standard work adalah...', o: ['Takt time, urutan kerja, standard WIP', 'Biaya, waktu, mutu', 'Plan, Do, Check', 'Takt time, OEE, MTBF'], a: 0, w: 'Takt time, urutan kerja, dan standard WIP.' },
    { q: 'Pada yamazumi, operator yang cycle time-nya melebihi garis takt...', o: ['Tidak masalah', 'Menjadi penghambat yang membuat lini tak memenuhi permintaan', 'Selalu lebih berpengalaman', 'Menaikkan output'], a: 1, w: 'Operator di atas takt time tidak mampu memenuhi ritme permintaan pelanggan.' }
  ]
},

{
  id: 'tpm-mtbf', g: 'tpm2', icon: '🔩', min: 13,
  title: 'MTBF, MTTR & Strategi Perawatan',
  tag: 'Mengukur seberapa andal mesin, dan memilih cara merawat yang tepat.',
  sec: [
    { h: `
<p>Dua angka sederhana menggambarkan kesehatan mesin:</p>
<ul>
<li><b>MTBF</b> (Mean Time Between Failures): rata-rata waktu mesin <i>berjalan baik</i> sebelum rusak. Makin besar makin andal.</li>
<li><b>MTTR</b> (Mean Time To Repair): rata-rata waktu <i>memperbaiki</i> sekali rusak. Makin kecil makin baik.</li>
</ul>
<div class="callout analogy"><b>Analogi: mobil pribadi.</b> Mobil mogok 2 kali dalam sebulan dan tiap kali butuh setengah hari di bengkel. MTBF adalah "rata-rata berapa lama mobil lancar sebelum mogok", MTTR adalah "rata-rata lama di bengkel". Dua mobil bisa sama-sama punya ketersediaan 90%: yang satu jarang mogok tapi lama diperbaiki, yang lain sering mogok tapi cepat diperbaiki. Solusinya berbeda.</div>
<p>Atur jumlah kerusakan dan total waktu perbaikan dalam sebulan (720 jam). Titik merah pada garis waktu adalah saat mesin berhenti.</p>` },
    { w: 'mtbf' },
    { h: `
<h3>Empat strategi perawatan</h3>` },
    { w: 'cards', data: { items: [
        { i: '🚑', t: 'Breakdown (reaktif)', s: 'Perbaiki setelah rusak', d: 'Murah di awal, mahal kemudian: berhenti mendadak, kerusakan menjalar. Cocok untuk komponen murah dan tidak kritis (lampu ruang istirahat).' },
        { i: '📅', t: 'Preventive', c: 'A', tag: 'Berdasarkan waktu', s: 'Servis berkala sebelum rusak', d: 'Seperti ganti oli tiap 5,000 km. Mencegah banyak kerusakan, tapi kadang mengganti komponen yang masih bagus.' },
        { i: '📡', t: 'Predictive / Condition-based', c: 'P', tag: 'Berdasarkan kondisi', s: 'Servis ketika tanda-tanda muncul', d: 'Sensor getaran, suhu, atau oli memberi tahu kapan mesin perlu dirawat. Seperti lampu indikator oli: ganti saat benar-benar perlu.' },
        { i: '🔬', t: 'Proactive', c: 'Q', tag: 'Akar penyebab', s: 'Menghilangkan penyebab kerusakan', d: 'Menganalisis kenapa komponen aus (misal misalignment) dan memperbaiki penyebabnya, bukan hanya mengganti suku cadang.' }
      ] } },
    { lvl: 'cert', h: `
<h3>Rumus dan konsep ujian</h3>
<div class="formula">MTBF = Run time / jumlah kegagalan<br>MTTR = Total waktu perbaikan / jumlah kegagalan<br>Availability (inheren) = MTBF / (MTBF + MTTR)<br>Reliability R(t) = e^(−t / MTBF)   (laju kegagalan konstan)<br>Laju kegagalan λ = 1 / MTBF</div>
<ul>
<li><b>Kurva bak mandi (bathtub curve)</b>: tiga fase laju kegagalan: (1) <i>infant mortality</i> (tinggi lalu turun: cacat pemasangan/produksi), (2) <i>useful life</i> (rendah, konstan, acak), (3) <i>wear-out</i> (naik: aus). Preventive berguna di fase 3, tidak di fase 2 (laju konstan).</li>
<li><b>Weibull</b>: parameter bentuk β: &lt; 1 infant mortality, = 1 acak (eksponensial), &gt; 1 wear-out.</li>
<li><b>Jenis availability</b>: inheren (hanya kerusakan), achieved (termasuk perawatan terencana), operational (termasuk semua keterlambatan seperti suku cadang dan logistik).</li>
<li><b>RCM</b> (Reliability Centered Maintenance): tentukan strategi perawatan per aset berdasarkan konsekuensi kegagalan dan mode kegagalannya.</li>
<li><b>Pengurangan MTTR</b>: standarisasi perbaikan, suku cadang siap, SMED untuk perbaikan, diagnosis cepat. <b>Menaikkan MTBF</b>: autonomous maintenance, pelumasan benar, perbaikan desain.</li>
<li>Menghubungkan ke OEE: kerusakan (equipment failure) adalah Availability loss.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Mesin berjalan 700 jam dengan 5 kali kerusakan. MTBF-nya?', o: ['5 jam', '140 jam', '700 jam', '3,500 jam'], a: 1, w: 'MTBF = run time / jumlah kegagalan = 700 / 5 = 140 jam.' },
    { q: 'MTBF tinggi tetapi MTTR sangat lama. Fokus perbaikan yang paling tepat?', o: ['Menaikkan kecepatan mesin', 'Mempercepat perbaikan (suku cadang, standar perbaikan)', 'Mengurangi jumlah operator', 'Menambah inspeksi akhir'], a: 1, w: 'Jarang rusak tapi lama diperbaiki: tekan MTTR.' },
    { q: 'Strategi perawatan yang bergantung pada sensor getaran/suhu adalah...', o: ['Breakdown', 'Preventive berbasis waktu', 'Predictive (condition-based)', 'Kaizen'], a: 2, w: 'Predictive/condition-based merawat ketika data kondisi menunjukkan perlu.' }
  ]
},

/* ===================== TAHAP 3 ===================== */
{
  id: 'sig-regresi', g: 'six3', icon: '📐', min: 14,
  title: 'Korelasi & Regresi: Hubungan Antar Variabel',
  tag: 'Mengukur seberapa kuat X memengaruhi Y dan membuat persamaan prediksinya.',
  sec: [
    { h: `
<p>Di fase Analyze kita ingin tahu <b>X mana yang memengaruhi Y</b>. <b>Korelasi (r)</b> mengukur seberapa kuat dua variabel bergerak bersama (−1 sampai +1). <b>Regresi</b> membuat garis terbaik untuk memprediksi Y dari X.</p>
<div class="callout analogy"><b>Analogi: cuaca dan es teh.</b> Makin panas cuaca, makin banyak es teh terjual. Titik-titik data membentuk pola miring ke atas (r positif). Kalau hujan tiap hari dan penjualan acak, titik tersebar tanpa pola (r mendekati 0).</div>
<p>Atur kekuatan hubungan dan noise, lalu tambahkan <b>outlier</b> untuk melihat betapa satu titik bisa mengubah segalanya.</p>` },
    { w: 'regress' },
    { h: `
<h3>Cara membaca</h3>
<table class="tbl"><tr><th>|r|</th><th>Kekuatan hubungan linear</th></tr>
<tr><td>0.0 – 0.3</td><td>Lemah / hampir tidak ada</td></tr>
<tr><td>0.3 – 0.7</td><td>Sedang</td></tr>
<tr><td>0.7 – 1.0</td><td>Kuat</td></tr></table>
<ul>
<li><b>R²</b> = r² = proporsi variasi Y yang bisa dijelaskan oleh X. R² = 0.64 artinya 64% variasi Y dijelaskan model.</li>
<li><b>Korelasi ≠ sebab-akibat.</b> Penjualan es krim dan kasus tenggelam sama-sama naik di musim panas, tapi es krim tidak menyebabkan tenggelam (ada faktor ketiga: cuaca).</li>
<li><b>r = 0 tidak berarti tidak ada hubungan</b>: hubungan melengkung (U) bisa memberi r mendekati 0. Selalu lihat grafiknya dulu.</li>
<li><b>Jangan ekstrapolasi</b> jauh di luar rentang data.</li>
</ul>` },
    { lvl: 'cert', h: `
<h3>Rumus & diagnostik</h3>
<div class="formula">r = Sxy / √(Sxx · Syy)<br>b₁ (slope) = Sxy / Sxx<br>b₀ (intercept) = ȳ − b₁ · x̄<br>R² = r²  (regresi sederhana)<br>Residual eᵢ = yᵢ − ŷᵢ</div>
<ul>
<li><b>Hipotesis slope</b>: H₀: β₁ = 0. p-value kecil → X berpengaruh nyata terhadap Y.</li>
<li><b>Asumsi residual</b>: linier, independen, varians konstan (homoscedastic), mendekati normal. Cek dengan residual plot dan normal probability plot.</li>
<li><b>Regresi berganda</b>: Y = b₀ + b₁X₁ + b₂X₂ + …; waspadai <b>multikolinearitas</b> (X saling berkorelasi, cek VIF &gt; 5–10), pakai <b>adjusted R²</b>.</li>
<li><b>Confidence interval</b> (rata-rata Y) lebih sempit daripada <b>prediction interval</b> (satu pengamatan baru).</li>
<li><b>Outlier dan leverage</b>: titik ekstrem di sumbu X bisa memutar garis (cek Cook's distance).</li>
<li><b>Korelasi Spearman</b> untuk hubungan monotonik non-linear atau data peringkat.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Korelasi r = −0.9 menunjukkan...', o: ['Tidak ada hubungan', 'Hubungan linear kuat berlawanan arah', 'Hubungan lemah', 'X menyebabkan Y turun'], a: 1, w: 'Tanda negatif berarti arah berlawanan, 0.9 berarti kuat. Tetapi korelasi tidak membuktikan sebab-akibat.' },
    { q: 'R² = 0.49 berarti...', o: ['49% data salah', '49% variasi Y dijelaskan oleh X', 'r = 0.49', 'Model gagal'], a: 1, w: 'R² adalah proporsi variasi Y yang dijelaskan oleh model (r = 0.7 di sini).' },
    { q: 'r mendekati 0 pada data berbentuk huruf U. Kesimpulan paling tepat?', o: ['Tidak ada hubungan apa pun', 'Tidak ada hubungan linear; hubungan non-linear mungkin ada', 'Data pasti salah', 'Perlu dicari r lebih besar'], a: 1, w: 'r hanya mengukur hubungan linear. Selalu lihat scatter plot.' }
  ]
},

{
  id: 'sig-power', g: 'six3', icon: '🔊', min: 12,
  title: 'Ukuran Sampel & Power: Berapa Banyak Data Cukup?',
  tag: 'Menentukan jumlah sampel sebelum mengumpulkan data, agar uji hipotesis tidak sia-sia.',
  sec: [
    { h: `
<p>Terlalu sedikit sampel: perbedaan nyata bisa terlewat. Terlalu banyak: buang waktu dan biaya. <b>Power</b> adalah peluang uji kita <i>berhasil mendeteksi</i> perbedaan yang memang ada. Umumnya ditargetkan ≥ 80%.</p>
<div class="callout analogy"><b>Analogi: mendengar bisikan di ruangan ramai.</b> Bisikan lirih (selisih kecil) di ruangan bising (variasi besar) sulit didengar. Untuk menangkapnya, kamu bisa mendengarkan lebih lama (sampel lebih banyak). Bisikan yang lantang di ruangan sepi terdengar mudah, bahkan dengan sedikit sampel.</div>
<p>Atur selisih yang ingin dideteksi, variasi, dan n. Perhatikan kurva power dan jumlah n minimum untuk power 80%.</p>` },
    { w: 'power' },
    { h: `
<h3>Empat hal yang saling terkait</h3>
<ul>
<li><b>Selisih yang ingin dideteksi (δ)</b>: makin kecil, makin butuh banyak sampel.</li>
<li><b>Variasi (σ)</b>: makin besar, makin butuh banyak sampel.</li>
<li><b>Tingkat α</b>: makin ketat (0.01), makin butuh banyak sampel.</li>
<li><b>Power</b>: makin tinggi yang diinginkan, makin butuh banyak sampel.</li>
</ul>
<div class="callout tip"><b>Praktis:</b> tentukan dulu "selisih terkecil yang berarti bagi bisnis". Dari situ hitung n. Jangan menebak "30 sampel cukup" tanpa dasar.</div>` },
    { lvl: 'cert', h: `
<h3>Rumus (2 sampel, dua sisi, σ sama)</h3>
<div class="formula">n per kelompok ≈ 2 · [ (z₁₋α/₂ + z₁₋β) · σ / δ ]²<br>Power = Φ( δ / (σ√(2/n)) − z₁₋α/₂ ) + Φ( −δ / (σ√(2/n)) − z₁₋α/₂ )<br>Effect size (Cohen's d) = δ / σ</div>
<ul>
<li>Untuk power 80% dan α = 0.05: z₁₋α/₂ = 1.96 dan z₁₋β = 0.84.</li>
<li><b>Uji satu sisi</b> butuh sampel lebih sedikit, tapi hanya sah jika perbedaan di arah lain tidak relevan.</li>
<li><b>Proporsi</b> (cacat ya/tidak): perlu sampel jauh lebih besar untuk mendeteksi perubahan cacat kecil (misal 2% → 1%).</li>
<li><b>Cohen's d</b>: kecil ≈ 0.2, sedang ≈ 0.5, besar ≈ 0.8.</li>
<li>Sampel kecil tapi hasil signifikan bisa terjadi untuk efek besar, namun rentan terhadap overestimasi efek (winner's curse).</li>
<li>Tidak ada "n ≥ 30 selalu cukup": itu aturan praktis untuk pendekatan normal rata-rata, bukan jaminan power.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Jika ingin mendeteksi selisih yang lebih kecil (σ sama), jumlah sampel yang diperlukan...', o: ['Lebih sedikit', 'Sama saja', 'Lebih banyak', 'Tidak berhubungan'], a: 2, w: 'n berbanding terbalik dengan kuadrat selisih: selisih setengahnya butuh sampel sekitar 4 kali lipat.' },
    { q: 'Power 80% berarti...', o: ['Peluang H₀ benar 80%', 'Peluang mendeteksi beda yang memang ada adalah 80%', 'Peluang alarm palsu 80%', 'Data 80% akurat'], a: 1, w: 'Power = 1 − β: peluang menolak H₀ ketika H₁ benar.' },
    { q: 'Variasi data (σ) membesar. Agar power tetap sama, kita perlu...', o: ['Mengurangi n', 'Menambah n', 'Menaikkan α menjadi 0.5', 'Tidak berubah'], a: 1, w: 'Variasi besar membuat sinyal tertutup noise, jadi butuh sampel lebih banyak.' }
  ]
},

{
  id: 'sig-nonnormal', g: 'six3', icon: '🐍', min: 12,
  title: 'Data Tidak Normal & Capability',
  tag: 'Apa yang terjadi kalau Cpk dihitung dari data miring, dan cara menanganinya.',
  sec: [
    { h: `
<p>Rumus Cp/Cpk mengasumsikan data berbentuk lonceng simetris (normal). Tapi banyak data nyata <b>miring</b>: ada batas alami di satu sisi dan ekor panjang di sisi lain.</p>
<div class="callout analogy"><b>Analogi: waktu tempuh ke kantor.</b> Waktu tempuh tidak mungkin negatif dan tidak bisa kurang dari, katakanlah, 15 menit. Tapi bisa sangat lama saat macet parah. Histogramnya menumpuk di kiri dengan ekor panjang ke kanan. Kurva lonceng yang dipasang paksa akan "memprediksi" waktu tempuh negatif, yang mustahil.</div>
<p>Geser <b>kemiringan</b> dan <b>batas atas spesifikasi</b>. Bandingkan prediksi asumsi normal dengan kenyataan di data.</p>` },
    { w: 'nonnormal' },
    { h: `
<h3>Apa yang sebaiknya dilakukan?</h3>
<ol>
<li><b>Lihat histogramnya</b> dan uji normalitas (Anderson-Darling).</li>
<li>Cari <b>penyebab</b> ketidaknormalan: apakah ada dua populasi tercampur (dua mesin/shift)? Apakah data dipotong (hanya produk yang lolos sortir)? Apakah ada outlier?</li>
<li>Jika ketidaknormalan memang alami: <b>transformasi</b> (log, Box-Cox) atau pakai <b>distribusi yang sesuai</b> (lognormal, Weibull).</li>
<li>Jangan memaksa data masuk rumus normal hanya karena rumusnya mudah.</li>
</ol>` },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<div class="formula">Metode persentil (Clements) dengan M = median:<br>Ppk = min[ (USL − M) / (X₀.₉₉₈₆₅ − M) , (M − LSL) / (M − X₀.₀₀₁₃₅) ]</div>
<ul>
<li><b>Uji normalitas</b>: Anderson-Darling, Shapiro-Wilk, Kolmogorov-Smirnov. H₀: data normal. p &lt; 0.05 → tolak normalitas. Dengan sampel besar, penyimpangan kecil pun "signifikan"; lihat plot juga.</li>
<li><b>Transformasi</b>: Box-Cox (λ), Johnson. Batas spesifikasi harus ditransformasi dengan fungsi yang sama.</li>
<li><b>Distribusi lain</b>: lognormal (waktu, ukuran partikel), Weibull (umur, kegagalan), eksponensial (waktu antar-kejadian), distribusi dua batas (flatness, run-out, nilai positif mendekati nol).</li>
<li><b>Kontrol chart</b> untuk data tidak normal: chart yang sesuai (misalnya transformasi atau I-MR dengan hati-hati). Central Limit Theorem membantu pada X̄ chart dengan subgroup.</li>
<li><b>Data atribut</b>: capability dinyatakan sebagai DPMO / sigma level, bukan Cpk.</li>
<li>Selalu pastikan <b>stabilitas</b> proses sebelum capability.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Waktu tempuh yang tidak bisa negatif dan punya ekor panjang ke kanan umumnya berdistribusi...', o: ['Normal', 'Miring (misalnya lognormal)', 'Seragam', 'Tidak punya distribusi'], a: 1, w: 'Variabel positif dengan ekor panjang sering mengikuti lognormal/Weibull.' },
    { q: 'Memasang kurva normal pada data sangat miring dapat menyebabkan...', o: ['Prediksi persis benar', 'Prediksi ppm di luar spek menyesatkan, bahkan memprediksi nilai mustahil (misal negatif)', 'Cpk selalu lebih besar', 'Tidak ada efek'], a: 1, w: 'Asumsi normal tidak sesuai bentuk data sehingga prediksi reject salah arah.' },
    { q: 'Langkah pertama sebelum menghitung capability dari data?', o: ['Langsung hitung Cpk', 'Cek stabilitas proses dan bentuk distribusi', 'Buang semua outlier', 'Naikkan USL'], a: 1, w: 'Proses harus stabil, dan distribusi harus dipahami dulu sebelum memilih metode capability.' }
  ]
},

{
  id: 'def-toolkit', g: 'ps3', icon: '📝', min: 14,
  title: 'Define Toolkit: Charter, SIPOC & VOC→CTQ',
  tag: 'Menyusun fondasi proyek: apa masalahnya, siapa terlibat, dan apa yang benar-benar penting bagi pelanggan.',
  sec: [
    { h: `
<p>Proyek yang gagal biasanya gagal di awal: tujuan kabur, ruang lingkup melebar, pelanggan tidak jelas. Tahap Define memakai tiga alat untuk mencegahnya.</p>
<div class="callout analogy"><b>Analogi: memesan kue ulang tahun.</b> Kamu tidak bilang "buatkan kue enak". Kamu menyebutkan siapa yang ulang tahun, kapan dibutuhkan, rasanya, jumlah tamu, dan anggaran. Itulah Project Charter. Lalu penjual bertanya: bahan dari mana, siapa yang membuat, siapa yang mengantar. Itulah SIPOC. Dan "kue enak" kamu terjemahkan menjadi hal terukur: "manis sedang, tidak lebih dari 2 jam dari oven sampai pesta". Itulah CTQ.</div>
<h3>1. Project Charter</h3>
<table class="tbl"><tr><th>Bagian</th><th>Isi</th></tr>
<tr><td>Problem statement</td><td>Apa masalahnya, di mana, seberapa besar, sejak kapan (fakta, tanpa solusi)</td></tr>
<tr><td>Goal statement</td><td>SMART: Specific, Measurable, Achievable, Relevant, Time-bound</td></tr>
<tr><td>Scope</td><td>Proses yang masuk dan tidak masuk proyek</td></tr>
<tr><td>Tim &amp; sponsor</td><td>Siapa memimpin, siapa mendukung</td></tr>
<tr><td>Timeline</td><td>Tonggak waktu DMAIC</td></tr>
<tr><td>Manfaat</td><td>Penghematan, kepuasan pelanggan, risiko berkurang</td></tr></table>
<p><b>Contoh problem statement yang baik:</b> "Sepanjang Q3, 8% produk di stasiun kemas ditolak karena kemasan penyok (target ≤ 2%), menyebabkan rework 120 jam per bulan." Bandingkan dengan yang buruk: "Operator kemas kurang teliti."</p>
<h3>2. SIPOC: peta proses dari ketinggian 10.000 kaki</h3>` },
    { w: 'cards', data: { items: [
        { i: '🏭', t: 'S — Supplier', s: 'Siapa pemasok input?', d: 'Pihak yang memberi bahan/informasi ke proses. Contoh: pemasok karton, gudang, tim perencana.' },
        { i: '📥', t: 'I — Input', s: 'Apa yang masuk proses?', d: 'Bahan, informasi, atau sumber daya. Contoh: karton, produk jadi, jadwal kerja, label.' },
        { i: '⚙️', t: 'P — Process', s: 'Langkah utama (5–7 langkah)', d: 'Tingkat tinggi saja, bukan detail. Contoh: ambil produk → bungkus → tutup → label → palet.' },
        { i: '📤', t: 'O — Output', s: 'Apa yang dihasilkan?', d: 'Produk, dokumen, atau layanan. Contoh: kotak terisi berlabel, dokumen pengiriman.' },
        { i: '🙋', t: 'C — Customer', s: 'Siapa penerima output?', d: 'Pelanggan eksternal atau proses berikutnya. Contoh: gudang pengiriman, pelanggan akhir.' }
      ] } },
    { h: `
<h3>3. VOC → CTQ</h3>
<p>Pelanggan bicara dengan bahasa umum ("lama", "jelek"). Kita harus menerjemahkannya menjadi <b>CTQ</b> yang terukur dan punya batas. Pilih keluhan lalu tekan <b>Turunkan</b> untuk melihat prosesnya.</p>` },
    { w: 'ctq' },
    { lvl: 'cert', h: `
<h3>Detail ujian</h3>
<ul>
<li><b>Model Kano</b>: <i>Must-be</i> (dianggap pasti ada, tidak ada = marah), <i>One-dimensional/performance</i> (makin baik makin puas), <i>Attractive/delighter</i> (tidak diminta tapi membuat senang). Fitur delighter lama-lama menjadi must-be.</li>
<li><b>Metode VOC</b>: wawancara, survei, keluhan, gemba, data penjualan/klaim. Pisahkan <b>needs</b> dari <b>solusi yang diminta</b>.</li>
<li><b>CTQ tree</b>: Need → Driver → CTQ (karakteristik dengan metrik dan spesifikasi).</li>
<li><b>Problem statement</b>: tanpa penyebab, tanpa solusi, tanpa menyalahkan. <b>Goal statement</b>: SMART, kaitkan dengan baseline.</li>
<li><b>COPQ (Cost of Poor Quality)</b>: biaya kegagalan internal (scrap, rework), eksternal (klaim, retur), penilaian (inspeksi), dan pencegahan. Dasar menghitung manfaat finansial.</li>
<li><b>Analisis stakeholder &amp; RACI</b> (Responsible, Accountable, Consulted, Informed) untuk peran jelas.</li>
<li><b>Tollgate review</b> antar fase DMAIC dengan kriteria lolos yang jelas; sponsor menyetujui sebelum lanjut.</li>
<li><b>Seleksi proyek</b>: matriks dampak vs upaya, hubungan dengan strategi, ketersediaan data.</li>
</ul>` }
  ],
  quiz: [
    { q: 'Mana problem statement yang paling baik?', o: ['Operator kurang teliti', 'Perlu mesin baru agar kemasan tidak penyok', '8% produk di stasiun kemas ditolak karena penyok selama Q3 (target ≤ 2%)', 'Kualitas kemasan buruk'], a: 2, w: 'Problem statement berisi fakta terukur (apa, di mana, berapa, kapan) tanpa menyebut penyebab atau solusi.' },
    { q: 'SIPOC singkatan dari...', o: ['Supplier, Input, Process, Output, Customer', 'Standard, Input, Plan, Output, Control', 'Supplier, Impact, Process, Outcome, Cost', 'System, Input, Process, Order, Customer'], a: 0, w: 'Supplier, Input, Process, Output, Customer.' },
    { q: 'Fungsi CTQ?', o: ['Menyimpan biaya', 'Menerjemahkan keinginan pelanggan menjadi karakteristik terukur dengan batas', 'Menentukan bonus tim', 'Menghitung OEE'], a: 1, w: 'CTQ memberi ukuran dan spesifikasi pada kebutuhan pelanggan yang awalnya kabur.' }
  ]
}

);
