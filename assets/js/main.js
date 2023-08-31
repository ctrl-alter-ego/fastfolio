(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.scrollY > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky")) {
      logo.src = "assets/images/logo/fastfol_Grey_Colour.svg";
    } else {
      logo.src = "assets/images/logo/fastfol_White.svg";
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };
})();

// ======== animate heading - changing word
const changingWords = ['company', 'innovation', 'product'];
const changingWordElement = document.getElementById('changing-word');

let currentIndex = 0;

function changeWord() {
  changingWordElement.textContent = changingWords[currentIndex];
  currentIndex = (currentIndex + 1) % changingWords.length;
  
  if (currentIndex === 5) {
    clearInterval(intervalId); // Stop the interval after one complete cycle
  }
}

setTimeout(() => {
  intervalId = setInterval(changeWord, 1000);
}, 1000);

// typing letter by letter

// let currentWordIndex = 0;
// let currentLetterIndex = 0;
// let intervalId;

// function typeWord() {
//   const currentWord = changingWords[currentWordIndex];
//   const displayedWord = currentWord.substring(0, currentLetterIndex);
//   changingWordElement.textContent = displayedWord;

//   currentLetterIndex++;

//   if (currentLetterIndex > currentWord.length) {
//     clearInterval(intervalId);

//     setTimeout(() => {
//       currentLetterIndex = 0;
//       currentWordIndex = (currentWordIndex + 1) % changingWords.length;
//       intervalId = setInterval(typeWord, 100);
//     }, 1000); // Pause for 1 second before typing the next word
//   }
// }

// // Start typing the first word after a delay
// setTimeout(() => {
//   intervalId = setInterval(typeWord, 100);
// }, 1000);