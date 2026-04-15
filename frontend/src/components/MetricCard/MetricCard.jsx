import styles from './MetricCard.module.css'

/**
 * MetricCard – exibe uma métrica com ícone, valor e rótulo.
 *
 * Props:
 *   icon      – elemento SVG ou string emoji
 *   value     – número ou string a exibir em destaque
 *   label     – descrição da métrica
 *   color     – variante de cor: 'blue' | 'red' | 'green' | 'orange'
 *   loading   – exibe skeleton quando true
 */
export default function MetricCard({ icon, value, label, color = 'blue', loading = false }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconWrap}>
        {icon}
      </div>
      <div className={styles.content}>
        {loading ? (
          <>
            <div className={styles.skeletonValue} />
            <div className={styles.skeletonLabel} />
          </>
        ) : (
          <>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </>
        )}
      </div>
    </div>
  )
}
