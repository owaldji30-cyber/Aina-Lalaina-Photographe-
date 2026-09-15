// =========================
// BOUTON « VOIR LES ÉVÉNEMENTS »
// =========================

function voirEvenements() {
    alert("La galerie des événements sera disponible dans la prochaine étape.");
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
