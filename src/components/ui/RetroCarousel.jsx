import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import styles from './RetroCarousel.module.css';

function useOutsideClick(ref, onOutsideClick) {
  useEffect(() => {
    const handler = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      onOutsideClick();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref, onOutsideClick]);
}

export function Carousel({ items, initialScroll = 0 }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleCardClose = () => {};

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carouselTrack}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className={styles.carouselItems}>
          {items.map((item, index) => (
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' },
              }}
              className={styles.carouselItem}
            >
              {React.cloneElement(item, { onCardClose: () => handleCardClose(index) })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className={styles.navButtons}>
        <button
          className={styles.navBtn}
          onClick={() => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ArrowLeft size={20} color="#f2f0eb" />
        </button>
        <button
          className={styles.navBtn}
          onClick={() => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ArrowRight size={20} color="#f2f0eb" />
        </button>
      </div>
    </div>
  );
}

function extractPalette(src, onDone) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const size = 60;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      const { data } = ctx.getImageData(0, 0, size, size);

      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue;
        r += data[i]; g += data[i + 1]; b += data[i + 2];
        count++;
      }
      if (!count) return;
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      // Lighten to pastel (mix with white at 70%)
      const mix = 0.70;
      const br = Math.round(r + (255 - r) * mix);
      const bg = Math.round(g + (255 - g) * mix);
      const bb = Math.round(b + (255 - b) * mix);

      const lum = (0.299 * br + 0.587 * bg + 0.114 * bb) / 255;
      onDone({
        bg: `rgb(${br},${bg},${bb})`,
        text: lum > 0.55 ? 'rgba(20,30,40,0.88)' : 'rgba(255,255,255,0.92)',
        subtext: lum > 0.55 ? 'rgba(20,30,40,0.5)' : 'rgba(255,255,255,0.5)',
      });
    } catch (_) { /* tainted canvas — keep default */ }
  };
  img.src = src;
}

export function ProjectCard({
  card,
  layout = false,
  onCardClose = () => {},
  compact = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [palette, setPalette] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (card.profileImage) extractPalette(card.profileImage, setPalette);
  }, [card.profileImage]);

  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxSrc) { setLightboxSrc(null); return; }
        handleCollapse();
      }
    };
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, () => { if (!lightboxSrc) handleCollapse(); });

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className={styles.expandedOverlay}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.backdrop}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className={styles.expandedCard}
              style={palette ? { background: palette.bg } : undefined}
            >
              <button className={styles.closeBtn} onClick={handleCollapse} aria-label="Close">
                <X size={16} color="white" />
              </button>
              <motion.p
                layoutId={layout ? `cat-${card.title}` : undefined}
                className={styles.expandedDesignation}
              >
                {card.designation}
              </motion.p>
              <motion.p
                layoutId={layout ? `ttl-${card.title}` : undefined}
                className={styles.expandedTitle}
              >
                {card.title}
              </motion.p>
              <div className={styles.expandedDescription}>
                {card.description}
              </div>
              {card.tags && card.tags.length > 0 && (
                <div className={styles.expandedTags}>
                  {card.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
              {card.images && card.images.length > 0 && (
                <div className={styles.expandedImages}>
                  {card.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className={styles.expandedImgItem}
                      onClick={(e) => { e.stopPropagation(); setLightboxSrc(src); }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {lightboxSrc && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxSrc(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxSrc(null)}>
            <X size={16} />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setIsExpanded(true)}
        className={styles.cardButton}
        whileHover={{
          rotate: 3,
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        <div
          className={`${styles.card} ${compact ? styles.cardCompact : ''}`}
          style={palette ? {
            '--card-bg': palette.bg,
            '--card-text': palette.text,
            '--card-subtext': palette.subtext,
          } : undefined}
        >
          <div className={styles.coverWrapper}>
            <img
              src={card.profileImage}
              alt={card.title}
              className={`${styles.coverImage} ${compact ? styles.coverImageCompact : ''}`}
            />
            <div className={styles.coverFade} style={palette ? { background: `linear-gradient(to top, ${palette.bg}, transparent)` } : undefined} />
          </div>
          <div className={styles.cardTextArea}>
            <p className={`${styles.cardTitle} ${compact ? styles.cardTitleCompact : ''}`}>
              {card.title}
            </p>
            <p className={`${styles.cardDesignation} ${compact ? styles.cardDesignationCompact : ''}`}>
              {card.designation.length > 32
                ? `${card.designation.slice(0, 32)}...`
                : card.designation}
            </p>
          </div>
        </div>
      </motion.button>
    </>
  );
}

export function ProfileImage({ src, alt, compact = false }) {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className={`${styles.profileImageWrapper} ${compact ? styles.profileImageWrapperCompact : ''}`}>
      <img
        className={`${styles.profileImage} ${isLoading ? styles.profileImageLoading : ''}`}
        onLoad={() => setLoading(false)}
        src={src}
        width={150}
        height={150}
        loading="lazy"
        decoding="async"
        alt={alt || 'Project image'}
      />
    </div>
  );
}
