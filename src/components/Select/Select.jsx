import React, { useContext, useState, useEffect } from "react";
import {ContextoFormulario} from '../../context/ContextoFormulario';
import PropTypes  from "prop-types";

const Select = ({name, label, isPokemon = false, optionList = [], disabled = false, isSuccess, reset }) => {
    const [formData, handleInputBlur] = useContext(ContextoFormulario);
    const [selectData, setSelectData] = useState(formData[name] || "");

     /**
     * Maneja los cambios en el imput
     * @param {Event} e 
     */
    const onChange = (e) => {
        setSelectData(e.target.value);
    }

    /**
     * Maneja la actualización del estado global al salir del input
     * @param {Event} e 
     */
    const onBlur = (e) => {
        e.preventDefault();
        handleInputBlur({type: isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR" , 
                        payload: {[name]: selectData}});
    }

    /**
     * @typedef {object} option
     * @property {string} name - nombre del tipo de pokemon
     * @property {string} url - endpoint a detalles del tipo de pokemon
     */
    /**
     * Mapper para transformar lista de objetos en nodos jsx, lista de opciones
     * @param {option} option 
     * @returns {JSX.Element}
     */
    const optionListMapper = (option) => (<option key={option.name} value={option.name}>{option.name}</option>);

    useEffect(() => {
        if(isSuccess){
            setSelectData("");
            reset();
        }
      }, [isSuccess, reset])

    return(
        <div className="input-contenedor">
            <label htmlFor={label}>{label}</label>
            <select value={selectData} onChange={onChange} disabled={disabled} onBlur={onBlur} id={name} name={name}>
                <option value="">Selecciona el tipo de tu pokemon</option>
                {optionList.map(optionListMapper)}
            </select>
        </div>
    )
}

export default Select;

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isPokemon: PropTypes.bool,
    optionList: PropTypes.array,
    disabled: PropTypes.bool, 
    reset: PropTypes.func
  }