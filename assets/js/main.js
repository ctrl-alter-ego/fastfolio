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
      logo.src = "assets/images/logo/fastfol_White_yellow.png";
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



// ========== flash input box

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.top-btn');
  const input = document.querySelector('.form-head input[type=email]');

  btn.addEventListener('click', function() {
    input.classList.add('pulse-yellow');
    input.focus();

    input.addEventListener('animationend', function() {
      input.classList.remove('pulse-yellow');
    }, { once: true });
  });
});


// ====== web3forms

const forms = document.querySelectorAll(".form");
const results = document.querySelectorAll("#result");
const spamMessages = document.querySelectorAll(".ud-small");
const submitButtons = document.querySelectorAll(".submit-button");

// Loop through each form and add the event listener
forms.forEach((form, index) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const result = results[index];
    const submitButton = submitButtons[index];
    const spamMessage = spamMessages[index];
    
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    var json = JSON.stringify(object);
    submitButton.value = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(async (response) => {
        //let json = await response.json();
        submitButton.value = "Notify me";
        spamMessage.style.display = "none";
        if (response.status == 200) {
            result.innerHTML = "Thank you for signing up for updates! We'll be in touch soon.";
            result.classList.remove("text-gray-500");
            result.classList.add("alert-success");
            posthog.capture('User signed up');
            // emailInput.style.display = "none"; // Hide email input
            // submitButton.style.display = "none"; // Hide submit button
        } else {
          console.log(response);
          result.innerHTML = "Sorry, that didn't work. Please try again.";
          result.classList.remove("text-gray-500");
          result.classList.add("alert-warning");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Sorry, looks like we're experiencing a temporary issue. Please try again.";
        result.classList.add("alert-danger")
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = "none";
          spamMessage.style.display = "inline-block";
        }, 5000);
      });
  });
});