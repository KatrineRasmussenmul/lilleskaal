//FORSIDE - nuværende sæson kommer øverst som det største billede//
function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <=5) return "foraar";
    else if  (month >= 6 && month <=8) return "sommer";
    else if  (month >= 9 && month <=11) return "efteraar";
    else return "vinter";
}

function updateCurrentSeason() {
    const season = getCurrentSeason();
    const banner = document.getElementById("current-season");

    const seasonImages = {
        foraar: "img/eksempel.jpg",
        sommer: "img/eksempel.jpg",
        efteraar: "img/eksempel.jpg",
        vinter: "img/eksempel.jpg"
    };

    const seasonText = {
        foraar: "Forår",
        sommer: "Sommer",
        efteraar: "Efterår",
        vinter: "Vinter"
    };

    /*Sætter akutelt sæsonbillede i banneret */
    banner.style.backgroundImage = `url('${seasonImages[season]}')`;
    banner.textContent = seasonText[season];

    /*Tilføj de andre sæsoner nedenunder*/
    const otherSeasons = document.getElementById("other-seasons");
    for (const key in seasonImages){
        if (key !==season) {
            const card = document.createElement("div");
            card.className = "season-card";
            card.style.backgroundImage = `url('${seasonImages[key]}')`;
            card.textContent = seasonText[key];
            otherSeasons.appendChild(card)
        }
    }
}

document.addEventListener("DOMContentLoaded", updateCurrentSeason);

//ALLE OPSKRIFTER - nuværende sæson kommer øverst på siden//
document.addEventListener("DOMContentLoaded", () => {
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "foraar";
    if (month >= 6 && month <= 8) return "sommer";
    if (month >= 9 && month <= 11) return "efteraar";
    return "vinter";
  }

  const currentSeason = getCurrentSeason();
  const containerId = `alle-${currentSeason}`;
  const seasonContainer = document.getElementById(containerId);

  // Flyt sæson-karussel i tablet og desktop-verison
  if (seasonContainer) {
    const introSection = document.querySelector(".introduktion"); // Den første container er introduktionen
    if (introSection && introSection.parentNode) {
      introSection.parentNode.insertBefore(seasonContainer, introSection.nextSibling);
    }
  }

    // Flyt sæson-karussel i mobil-verison
  const currentCarousel = document.getElementById(currentCarouselId);
  if (currentCarousel) {
    const body = document.body;
    body.insertBefore(currentCarousel, body.querySelector(".introduktion")); // Første karusel
  }



//KOMMENTARSPOR - på hver side af hver enkelte opskrift//
function addComment() {
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (name && comment) {
    const commentBox = document.createElement('div');
    commentBox.className = 'comment';
    commentBox.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;

    document.getElementById('comments').prepend(commentBox);

    // Clear inputs
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  } else {
    alert("Udfyld både navn og kommentar.");
  }
}





});

