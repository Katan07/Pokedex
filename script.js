const pokemonname = document.querySelector(".pokemon-name");
const pokemonnumber = document.querySelector(".pokemon-number");
const pokemonimagem = document.querySelector(".pokemon-imagem");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const next = document.querySelector(".btn-next");
const prev = document.querySelector(".btn-prev");

let searchpokemon = 1;

const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};
const renderpokemon = async (pokemon) => {
    pokemonname.innerHTML = "Loading...";
    pokemonnumber.innerHTML = "";
    const data = await fetchpokemon(pokemon);
    if (data) {
        pokemonimagem.style.display = "block";
        pokemonname.innerHTML = data.name;
        pokemonnumber.innerHTML = data.id;
        pokemonimagem.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];
        input.value = "";
        searchpokemon = data.id;
    } else {
        pokemonimagem.style.display = "none";
        pokemonname.innerHTML = "Not found :c";
        pokemonnumber.innerHTML = "";
    }
};
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
});
prev.addEventListener("click", () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderpokemon(searchpokemon);
    }
});
next.addEventListener("click", () => {
    searchpokemon += 1;
    renderpokemon(searchpokemon);
});

renderpokemon(searchpokemon);
