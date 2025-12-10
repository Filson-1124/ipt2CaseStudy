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

//added advice slip modal popup for advice clip API
const adviceBtn = document.getElementById("adviceBtn");
const adviceModal = document.getElementById("adviceModal");
const adviceText = document.getElementById("adviceText");
const closeModal = document.getElementById("closeModal");

adviceBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-cache",
    });
    const data = await response.json();
    const adviceTextContent = document.getElementById("adviceTextContent");
    adviceTextContent.textContent = data.slip.advice;
    adviceModal.classList.remove("hidden");
  } catch (error) {
    adviceText.textContent = "Sorry, could not fetch advice. Please try again.";
    adviceModal.classList.remove("hidden");
    console.error(error);
  }
});

closeModal.addEventListener("click", () => {
  adviceModal.classList.add("hidden");
});

adviceModal.addEventListener("click", (e) => {
  if (e.target === adviceModal) {
    adviceModal.classList.add("hidden");
  }
});
