import { createContext, useReducer } from "react";
import { initialState, FormularioReducer } from "./FormularioReducer";

export const ContextoFormulario = createContext();

export const ContextoProvider = ({children}) => {
    const [store, dispatch] = useReducer(FormularioReducer, initialState);

    return(
        <ContextoFormulario.Provider value={[store, dispatch]}>
            {children}
        </ContextoFormulario.Provider>
    )
}


