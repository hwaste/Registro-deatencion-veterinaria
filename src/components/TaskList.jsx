import TaskItem from './TaskItem';

function TaskList({ patients, onDeletePatient, onToggleStatus }) {
  if (patients.length === 0) {
    return (
      <section className="card">
        <h2>Listado de pacientes</h2>
        <p>No hay pacientes registrados.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Listado de pacientes</h2>
      <ul className="task-list">
        {patients.map((patient) => (
          <TaskItem
            key={patient.id}
            patient={patient}
            onDeletePatient={onDeletePatient}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
