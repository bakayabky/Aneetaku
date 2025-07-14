document.addEventListener("DOMContentLoaded", function () {
  const allLinks = document.querySelectorAll("a[href^='https://cdn4.videas.fr/']");

  allLinks.forEach(link => {
    const original = link.getAttribute("href");
    const encoded = btoa(original);
    const proxied = `https://videaproxy.bakayabky.workers.dev/video?id=${encoded}`;
    link.setAttribute("href", proxied);
  });
});
