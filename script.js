// -----------------------------------------
// 1. DYNAMIC ROLE TYPING EFFECT
// -----------------------------------------
const roles = ["Software Developer", "Web Designer", "UI/UX Enthusiast", "Creative Coder", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicSpan = document.getElementById("dynamicRole");

function typeEffect() {
    if (!dynamicSpan) return; // Safeguard
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        dynamicSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 300);
        return;
    }
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// -----------------------------------------
// 2. DARK / LIGHT THEME TOGGLE
// -----------------------------------------
const themeToggleBtn = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check for saved user preference in localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "light") {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
}

// -----------------------------------------
// 3. MOBILE MENU TOGGLE
// -----------------------------------------
const mobileBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = mobileBtn.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("active");
        if (mobileBtn) {
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    });
});

// -----------------------------------------
// 4. ACTIVE NAV LINK ON SCROLL
// -----------------------------------------
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// -----------------------------------------
// 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
// -----------------------------------------
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Optional: stop observing once revealed
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Trigger when 15% of the element is visible
});

revealElements.forEach(el => revealObserver.observe(el));

// -----------------------------------------
// 6. CONTACT FORM SUBMISSION (Formspree)
// -----------------------------------------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                alert("Thanks for reaching out! I'll get back to you soon.");
                contactForm.reset();
            } else {
                alert("Oops! Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your connection and try again.");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}