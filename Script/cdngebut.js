(function () {
  const cdnPrefix = "https://cdn.statically.io/img/blogger.googleusercontent.com/img/";
  const originalPrefix = "https://blogger.googleusercontent.com/img/";

  // Fungsi ganti link blogger ke cdn.statically.io
  function convert(url) {
    if (url.startsWith(originalPrefix)) {
      let newUrl = url.replace(originalPrefix, cdnPrefix);
      // Tambahkan parameter ?f=webp untuk kompresi
      if (!newUrl.includes("?")) newUrl += "?f=webp";
      else if (!newUrl.includes("f=webp")) newUrl += "&f=webp";
      return newUrl;
    }
    return url;
  }

  // 1. Ubah semua <img src="...">
  function convertImages() {
    document.querySelectorAll("img[src^='https://blogger.googleusercontent.com/img/']").forEach(img => {
      img.src = convert(img.src);
    });
  }

  // 2. Ubah semua <a href="..."> yang mengarah ke gambar
  function convertAnchors() {
    document.querySelectorAll("a[href^='https://blogger.googleusercontent.com/img/']").forEach(a => {
      a.href = convert(a.href);
    });
  }

  // 3. Ubah string dalam `window.config` jika ada
  function convertConfig() {
    if (window.config && window.config.eInfo && window.config.eInfo.cover) {
      window.config.eInfo.cover = convert(window.config.eInfo.cover);
    }
  }

  // Jalankan setelah DOM selesai
  document.addEventListener("DOMContentLoaded", function () {
    convertImages();
    convertAnchors();
    convertConfig();
  });

})();
