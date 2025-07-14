// == Blogger Image Optimizer via Statically CDN ==
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const images = document.getElementsByTagName("img");
    const oldPrefix = "https://blogger.googleusercontent.com/img/";
    const cdnPrefix = "https://cdn.statically.io/img/blogger.googleusercontent.com/img/";

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.src.startsWith(oldPrefix)) {
        img.src = img.src.replace(oldPrefix, cdnPrefix);
      }
    }
  });
})();
