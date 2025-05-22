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
document.addEventListener('DOMContentLoaded', function () {
  const month = new Date().getMonth();

  const seasons = [
    { name: "vinter", months: [11, 0, 1] },
    { name: "foraar", months: [2, 3, 4] },
    { name: "sommer", months: [5, 6, 7] },
    { name: "efteraar", months: [8, 9, 10] }
  ];

  const currentSeason = seasons.find(season => season.months.includes(month))?.name;

  const container = document.getElementById("seasons-container");
  const otherSeasons = document.getElementById("other-seasons");

  if (!container || !otherSeasons || !currentSeason) return;

  // Find det element i containeren som matcher sæsonen
  const currentSeasonElement = container.querySelector(`.season-banner[data-season="${currentSeason}"]`);
  if (currentSeasonElement) {
    // Flyt det element øverst i containeren
    container.prepend(currentSeasonElement);
  }

  // Ryd evt. gamle links
  otherSeasons.innerHTML = "";

  // Lav links til alle andre sæsoner
  seasons
    .filter(season => season.name !== currentSeason)
    .forEach(season => {
      const link = document.createElement("a");
      link.href = `${season.name}.html`;
      link.className = "season-link";
      link.textContent = season.name.charAt(0).toUpperCase() + season.name.slice(1);
      otherSeasons.appendChild(link);
    });
});




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




