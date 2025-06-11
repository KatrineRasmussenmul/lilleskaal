
/*********************************************************
 * NAVIGATIONSBAR – viser den aktuelle sæson øverst
 *********************************************************/

// Venter til hele siden er færdig med at indlæse før funktonen kaldes
document.addEventListener("DOMContentLoaded", function () {
  // Finder elementet med klassen 'dropdown-content', som inderholder links til sæsonen
  const dropdown = document.querySelector(".dropdown-content");
  //Stopper, hvis dette ikke kan findes
  if (!dropdown) return;

  // Laver en liste med alle links (sæsoner) inde i boksen
  const seasonLinks = Array.from(dropdown.querySelectorAll("a"));

  // Finder den aktuelle måned (0 = januar, 11 = december)
  const currentMonth = new Date().getMonth();
  //Laver en variabel, som gemmer den aktuelle sæson (som tekst)
  let currentSeason;

  // Bestemmer hvilken sæson det er ud fra månedsnummeret
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
  //.trim() fjerner evt. mellemrum før/efter tekst, så der sammenlignes korrekt
  const matchingLink = seasonLinks.find(link => link.textContent.trim() === currentSeason);
  if (matchingLink) {
    // Flytter linket op i toppen af listen, så aktuelle sæson står øverst
    dropdown.prepend(matchingLink);
  }
});


/*********************************************************
 * FORSIDE - kun nuværende sæson, som bliver vist
 *********************************************************/
// Funktionen finder ud af, hvilken sæson vi er i lige nu
function getCurrentSeason() {
  //Den aktuelle måned hentes (starter ved 0 og der lægges 1 til. Dermed er januar 1)
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";   // marts, april eller maj (forår)
  if (month >= 6 && month <= 8) return "summer";   // juni, juli eller august (sommer)
  if (month >= 9 && month <= 11) return "autumn";  // september, oktober eller november (efterår)
  return "winter";                                 // decemberm januar eller februar (vinter) - hvis ingen af overstående gælder
}

// Funktionen viser kun aktuelle sæson på forsiden og skjuler de andre
function showCurrentSeason() {
  //bruger vores funktion til at finde aktuelle sæson
  const season = getCurrentSeason();
  //henter alle html-elementer med klassen 'seasion-container'
  const containers = document.querySelectorAll(".season-container");

  //Går igennem hver af sæson-containerne
  containers.forEach(div => {
    if (div.id === season) {
      //Hvis containerens ID matcher den aktuelle sæson, skal den vises
      div.classList.remove("d-none"); 
    } else {
      //Tilføjer klassen d-none til de andre, som skal skjules
      div.classList.add("d-none"); // Skjuler de andre
    }
  });
}

// Kører funktionen når siden er klar (alt html er indlæst)
document.addEventListener("DOMContentLoaded", showCurrentSeason);



/*********************************************************
 * ALLE OPSKRIFTER - SIDE – viser den aktuelle sæson øverst
 *********************************************************/
/*************************
 * Desktop & tablet
 *************************/

//Venter til hele html-siden er indlæst og klar
document.addEventListener("DOMContentLoaded", function () {
  //Laver et seasons-objekt, som holder styr på alle 4 sæson-sektioner
  //Hver del peger på den bestemte sæsons sektion i html'en
  const seasons = {
    vinter: document.getElementById("alle-vinter"),
    foraar: document.getElementById("alle-foraar"),
    sommer: document.getElementById("alle-sommer"),
    efteraar: document.getElementById("alle-efteraar")
  };

  // Funktion finder den aktuelle sæson
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "foraar"; // marts, april eller maj (forår)
    if (month >= 6 && month <= 8) return "sommer"; // juni, juli eller august (sommer)
    if (month >= 9 && month <= 11) return "efteraar"; // september, oktober eller november (efterår)
    return "vinter";                                 // decemberm januar eller februar (vinter) - hvis ingen af overstående gælder
  }

  //Rækkefølgen af sæsonerne definereres
  const seasonOrder = ["foraar", "sommer", "efteraar", "vinter"];
  //Finder ud af hvilken sæson, som er lige nu
  const currentSeason = getCurrentSeason();
  //Finder nummeret (index) for den akutelle sæson i rækkefølgen
  const currentIndex = seasonOrder.indexOf(currentSeason);

  //Laver en ny rækkefølge, så den aktuelle sæson kommer først
  const reorderedSeasons = [
    ...seasonOrder.slice(currentIndex), //Starter med aktuel sæson
    ...seasonOrder.slice(0, currentIndex) //Resten herefter
  ];

  //Finder introduktionsafsnittet, som ligger øverst på siden
  const introduktion = document.querySelector(".introduktion");

  // Flyt alle sektioner i ny rækkefølge under introduktion
  reorderedSeasons.reverse().forEach(season => {
    const section = seasons[season];
    if (section) {
      introduktion.insertAdjacentElement("afterend", section);
    }
  });
});



/*************************
 * Mobil / karusel – sorteret efter aktuel sæson
 *************************/

//Venter til hele html-siden er færdig med at indlæse
document.addEventListener("DOMContentLoaded", function () {
  // Finder kasserne med karuseller til hver sæson
  //Laver et objekt, som kaldes carousels for hver sæson. Peger på den i html ved col-12
  const carousels = {
    vinter: document.querySelector("#carousel-vinter")?.closest(".col-12"),
    foraar: document.querySelector("#carousel-foraar")?.closest(".col-12"),
    sommer: document.querySelector("#carousel-sommer")?.closest(".col-12"),
    efteraar: document.querySelector("#carousel-efteraar")?.closest(".col-12")
  };

  // Finder den aktuelle sæson lige nu
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "foraar";
    if (month >= 6 && month <= 8) return "sommer";
    if (month >= 9 && month <= 11) return "efteraar";
    return "vinter";
  }

  //Gemmer den aktuelle sæson i en variabel
  const currentSeason = getCurrentSeason();
  //Oprindelige rækkefølge af sæsoner
  const seasonOrder = ["foraar", "sommer", "efteraar", "vinter"];
  //Finder placeringen (index) for den aktuelle sæson i rækkefølgen
  const startIndex = seasonOrder.indexOf(currentSeason);

  // Ny rækkefølge: den aktuelle sæson først
  const reorderedSeasons = [
    ...seasonOrder.slice(startIndex), //starter med aktuelle sæson
    ...seasonOrder.slice(0, startIndex) //tilføjer resterende
  ];

  //Finder store container, som holder alle karusellerne
  const container = document.querySelector(".carousel-container");

  // Flyt karuseller i ny rækkefølge
  reorderedSeasons.slice().reverse().forEach(season => {
    const item = carousels[season]; //Finder karusellen for sæson
    if (item && container) { 
      //Flyder karusellen op forrest i containeren
      container.insertBefore(item, container.firstElementChild);
    }
  });
});



/*********************************************************
 * KOMMENTARSPOR - på alle sider m. hver enkelte opskrift
 *********************************************************/
//Funktionen kaldes f.eks. når man trykker på send
function addComment() {
  const nameInput = document.getElementById('nameInput'); // Finder inputfelt til navn
  const commentInput = document.getElementById('commentInput'); // Finder inputfelt til kommentar
  const commentsContainer = document.getElementById('commentsContainer'); // Finder container hvor alle kommentarer bliver vist

  //Gemmer indholde af navn og kommentar - fjerner mellemrum ved start og slut
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment) {
    alert('Skriv både navn og kommentar!'); // Viser advarsel, hvis noget mangler
    return;
  }

   // Laver en ny boks til kommentaren (med navn og kommentar)
  const commentEl = document.createElement('div');
  commentEl.classList.add('comment'); //Giver den klassen comment til styling

  const nameEl = document.createElement('div');
  nameEl.classList.add('name'); //Klasse til styling af navnet
  nameEl.textContent = name;  //Sætter navnet ind

  const textEl = document.createElement('div');
  textEl.classList.add('text'); //Klasse til styling af kommentaren
  textEl.textContent = comment; // Sætter kommentaren ind

  //Lægger navn og tekst ind i en samlede kommentarboks
  commentEl.appendChild(nameEl);
  commentEl.appendChild(textEl);

  // Lægger den nye kommentar i bunden af boksen
  commentsContainer.appendChild(commentEl);

  // Tømmer inputfelterne, så der kan skrives en ny kommentar
  nameInput.value = '';
  commentInput.value = '';

  // Ruller ned, så man kan se den nyeste kommentar
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}


/*********************************************************
 * E-MAIL
 *********************************************************/
//Sender en e-mail via EmailJS

//Finder kontaktfomularen ved dens id og tilføjer en submit-event
document.getElementById('kontaktForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Forhindrer siden i at reloade

  //Sender indhold via EmailJS
  //Service_uvrupo8: id for vores emailJS-service
  //template_mxgu4i: id for e-mail skabelon
  //this: henviser til selve formularen og dens indhold
  emailjs.sendForm('service_uvrupo8', 'template_mzxgu4i', this)
    .then(function() {
      document.getElementById('status').innerText = "Besked sendt!"; //Viser at det virker til brugeren
    }, function(error) {
      document.getElementById('status').innerText = "Noget gik galt. Prøv igen."; //Viser at der er skete en fejl til brugeren
      console.log(error);
    });
});


/*********************************************************
 * POP UP
 *********************************************************/

// gør så krydset lukker pop up med tilmeld e-magasin
document.querySelector('.close-popup').addEventListener('click', function() {
  document.querySelector('.emagasin-popup').style.display = 'none';
});