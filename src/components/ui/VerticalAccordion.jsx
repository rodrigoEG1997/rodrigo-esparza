import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './VerticalAccordion.module.css';

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const panelVariants = {
  open:   { width: '100%', height: '100%' },
  closed: { width: '0%',   height: '100%' },
};

const panelVariantsSm = {
  open:   { width: '100%', height: '220px' },
  closed: { width: '100%', height: '0px'   },
};

const descVariants = {
  open:   { opacity: 1, y: '0%', transition: { delay: 0.12 } },
  closed: { opacity: 0, y: '100%' },
};

function Panel({ open, setOpen, id, Icon, title, imgSrc, description }) {
  const width = useWindowWidth();
  const isOpen = open === id;

  return (
    <>
      <button
        className={`${styles.tab} ${isOpen ? styles.tabActive : ''}`}
        onClick={() => setOpen(id)}
        aria-expanded={isOpen}
      >
        <span className={styles.labelDesktop} style={{ writingMode: 'vertical-lr' }}>
          {title}
        </span>
        <span className={styles.labelMobile}>{title}</span>
        <div className={styles.icon}>
          <Icon size={14} />
        </div>
        <span className={styles.diamond} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            className={styles.panel}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <motion.div
              variants={descVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={styles.desc}
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function VerticalAccordion({ items }) {
  const [open, setOpen] = useState(items[0].id);

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <Panel
          key={item.id}
          open={open}
          setOpen={setOpen}
          id={item.id}
          Icon={item.Icon}
          title={item.title}
          imgSrc={item.imgSrc}
          description={item.description}
        />
      ))}
    </div>
  );
}
