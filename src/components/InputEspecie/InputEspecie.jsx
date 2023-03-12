import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import { getSpecies } from "../../services/pokemonService";
import PropTypes from 'prop-types';

const InputEspecie = ({name, label}) => {
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [offset, setOffset] = useState(0);
    const [formData, handleInputBlur] = useContext(ContextoFormulario);
    const {data: especies, refetch} = useQuery(["pokemonSpecies", offset], () => getSpecies(offset), {
      keepPreviousData: true,
    });
  
    const elegirEspecie = (e, nombreEspecie) => {
      e.preventDefault();
  
      handleInputBlur({type: "ACTUALIZAR_POKEMON", payload:{[name]: nombreEspecie}});
      setMostrarPopup(false);
    };
  
    const renderizarEspecies = () => (
      <>
        {especies?.results.map((especie) => (
          <button
            key={especie.name}
            className="botones-especie"
            onClick={(e) => elegirEspecie(e, especie.name)}
          >
            {especie.name}
          </button>
        ))}
      </>
    );

    return(
        <div className="input-contenedor">
      {mostrarPopup && (
        <div className="popup-especie">
          <h4>Seleccionar especie</h4>
          <div className="contenedor-especies">{renderizarEspecies()}</div>
          <div className="paginador">
            <button className="boton-anterior" disabled={especies?.previous === null} onClick={() => {setOffset(Math.max(0, offset - 20));
                                                                                                      refetch()}}>Anterior</button>
            <button className="boton-siguiente" disabled={especies?.next === null} onClick={() => {setOffset(offset + 20<especies.count?offset + 20:offset);
                                                                                                    refetch();}}>Siguiente</button>
          </div>
        </div>
      )}
      <p htmlFor={name}>{label}</p>
      <button
        className="boton-seleccionar-especies"
        onClick={() => setMostrarPopup(true)}
      >
        Seleccionar
      </button>
    </div>
    )
}

export default InputEspecie;

InputEspecie.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
