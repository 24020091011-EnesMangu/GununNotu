# 📝 Günün Notu (Daily Note App)

React Native ve SQLite kullanılarak geliştirilmiş, şık bir günlük not ve mesaj kayıt uygulaması. Kullanıcıların günlük düşüncelerini ekleyebileceği, listeleyebileceği, güncelleyebileceği ve tamamlandı olarak işaretleyebileceği çapraz platform (Cross-Platform) destekli bir mobil projedir.

---

## ✨ Özellikler

- **Yerel Veritabanı:** `react-native-sqlite-storage` ile notlar cihaz hafızasında güvenle saklanır ve uygulama çevrimdışı (offline) çalışır.
- **Tam CRUD Desteği:** Günün mesajını/notunu ekleme, listeleme, anlık güncelleme ve tamamen silme işlemleri.
- **Gelişmiş Görev Yönetimi:** Notların solunda yer alan özel tasarım tik kutucuğu (checkbox) ile görevleri tamamlandı olarak işaretleme. Tamamlanan görevler otomatik olarak soluklaşır ve üstü çizilir.
- **Modern ve Özgün UI/UX:** Alışılmışın dışında, göz yormayan koyu lacivert zemin (`#1E1E2C`) üzerine pastel turkuaz (`#4ECDC4`), sarı (`#FFE66D`) ve mercan (`#FF6B6B`) vurgu renkleriyle estetik arayüz.
- **Dinamik Modal Arayüzü:** Güncelleme işlemleri için sayfayı terk etmeden açılan, kullanıcı dostu ve akıcı bir düzenleme penceresi.
- **Sayfa Navigasyonu:** `@react-navigation/native-stack` mimarisi kullanılarak ekranlar arası geçişler optimize edilmiştir.

---

## 📸 Ekran Görüntüleri

Projenin arayüzünden ve işlevsel adımlarından kesitler:

<p align="center">
 <img width="1080" height="2424" alt="1" src="https://github.com/user-attachments/assets/a913aabd-9043-43fa-9ea8-22f6dc4bc0ae" />>
  <img width="1080" height="2424" alt="2" src="https://github.com/user-attachments/assets/f58a1929-d458-413e-b803-0c9ba1288b27" />
 <img width="1080" height="2424" alt="3" src="https://github.com/user-attachments/assets/a93a9b60-8a7d-4fba-bb89-6f8821972f00" />
</p>
<p align="center">
  <img width="1080" height="2424" alt="4" src="https://github.com/user-attachments/assets/ea42489c-8e8f-4015-9e83-9c427763a101" />
 <img width="1080" height="2424" alt="5" src="https://github.com/user-attachments/assets/abd2d01c-53a2-46f5-a382-b6a335c426cb" />
  <img width="1080" height="2424" alt="6" src="https://github.com/user-attachments/assets/0a373243-84c9-45d2-9772-8efd11a45d40" />
</p>
<p align="center">
  <img width="1080" height="2424" alt="7" src="https://github.com/user-attachments/assets/17dd0e17-ce14-491b-bfdd-3a922c2a1360" />
</p>

> *Not: Ekran görüntülerinin README içerisinde başarıyla render edilebilmesi için `1.png`, `2.png`, ... `7.png` dosyalarının `README.md` ile aynı dizinde bulunması gerekmektedir.*

---

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

- **Framework:** React Native (CLI)
- **Dil:** JavaScript / TypeScript Destekli Kök Mimari
- **Navigasyon:** `@react-navigation/native` & `@react-navigation/native-stack`
- **Veritabanı:** `react-native-sqlite-storage` (Promise tabanlı SQLite bağlantısı)
- **Arayüz Bileşenleri:** Safe Area Context & Keyboard Avoiding View (Farklı ekran boyutlarına ve klavye etkileşimlerine tam uyum)

---

## 🚀 Kurulum ve Çalıştırma Kuralları

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz:

### 1. Depoyu Klonlayın
```bash
git clone [https://github.com/sedatavci/GununNotu.git](https://github.com/sedatavci/GununNotu.git)
cd GununNotu
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Android Emülatörünü veya Fiziksel Cihazı Hazırlayın
Android Studio üzerinden bir sanal cihaz (AVD) başlatın veya fiziksel Android telefonunuzu USB hata ayıklama modu açık şekilde bilgisayara bağlayın.

### 4. Uygulamayı Derleyin ve Çalıştırın
```bash
npx react-native run-android
```

---

## 📂 Proje Klasör Hiyerarşisi

Projenin sadeleştirilmiş ve amaca yönelik dosya ağacı yapısı şu şekildedir:

```text
GununNotu/
├── App.tsx               # Ana navigasyon yapısı ve SQLite tablo başlatıcı
├── src/
│   ├── CreateNote.js     # Not/Mesaj ekleme ve form ekranı (Ekran 1)
│   ├── NotesList.js      # Listeleme, silme, güncelleme ve tik kutucuğu ekranı (Ekran 2)
│   └── database.js       # Veritabanı bağlantısı, SQL sorguları ve CRUD entegrasyonu
├── package.json          # Proje bağımlılıkları ve script tanımları
└── README.md             # Proje dokümantasyonu
```

---

## 👨‍💻 Geliştirici Bilgileri

- **Adı Soyadı:** Enes MANGÜ
- **Kurum:** Kahramanmaraş İstiklal Üniversitesi
- **Bölüm:** Yazılım Mühendisliği
