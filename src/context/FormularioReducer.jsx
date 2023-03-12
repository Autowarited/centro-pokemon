/**
 * @typedef {object} entrenador
 * @property {string} nombre - nombre del entrenador
 * @property {string} apellido - apellido del entrenador
 * @property {string} email - apellido del entrenador
 */
/**
 * @typedef {object} pokemon
 * @property {string} nombrePokemon - nombre del pokemon
 * @property {string} tipoPokemon - tipo de pokemon
 * @property {string} elementoPokemon - elemento principal del pokemon
 * @property {string} especiePokemon - especie del pokemon
 * @property {string | number} alturaPokemon - altura del pokemon
 * @property {string | number} edadPokemon - edad del pokemon
 */
/**
 * @typedef {object} state
 * @property {entrenador} entrenador - objeto de tipo entrenador
 * @property {pokemon} pokemon - objeto de tipo pokemon
 */
/**
 * @type {state}
 */
export const initialState = {
    entrenador:{
        nombre: "",
        apellido: "",
        email: ""
    },
    pokemon: {
        nombrePokemon: "",
        tipoPokemon:"",
        elementoPokemon:"",
        especiePokemon: "",
        alturaPokemon:"",
        edadPokemon:""
    }
}

/**
 * @typedef {object} action
 * @property {string} type - indica el tipo de acción a realizar
 * @property {object} payload - información enviada para completar la acción
 */
/**
 * 
 * @param {state} state 
 * @param {action} action 
 * @returns {state | undefined} updatedState - retorna el estado modificado 
 */
export const FormularioReducer = (state, action) => {
    switch(action.type){
        case "ACTUALIZAR_ENTRENADOR":
            return {...state, entrenador: {...state.entrenador, ...action.payload}}
            break;
        case "ACTUALIZAR_POKEMON":
            return {...state, pokemon: {...state.pokemon, ...action.payload}}
            break;
        default:
            break;
    }
}