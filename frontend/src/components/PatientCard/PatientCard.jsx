import styles from './PatientCard.module.css'

/**
 * PatientCard – exibe informações resumidas de um paciente.
 *
 * Props:
 *   patient – { id, name, email, phone, city, username }
 */
export default function PatientCard({ patient }) {
  const initials = patient.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  // Gera uma cor consistente baseada no id do paciente
  const hue = (patient.id * 47) % 360

  return (
    <div className={styles.card}>
      <div
        className={styles.avatar}
        style={{ background: `hsl(${hue}, 55%, 45%)` }}
      >
        {initials}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{patient.name}</h3>
        <span className={styles.id}>Paciente #{String(patient.id).padStart(4, '0')}</span>

        <div className={styles.details}>
          <span className={styles.detail}>
            <IconEmail />
            {patient.email}
          </span>
          <span className={styles.detail}>
            <IconPhone />
            {patient.phone}
          </span>
          <span className={styles.detail}>
            <IconCity />
            {patient.city}
          </span>
        </div>
      </div>
      <span className={styles.badge}>Ativo</span>
    </div>
  )
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.1 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.49 5.49l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconCity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
