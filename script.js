
/*********************************************************
 * NAVIGATIONSBAR – viser den aktuelle sæson øverst
 *********************************************************/


// Venter til hele siden er færdig med at indlæse
document.addEventListener("DOMContentLoaded", function () {
  // Finder boksen med sæson-links i menuen
  const dropdown = document.querySelector(".dropdown-content");
  //Stopper, hvis boksen ikke findes
  if (!dropdown) return;


  // Laver en liste med alle links (sæsoner) inde i boksen
  const seasonLinks = Array.from(dropdown.querySelectorAll("a"));


  // Finder den aktuelle måned (0 = januar, 11 = december)
  const currentMonth = new Date().getMonth();
  let currentSeason;


  // Bestemmer hvilken sæson det er ud fra måneden
  // Først tjekkes, hvilken måned det er lige nu – 0 = januar, 1 = februar, ..., 11 = december
  if (currentMonth >= 2 && currentMonth <= 4) {
    // Hvis måneden er marts (2), april (3) eller maj (4), så er det forår
    currentSeason = "Forår";
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    // Hvis måneden er juni (5), juli (6) eller august (7), så er det sommer
    currentSeason = "Sommer";
  } else if (currentMonth >= 8 && currentMonth <= 10) {
    // Hvis måneden er september (8), oktober (9) eller november (10), så er det efterår
    currentSeason = "Efterår";
  } else {
    // Hvis ingen af ovenstående passer, så er det vinter (december, januar eller februar)
    currentSeason = "Vinter";
  }


  // Finder det link, der passer til den aktuelle sæson
  const matchingLink = seasonLinks.find(link => link.textContent.trim() === currentSeason);
  if (matchingLink) {
    // Flytter linket op i toppen af listen
    dropdown.prepend(matchingLink);
  }
});








/*********************************************************
 * FORSIDE - kun nuværende sæson, som bliver vist
 *********************************************************/
// Finder ud af hvilken sæson det er
function getCurrentSeason() {
  //Måneder starter ved 0, så +1
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";   // marts-maj
  if (month >= 6 && month <= 8) return "summer";   // juni-august
  if (month >= 9 && month <= 11) return "autumn";  // september-november
  return "winter";                                 // december-februar
}


// Viser kun den rigtige sæson og skjuler de andre
function showCurrentSeason() {
  const season = getCurrentSeason();
  const containers = document.querySelectorAll(".season-container");


  containers.forEach(div => {
    if (div.id === season) {
      div.classList.remove("d-none"); // Viser den aktuelle sæson
    } else {
      div.classList.add("d-none"); // Skjuler de andre
    }
  });
}


// Kører funktionen når siden er klar
document.addEventListener("DOMContentLoaded", showCurrentSeason);








/*********************************************************
 * ALLE OPSKRIFTER - SIDE – viser den aktuelle sæson øverst
 *********************************************************/
/*************************
 * Desktop & tablet
 *************************/
document.addEventListener("DOMContentLoaded", function () {
  // Find ID'er på sæson-sektioner
  // Finder alle sektioner med opskrifter til hver sæson
  const seasons = {
    vinter: document.getElementById("alle-vinter"),
    foraar: document.getElementById("alle-foraar"),
    sommer: document.getElementById("alle-sommer"),
    efteraar: document.getElementById("alle-efteraar")
  };


   // Finder den aktuelle sæson
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
    // Finder den tekst, der står øverst (introduktion
    const introduktion = document.querySelector(".introduktion");


    // Flytter den aktuelle sæsons opskrifter lige under introduktionen
    introduktion.insertAdjacentElement("afterend", seasonElement);
  }
});




/*************************
 * Mobil / karusel
 *************************/
document.addEventListener("DOMContentLoaded", function () {
   // Finder kasserne med karuseller til hver sæson
  const carousels = {
    vinter: document.querySelector("#carousel-vinter")?.closest(".col-12"),
    foraar: document.querySelector("#carousel-foraar")?.closest(".col-12"),
    sommer: document.querySelector("#carousel-sommer")?.closest(".col-12"),
    efteraar: document.querySelector("#carousel-efteraar")?.closest(".col-12")
  };


  // Finder den aktuelle sæson
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
    // Flytter karusellen med den aktuelle sæson øverst i containeren
    const container = document.querySelector("carousel-container");
    container.insertBefore(currentCarousel, container.firstElementChild);
  }
});






/*********************************************************
 * KOMMENTARSPOR - på alle sider m. hver enkelte opskrift
 *********************************************************/
function addComment() {
  const nameInput = document.getElementById('nameInput'); // Felt til navn
  const commentInput = document.getElementById('commentInput'); // Felt til kommentar
  const commentsContainer = document.getElementById('commentsContainer'); // Boksen med kommentarer


  const name = nameInput.value.trim(); // Fjerner mellemrum før og efter
  const comment = commentInput.value.trim();


  if (!name || !comment) {
    alert('Skriv både navn og kommentar!'); // Viser advarsel, hvis noget mangler
    return;
  }


   // Laver en ny boks til kommentaren
  const commentEl = document.createElement('div');
  commentEl.classList.add('comment');


  const nameEl = document.createElement('div');
  nameEl.classList.add('name');
  nameEl.textContent = name;  //Sætter navnet ind


  const textEl = document.createElement('div');
  textEl.classList.add('text');
  textEl.textContent = comment; // Sætter kommentaren ind


  commentEl.appendChild(nameEl);
  commentEl.appendChild(textEl);


  // Lægger den nye kommentar i bunden af boksen
  commentsContainer.appendChild(commentEl);


  // Tømmer inputfelterne
  nameInput.value = '';
  commentInput.value = '';


  // Ruller ned, så man kan se den nyeste kommentar
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}


document.getElementById('kontaktForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Forhindrer siden i at reloade


  emailjs.sendForm('service_uvrupo8', 'template_mzxgu4i', this)
    .then(function() {
      document.getElementById('status').innerText = "Besked sendt!";
    }, function(error) {
      document.getElementById('status').innerText = "Noget gik galt. Prøv igen.";
      console.log(error);
    });
});







