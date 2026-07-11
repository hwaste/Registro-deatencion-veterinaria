import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AdviceBox from './components/AdviceBox';

function App() {
  const [pacientes, setPacientes] = useState(() => {
    let arregloGuardado = [];
    const guardado = localStorage.getItem('pacientes');
    if (guardado) {
      arregloGuardado = JSON.parse(guardado);
    }
    return arregloGuardado;
  });
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todo');
  const [criterioOrden, setCriterioOrden] = useState('ninguno');
  const [pacienteEditandoId, setPacienteEditandoId] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const agregarPaciente = (datosPaciente) => {
    const nuevoPaciente = {
      id: Date.now(),
      atendido: 'No',
      ...datosPaciente,
    };
    setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]);
  };

  const eliminarPaciente = (pacienteId) => {
    const listaActualizada = pacientes.filter((paciente) => paciente.id !== pacienteId);
    setPacientes(listaActualizada);
    if (pacienteEditandoId === pacienteId) {
      setPacienteEditandoId(null);
    }
  };

  const cambiarEstadoPaciente = (pacienteId) => {
    const listaActualizada = pacientes.map((paciente) => {
      if (paciente.id === pacienteId) {
        const nuevoEstado = paciente.atendido === 'Sí' ? 'No' : 'Sí';
        return { ...paciente, atendido: nuevoEstado };
      }
      return paciente;
    });
    setPacientes(listaActualizada);
  };

  const editarPaciente = (pacienteActualizado) => {
    const listaActualizada = pacientes.map((paciente) => {
      if (paciente.id === pacienteActualizado.id) {
        return pacienteActualizado;
      }
      return paciente;
    });
    setPacientes(listaActualizada);
    setPacienteEditandoId(null);
  };

  const iniciarEdicion = (pacienteId) => {
    setPacienteEditandoId(pacienteId);
  };

  const cancelarEdicion = () => {
    setPacienteEditandoId(null);
  };

  const pacienteEditando = pacientes.find((paciente) => paciente.id === pacienteEditandoId) ?? null;

  const manejarCambioBusqueda = (event) => {
    const valor = event.target.value;
    const valido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]*$/.test(valor);

    if (!valido) {
      setErrorBusqueda('Solo se permiten letras de la A a la Z y espacios.');
      return;
    }

    setErrorBusqueda('');
    setBusqueda(valor);
  };

  const terminoBusqueda = busqueda.trim().toLowerCase();
  const pacientesFiltrados = [...pacientes]
    .filter((paciente) => {
      if (!terminoBusqueda) {
        return true;
      }

      return (
        paciente.nombre?.toLowerCase().includes(terminoBusqueda) ||
        paciente.nombrePropietario?.toLowerCase().includes(terminoBusqueda) ||
        paciente.especie?.toLowerCase().includes(terminoBusqueda)
      );
    })
    .filter((paciente) => {
      if (filtroEstado === 'todo') {
        return true;
      }
      if (filtroEstado === 'atendidos') {
        return paciente.atendido === 'Sí';
      }
      return paciente.atendido !== 'Sí';
    });

  if (criterioOrden === 'az') {
    pacientesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
  }

  if (criterioOrden === 'ordenLlegada') {
    pacientesFiltrados.sort((a, b) => a.ordenLlegada - b.ordenLlegada);
  }

  const totalPacientes = pacientes.length;
  const totalAtendidos = pacientes.filter((paciente) => paciente.atendido === 'Sí').length;
  const totalPendientes = totalPacientes - totalAtendidos;

  return (
    <main className="container">
      <h1>Registro de Pacientes Veterinarios</h1>
      <p className="description">
        Ingrese los datos del paciente para llevar el control de atención.
      </p>
      <AdviceBox />
      <section className="summary">
        <p>Total de mascotas registradas: {totalPacientes}</p>
        <p>Atendidas: {totalAtendidos}</p>
        <p>Pendientes: {totalPendientes}</p>
      </section>

      <TaskForm
        onAddTask={agregarPaciente}
        editingPatient={pacienteEditando}
        onSavePatient={editarPaciente}
        onCancelEdit={cancelarEdicion}
      />

      <section className="card toolbar">
        <input
          type="text"
          placeholder="Buscar por nombre, propietario o especie"
          value={busqueda}
          onChange={manejarCambioBusqueda}
        />
        {errorBusqueda && <p className="error">{errorBusqueda}</p>}

        <div className="toolbar-controls">
          <select value={filtroEstado} onChange={(event) => setFiltroEstado(event.target.value)}>
            <option value="todo">Todos</option>
            <option value="atendidos">Solo atendidos</option>
            <option value="pendientes">Solo pendientes</option>
          </select>
          <select value={criterioOrden} onChange={(event) => setCriterioOrden(event.target.value)}>
            <option value="ninguno">Sin ordenar</option>
            <option value="az">Ordenar A-Z</option>
            <option value="ordenLlegada">Ordenar por orden de llegada</option>
          </select>
        </div>
      </section>

      <TaskList
        patients={pacientesFiltrados}
        onDeletePatient={eliminarPaciente}
        onToggleStatus={cambiarEstadoPaciente}
        onEditPatient={iniciarEdicion}
        editingPatientId={pacienteEditandoId}
      />
    </main>
  );
}

export default App;