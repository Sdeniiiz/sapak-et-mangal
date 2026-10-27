# Sapak Et Mangal Bafra - Web Sitesi

Samsun Bafra Gümüşyaprak'ta 1995'ten beri meşe odunu közünde et mangal, ızgara çeşitleri ve doğal serpme köy kahvaltısı sunan **Sapak Et Mangal** işletmesinin modern, mobil uyumlu, SEO/ASO optimize edilmiş resmi web sitesi.

---

## 🚀 Özellikler

- **Modern & Lüks Steakhouse Tasarımı:** Sade, iştah açıcı ve hızlı arayüz.
- **Sinematik Giriş Slaytları:** Her görsel için ayrı sinematik kamera geçişi (`zoom`, `pan-right`, `pan-left`, `rise`) ve minimalist çizgi göstergeleri (`slider-dash`).
- **Tam Responsive (Mobil Uyumlu):** 
  - Koyu cam efektli zarif mobil hamburger menü ve akıcı çekmece navigasyonu.
  - Taşma yapmayan tipografi ve dinamik font boyutlandırma (`clamp()`).
  - Mobilde dikey hizalanan tam genişlikli hızlı rezervasyon formu.
- **Canlı Instagram Akışı:** `@bafrasapaketmangal` hesabından 6 güncel paylaşım kartı (fotoğraf, beğeni sayıları, yüksek kontrastlı okunabilir açıklamalar, etiketler).
- **Sabit Hızlı İletişim Butonları:** Ekranın sol altında her an erişilebilir Instagram, WhatsApp ve Telefon arama butonları.
- **Tam Sayfa SEO & ASO Optimizasyonu:**
  - Google Schema.org JSON-LD (Restaurant + BreadcrumbList + FAQPage).
  - Open Graph, Twitter Cards ve yerel coğrafi etiketler (Geo-Location).
  - PWA Web App Manifest (`manifest.webmanifest`), `sitemap.xml` ve `robots.txt`.
- **Çevrimdışı & CORS Korumalı İkonlar:** FontAwesome 4.7 font dosyaları base64 gömülü + CDN yedeği.

---

## 📂 Sayfa Yapısı

- `index.html` — Anasayfa (Sinematik Slider, Hikayemiz, Instagram Akışı, Menü Seçkisi, Rezervasyon, Google Yorumları, SSS)
- `menumuz.html` — Güncel Menü & Fiyat Listesi (Kilo ile etler, ızgaralar, kahvaltı, içecekler)
- `hikayemiz.html` — Hikayemiz & Kalite Standartlarımız
- `fotogaleri.html` — Fotoğraf Galerisi
- `videogaleri.html` — Video Galerisi
- `rezervasyon.html` — Online Masa Rezervasyonu & WhatsApp Hattı
- `iletisim.html` — Adres, Kroki, Yol Tarifi & İletişim Bilgileri

---

## 🌐 Render.com Üzerinde Canlıya Alma (Static Site)

1. Bu depoyu GitHub hesabınıza aktarın (`git push`).
2. [Render.com](https://render.com) paneline giriş yapın ve **New +** > **Static Site** seçeneğini tıklayın.
3. GitHub deponuzu seçin:
   - **Name:** `sapak-et-mangal` (veya istediğiniz isim)
   - **Branch:** `main`
   - **Build Command:** *(Boş bırakın)*
   - **Publish Directory:** `.` *(Nokta - kök dizin)*
4. **Create Static Site** butonuna tıklayın. Siteniz 1 dakika içinde ücretsiz SSL sertifikasıyla canlıya alınacaktır.

---

## 💻 Yerel Geliştirme (Localhost)

Windows ortamında çift tıklayarak çalıştırmak için klasör içindeki `baslat.bat` dosyasını kullanabilir veya terminalden şu komutu çalıştırabilirsiniz:

```bash
python -m http.server 8080
```

Tarayıcınızda açın: `http://localhost:8080`
