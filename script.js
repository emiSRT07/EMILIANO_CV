/* ============================================
   CV INTERACTIVO - Emiliano Ramirez
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Año actual ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Tema claro / oscuro ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("cv-theme");

  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("cv-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("cv-theme", "light");
    }
  });

  /* ---------- Navbar al hacer scroll ---------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Resaltar enlace activo según la sección visible
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Efecto de escritura ---------- */
  const typedTitle = document.getElementById("typedTitle");
  const titles = [
    "Desarrollador Web",
    "Diseñador Frontend",
    "Creativo Digital",
    "Emiliano Ramirez",
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedTitle.innerHTML = current.substring(0, charIndex) +
      '<span class="typed-cursor">|</span>';

    let delay = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 300;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  /* ---------- Animación de revelado al hacer scroll ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------- Barras de habilidades ---------- */
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          setTimeout(() => {
            bar.style.width = bar.dataset.level + "%";
          }, 150);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach((bar) => skillsObserver.observe(bar));

  /* ---------- Contadores animados ---------- */
  const stats = document.querySelectorAll(".stat strong");
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          stats.forEach((stat) => {
            const target = parseInt(stat.dataset.count, 10);
            animateCount(stat, target, 1500);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) statsObserver.observe(statsSection);

  function animateCount(element, target, duration) {
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(easeOut * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  /* ---------- Botón descargar / imprimir CV ---------- */
  document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
  });

  /* ---------- Formulario de contacto ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = "var(--red)";
      formStatus.textContent = "Por favor, completa todos los campos.";
      return;
    }

    formStatus.style.color = "#2ecc71";
    formStatus.textContent = `¡Gracias, ${name}! Tu mensaje ha sido enviado.`;
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  });
});
