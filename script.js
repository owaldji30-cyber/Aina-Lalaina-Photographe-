// =========================
// CONFIGURATION API
// =========================

const API_URL =
    "https://script.google.com/macros/s/AKfycby7dzpwv_EOrk8Ip9m3JoV1c1aL1LMg9DzU-pFnjPS6RtWVTIlAuY3rOV-_I-o5wGU/exec";


// =========================
// VOIR LES ÉVÉNEMENTS
// =========================

async function voirEvenements() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erreur lors de la connexion à l'API.");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("L'API a retourné une erreur.");
        }

        afficherEvenements(data.events);

    } catch (error) {

        console.error(error);

        alert(
            "Impossible de charger les événements pour le moment."
        );

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
            <h3>${event.name}</h3>
            <button onclick="ouvrirEvenement('${event.id}')">
                Voir les photos
            </button>
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
