document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) {
    const year = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${year} Isaac Endicott &bull; Utah/Taiwan`;
  }
  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last Modification: ${document.lastModified}`;
  }
});
