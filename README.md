# Six Sigma Sandbox

Web belajar **Six Sigma, TPM, Lean, dan Problem Solving** yang interaktif. Konsep dijelaskan dengan analogi sehari-hari, simulasi yang bisa dimainkan, dan kuis di setiap topik.

## 🔗 Buka aplikasinya

**👉 https://bagusbernadi.github.io/six-sigma-class/**

Tidak perlu instalasi. Bisa juga dibuka offline dengan mengunduh repo ini lalu membuka `index.html`.

## Isi

25 topik dalam 3 tahap, dengan dua level baca: **🌱 Pemula** (konsep, analogi, simulasi) dan **🎓 Sertifikasi** (rumus, aturan, dan istilah ujian Green/Black Belt).

| Tahap | Topik |
|---|---|
| **1 · Dasar** | Variasi · DMAIC · Sigma level & DPMO · Cp/Cpk · Control chart · OEE · 6 Big Losses & 8 pilar TPM · 8 Waste · 5S & Kaizen · Flow, Bottleneck & WIP · Pareto · 5 Why, Fishbone & PDCA |
| **2 · Lanjutan** | Uji hipotesis · Gauge R&R · DOE · FMEA · SMED · VSM · 8D · Poka-yoke & Standard Work · MTBF, MTTR & strategi perawatan |
| **3 · Mahir** | Korelasi & regresi · Ukuran sampel & power · Data tidak normal & capability · Define toolkit (Charter, SIPOC, VOC→CTQ) |

## Fitur

- **Simulasi interaktif**: geser slider dan lihat hasilnya langsung (kurva capability, control chart, OEE, lini produksi dengan bottleneck, kurva power, dan lainnya).
- **Istilah teknis bisa diklik**: kata bergaris titik-titik menampilkan definisi dan analogi singkat.
- **Kuis per topik** dengan pembahasan, dan progres belajar tersimpan di browser.
- **Glosarium** (92 istilah, bisa dicari) dan **lembar rumus**.
- Responsif untuk HP, mendukung tema terang dan gelap.

## Teknologi

HTML, CSS, dan JavaScript murni. Tanpa framework, tanpa build, tanpa dependency. Grafik digambar dengan SVG.

## Struktur

```
index.html          halaman utama
css/style.css       tampilan
js/app.js           router, tahap, kuis, highlight istilah
js/widgets*.js      simulasi dan kalkulator interaktif
data/topics*.js     konten topik dan kuis
data/extras.js      glosarium dan lembar rumus
```

## Menjalankan lokal

Buka `index.html` di browser. Tidak butuh server.

## Menambah topik

1. Tambah objek baru di `data/topics*.js` (`id`, `g`, `title`, `sec`, `quiz`). Bagian dengan `lvl: 'cert'` hanya tampil di level Sertifikasi.
2. Untuk simulasi baru, daftarkan `WIDGETS.namaBaru = function (el, data) {...}` di `js/widgets*.js`, lalu panggil lewat `{ w: 'namaBaru' }`.
3. Istilah baru untuk fitur klik ditambahkan di `data/extras.js`.

## Deploy ke GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`. Situs akan aktif di alamat yang tertera di atas dalam 1–2 menit.
