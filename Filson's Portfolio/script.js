const themeBtn = document.getElementById("themeBtn");
const html=document.documentElement;
 const text = "Frontend Developer.";
    const typingElement = document.getElementById("typingText");

themeBtn.addEventListener('click',()=>{
    html.classList.toggle('dark')
})


    let i = 0;

    function typeEffect() {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50); // typing speed (100ms per letter)
      }
    }

    typeEffect();