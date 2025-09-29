const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const text = "Frontend Developer.";
const typingElement = document.getElementById("typingText");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const menuIcon = document.getElementById("menuIcon");
const backIcon = document.getElementById("backIcon");

// Animate gauges once when page loads
document.addEventListener("DOMContentLoaded", () => {
  const fills = document.querySelectorAll(".gauge__fill");

  fills.forEach((fill) => {
    const target = fill.getAttribute("data-rotate") || "0turn";

    // Start from 0
    fill.style.transform = "rotate(0turn)";

    // Animate to target after small delay
    setTimeout(() => {
      fill.style.transform = `rotate(${target})`;
    }, 200);
  });
});


// Typing effect
let i = 0;
function typeEffect() {
  if (i < text.length) {
    typingElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 50); // typing speed
  }
}
typeEffect();

// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Theme toggle
themeBtn.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
});

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("-translate-x-full");

  // Swap icons
  menuIcon.classList.toggle("hidden");
  backIcon.classList.toggle("hidden");
});
