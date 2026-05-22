import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.headerLines}>
          <div className={styles.lineFull}></div>
          <div className={styles.lineMed}></div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.lineFull}></div>
        <div className={styles.lineFull}></div>
        <div className={styles.lineShort}></div>
      </div>
    </div>
  )
}
