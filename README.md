# Çeviri+ Projesi
- Çeviri+, dil çevirisi için React ve Redux kullanılarak geliştirilmiş bir uygulamadır.
- Dil yönetimi için RapidAPI Text Translator servisi kullanılmaktadır.

#Özellikler
- React-Select ile dil seçimi
- RapidAPI Text Translator servisi kullanarak metin çevirisi
- Kaynak ve hedef dilleri değiştirme
- Gerçek zamanlı çeviri önizleme
- API istekleri sırasında yüklenme animasyonları

# Redux Slice'lar

- languageSlice
Dil verileri ile ilgili durumu yönetir.
Dil verilerini asenkron olarak getirir.
- translateSlice
Metin çevirisi ile ilgili durumu yönetir.
Metin çevirisini asenkron olarak gerçekleştirir.
Çeviri cevabını ayarlamak için bir reducer sağlar.
