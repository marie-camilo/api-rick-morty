// Liste des épisodes sélectionnés avec leurs IDs
const topEpisodes = [
    { id: 28, title: "The Ricklantis Mixup", season: 3, episode: 7, image: "./img/s3e7.png"},
    { id: 22, title: "The Rickshank Rickdemption", season: 3, episode: 1, image: "./img/S3e1_delicious_sauce.webp"},
    { id: 36, title: "The Vat of Acid Episode", season: 4, episode: 8, image: "./img/s4e8.webp" },
    { id: 27, title: "Pickle Rick", season: 3, episode: 3, image: "./img/S3e7_bad_math.webp" },
    { id: 17, title: "Total Rickall", season: 2, episode: 4, image: "./img/S2e4_badass_family_close.webp" }
];

// Sélection de l'élément du carrousel
const carouselContent = document.getElementById('carousel-content');

// Créer une slide du carrousel
function createSlide(episodeData, characterImage, isActive) {
    const slide = document.createElement('div');
    slide.className = `carousel-item${isActive ? ' active' : ''}`;
    slide.innerHTML = `
    <img src="${characterImage}" class="d-block w-100" alt="${episodeData.title}">
    <div class="carousel-caption d-none d-md-block">
      <h5>${episodeData.title}</h5>
      <p>Saison ${episodeData.season}, Épisode ${episodeData.episode}</p>
    </div>
  `;
    return slide;
}

// Init le carrousel
async function initCarousel() {
    for (let i = 0; i < topEpisodes.length; i++) {
        const ep = topEpisodes[i];
        try {
            // Récupération des données de l'épisode
            const episodeResponse = await fetch(`https://rickandmortyapi.com/api/episode/${ep.id}`);
            const episodeData = await episodeResponse.json();

            // Récupération des données du premier personnage de l'épisode
            const characterUrl = episodeData.characters[0];
            const characterResponse = await fetch(characterUrl);
            const characterData = await characterResponse.json();

            // Création et ajout de la slide au carrousel
            const slide = createSlide(ep, ep.image, i === 0);
            carouselContent.appendChild(slide);
        } catch (error) {
            console.error(`Erreur lors du chargement de l'épisode ${ep.title}:`, error);
        }
    }
}

// Init du carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', initCarousel);
