// Ganti semua <a href="https://cdn4.videas.fr/..."> menjadi Cloudflare Worker proxy (base64)
(function () {
  const proxy = "https://videaproxy.bakayabky.workers.dev/video?id=";

  function encodeAndReplaceLinks(root) {
    const links = root.querySelectorAll("a[href^='https://cdn4.videas.fr/']");
    links.forEach(link => {
      const original = link.getAttribute("href");
      const encoded = btoa(original);
      link.setAttribute("href", proxy + encoded);
    });
  }

  // Pertama, jalankan saat DOM selesai dimuat
  document.addEventListener("DOMContentLoaded", function () {
    encodeAndReplaceLinks(document);

    // Pantau perubahan di dalam body
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Jika node adalah elemen
            if (node.matches("a[href^='https://cdn4.videas.fr/']")) {
              encodeAndReplaceLinks(document);
            } else {
              encodeAndReplaceLinks(node); // Cek elemen baru di dalam node
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
