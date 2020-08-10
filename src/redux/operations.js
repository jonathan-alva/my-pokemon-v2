
import {
    getPokemonByName,
    getPokemonSpeciesByName,
    getPokemonListInterval,
    getAbilityByName,
} from './../api';
import {
    getSelectedWildPokemonAction,
    getLoadMorePokemonAction,
    getDetailPokemonDataAction,
    getPokemonAction,
    catchPokemonAction,
    getAllPokemonOwnedAction,
    getDefaultSpeciesPokemonAction,
    getSelectedOwnedPokemonAction,
    releasePokemonOwnedAction,
    reloadPokemonLoadedListAction
} from './actions';
import get from 'lodash/get';

export const getSelectedWildPokemon = (name) => async dispatch => {
    try {
        const selected_wild_pokemon = await getPokemonByName(name);
        let pokemon_species_name = selected_wild_pokemon.species.name
        const selected_wild_pokemon_species = await getPokemonSpeciesByName(pokemon_species_name);
        const obj = {
            selected_wild_pokemon,
            selected_wild_pokemon_species
        }
        dispatch(getSelectedWildPokemonAction(obj));
    } catch (error) {
        console.log(error);
    }
}
export const getSelectedOwnedPokemon = (owned_id) => async dispatch => {
    try {
        dispatch(getSelectedOwnedPokemonAction(owned_id));
    }
    catch (error) {
        console.log(error);
    }
}
export const catchPokemon = (id, nickname) => async dispatch => {
    try {
        const pokemonData = await getPokemonByName(id)
        let pokemonSpeciesName = pokemonData.species.name
        const pokemonSpeciesData = await getPokemonSpeciesByName(pokemonSpeciesName)
        const obj = {
            pokemonData,
            pokemonSpeciesData,
            nickname
        }
        dispatch(catchPokemonAction(obj))
    } catch (error) {
        console.log(error);
    }
}
export const releasePokemonOwned = (owned_id) => async dispatch => {
    try {
        const obj = {
            owned_id
        }
        dispatch(releasePokemonOwnedAction(obj))
    } catch (error) {
        console.log(error);
    }
}
export const getPokemon = (name) => async dispatch => {
    try {
        const pokemonData = await getPokemonByName(name);
        let pokemonSpeciesName = pokemonData.species.name
        const pokemonSpeciesData = await getPokemonSpeciesByName(pokemonSpeciesName);
        const obj = {
            pokemonData,
            pokemonSpeciesData
        }
        dispatch(getPokemonAction(obj));
    } catch (error) {
        console.log(error);
    }
}
export const getDefaultSpeciesPokemon = (speciesName) => async dispatch =>{
    try {
        const pokemonSpeciesData = await getPokemonSpeciesByName(speciesName);
        const defaultPokemonSpecies = get(pokemonSpeciesData, 'varieties').find(data=>data.is_default === true)
        const pokemonData = await getPokemonByName(defaultPokemonSpecies.pokemon.name)
        const obj = {
            pokemonData,
            pokemonSpeciesData
        }
        dispatch(getDefaultSpeciesPokemonAction(obj))
    }
    catch (error) {
        console.log(error)
    }
}
export const getDetailPokemonData = (name) => async (dispatch) => {
    try {
        const pokemonData = await getPokemonByName(name);
        let pokemonSpeciesName = pokemonData.species.name;
        const pokemonSpeciesData = await getPokemonSpeciesByName(pokemonSpeciesName);
        let abilitiesData = []
        for (let i = 0; i < pokemonData.abilities.length; i++) {
            let abilityName = pokemonData.abilities[i].ability.name
            let abilityData = await getAbilityByName(abilityName)
            abilityName = abilityData.names.find(name => name.language.name === 'en').name
            let abilityDesc = abilityData.effect_entries.find(entry => entry.language.name === 'en').short_effect
            let ability = {
                abilityName: abilityName,
                abilityDesc: abilityDesc
            }
            abilitiesData.push(ability);
        }
        
        // Parse JSON to Data
        let evolutionChainUrl = pokemonSpeciesData.evolution_chain.url
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", evolutionChainUrl, false);
        Httpreq.send(null);
        let responseText = Httpreq.responseText;
        let json_obj = JSON.parse(responseText)
        let chainData = json_obj.chain
        const obj = {
            pokemonData,
            pokemonSpeciesData,
            abilitiesData,
            chainData
        }
        dispatch(getDetailPokemonDataAction(obj));
    } catch (error) {
        console.log(error);
    }
}

export const getLoadMorePokemon = (limit, offset) => async dispatch => {
    try {
        let list_data = await getPokemonListInterval(limit, offset);
        let arr_result = []
        for (let i = 0; i < list_data.length; i++) {
            let pokemon_name = list_data[i].name;
            let pokemon_data = await getPokemonByName(pokemon_name);
            let pokemon_species_name = pokemon_data.species.name;
            let pokemon_species_data = await getPokemonSpeciesByName(pokemon_species_name);
            let obj = {
                pokemon_data,
                pokemon_species_data
            }
            arr_result.push(obj)
        }
        dispatch(getLoadMorePokemonAction(arr_result))
    } catch (error) {
        console.log(error);
    }
}
export const reloadPokemonLoadedList = () => async dispatch => {
    try{
        dispatch(reloadPokemonLoadedListAction())
    }
    catch (error){
        console.log(error)
    }
}
export const getAllPokemonOwned = () => async dispatch => {
    try{
        dispatch(getAllPokemonOwnedAction())
    } catch (error) {
        console.log(error)
    }
}