import ActionType from './actionTypes'
export const getSelectedWildPokemonAction = (obj) => ({
    type: ActionType.GET_SELECTED_WILD_POKEMON,
    obj
})
export const getLoadMorePokemonAction = (payload) => ({
    type: ActionType.LOAD_MORE_POKEMON,
    payload
})
export const getDetailPokemonDataAction = (obj) =>({
    type: ActionType.GET_DETAIL_POKEMON_DATA,
    obj
})
export const getPokemonAction = (obj) => ({
    type: ActionType.GET_POKEMON,
    obj
})
export const catchPokemonAction = (obj) => ({
    type: ActionType.CATCH_POKEMON,
    obj
})
export const getAllPokemonOwnedAction = () => ({
    type: ActionType.GET_ALL_POKEMON_OWNED
})
export const getDefaultSpeciesPokemonAction = (obj) => ({
    type: ActionType.GET_DEFAULT_SPECIES_POKEMON,
    obj
})
export const getSelectedOwnedPokemonAction = (obj) => ({
    type: ActionType.GET_SELECTED_OWNED_POKEMON,
    obj
})
export const releasePokemonOwnedAction = (obj) => ({
    type: ActionType.RELEASE_POKEMON_OWNED,
    obj
})
export const reloadPokemonLoadedListAction = () => ({
    type: ActionType.RELOAD_POKEMON_LOADED_LIST
})