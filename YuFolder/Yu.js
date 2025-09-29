// JS ScrollSpy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("bg-[#c4c4c4]");
    link.classList.remove("text-[#242022]");
    link.classList.add("bg-transparent");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.remove("bg-transparent");
      link.classList.add("bg-[#c4c4c4]");
      link.classList.add("text-[#242022]");
    }
  });
});

//Project Experience Cards
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Education Cards
const buttons = document.querySelectorAll(".timeline-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardId = btn.getAttribute("data-card");
    const card = document.getElementById(cardId);

    card.classList.toggle("opacity-100");
    card.classList.toggle("scale-100");
    card.classList.toggle("pointer-events-auto");
    card.classList.toggle("opacity-0");
    card.classList.toggle("scale-95");
    card.classList.toggle("pointer-events-none");
  });
});

//Slide up
  window.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById("about");
    aboutSection.classList.remove("opacity-0", "translate-y-10");
  });