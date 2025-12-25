document.addEventListener("DOMContentLoaded", function() {
  // === DARK MODE BUTTON ===
  const darkIcon = "/assets/img/DarkMode.png";
  const lightIcon = "/assets/img/LightMode.png";

  setTimeout(() => {
    const btn = document.createElement("img");
    btn.id = "theme-toggle";
    btn.src = darkIcon;
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "1.5rem",
      right: "1.8rem",
      width: "52px",
      height: "52px",
      cursor: "pointer",
      zIndex: "10001",
      borderRadius: "50%",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      transition: "transform 0.2s ease, opacity 0.3s ease"
    });
    document.body.appendChild(btn);

    // === NEW CONSOLIDATED LOGO SETUP ===
    const logo = document.createElement("img");
    logo.id = "site-logo";
    logo.src = "/assets/img/CodeGreen.png"; // Using your new image
    logo.alt = "Code Green Logo";

    logo.addEventListener("click", () => {
      window.location.href = "https://codegreen-mjr.github.io/";
    });

    Object.assign(logo.style, {
      position: "fixed",
      top: "0.25rem",
      left: "2.2rem",
      width: "96px",
      height: "96px",
      cursor: "pointer",
      zIndex: "10002",
      display: "block",
      transformOrigin: "center center",
      backfaceVisibility: "visible" // Needed for 3D flip
    });
    document.body.appendChild(logo);

    // === FADE TRANSITIONS ===
    const style = document.createElement("style");
    style.textContent = `
      body, body *:not(img):not(svg) {
        transition: background-color 0.4s ease, color 0.4s ease !important;
      }
      #site-logo {
        perspective: 1000px; /* Gives the 3D depth effect */
      }
    `;
    document.head.appendChild(style);

    // === DARK MODE LOGIC (Logo swap removed) ===
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      btn.src = lightIcon;
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", dark ? "dark" : "light");
      btn.src = dark ? lightIcon : darkIcon;
    });

    if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode");
      btn.src = lightIcon;
    }

    // === 3D LOGO FLIP ANIMATION ===
    let spinning = false;
    logo.addEventListener("mouseenter", () => {
      if (spinning) return;
      spinning = true;

      let start = null;
      const duration = 1500; // 1.5s for a snappy flip

      function animate(timestamp) {
        if (!start) start = timestamp;
        let elapsed = timestamp - start;
        let t = Math.min(elapsed / duration, 1);

        // Exponential ease in/out
        const eased = t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // rotateY(360deg) makes it flip around horizontally like a 3D object
        logo.style.transform = `rotateY(${360 * eased}deg)`;

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          logo.style.transform = "rotateY(0deg)";
          spinning = false;
        }
      }

      requestAnimationFrame(animate);
    });

    // === TIMELINE IMAGE LOGIC (Cleaned up) ===
    document.querySelectorAll(".timeline-image img").forEach(img => {
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.display = "block";
    });

    // === NAVBAR SCROLL / DYNAMIC LOGO RESIZE ===
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      function updateNavbar() {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        const navbarHeight = navbar.offsetHeight;
        logo.style.height = Math.round(navbarHeight * 0.85) + "px";
        logo.style.width = "auto";
      }

      updateNavbar();
      window.addEventListener("resize", updateNavbar);
      window.addEventListener("scroll", updateNavbar);
    }

  }, 100);
});
