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
