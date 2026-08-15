// Dynamic role typing effect
const roles = ["Software Developer", "Web Designer", "Creative Coder", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicSpan = document.getElementById("dynamicRole");

function typeEffect() {
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

// Start the typing effect when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    if (dynamicSpan) {
        typeEffect();
    }
});

// Mobile menu toggle
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
        if (navMenu) {
            navMenu.classList.remove("active");
        }
        if (mobileBtn) {
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    });
});

// Active nav highlight on scroll
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

// Handle contact form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! I'll get back to you soon. (Demo portfolio)");
        contactForm.reset();
    });
}

// Fallback for profile image
const profileImg = document.querySelector(".hero-image img");
if (profileImg) {
    profileImg.onerror = function() {
        this.src = "https://placehold.co/400x400?text=Hable+Photo";
    };
}