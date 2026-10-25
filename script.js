// ======================================
// OUR LITTLE UNIVERSE - WEEKSARY WEBSITE
// ======================================

// Secret code
const SECRET_CODE = "1018";

// Page order
const pages = [
  "home",
  "memories",
  "reasons",
  "promises",
  "letterIntro",
  "letter",
  "littleThings",
  "coupon",
  "surprise",
  "final"
];

let currentPageIndex = 0;

// Elements
const lockScreen = document.getElementById("lockScreen");
const website = document.getElementById("website");
const unlockForm = document.getElementById("unlockForm");
const secretCodeInput = document.getElementById("secretCode");
const lockMessage = document.getElementById("lockMessage");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggleButton = document.getElementById("musicToggle");

const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const pageIndicator = document.getElementById("pageIndicator");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

const floatingHearts = document.getElementById("floatingHearts");


// ======================================
// SECRET CODE
// ======================================

unlockForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredCode = secretCodeInput.value.trim();

  if (enteredCode === SECRET_CODE) {
    lockMessage.textContent = "Opening something made with love... 💗";

    lockScreen.style.transition = "opacity 0.7s ease";
    lockScreen.style.opacity = "0";

    setTimeout(() => {
      lockScreen.classList.add("hidden");
      website.classList.remove("hidden");

      goToPage("home");
      createFloatingHearts();
    }, 700);

  } else {
    lockMessage.textContent = "Oops! That's not the code, baby. Try again ♡";
    lockMessage.style.color = "#c85f83";

    secretCodeInput.value = "";
    secretCodeInput.focus();

    secretCodeInput.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 300
      }
    );
  }
});


// ======================================
// PAGE NAVIGATION
// ======================================

function goToPage(pageId) {
  const targetPage = document.getElementById(pageId);

  if (!targetPage) {
    console.error("Page not found:", pageId);
    return;
  }

  // Hide all pages
  document.querySelectorAll(".page-section").forEach((page) => {
    page.classList.remove("active-page");
  });

  // Display only the selected page
  targetPage.classList.add("active-page");

  // Update page index
  currentPageIndex = pages.indexOf(pageId);

  // Update top navigation
  document.querySelectorAll(".nav-dot").forEach((button) => {
    button.classList.remove("active");
  });

  // The letter uses the letterIntro navigation button
  let navPageId = pageId;

  if (pageId === "letter") {
    navPageId = "letterIntro";
  }

  const activeNav = document.querySelector(
    `.nav-dot[data-page="${navPageId}"]`
  );

  if (activeNav) {
    activeNav.classList.add("active");
  }

  updatePageControls();

  // Start the surprise animation when entering the surprise page
  if (pageId === "surprise") {
    animateSurpriseFlowers();
  }
}


// Back and Next buttons
function changePage(direction) {
  let nextIndex = currentPageIndex + direction;

  // Skip the separate letter page in the numbered navigation.
  // The letter opens through the envelope page.
  if (nextIndex === 5 && direction > 0) {
    nextIndex = 6;
  }

  if (nextIndex === 5 && direction < 0) {
    nextIndex = 4;
  }

  if (nextIndex < 0 || nextIndex >= pages.length) {
    return;
  }

  goToPage(pages[nextIndex]);
}


// Update Back/Next buttons and page counter
function updatePageControls() {
  if (backButton) {
    backButton.disabled = currentPageIndex <= 0;
  }

  if (nextButton) {
    nextButton.disabled = currentPageIndex >= pages.length - 1;
  }

  if (pageIndicator) {
    const displayIndex = String(currentPageIndex + 1).padStart(2, "0");
    const totalPages = String(pages.length).padStart(2, "0");

    pageIndicator.textContent = `${displayIndex} / ${totalPages}`;
  }
}


// Clickable navigation numbers
document.querySelectorAll(".nav-dot").forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;
    goToPage(pageId);
  });
});


// ======================================
// LOVE LETTER
// ======================================

function openLetter() {
  goToPage("letter");
}


// ======================================
// BACKGROUND MUSIC
// ======================================

async function toggleMusic() {
  if (!backgroundMusic) return;

  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();

      musicToggleButton.textContent = "♫ Music On";
      musicToggleButton.classList.add("music-playing");

    } catch (error) {
      console.error("Unable to play music:", error);
      alert("Please check that your music file is in the correct folder.");
    }

  } else {
    backgroundMusic.pause();

    musicToggleButton.textContent = "♫ Music";
    musicToggleButton.classList.remove("music-playing");
  }
}

musicToggleButton.addEventListener("click", toggleMusic);


// ======================================
// FLOATING HEARTS
// ======================================

function createFloatingHearts() {
  if (!floatingHearts) return;

  setInterval(() => {
    const heart = document.createElement("span");

    heart.classList.add("floating-heart");

    const hearts = ["♡", "♥", "❤", "💕"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 12 + Math.random() * 20 + "px";

    const duration = 7 + Math.random() * 7;

    heart.style.animationDuration = duration + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);

  }, 700);
}


// ======================================
// LOVE COUPONS
// ======================================

function redeemCoupon(message) {
  popupText.textContent = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
}


// Close popup by clicking outside the card
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
  }
});


// Close popup using Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !popup.classList.contains("hidden")) {
    closePopup();
  }
});


// ======================================
// SURPRISE MESSAGE
// ======================================

function showSurprise() {
  const message = document.getElementById("surpriseMessage");

  if (message) {
    message.classList.remove("hidden");

    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}


// ======================================
// FLOWER ANIMATION
// ======================================

function animateSurpriseFlowers() {
  const bouquet = document.querySelector(".bouquet");

  if (!bouquet) return;

  bouquet.animate(
    [
      { transform: "scale(0.9) rotate(-5deg)" },
      { transform: "scale(1.1) rotate(5deg)" },
      { transform: "scale(1) rotate(0deg)" }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );
}


// ======================================
// INITIAL SETUP
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  goToPage("home");
});