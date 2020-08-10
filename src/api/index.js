import { Pokedex } from 'pokeapi-js-wrapper';

export const API = new Pokedex({ cache: true, protocol: 'https' })

export const getPokemonTypesList = async () => {
  const { results } = await API.getTypesList({ limit: 10000 });
  return results;
}

export const getPokemonList = async () => {
  const { results } = await API.getPokemonsList({ limit: 10000 });
  return results;
}

export const getPokemonListInterval = async (limit, offset) => {
  const { results } = await API.getPokemonsList({ limit: limit, offset: offset });
  return results;
}

export const getPokemonByName = async (pokemonName) => {
  return await API.getPokemonByName(pokemonName);
}

export const getPokemonSpeciesByName = async (speciesName) => {
  return await API.getPokemonSpeciesByName(speciesName);
}

export const getPokemonEvolutionById = async (evolutionId) => {
  const { chain } = await API.getEvolutionChainById(evolutionId);
  return chain;
}

export const getAbilityByName = async (abilityName) => {
  return await API.getAbilityByName(abilityName)
}

export const getMoveByName = async (moveName) => {
  return await API.getMoveByName(moveName)
}