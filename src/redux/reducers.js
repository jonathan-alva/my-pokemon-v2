import ActionType from './actionTypes';
import fallbackAvatar from './../assets/images/placeholder.png';

const globalState = {
    selected_wild_pokemon: {},
    loaded_pokemon: [],
    selected_pokemon_name: "bulbasaur",
    count_pokemon_loaded: 0,
    owned_pokemon: [],
    count_owned_pokemon: 1,
    selected_owned_pokemon: {},
    owned_pokemon_list_with_count: []
}

export default function rootReducer(state = globalState, action) {
    switch (action.type) {
        case ActionType.GET_SELECTED_WILD_POKEMON:
            return {
                ...state,
                selected_wild_pokemon: {
                    pokemon_types: action.obj.selected_wild_pokemon.types,
                    // Bulbasaur, Ivysaur, Mew
                    pokemon_name: action.obj.selected_wild_pokemon_species.names.find(data => data.language.name === 'en').name,
                    pokemon_number: action.obj.selected_wild_pokemon_species.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number,
                    pokemon_genus: action.obj.selected_wild_pokemon_species.genera.find(data => data.language.name === 'en').genus,
                    pokemon_avatar: action.obj.selected_wild_pokemon.sprites.front_default || fallbackAvatar,
                    pokemon: action.obj.selected_wild_pokemon.name
                },
                // bulbasaur, ivysaur, mew
                selected_pokemon_name: action.obj.selected_wild_pokemon.name
            }

        case ActionType.GET_SELECTED_OWNED_POKEMON:
            let owned_id = action.obj
            if (owned_id === undefined) {
                return {
                    ...state
                }
            }
            else {
                let ownedList = state.owned_pokemon
                let selectedOwnedPokemon = ownedList.find(data => data.pokemon_owned_id === owned_id)
                return {
                    ...state,
                    selected_owned_pokemon: {
                        pokemon_types: selectedOwnedPokemon.pokemon_types,
                        pokemon_name: selectedOwnedPokemon.pokemon_name,
                        pokemon_number: selectedOwnedPokemon.pokemon_number,
                        pokemon_genus: selectedOwnedPokemon.pokemon_genus,
                        pokemon_avatar: selectedOwnedPokemon.pokemon_avatar,
                        pokemon_owned_id: selectedOwnedPokemon.pokemon_owned_id,
                        pokemon_nickname: selectedOwnedPokemon.pokemon_nickname
                    },
                }
            }
        case ActionType.LOAD_MORE_POKEMON:
            // console.log('here')
            const loaded_pokemon = action.payload
            let result = []
            let pokemon_owned_count = 0;
            for (let i = 0; i < loaded_pokemon.length; i++) {
                let pokemon_name_url = loaded_pokemon[i].pokemon_data.name;
                let pokemon_name_title = loaded_pokemon[i].pokemon_species_data.names.find(data => data.language.name === 'en').name;
                let pokemon_avatar = loaded_pokemon[i].pokemon_data.sprites.front_default || fallbackAvatar;
                let pokemon_types = loaded_pokemon[i].pokemon_data.types;
                let pokemon_id = loaded_pokemon[i].pokemon_data.id;
                let pokemon_number = loaded_pokemon[i].pokemon_species_data.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number;
                let obj = {
                    pokemon_name_url,
                    pokemon_name_title,
                    pokemon_avatar,
                    pokemon_types,
                    pokemon_number,
                    pokemon_id,
                    pokemon_owned_count
                }
                // console.log(pokemon_owned_count)
                result.push(obj)
            }
            state.loaded_pokemon = [...state.loaded_pokemon, result]
            state.count_pokemon_loaded = state.count_pokemon_loaded + loaded_pokemon.length
            // console.log(result)
            for (let i = 0; i < state.loaded_pokemon.length; i++) {
                for (let j = 0; j < state.loaded_pokemon[i].length; j++) {
                    // console.log(state.loaded_pokemon[i][j])
                    for (let k = 0; k < state.owned_pokemon_list_with_count.length; k++) {
                        // console.log(state.owned_pokemon_list_with_count[k])
                        // console.log(state.loaded_pokemon[i][j].pokemon_id)
                        if(state.owned_pokemon_list_with_count[k].pokemon_id === state.loaded_pokemon[i][j].pokemon_id){
                            // console.log(state.loaded_pokemon[i][j].pokemon_id)
                            state.loaded_pokemon[i][j].pokemon_owned_count = state.owned_pokemon_list_with_count[k].countPokemon
                        }
                    }
                }
            }
            return {
                ...state,
                // loaded_pokemon: [...state.loaded_pokemon, result],
                // count_pokemon_loaded: state.count_pokemon_loaded + loaded_pokemon.length
            }
        case ActionType.CATCH_POKEMON:
            const catchPokemon = action.obj
            let pokemon_name = catchPokemon.pokemonSpeciesData.names.find(data => data.language.name === 'en').name;
            let pokemon_avatar = catchPokemon.pokemonData.sprites.front_default || fallbackAvatar;
            let pokemon_types = catchPokemon.pokemonData.types;
            let pokemon_number = catchPokemon.pokemonSpeciesData.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number;
            let pokemon_nickname = catchPokemon.nickname;
            let pokemon_owned_id = state.count_owned_pokemon;
            let pokemon_genus = catchPokemon.pokemonSpeciesData.genera.find(data => data.language.name === 'en').genus;
            let pokemon_id = catchPokemon.pokemonData.id
            let pokemon = {
                pokemon_name,
                pokemon_avatar,
                pokemon_types,
                pokemon_number,
                pokemon_nickname,
                pokemon_owned_id,
                pokemon_genus,
                pokemon_id
            }
            let pokemonOwnedList = state.owned_pokemon
            let countPokemon = 0
            let isPokemonExist = false
            let currentPokemonCount = 0;
            for (let i = 0; i < pokemonOwnedList.length; i++) {
                if (pokemonOwnedList[i].pokemon_id === pokemon_id) {
                    console.log(pokemonOwnedList[i])
                    isPokemonExist = true
                    currentPokemonCount++;
                }
            }
            if(isPokemonExist == false){
                countPokemon++
            }
            else{
                countPokemon= currentPokemonCount+1
            }
            let ownedPokemonCount = {
                pokemon_id,
                countPokemon
            }
            let findData = state.owned_pokemon_list_with_count.find(data => data.pokemon_id === pokemon_id)
            if (findData === undefined) {
                state.owned_pokemon_list_with_count.push(ownedPokemonCount)
            }
            else {
                new Promise((resolve, reject) => {
                    {
                        let data = state.owned_pokemon_list_with_count;
                        let index = 0;
                        data.map(res => {
                            if (res.pokemon_id === pokemon_id) {
                                data.splice(index, 1);
                            }
                            else {
                                index += 1;
                            }
                        })
                        state.owned_pokemon_list_with_count.push(ownedPokemonCount)
                    }
                    resolve()
                })
            }
            return {
                ...state,
                owned_pokemon: [...state.owned_pokemon, pokemon],
                count_owned_pokemon: state.count_owned_pokemon + 1
            }
        case ActionType.GET_ALL_POKEMON_OWNED:
            return {
                ...state,
            }
        case ActionType.GET_DETAIL_POKEMON_DATA:
            const data = action.obj
            return {
                ...state,
                data: {
                    pokemonMoves: data.pokemonData.moves.map(moveData => moveData.move.name),
                    pokemonAbilities: data.abilitiesData,
                    pokemonStats: data.pokemonData.stats,
                    pokemonTypes: data.pokemonData.types,
                    pokemonHeight: data.pokemonData.height,
                    pokemonWeight: data.pokemonData.weight,
                    pokemonEvolutionData: data.chainData,
                    pokemonName: data.pokemonSpeciesData.names.find(data => data.language.name === 'en').name,
                    pokemonGenus: data.pokemonSpeciesData.genera.find(data => data.language.name === 'en').genus,
                    pokemonAvatar: data.pokemonData.sprites.front_default || fallbackAvatar,
                    pokemonNumber: data.pokemonSpeciesData.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number,
                }
            }
        case ActionType.GET_POKEMON:
            return {
                ...state,
                pokemon: {
                    types: action.obj.pokemonData.types,
                    // Bulbasaur, Ivysaur, Mew
                    name: action.obj.pokemonSpeciesData.names.find(data => data.language.name === 'en').name,
                    number: action.obj.pokemonSpeciesData.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number,
                    avatar: action.obj.pokemonData.sprites.front_default || fallbackAvatar,
                },
            }
        case ActionType.GET_DEFAULT_SPECIES_POKEMON:
            return {
                ...state,
                pokemon: {
                    types: action.obj.pokemonData.types,
                    // Bulbasaur, Ivysaur, Mew
                    name: action.obj.pokemonSpeciesData.names.find(data => data.language.name === 'en').name,
                    number: action.obj.pokemonSpeciesData.pokedex_numbers.find(data => data.pokedex.name === 'national').entry_number,
                    avatar: action.obj.pokemonData.sprites.front_default || fallbackAvatar,
                },
            }
        case ActionType.RELEASE_POKEMON_OWNED:
            // console.log(action.obj)
            let pokemmonOwnedId = action.obj.owned_id
            let ownedList = state.owned_pokemon
            let count = 0
            let isPokemonExistRelease = false
            let currentPokemonCountRelease = 0;
            let pokemonId = ownedList.find(pokemon => pokemon.pokemon_owned_id == action.obj.owned_id).pokemon_id
            for (let i = 0; i < ownedList.length; i++) {
                console.log(ownedList[i])
                if (ownedList[i].pokemon_id === pokemonId) {
                    isPokemonExistRelease = true
                    currentPokemonCountRelease++;
                }
            }
            count= currentPokemonCountRelease-1
            
            let ownedPokemon = {
                pokemon_id: pokemonId,
                countPokemon: count
            }
            console.log(ownedPokemon)
            let foundData = state.owned_pokemon_list_with_count.find(data => data.pokemon_id === pokemonId)
            if (foundData === undefined) {
                state.owned_pokemon_list_with_count.push(ownedPokemon)
            }
            else {
                new Promise((resolve, reject) => {
                    {
                        let data = state.owned_pokemon_list_with_count;
                        let index = 0;
                        console.log(data)
                        data.map(res => {
                            if (res.pokemon_id === pokemonId) {
                                console.log(res)
                                data.splice(index, 1);
                            }
                            else {
                                index += 1;
                            }
                        })
                        console.log(data)
                        state.owned_pokemon_list_with_count.push(ownedPokemon)
                    }
                    resolve()
                })
            }
            console.log(state.owned_pokemon_list_with_count)
            new Promise((resolve, reject) => {
                {
                    let data = state.owned_pokemon;
                    let index = 0;
                    data.map(res => {
                        if (res.pokemon_owned_id === pokemmonOwnedId) {
                            data.splice(index, 1);
                        }
                        else {
                            index += 1;
                        }
                    })
                }
                resolve()
            })
            state.selected_owned_pokemon = {}
            return {
                ...state
            }
        case ActionType.RELOAD_POKEMON_LOADED_LIST:
            for (let i = 0; i < state.loaded_pokemon.length; i++) {
                for (let j = 0; j < state.loaded_pokemon[i].length; j++) {
                    // console.log(state.loaded_pokemon[i][j])
                    for (let k = 0; k < state.owned_pokemon_list_with_count.length; k++) {
                        // console.log(state.owned_pokemon_list_with_count[k])
                        // console.log(state.loaded_pokemon[i][j].pokemon_id)
                        if(state.owned_pokemon_list_with_count[k].pokemon_id === state.loaded_pokemon[i][j].pokemon_id){
                            // console.log(state.loaded_pokemon[i][j].pokemon_id)
                            state.loaded_pokemon[i][j].pokemon_owned_count = state.owned_pokemon_list_with_count[k].countPokemon
                        }
                    }
                }
            }
            return {
                ...state
            }
        default:
            return state
    }
}

