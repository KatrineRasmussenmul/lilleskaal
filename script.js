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

    banner.style.backgroundImage = `url('${seasonImages[season]}')`;
    banner.textContent = seasonText[season];
}

document.addEventListener("DOMContentLoaded", updateCurrentSeason);