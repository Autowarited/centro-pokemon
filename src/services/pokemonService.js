const api = "http://localhost:4000";

export const getTypes = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/type/");
    const data = await response.json();

    return data.results;
}



export const addPokemon = async (payload) => {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };

    const response = await fetch(`${api}/pokemones`, config);

    return await response.json();

}

export const getSpecies = async(offset) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=20`);
    const data = await response.json();

    return data;

}

const pokemonService = {getTypes, addPokemon, getSpecies};

export default pokemonService;