// script.js

const cleanToggle = document.querySelector(".nav-clean__toggle");
const cleanMobile = document.querySelector(".nav-clean__mobile");

cleanToggle.addEventListener("click", () => {
  cleanToggle.classList.toggle("active");
  cleanMobile.classList.toggle("open");

  document.body.style.overflow = cleanMobile.classList.contains("open")
    ? "hidden"
    : "";
});

// Klik na link zatvara mobilni meni
cleanMobile.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "a") {
    cleanToggle.classList.remove("active");
    cleanMobile.classList.remove("open");
    document.body.style.overflow = "";
  }
});


  
  /* ------------------------------
     Glatko skrolovanje (sa malim
     pomjeranjem zbog sticky navigacije)
  ------------------------------ */
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
  
        if (!targetId || targetId === "#") return;
  
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
  
        e.preventDefault();
  
        const nav = document.querySelector(".nav");
        const navHeight = nav ? nav.offsetHeight + 12 : 0;
        const rect = targetEl.getBoundingClientRect();
        const offset = rect.top + window.pageYOffset - navHeight;
  
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      });
    });
  }
  
  /* ------------------------------
     Lightbox za slike (.js-lightbox)
  ------------------------------ */
  function setupLightbox() {
    const images = document.querySelectorAll(".js-lightbox");
    if (!images.length) return;
  
    // Kreiramo lightbox u DOM-u
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Zatvori prikaz slike">&times;</button>
      <div class="lightbox__inner">
        <img class="lightbox__img" src="" alt="" />
        <p class="lightbox__caption"></p>
      </div>
    `;
    document.body.appendChild(lightbox);
  
    const lightboxImg = lightbox.querySelector(".lightbox__img");
    const lightboxCaption = lightbox.querySelector(".lightbox__caption");
    const lightboxCloseBtn = lightbox.querySelector(".lightbox__close");
  
    function openLightbox(src, alt, caption) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightboxCaption.textContent = caption || alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  
    images.forEach((img) => {
      img.addEventListener("click", () => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "";
        const caption = img.dataset.caption || "";
        openLightbox(src, alt, caption);
      });
    });
  
    lightbox.addEventListener("click", (e) => {
      if (
        e.target === lightbox ||
        e.target.classList.contains("lightbox__close")
      ) {
        closeLightbox();
      }
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
  
  /* ------------------------------
     Modali (biografije umjetnika)
     Očekuje se HTML struktura:
     <div id="modal-mujo" class="modal">
       <div class="modal__overlay"></div>
       <div class="modal__dialog">
         <button class="modal__close">×</button>
         ...
       </div>
     </div>
  ------------------------------ */
  function setupModals() {
    const openButtons = document.querySelectorAll(".js-open-modal");
    if (!openButtons.length) return;
  
    const body = document.body;
  
    function openModal(modal) {
      if (!modal) return;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
  
      const closeBtn = modal.querySelector(".modal__close");
      if (closeBtn) closeBtn.focus();
    }
  
    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
    }
  
    openButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.modal;
        if (!targetId) return;
        const modal = document.getElementById(targetId);
        openModal(modal);
      });
    });
  
    // delegacija – overlay i dugme za zatvaranje
    document.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (!modal) return;
  
      if (
        e.target.classList.contains("modal__overlay") ||
        e.target.classList.contains("modal__close")
      ) {
        closeModal(modal);
      }
    });
  
    // ESC zatvara bilo koji otvoren modal
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const openModalEl = document.querySelector(".modal.is-open");
      if (openModalEl) {
        closeModal(openModalEl);
      }
    });
  }
  