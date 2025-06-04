// Afficher les cartes personnages : noms, images et statuts via l'API
const charactersOutput = document.getElementById("cards-container");
const apiUrl = "https://rickandmortyapi.com/api/character";

let characters = []; // Stockage global des personnages récupérés

// Sélections des éléments filtre et tri
const statusFilter = document.getElementById("status-filter");
const nameSort = document.getElementById("name-sort");

// Fonction pour afficher un tableau de personnages
function renderCharacters(array) {
    const cardsHtml = array.map(character => `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100">
        <img src="${character.image}" class="card-img-top" alt="${character.name}" />
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Statut : ${character.status}</p>
        </div>
      </div>
    </div>
  `).join("");

    charactersOutput.innerHTML = cardsHtml;
}

// Fonction pour afficher les images épisodes
function renderCharacters(array) {
    const cardsHtml = array.map(character => `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100">
        <img src="${character.image}" class="card-img-top" alt="${character.name}" />
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Statut : ${character.status}</p>
        </div>
      </div>
    </div>
  `).join("");

    charactersOutput.innerHTML = cardsHtml;
}

// Fonction qui applique filtre + tri puis affiche
function applyFiltersAndSort() {
    let filtered = characters;

    // Filtre par statut
    if (statusFilter.value !== "All") {
        filtered = filtered.filter(c => c.status === statusFilter.value);
    }

    // Tri par nom
    filtered.sort((a, b) => {
        if (nameSort.value === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    renderCharacters(filtered);
}

// Récupération API + initialisation
axios.get(apiUrl)
    .then(response => {
        characters = response.data.results;
        applyFiltersAndSort();
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
        charactersOutput.innerHTML = "<p>Impossible de charger les données.</p>";
    });

// Écouteurs sur filtres pour mise à jour dynamique
statusFilter.addEventListener("change", applyFiltersAndSort);
nameSort.addEventListener("change", applyFiltersAndSort);
