(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  root.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

  function updateThemeButton(button) {
    const text = button.querySelector(".theme-toggle__text");
    const isLight = root.dataset.theme === "light";

    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    button.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");

    if (text) {
      text.textContent = isLight ? "☾" : "☼";
    }
  }

  function enablePdfNewTabOpen() {
    const pdfObjects = document.querySelectorAll('object[type="application/pdf"]');

    pdfObjects.forEach(function (pdfObject) {
      const pdfUrl = pdfObject.getAttribute("data");

      if (!pdfUrl || pdfObject.parentElement.classList.contains("pdf-open-link")) {
        return;
      }

      const opener = document.createElement("a");
      opener.className = "pdf-open-link";
      opener.href = pdfUrl;
      opener.target = "_blank";
      opener.rel = "noopener";
      opener.title = "Open PDF in new tab";
      opener.setAttribute("aria-label", "Open PDF in new tab");

      pdfObject.style.pointerEvents = "none";
      pdfObject.parentNode.insertBefore(opener, pdfObject);
      opener.appendChild(pdfObject);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".theme-toggle");

    buttons.forEach(function (button) {
      updateThemeButton(button);

      button.addEventListener("click", function () {
        root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", root.dataset.theme);

        buttons.forEach(updateThemeButton);
      });
    });

    enablePdfNewTabOpen();
  });
})();
