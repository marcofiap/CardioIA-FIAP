import { useReducer } from 'react'
import styles from './AppointmentForm.module.css'

/**
 * AppointmentForm – formulário de agendamento de consultas.
 *
 * Utiliza useReducer para gerenciar o estado do formulário,
 * demonstrando uma alternativa mais robusta ao useState para
 * formulários com múltiplos campos interdependentes.
 *
 * Props:
 *   onAdd(appointment) – callback chamado com o novo agendamento
 */

const initialState = {
  patientName: '',
  date: '',
  time: '',
  type: 'Consulta',
  doctor: '',
  notes: '',
}

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const APPOINTMENT_TYPES = ['Consulta', 'Retorno', 'Exame', 'Eletrocardiograma', 'Ecocardiograma']
const DOCTORS = ['Dr. Admin', 'Dr. João Silva', 'Dra. Ana Costa', 'Dr. Pedro Lima']

export default function AppointmentForm({ onAdd }) {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [error, setError] = [null, () => {}]  // simplificado; validação inline

  function setField(field, value) {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!state.patientName.trim() || !state.date || !state.time || !state.doctor) {
      return
    }

    const appointment = {
      id: Date.now(),
      ...state,
      status: 'agendada',
      createdAt: new Date().toISOString(),
    }

    onAdd(appointment)
    dispatch({ type: 'RESET' })
  }

  // Data mínima = hoje
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>Novo Agendamento</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="patientName">
            Nome do Paciente <span className={styles.required}>*</span>
          </label>
          <input
            id="patientName"
            type="text"
            className={styles.input}
            placeholder="Ex.: Maria da Silva"
            value={state.patientName}
            onChange={(e) => setField('patientName', e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            Tipo de Consulta <span className={styles.required}>*</span>
          </label>
          <select
            id="type"
            className={styles.select}
            value={state.type}
            onChange={(e) => setField('type', e.target.value)}
          >
            {APPOINTMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="doctor">
            Médico Responsável <span className={styles.required}>*</span>
          </label>
          <select
            id="doctor"
            className={styles.select}
            value={state.doctor}
            onChange={(e) => setField('doctor', e.target.value)}
            required
          >
            <option value="">Selecione…</option>
            {DOCTORS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Data <span className={styles.required}>*</span>
          </label>
          <input
            id="date"
            type="date"
            className={styles.input}
            min={today}
            value={state.date}
            onChange={(e) => setField('date', e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">
            Horário <span className={styles.required}>*</span>
          </label>
          <input
            id="time"
            type="time"
            className={styles.input}
            value={state.time}
            onChange={(e) => setField('time', e.target.value)}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="notes">
            Observações
          </label>
          <textarea
            id="notes"
            className={styles.textarea}
            placeholder="Informações adicionais sobre a consulta…"
            rows={3}
            value={state.notes}
            onChange={(e) => setField('notes', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Limpar
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!state.patientName.trim() || !state.date || !state.time || !state.doctor}
        >
          Agendar Consulta
        </button>
      </div>
    </form>
  )
}
