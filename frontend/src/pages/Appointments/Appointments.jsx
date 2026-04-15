import { useState, useEffect } from 'react'
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm'
import {
  getAppointments,
  addAppointment,
  removeAppointment,
  updateAppointmentStatus,
} from '../../services/appointmentService'
import styles from './Appointments.module.css'

/**
 * Appointments – página de agendamento e listagem de consultas.
 *
 * Demonstra:
 *  - useState para a lista de agendamentos
 *  - useEffect para inicializar dados do localStorage
 *  - AppointmentForm (que usa useReducer internamente)
 *  - CRUD simulado com persistência no localStorage via appointmentService
 */

const STATUS_LABELS = {
  agendada:  { label: 'Agendada',  className: 'agendada'  },
  concluída: { label: 'Concluída', className: 'concluida' },
  cancelada: { label: 'Cancelada', className: 'cancelada' },
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter]             = useState('todos')
  const [search, setSearch]             = useState('')
  const [showForm, setShowForm]         = useState(false)

  useEffect(() => {
    setAppointments(getAppointments())
  }, [])

  function handleAdd(appointment) {
    setAppointments((prev) => addAppointment(appointment, prev))
    setShowForm(false)
  }

  function handleRemove(id) {
    if (window.confirm('Deseja cancelar este agendamento?')) {
      setAppointments((prev) => removeAppointment(id, prev))
    }
  }

  function handleStatusChange(id, newStatus) {
    setAppointments((prev) => updateAppointmentStatus(id, newStatus, prev))
  }

  const filtered = appointments
    .filter((a) => filter === 'todos' || a.status === filter)
    .filter((a) =>
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))

  const counts = {
    todos:     appointments.length,
    agendada:  appointments.filter((a) => a.status === 'agendada').length,
    concluída: appointments.filter((a) => a.status === 'concluída').length,
    cancelada: appointments.filter((a) => a.status === 'cancelada').length,
  }

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Agendamentos</h1>
          <p className={styles.subtitle}>{appointments.length} agendamento(s) no total</p>
        </div>
        <button
          className={styles.newBtn}
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? '✕ Fechar Formulário' : '+ Novo Agendamento'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={styles.formWrap}>
          <AppointmentForm onAdd={handleAdd} />
        </div>
      )}

      {/* Filters + Search */}
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          {Object.entries({
            todos:     'Todos',
            agendada:  'Agendadas',
            concluída: 'Concluídas',
            cancelada: 'Canceladas',
          }).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.tab} ${filter === key ? styles.activeTab : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className={styles.tabCount}>{counts[key]}</span>
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <IconSearch />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Nenhum agendamento encontrado.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Data / Hora</th>
                <th>Tipo</th>
                <th>Médico</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt) => (
                <AppointmentRow
                  key={appt.id}
                  appt={appt}
                  onRemove={handleRemove}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ── Row component ── */

function AppointmentRow({ appt, onRemove, onStatusChange }) {
  const info = STATUS_LABELS[appt.status] ?? STATUS_LABELS.agendada

  return (
    <tr className={styles.row}>
      <td className={styles.cellName}>
        <span className={styles.patientName}>{appt.patientName}</span>
        {appt.notes && (
          <span className={styles.notes} title={appt.notes}>📋 {appt.notes}</span>
        )}
      </td>
      <td className={styles.cellDate}>
        <span>{formatDate(appt.date)}</span>
        <span className={styles.time}>{appt.time}</span>
      </td>
      <td>{appt.type}</td>
      <td className={styles.cellDoctor}>{appt.doctor}</td>
      <td>
        <span className={`${styles.badge} ${styles[info.className]}`}>
          {info.label}
        </span>
      </td>
      <td>
        <div className={styles.actions}>
          {appt.status === 'agendada' && (
            <>
              <button
                className={`${styles.actionBtn} ${styles.concludeBtn}`}
                onClick={() => onStatusChange(appt.id, 'concluída')}
                title="Marcar como concluída"
              >
                ✓
              </button>
              <button
                className={`${styles.actionBtn} ${styles.cancelBtn}`}
                onClick={() => onRemove(appt.id)}
                title="Cancelar agendamento"
              >
                ✕
              </button>
            </>
          )}
          {appt.status !== 'agendada' && (
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={() => onRemove(appt.id)}
              title="Remover"
            >
              🗑
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

/* ── Helpers ── */

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
