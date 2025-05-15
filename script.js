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
        foraar: "eksempel.jpg",
        sommer: "eksempel.jpg",
        efteraar: "eksempel.jpg",
        vinter: "eksempel.jpg"
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