
"use strict";

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


(function initAlert() {

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

    const noResult = document.getElementById("glossaryEmpty");
    const visible  = [...rows].filter((r) => !r.classList.contains("row-hidden"));
    if (noResult) {
      noResult.style.display = visible.length === 0 ? "block" : "none";
    }
  });
})();

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



(function setYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = new Date().getFullYear();
})();







document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cardContent = document.querySelector('.card-content');

    // Función que simula el cambio de contenido con una transición suave
    function triggerSlideChange() {
        cardContent.style.opacity = '0.3';
        cardContent.style.transform = 'translateX(-10px)';
        cardContent.style.transition = 'all 0.2s ease';

        setTimeout(() => {
            cardContent.style.opacity = '1';
            cardContent.style.transform = 'translateX(0)';
        }, 200);
    }

    prevBtn.addEventListener('click', () => {
        console.log('Canción anterior...');
        triggerSlideChange();
    });

    nextBtn.addEventListener('click', () => {
        console.log('Siguiente canción...');
        triggerSlideChange();
    });
});