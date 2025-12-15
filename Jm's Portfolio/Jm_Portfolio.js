document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav .nav-tabs ul li a");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  if (navLinks.length > 0) {
    navLinks[0].classList.add("active");
  }
});

function showSidebar() {
    document.querySelector('.sidebar').classList.add('show');
    document.querySelector('.overlay').classList.add('active');
}

function hideSidebar() {
    document.querySelector('.sidebar').classList.remove('show');
    document.querySelector('.overlay').classList.remove('active');
}

const container = document.getElementById('riddles-container');
const newRiddleBtn = document.getElementById('new-riddle-btn');
const apiKey = 'nXd6YIMOsfEpz9KMZTKm7g==GoHZDFVcUqJHr5kT';

async function fetchRiddle() {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/riddles', {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch riddles. Status: ${response.status}`);
        }

        const riddleArray = await response.json();
        displayRiddles(riddleArray);
    } catch (error) {
        container.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.error(error);
    }
}

function displayRiddles(riddles) {
    container.innerHTML = ' ';

    riddles.forEach(riddle => {
        const card = document.createElement('div');
        card.classList.add('flashcard');
        card.innerHTML = `
                          <div class="flashcard-inner">
                              <div class="flashcard-front">
                                  ${riddle.question}
                                  <h5>tap to reveal</h5>
                              </div>
                              <div class="flashcard-back">${riddle.answer}</div>
                          </div>
                      `;
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        container.appendChild(card);
    });
}

newRiddleBtn.addEventListener('click', fetchRiddle);
fetchRiddle();
