import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import {useQuery, useMutation} from 'react-query';
import pokebola from "../../assets/pokebola.png";
import entrenador from "../../assets/entrenador.png";
import pikachu from "../../assets/pikachu.png";
import Input from "../Input/Input";
import Detalle from "./Detalle";
import Select from "../Select/Select";
import {getTypes} from '../../services/pokemonService';
import { ContextoFormulario } from "../../context/ContextoFormulario";
import { addPokemon } from "../../services/pokemonService";
import { initialState } from "../../context/FormularioReducer";
import InputEspecie from "../InputEspecie/InputEspecie";
import {ImSpinner3} from 'react-icons/im';


const Formulario = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [formData, dispatch] = useContext(ContextoFormulario);
  const {mutate, isSuccess, isError: error, isLoading: sendingData, reset} = useMutation(addPokemon, 
    {onSuccess:() => {
      dispatch({type: "ACTUALIZAR_POKEMON", payload: initialState.pokemon});
      dispatch({type: "ACTUALIZAR_ENTRENADOR", payload: initialState.entrenador});
      setShowMsg(true);
    }
    });
    const {data, isLoading, isError} = useQuery(["PokemonTypes"], getTypes, 
        {retry:false}
    );

  /**
   * Maneja el llamado al endpoint que se encarga de guardar los mismos en el servidor
   * @param {Event} e 
   */
  const submitHandler = () => {
    mutate(formData);
  }

  const closeMessageHandler = () => {
    setShowMsg(false);
  }
  

  return (
    <>
      {sendingData && 
      <div className="loader">
        <ImSpinner3 className="spinner"/>
      </div>}
      {showMsg && <div className="result-message">
        <div className="message-box">
          <p>{error ? "No se pudo guardar su turno, intente de nuevo más tarde": "Turno registrado correctamente, ¡Muchas gracias!"}</p>
          <button type="button" className="btn-close-message" onClick={closeMessageHandler}>Cerrar</button>
        </div>
      </div>}
      <header className="form-header">
        <div>
          <img src={pokebola} alt="pokebola" />
          <h2>Centro Pokemon de Ash</h2>
        </div>
        <Link className="volver" to="/">
          Home
        </Link>
      </header>
      <div className="formulario-ingreso">
        <h3>Solicitud de atención</h3>
        <p>
          Por favor, completa el formulario para que podamos atender a tu
          pokémon
        </p>
        <div className="cuerpo-formulario">
          {/*
           Si tan solo tuviesemos una manera de "encapsular" nuestros componentes
           para que puedan acceder al estado global.
          */}
          <div className="inputs">
            <div>
              <p className="nombre-seccion">
                <img src={entrenador} alt="entrenador" />
                <span>ENTRENADOR</span>
              </p>
              <Input name="nombre" label="Nombre" isSuccess={isSuccess} reset={reset}/>
              <Input name="apellido" label="Apellido" isSuccess={isSuccess} reset={reset}/>
              <Input name="email" label="Email" type="email" isSuccess={isSuccess} reset={reset}/>
            </div>
            <div>
              <p className="nombre-seccion">
                <img src={pikachu} alt="pikachu" />
                <span>POKEMON</span>
              </p>
              <Input name="nombrePokemon" label="Nombre" isPokemon={true} isSuccess={isSuccess} reset={reset}/>
              <Select name="tipoPokemon" label="Tipo" isPokemon={true} optionList={data} disabled={isLoading || isError} isSuccess={isSuccess} reset={reset}/>
              <Input name="elementoPokemon" label="Elemento" isPokemon={true} isSuccess={isSuccess} reset={reset}/>
              <InputEspecie name="especiePokemon" label="Especie" />
              <Input name="alturaPokemon" label="Altura" isPokemon={true} isSuccess={isSuccess} reset={reset}/>
              <Input name="edadPokemon" label="Edad" isPokemon={true} isSuccess={isSuccess} reset={reset}/>
            </div>
          </div>
          <Detalle submit={submitHandler} />
        </div>
      </div>
    </>
  );
};

export default Formulario;
