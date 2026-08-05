// =============================================
//  PORTFOLIO JS - Animations & Interactions
//  File: static/js/main.js
// =============================================

// ---------- TYPING EFFECT ----------
const names = ["Kartik Nair"];
const roles = [
  "Data Analyst",
  "Python Developer",
  "Power BI Developer",
  "AI Enthusiast",
];

let nameIndex = 0,
  roleIndex = 0;
let charIndex = 0,
  isDeleting = false;

function typeRole() {
  const el = document.getElementById("typed-role");
  if (!el) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeRole, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, isDeleting ? 60 : 100);
}

function typeName() {
  const el = document.getElementById("typed-name");
  if (!el) return;
  const name = names[0];
  let i = 0;
  function tick() {
    if (i <= name.length) {
      el.textContent = name.substring(0, i);
      i++;
      setTimeout(tick, 80);
    } else {
      setTimeout(typeRole, 400);
    }
  }
  tick();
}

window.addEventListener("load", () => {
  setTimeout(typeName, 800);
});

// ---------- SCROLL ANIMATIONS (Intersection Observer) ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Animate skill bars
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill) => {
          const w = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = w + "%";
          }, 200);
        });

        // Animate counters
        const nums = entry.target.querySelectorAll(".stat-num");
        nums.forEach((num) => {
          const target = parseInt(num.getAttribute("data-target"));
          let current = 0;
          const step = Math.ceil(target / 30);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            num.textContent = current;
          }, 50);
        });
      }
    });
  },
  { threshold: 0.1 },
);

// Apply initial fade-in state to sections
document
  .querySelectorAll(".section, .project-card, .skill-category")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ---------- PROJECT FILTER ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const cats = card.getAttribute("data-category") || "";
      if (filter === "all" || cats.includes(filter)) {
        card.classList.remove("hidden");
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ---------- NAVBAR SCROLL EFFECT ----------
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(5,13,26,0.97)";
  } else {
    navbar.style.background = "rgba(5,13,26,0.85)";
  }

  // Scroll-to-top button
  const scrollBtn = document.getElementById("scrollTop");
  if (window.scrollY > 400) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

// ---------- MOBILE HAMBURGER ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    if (navLinks.classList.contains("open")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";
    }
  });
}

// Close mobile menu when link clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("open");
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";
    }
  });
});

// ---------- CONTACT FORM (EmailJS) ----------
function sendMessage() {
  var name = document.getElementById("cf-name").value.trim();
  var email = document.getElementById("cf-email").value.trim();
  var subject = document.getElementById("cf-subject").value.trim();
  var message = document.getElementById("cf-message").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all required fields.", "#ffd700");
    return;
  }
  if (!email.includes("@")) {
    showToast("Please enter a valid email.", "#ffd700");
    return;
  }

  var btn = document.getElementById("sendBtn");
  if (btn) {
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
  }

  // ✏️ REPLACE these with your EmailJS IDs from emailjs.com
  var SERVICE_ID = "service_in5xr5e";
  var TEMPLATE_ID = "template_n9um31r";

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      subject: subject || "Hiring Inquiry",
      message: message,
    })
    .then(
      function () {
        showToast("Message sent to Kartik inbox!", "#00ff9d");
        if (btn) {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = "linear-gradient(135deg, #00ff9d, #00b074)";
        }
        document.getElementById("cf-name").value = "";
        document.getElementById("cf-email").value = "";
        document.getElementById("cf-subject").value = "";
        document.getElementById("cf-message").value = "";
        setTimeout(function () {
          if (btn) {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = "";
            btn.disabled = false;
          }
        }, 4000);
      },
      function (err) {
        console.error("EmailJS error:", err);
        // Fallback mailto if keys not set up yet
        var body =
          "Hi Kartik,\n\nI am " +
          name +
          " from " +
          subject +
          ".\n\n" +
          message +
          "\n\nBest regards,\n" +
          name +
          "\n" +
          email;
        window.location.href =
          "mailto:kartik.nair1717@gmail.com?subject=" +
          encodeURIComponent(subject || "Hiring Inquiry") +
          "&body=" +
          encodeURIComponent(body);
        if (btn) {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.disabled = false;
        }
        showToast("Opening mail client...", "#ffd700");
      },
    );
}

function showToast(msg, color) {
  color = color || "#00ff9d";
  var toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderColor = color;
  toast.style.color = color;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}

// ---------- ACTIVE NAV LINK ON SCROLL ----------
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector('.nav-link[href="#' + id + '"]');
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        link.style.color = "var(--accent-cyan)";
      } else {
        link.style.color = "";
      }
    }
  });
});

// ---------- PARTICLES CANVAS (subtle) ----------
(function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  container.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d) => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, " + d.opacity + ")";
      ctx.fill();
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
    });
    for (var i = 0; i < dots.length; i++) {
      for (var j = i + 1; j < dots.length; j++) {
        var dx = dots[i].x - dots[j].x;
        var dy = dots[i].y - dots[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle =
            "rgba(0, 212, 255, " + 0.08 * (1 - dist / 120) + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
