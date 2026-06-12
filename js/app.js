/* ============================================================
   MODA ECCI — main.js
   Autor: Aprendiz ADSO | SENA CMTC
   ============================================================ */

"use strict";

/* ── 1. NAVBAR: cambio de opacidad al hacer scroll ─────────── */
(function initNavbar() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
})();


/* ── 2. SCROLL REVEAL con IntersectionObserver ──────────────── */
(function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // sólo una vez
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ── 3. ALERTA de bienvenida (Bootstrap Alert) ──────────────── */
(function initAlert() {
  // La alerta se muestra automáticamente al cargar.
  // La ocultamos si el usuario ya la cerró en esta sesión.
  const hidden = sessionStorage.getItem("alertClosed");
  const alertEl = document.getElementById("alertBienvenida");
  if (!alertEl) return;

  if (hidden) {
    alertEl.classList.add("d-none");
  }

  alertEl.addEventListener("closed.bs.alert", () => {
    sessionStorage.setItem("alertClosed", "1");
  });
})();


/* ── 4. GALERÍA MODAL: abrir imagen en modal Bootstrap ──────── */
(function initGalleryModal() {
  const mosaicItems = document.querySelectorAll(".mosaic-click");
  const modalImg    = document.getElementById("modalImg");
  const modalLabel  = document.getElementById("modalGaleriaLabel");
  if (!mosaicItems.length || !modalImg) return;

  mosaicItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src   = item.getAttribute("data-src");
      const title = item.getAttribute("data-title");
      modalImg.setAttribute("src", src);
      if (modalLabel) modalLabel.textContent = title || "Galería";
    });
  });
})();


/* ── 5. BUSCADOR DE GLOSARIO ────────────────────────────────── */
(function initGlossarySearch() {
  const input = document.getElementById("glossarySearch");
  if (!input) return;

  const rows = document.querySelectorAll("#glossaryBody tr");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        row.classList.remove("row-hidden");
      } else {
        row.classList.add("row-hidden");
      }
    });

    // Mensaje si no hay resultados
    const noResult = document.getElementById("glossaryEmpty");
    const visible  = [...rows].filter((r) => !r.classList.contains("row-hidden"));
    if (noResult) {
      noResult.style.display = visible.length === 0 ? "block" : "none";
    }
  });
})();


/* ── 6. BOTÓN "volver arriba" ───────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById("btnTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.opacity = window.scrollY > 400 ? "1" : "0";
    btn.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();


/* ── 7. AÑO DINÁMICO en el footer ──────────────────────────── */
(function setYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
})();