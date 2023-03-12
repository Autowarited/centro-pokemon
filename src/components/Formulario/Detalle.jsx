import React, { useContext } from "react";
import { ContextoFormulario } from "../../context/ContextoFormulario";
import PropTypes  from "prop-types";

const Detalle = ({submit}) => {
  const [formData] = useContext(ContextoFormulario);

  /**
   * Maneja el envío de los datos del formulario al endpoint que se encarga de guardar los mismos en el servidor
   * @param {Event} e 
   */
  const submitHandler = (e) => {
    e.preventDefault();
    submit();
  }

  return (
    <div className="detalle-formulario">
      <div className="encabezado">
        <h3>Vista Previa de la Solicitud</h3>
      </div>
      <section className="datos-cliente">
        <h4>Datos del Entrenador</h4>
        <div className="fila">
          <p>Nombre: {formData.entrenador.nombre}</p>
          <p>Apellido: {formData.entrenador.apellido}</p>
          <p>Email: {formData.entrenador.email}</p>
        </div>
      </section>
      <section className="datos-cliente">
        <h4>Datos del Pokémon</h4>
        <div className="fila">
          <p>Nombre: {formData.pokemon.nombrePokemon}</p>
          <p>Tipo: {formData.pokemon.tipoPokemon}</p>
          <p>Elemento: {formData.pokemon.elementoPokemon}</p>
          <p>Especie: {formData.pokemon.especiePokemon}</p>
          <p>Altura: {formData.pokemon.alturaPokemon}</p>
          <p>Edad: {formData.pokemon.edadPokemon}</p>
        </div>
      </section>
      <button
        className="boton-enviar"
        type="submit"
        onClick={submitHandler}
      >
        Enviar Solicitud
      </button>
    </div>
  );
};

export default Detalle;

Detalle.propTypes = {
  submit: PropTypes.func,
}