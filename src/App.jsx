import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AdviceBox from './components/AdviceBox';

//esta seccion fue solucionada con ia copilot, ya que no sabia como hacer para que se guarden
// las tareas en el local storage y que se mantengan al recargar la pagina. Primero consulté
//a chatgpt con una imagen del error, donde me indicó que el error estaba en el archivo "App.jsx"
// me ubiqué en el "App.jsx" y le pedi a copilot que solucionara el error con el texto "solucionar error"


function App() {
  let [pacientes, setPacientes] = useState(() => {
    let arregloGuardado = [];
    const guardado = localStorage.getItem('pacientes');
    if (guardado) {
      arregloGuardado = JSON.parse(guardado);
    }
    return arregloGuardado;
  });

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const agregarPaciente = (datosPaciente) => {
    let nuevoPaciente = {
      id: Date.now(),
      atendido: 'No',
      ...datosPaciente,
    };
    let listaActualizada = [...pacientes, nuevoPaciente];
    setPacientes(listaActualizada);
  };

  const eliminarPaciente = (pacienteId) => {
    let listaActualizada = pacientes.filter((paciente) => paciente.id !== pacienteId);
    setPacientes(listaActualizada);
  };

  const cambiarEstadoPaciente = (pacienteId) => {
    let listaActualizada = pacientes.map((paciente) => {
      if (paciente.id === pacienteId) {
        let nuevoEstado = paciente.atendido === 'Sí' ? 'No' : 'Sí';
        return { ...paciente, atendido: nuevoEstado };
      }
      return paciente;
    });
    setPacientes(listaActualizada);
  };

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
      <TaskForm onAddTask={agregarPaciente} />
      <TaskList
        patients={pacientes}
        onDeletePatient={eliminarPaciente}
        onToggleStatus={cambiarEstadoPaciente}
      />
    </main>
  );
}
export default App;