import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import MetricCard from '../../components/MetricCard/MetricCard'
import { fetchPatients } from '../../services/patientService'
import { getAppointments } from '../../services/appointmentService'
import styles from './Dashboard.module.css'

/**
 * Dashboard – painel principal com métricas resumidas.
 *
 * Demonstra:
 *  - useEffect para buscar dados ao montar
 *  - useState para controle de estado de carregamento e dados
 *  - useAuth (Context API) para personalização da saudação
 */
export default function Dashboard() {
  const { user } = useAuth()

  const [patients, setPatients]         = useState([])
  const [appointments, setAppointments] = useState([])
  const [loadingPat, setLoadingPat]     = useState(true)
  const [errorPat, setErrorPat]         = useState(null)

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch((err) => setErrorPat(err.message))
      .finally(() => setLoadingPat(false))

    setAppointments(getAppointments())
  }, [])

  const scheduled  = appointments.filter((a) => a.status === 'agendada').length
  const concluded  = appointments.filter((a) => a.status === 'concluída').length
  const cancelled  = appointments.filter((a) => a.status === 'cancelada').length

  // Próximos agendamentos (hoje em diante, ordenados por data/hora)
  const today = new Date().toISOString().split('T')[0]
  const upcoming = appointments
    .filter((a) => a.status === 'agendada' && a.date >= today)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .slice(0, 5)

  const greeting = getGreeting()

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>
            {greeting}, {user?.name}
          </h1>
          <p className={styles.subtitle}>
            Aqui está o resumo do portal CardioIA
          </p>
        </div>
        <span className={styles.date}>{formatDate(new Date())}</span>
      </div>

      {/* Metric cards */}
      <section className={styles.metrics}>
        <MetricCard
          icon={<IconPatients />}
          value={loadingPat ? '—' : patients.length}
          label="Pacientes cadastrados"
          color="blue"
          loading={loadingPat}
        />
        <MetricCard
          icon={<IconScheduled />}
          value={scheduled}
          label="Consultas agendadas"
          color="red"
        />
        <MetricCard
          icon={<IconDone />}
          value={concluded}
          label="Consultas concluídas"
          color="green"
        />
        <MetricCard
          icon={<IconTotal />}
          value={appointments.length}
          label="Total de agendamentos"
          color="orange"
        />
      </section>

      {errorPat && (
        <div className={styles.error}>
          Não foi possível carregar pacientes: {errorPat}
        </div>
      )}

      <div className={styles.columns}>
        {/* Próximos agendamentos */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Próximas Consultas</h2>
            <Link to="/appointments" className={styles.sectionLink}>
              Ver todos →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className={styles.empty}>Nenhuma consulta agendada.</p>
          ) : (
            <ul className={styles.appointmentList}>
              {upcoming.map((appt) => (
                <li key={appt.id} className={styles.appointmentItem}>
                  <div className={styles.apptDate}>
                    <span className={styles.apptDay}>{formatDay(appt.date)}</span>
                    <span className={styles.apptMonth}>{formatMonth(appt.date)}</span>
                  </div>
                  <div className={styles.apptInfo}>
                    <span className={styles.apptName}>{appt.patientName}</span>
                    <span className={styles.apptMeta}>
                      {appt.time} · {appt.type} · {appt.doctor}
                    </span>
                  </div>
                  <span className={`${styles.apptBadge} ${styles[appt.status]}`}>
                    {appt.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Status breakdown */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Status dos Agendamentos</h2>
          </div>

          <div className={styles.statusList}>
            <StatusBar label="Agendadas" count={scheduled} total={appointments.length} color="#3182ce" />
            <StatusBar label="Concluídas" count={concluded} total={appointments.length} color="#38a169" />
            <StatusBar label="Canceladas" count={cancelled} total={appointments.length} color="#e53e3e" />
          </div>

          <div className={styles.quickActions}>
            <h3 className={styles.qaTitle}>Ações rápidas</h3>
            <div className={styles.qaButtons}>
              <Link to="/patients" className={styles.qaBtn}>
                <IconPatients />
                Ver Pacientes
              </Link>
              <Link to="/appointments" className={styles.qaBtn}>
                <IconScheduled />
                Novo Agendamento
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function StatusBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className={styles.statusBar}>
      <div className={styles.statusBarMeta}>
        <span>{label}</span>
        <span>{count} ({pct}%)</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

/* ── Helpers ── */

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function formatDay(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit' })
}

function formatMonth(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' })
}

/* ── Icons ── */

function IconPatients() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconScheduled() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" />
    </svg>
  )
}

function IconDone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconTotal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
