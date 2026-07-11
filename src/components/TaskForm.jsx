import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [edad, setEdad] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [ordenLlegada, setOrdenLlegada] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const validarTexto = (texto) => {
    return /^\S+(?: \S+)*$/.test(texto);
  };

  const mostrarErrorCampo = (campoId, mensaje) => {
    // No se usa alert() para validar. En cambio, mostramos el mensaje al lado del campo.
    const wrapper = document.getElementById(`${campoId}-wrapper`);
    if (!wrapper) return;

    let spanError = wrapper.querySelector('.error-text');
    if (!spanError) {
      spanError = document.createElement('span');
      spanError.classList.add('error-text');
      wrapper.appendChild(spanError);
    }

    spanError.textContent = mensaje;
    spanError.classList.add('visible');
  };

  const limpiarErrores = () => {
    const wrappers = document.querySelectorAll('.input-wrapper');
    wrappers.forEach((wrapper) => {
      const spanError = wrapper.querySelector('.error-text');
      if (spanError) {
        spanError.textContent = '';
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    limpiarErrores();
    setErrorGeneral('');

    const nombreTrim = nombreMascota.trim();
    const especieTrim = especie.trim();
    const nombrePropietarioTrim = nombrePropietario.trim();
    const edadNumero = Number(edad);
    const ordenLlegadaNumero = Number(ordenLlegada);

    let esValido = true;

    if (!nombreTrim) {
      mostrarErrorCampo('nombre', 'Debe ingresar el nombre de la mascota.');
      esValido = false;
    } else if (!validarTexto(nombreMascota) || nombreTrim.length < 3) {
      mostrarErrorCampo('nombre', 'No use espacios al inicio o al final y al menos 3 caracteres.');
      esValido = false;
    }

    if (!especieTrim) {
      mostrarErrorCampo('especie', 'Debe ingresar la especie.');
      esValido = false;
    } else if (especieTrim.length < 3) {
      mostrarErrorCampo('especie', 'La especie debe tener al menos 3 caracteres.');
      esValido = false;
    }

    if (!edad) {
      mostrarErrorCampo('edad', 'Debe ingresar la edad.');
      esValido = false;
    } else if (!Number.isInteger(edadNumero) || edadNumero <= 0) {
      mostrarErrorCampo('edad', 'La edad debe ser un número entero mayor a cero.');
      esValido = false;
    }

    if (!nombrePropietarioTrim) {
      mostrarErrorCampo('propietario', 'Debe ingresar el nombre del propietario.');
      esValido = false;
    } else if (!validarTexto(nombrePropietario) || nombrePropietarioTrim.length < 3) {
      mostrarErrorCampo('propietario', 'No use espacios al inicio o al final y al menos 3 caracteres.');
      esValido = false;
    }

    if (!ordenLlegada) {
      mostrarErrorCampo('orden', 'Debe ingresar la orden de llegada.');
      esValido = false;
    } else if (!Number.isInteger(ordenLlegadaNumero) || ordenLlegadaNumero < 1 || ordenLlegadaNumero > 99) {
      mostrarErrorCampo('orden', 'La orden debe ser un número entero entre 1 y 99.');
      esValido = false;
    }

    if (!esValido) {
      setErrorGeneral('Corrija los campos marcados.');
      return;
    }

    onAddTask({
      nombre: nombreTrim,
      especie: especieTrim,
      edad: edadNumero,
      nombrePropietario: nombrePropietarioTrim,
      ordenLlegada: ordenLlegadaNumero,
    });

    setNombreMascota('');
    setEspecie('');
    setEdad('');
    setNombrePropietario('');
    setOrdenLlegada('');
    setErrorGeneral('');
  };

  return (
    <section className="card">
      <h2>Ingreso de paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper" id="nombre-wrapper">
          <label htmlFor="nombre">Nombre de la mascota</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ejemplo: Firulais"
            value={nombreMascota}
            onChange={(event) => setNombreMascota(event.target.value)}
          />
        </div>

        <div className="input-wrapper" id="especie-wrapper">
          <label htmlFor="especie">Especie</label>
          <input
            id="especie"
            type="text"
            placeholder="Ejemplo: Perro, Gato"
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
          />
        </div>

        <div className="input-wrapper" id="edad-wrapper">
          <label htmlFor="edad">Edad</label>
          <input
            id="edad"
            type="number"
            min="1"
            placeholder="Ejemplo: 3"
            value={edad}
            onChange={(event) => setEdad(event.target.value)}
          />
        </div>

        <div className="input-wrapper" id="propietario-wrapper">
          <label htmlFor="propietario">Nombre del propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Ejemplo: Ana Pérez"
            value={nombrePropietario}
            onChange={(event) => setNombrePropietario(event.target.value)}
          />
        </div>

        <div className="input-wrapper" id="orden-wrapper">
          <label htmlFor="orden">Orden de llegada</label>
          <input
            id="orden"
            type="number"
            min="1"
            max="99"
            placeholder="1 - 99"
            value={ordenLlegada}
            onChange={(event) => setOrdenLlegada(event.target.value)}
          />
        </div>

        {errorGeneral && <p className="error">{errorGeneral}</p>}
        <button type="submit">Ingreso de paciente</button>
      </form>
    </section>
  );
}

export default TaskForm;
