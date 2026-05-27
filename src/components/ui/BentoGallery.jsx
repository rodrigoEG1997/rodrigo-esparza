import { motion } from 'framer-motion';
import styles from './BentoGallery.module.css';

export default function BentoGallery({ items }) {
  return (
    <div className={styles.gallery}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`${styles.gridItem} ${styles[item.span] || ''}`}
            variants={{
              hidden: { y: 30, scale: 0.93, opacity: 0 },
              visible: {
                y: 0, scale: 1, opacity: 1,
                transition: { type: 'spring', stiffness: 350, damping: 25, delay: index * 0.05 },
              },
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              className={styles.gridItemMedia}
              loading="lazy"
              decoding="async"
            />
            <motion.div
              className={styles.gridItemOverlay}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className={styles.gridItemGradient} />
              <div className={styles.gridItemContent}>
                <h3 className={styles.gridItemTitle}>{item.title}</h3>
                {item.desc && <p className={styles.gridItemDesc}>{item.desc}</p>}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
