// =========================
// CONFIGURATION API
// =========================

const API_URL =const API_URL =
    "https://script.google.com/macros/s/AKfycbwlLwspbIyJ5PQRZ_UWtPsv95q3-wMTYSCimNpCqAgg6IK6kNqs0frndCmDv2BiigAf/exec";

// Charger automatiquement les événements
document.addEventListener("DOMContentLoaded", () => {
    chargerEvenements();
});

async function chargerEvenements() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erreur API");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("Erreur dans les données");
            
        }

        afficherEvenements(data.events);

    } catch (error) {

        console.error(error);

        const liste = document.getElementById("events-list");

        if (liste) {
            liste.innerHTML =
                "<p>Impossible de charger les événements.</p>";
        }
    }
}
// =========================
// VOIR LES ÉVÉNEMENTS
// =========================

function voirEvenements() {
    const section = document.getElementById("events-section");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// AFFICHER LES ÉVÉNEMENTS
// =========================

function afficherEvenements(events) {

    if (!events || events.length === 0) {

        alert("Aucun événement disponible.");

        return;
    }


    let section = document.getElementById("events-section");


    // Si la section n'existe pas encore, on la crée.
    if (!section) {

        section = document.createElement("section");

        section.id = "events-section";

        section.innerHTML = `
            <h2>Mes événements</h2>
            <p class="events-description">
                Retrouvez vos photos par événement.
            </p>

            <div id="events-list"></div>
        `;

        document.querySelector("main").appendChild(section);
    }


    const eventsList = document.getElementById("events-list");

    eventsList.innerHTML = "";


    events.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
    ${
        event.cover
        ? `<img src="${event.cover.url}" alt="${event.name}" class="event-cover">`
        : `<div class="event-cover-placeholder">Aucune photo</div>`
    }

    <h3>${event.name}</h3>

    <button onclick="ouvrirEvenement('${event.id}')">
        Voir les photos
    </button>
`;
        `;

        eventsList.appendChild(card);

    });


    section.scrollIntoView({
        behavior: "smooth"
    });

}


// =========================
// OUVRIR UN ÉVÉNEMENT
// =========================

function ouvrirEvenement(folderId) {

    const driveUrl =
        "https://drive.google.com/drive/folders/" + folderId;

    window.open(driveUrl, "_blank");

}


// =========================
// CLIC SUR LES PHOTOS
// =========================

const photos = document.querySelectorAll(".photo-grid img");

photos.forEach((photo) => {

    photo.addEventListener("click", () => {

        const imageUrl = photo.src;

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        overlay.style.padding = "20px";
        overlay.style.cursor = "pointer";

        const image = document.createElement("img");

        image.src = imageUrl;

        image.style.maxWidth = "95%";
        image.style.maxHeight = "90%";
        image.style.objectFit = "contain";
        image.style.borderRadius = "10px";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });

    });

});
