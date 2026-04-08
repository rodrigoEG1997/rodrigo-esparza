import styles from './SectionTitle.module.css';

export default function SectionTitle({ label, title, subtitle, light = false, align = 'center' }) {
  return (
    <div className={`${styles.wrapper} ${light ? styles.light : ''} ${align === 'left' ? styles.left : ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
