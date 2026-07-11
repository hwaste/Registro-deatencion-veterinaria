function TaskItem({ patient, onDeletePatient, onToggleStatus }) {
  return (
    <li className="task-item">
      <div className="patient-details">
        <strong>{patient.nombre}</strong>
        <p>Especie: {patient.especie}</p>
        <p>Edad: {patient.edad}</p>
        <p>Orden de llegada: {patient.ordenLlegada}</p>
        <p>Atendido: {patient.atendido}</p>
      </div>
      <div className="task-actions">
        <button
          type="button"
          className={patient.atendido === 'Sí' ? 'status-button attended' : 'status-button pending'}
          onClick={() => onToggleStatus(patient.id)}
        >
          {patient.atendido === 'Sí' ? 'Atendido' : 'Atender'}
        </button>
        <button className="delete" onClick={() => onDeletePatient(patient.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
