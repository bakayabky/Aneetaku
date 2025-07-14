(function () {
  const cdnPrefix = "https://cdn.statically.io/img/blogger.googleusercontent.com/img/";
  const originalPrefix = "https://blogger.googleusercontent.com/img/";

  function convert(url) {
    if (url.startsWith(originalPrefix)) {
      let newUrl = url.replace(originalPrefix, cdnPrefix);
      if (!newUrl.includes("?")) newUrl += "?f=webp";
      else if (!newUrl.includes("f=webp")) newUrl += "&f=webp";
      return newUrl;
    }
    return url;
  }

  function convertImages(root) {
    root.querySelectorAll("img[src^='https://blogger.googleusercontent.com/img/']").forEach(img => {
      img.src = convert(img.src);
    });
  }

  function convertAnchors(root) {
    root.querySelectorAll("a[href^='https://blogger.googleusercontent.com/img/']").forEach(a => {
      a.href = convert(a.href);
    });
  }

  function convertConfig() {
    if (window.config?.eInfo?.cover) {
      window.config.eInfo.cover = convert(window.config.eInfo.cover);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Jalankan pertama kali
    convertImages(document);
    convertAnchors(document);
    convertConfig();

    // Pantau perubahan berikutnya (jika konten dinamis)
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            convertImages(node);
            convertAnchors(node);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
