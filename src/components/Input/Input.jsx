import React, { useContext, useEffect, useState } from "react";
import {ContextoFormulario} from '../../context/ContextoFormulario';
import PropTypes  from "prop-types";

const Input = ({ name, label, type = "text", isPokemon = false, isSuccess, reset }) => {
  const [formData, handleInputBlur] = useContext(ContextoFormulario);
  const [inputData, setInputData] = useState(formData[name] || "");
  /**
   * Maneja los cambios en el imput
   * @param {Event} e 
   */
  const onChange = (e) => {
    setInputData(e.target.value);
  };

  /**
   * Maneja la actualización del estado global al salir del input
   * @param {Event} e 
   */
  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur({type: isPokemon ? "ACTUALIZAR_POKEMON": "ACTUALIZAR_ENTRENADOR",
                    payload: {[name]: inputData}});
    
  };

  useEffect(() => {
    if(isSuccess){
      setInputData("");
      reset();
    }
  }, [isSuccess, reset])

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={inputData}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string, 
  isPokemon: PropTypes.bool,
  isSuccess: PropTypes.bool,
  reset: PropTypes.func
}