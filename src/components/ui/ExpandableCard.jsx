import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ExpandableCard.module.css';

export function ExpandableCard({ title, src, description, children, className = '' }) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') setActive(false); };
    const onClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) setActive(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.backdrop}
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className={styles.expandedOverlay}>
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={styles.expandedCard}
            >
              {/* Image */}
              <motion.div layoutId={`image-${title}-${id}`}>
                <div className={styles.expandedImageWrapper}>
                  <img src={src} alt={title} className={styles.expandedImage} />
                </div>
              </motion.div>

              {/* Header */}
              <div className={styles.expandedContent}>
                <div className={styles.expandedHeader}>
                  <div>
                    <motion.p layoutId={`description-${description}-${id}`} className={styles.expandedDescription}>
                      {description}
                    </motion.p>
                    <motion.h3 layoutId={`title-${title}-${id}`} className={styles.expandedTitle}>
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className={styles.closeBtn}
                    onClick={() => setActive(false)}
                  >
                    <motion.div animate={{ rotate: 45 }} transition={{ duration: 0.35 }}>
                      <PlusIcon size={20} />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Body */}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.expandedBody}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed card */}
      <motion.div
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={`${styles.card} ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setActive(true)}
        aria-label={`Open ${title}`}
      >
        <motion.div layoutId={`image-${title}-${id}`}>
          <div className={styles.imageWrapper}>
            <img src={src} alt={title} className={styles.cardImage} />
          </div>
        </motion.div>
        <div className={styles.cardFooter}>
          <div>
            <motion.p layoutId={`description-${description}-${id}`} className={styles.cardDescription}>
              {description}
            </motion.p>
            <motion.h3 layoutId={`title-${title}-${id}`} className={styles.cardTitle}>
              {title}
            </motion.h3>
          </div>
          <motion.button
            aria-label="Open card"
            layoutId={`button-${title}-${id}`}
            className={styles.openBtn}
            onClick={(e) => { e.stopPropagation(); setActive(true); }}
          >
            <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.35 }}>
              <PlusIcon size={16} />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

function PlusIcon({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
