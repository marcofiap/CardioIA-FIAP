import { useEffect, useState } from 'react'
import PatientCard from '../../components/PatientCard/PatientCard'
import { fetchPatients } from '../../services/patientService'
import styles from './Patients.module.css'

/**
 * Patients – listagem de pacientes com busca e carregamento.
 *
 * Demonstra:
 *  - useEffect para consumo de API fake (JSONPlaceholder /users)
 *  - useState para dados, loading, erro e filtro de busca
 *  - Componentização com PatientCard
 */
export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Pacientes</h1>
          <p className={styles.subtitle}>
            {loading ? 'Carregando…' : `${patients.length} pacientes cadastrados`}
          </p>
        </div>

        <div className={styles.searchWrap}>
          <IconSearch className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nome, e-mail ou cidade…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.error}>
          <strong>Erro ao carregar pacientes:</strong> {error}
          <button className={styles.retryBtn} onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {/* Patient grid */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <IconSearch className={styles.emptyIcon} />
              <p>Nenhum paciente encontrado para "<strong>{search}</strong>".</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function IconSearch({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
