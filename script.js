//NAVIGATIONSBAR - nuværende sæson står altid øverst og er fed//
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown-content");
  if (!dropdown) return;

  const seasonLinks = Array.from(dropdown.querySelectorAll("a"));

  const currentMonth = new Date().getMonth();
  let currentSeason;

  if (currentMonth >= 2 && currentMonth <= 4) {
    currentSeason = "Forår";
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    currentSeason = "Sommer";
  } else if (currentMonth >= 8 && currentMonth <= 10) {
    currentSeason = "Efterår";
  } else {
    currentSeason = "Vinter";
  }

  const matchingLink = seasonLinks.find(link => link.textContent.trim() === currentSeason);
  if (matchingLink) {
    matchingLink.classList.add("aktuel-sæson");
    dropdown.prepend(matchingLink);
  }
});




//FORSIDE//
function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return "spring";   // marts-maj
  if (month >= 6 && month <= 8) return "summer";   // juni-august
  if (month >= 9 && month <= 11) return "autumn";  // september-november
  return "winter";                                  // december-februar
}

function showCurrentSeason() {
  const season = getCurrentSeason();
  const containers = document.querySelectorAll(".season-container");
  
  containers.forEach(div => {
    if (div.id === season) {
      div.classList.remove("d-none");
    } else {
      div.classList.add("d-none");
    }
  });
}

document.addEventListener("DOMContentLoaded", showCurrentSeason);





//ALLE OPSKRIFTER//
//Desktop+tablet//
document.addEventListener("DOMContentLoaded", function () {
  // Find ID'er på sæson-sektioner
  const seasons = {
    vinter: document.getElementById("alle-vinter"),
    foraar: document.getElementById("alle-foraar"),
    sommer: document.getElementById("alle-sommer"),
    efteraar: document.getElementById("alle-efteraar")
  };

  // Funktion der bestemmer sæson baseret på måned
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // Januar = 1
    if (month >= 3 && month <= 5) return "foraar";
    if (month >= 6 && month <= 8) return "sommer";
    if (month >= 9 && month <= 11) return "efteraar";
    return "vinter"; // December, Januar, Februar
  }

  const currentSeason = getCurrentSeason();
  const seasonElement = seasons[currentSeason];

  if (seasonElement) {
    // Find introduktionssektionen
    const introduktion = document.querySelector(".introduktion");

    // Flyt den aktuelle sæson-sektion til at stå lige efter introduktionen
    introduktion.insertAdjacentElement("afterend", seasonElement);
  }
});


//Mobil-karusel//
document.addEventListener("DOMContentLoaded", function () {
  // Find karussel-kasserne for hver sæson
  const carousels = {
    vinter: document.querySelector("#carousel-vinter")?.closest(".col-12"),
    foraar: document.querySelector("#carousel-foraar")?.closest(".col-12"),
    sommer: document.querySelector("#carousel-sommer")?.closest(".col-12"),
    efteraar: document.querySelector("#carousel-efteraar")?.closest(".col-12")
  };

  // Funktion der bestemmer sæson baseret på måned
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "foraar";
    if (month >= 6 && month <= 8) return "sommer";
    if (month >= 9 && month <= 11) return "efteraar";
    return "vinter";
  }

  const currentSeason = getCurrentSeason();
  const currentCarousel = carousels[currentSeason];

  if (currentCarousel) {
    const container = document.querySelector(".season-container");
    container.insertBefore(currentCarousel, container.firstElementChild);
  }
});




//KOMMENTARSPOR - på hver side af hver enkelte opskrift//
function addComment() {
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const commentsContainer = document.getElementById('commentsContainer');

const name = nameInput.value.trim();
const comment = commentInput.value.trim();

if (!name || !comment) {
  alert('Skriv både navn og kommentar!');
  return;
}

// Opret kommentar-element
const commentEl = document.createElement('div');
commentEl.classList.add('comment');

const nameEl = document.createElement('div');
nameEl.classList.add('name');
nameEl.textContent = name;

const textEl = document.createElement('div');
textEl.classList.add('text');
textEl.textContent = comment;

commentEl.appendChild(nameEl);
commentEl.appendChild(textEl);

// Tilføj kommentar i listen
commentsContainer.appendChild(commentEl);

// Ryd inputfelterne
nameInput.value = '';
commentInput.value = '';

// Scroll ned til nyeste kommentar
commentsContainer.scrollTop = commentsContainer.scrollHeight;
}




