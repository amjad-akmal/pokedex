const pokeContainer = document.querySelector(".poke-container");
const pokemonCount = 150;
const colors = {
  fire: "#ffd8a8",
  grass: "#b2f2bb",
  electric: "#bac8ff",
  water: "#99e9f2",
  ground: "#d4a373",
  rocK: "#ced4da",
  fairy: "#c0eb75",
  poison: "#98d785",
  bug: "#f8d5b9",
  dragon: "#ffe066",
  psychic: "#ffa8a8",
  flying: "#d0bfff",
  fighting: "#e6e0d4",
  normal: "#f5f5f5",
};

const mainTypes = Object.keys(colors);

async function fetchPokemons() {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  createPokemonCard(data);
}

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const nameOfPokemon = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const id = pokemon.id.toString().padStart(3, "0");

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);

  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHtml = `<div class="img-container">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
    alt=""
  />
</div>
<div class="info">
  <span class="number">#${id}</span>
  <h3 class="name">${nameOfPokemon}</h3>
  <small class="type:type">type: <span>${type}</span></small>
</div>`;

  pokemonEl.innerHTML = pokemonInnerHtml;

  pokeContainer.appendChild(pokemonEl);
}

fetchPokemons();
