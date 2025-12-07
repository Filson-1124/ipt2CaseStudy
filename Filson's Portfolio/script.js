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


  const curiousBtn = document.getElementById("curiousBtn");
  const curiousModal = document.getElementById("curiousModal");
  const modalBox = document.getElementById("modalBox");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const quizCategory = document.getElementById("quizCategory");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");

  let correctAnswer = "";

  /** OPEN MODAL */
  curiousBtn.addEventListener("click", () => {
    curiousModal.classList.remove("pointer-events-none", "opacity-0");
    modalBox.classList.remove("opacity-0", "scale-90");

    curiousModal.classList.add("opacity-100");
    modalBox.classList.add("opacity-100", "scale-100");

    loadTrivia(); // always fetch fresh question
  });

  /** CLOSE MODAL */
  closeModalBtn.addEventListener("click", closeModal);

  function closeModal() {
    curiousModal.classList.add("pointer-events-none", "opacity-0");
    modalBox.classList.add("opacity-0", "scale-90");

    curiousModal.classList.remove("opacity-100");
    modalBox.classList.remove("opacity-100", "scale-100");
  }

  /** LOAD TRIVIA FROM API */
  async function loadTrivia() {
    quizOptions.innerHTML = "Loading...";
    
    const response = await fetch("https://opentdb.com/api.php?amount=1&category=18&type=multiple");
    const data = await response.json();

    const trivia = data.results[0];

    correctAnswer = trivia.correct_answer;

    quizCategory.textContent = trivia.category;
    quizQuestion.innerHTML = trivia.question;

    // Combine answers & shuffle
    const answers = [...trivia.incorrect_answers, trivia.correct_answer]
      .sort(() => Math.random() - 0.5);

    quizOptions.innerHTML = "";
    answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.className =
        "w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl " +
        "font-medium shadow-md active:scale-95 transition hover:bg-gray-300";
      btn.innerHTML = ans;

      btn.onclick = () => selectAnswer(btn, ans);

      quizOptions.appendChild(btn);
    });
  }
  let autoCloseTimer;

function startAutoClose() {
    // Clear any previous timer so they don't stack
    clearTimeout(autoCloseTimer);

    autoCloseTimer = setTimeout(() => {
        closeModal();
    }, 5000);
}


  /** ANSWER SELECTION */
  function selectAnswer(button, selected) {
    const allButtons = quizOptions.querySelectorAll("button");

    // Disable all answer buttons
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === correctAnswer) {
      button.classList.add("bg-green-500", "text-white");
    } else {
      button.classList.add("bg-red-500", "text-white");

      // highlight correct answer
      allButtons.forEach(btn => {
        if (btn.innerText === correctAnswer) {
          btn.classList.add("bg-green-500", "text-white");
        }
      });
    }

   startAutoClose()

  }

