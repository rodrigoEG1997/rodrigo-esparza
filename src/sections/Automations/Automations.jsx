import { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import styles from './Automations.module.css';
import automations from '../../data/automations';
import automationGif from '../../assets/automation/automation_gif.mp4';
import bgGif from '../../assets/videos/grass_moving.gif';
import igLogo from '../../assets/logos/ig.png';
import tiktokLogo from '../../assets/logos/tiktok.png';
import automationLogicImg from '../../assets/automation/automation_logic.jpeg';

const TECH_WORDS = [
  'Python', 'MySQL', 'Docker', 'DigitalOcean', 'Instagram', 'TikTok',
  'cron jobs', 'cron', 'API', 'APIs', 'ETL', 'REST', 'SQL', 'NoSQL',
  'containers', 'virtual machine', 'database', 'pipeline', 'scheduled',
];

function highlightTech(text) {
  const pattern = new RegExp(`(${TECH_WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    TECH_WORDS.includes(part)
      ? <span key={i} className={styles.techWord}>{part}</span>
      : part
  );
}

const STATUS_LABEL = {
  production: 'Live',
  prototype: 'Prototype',
  concept: 'Concept',
};

function extractPalette(src, onDone, mixRatio) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const size = 60;
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      const { data } = ctx.getImageData(0, 0, size, size);
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue;
        r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
      }
      if (!count) return;
      r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);
      const mix = mixRatio ?? 0.72;
      const br = Math.round(r + (255 - r) * mix);
      const bg = Math.round(g + (255 - g) * mix);
      const bb = Math.round(b + (255 - b) * mix);
      const lum = (0.299 * br + 0.587 * bg + 0.114 * bb) / 255;
      onDone({
        bg: `rgb(${br},${bg},${bb})`,
        text: lum > 0.55 ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
        muted: lum > 0.55 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
      });
    } catch (_) {}
  };
  img.src = src;
}

function AutomationCard({ automation, onClick }) {
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const src = automation.ig_reel?.[0] ?? automation.logo;
    if (src) extractPalette(src, setPalette, 0.82);
  }, [automation.logo, automation.ig_reel]);

  const cardStyle  = palette ? { background: palette.bg, borderColor: 'transparent' } : {};
  const textStyle  = palette ? { color: palette.text } : {};
  const mutedStyle = palette ? { color: palette.muted } : {};

  return (
    <article
      className={styles.card}
      onClick={onClick}
      style={cardStyle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardProfile}>
          {automation.logo
            ? <img src={automation.logo} alt={automation.title} className={styles.cardLogo} />
            : <span className={styles.cardLogoPlaceholder}>{automation.title[0].toUpperCase()}</span>
          }
          <span className={styles.cardProfileName} style={textStyle}>{automation.title}</span>
        </div>
        <span className={`${styles.statusBadge} ${styles[`status_${automation.status}`]}`}>
          <span className={styles.statusDot} />
          {STATUS_LABEL[automation.status] ?? automation.status}
        </span>
      </div>

      {automation.impact && (
        <p className={styles.cardImpact} style={mutedStyle}>{automation.impact}</p>
      )}

      <p className={styles.cardDesc} style={mutedStyle}>{automation.description}</p>

      <div className={styles.socialRow}>
        {automation.ig && (
          <a
            href={automation.ig_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialBtn} ${styles.igBtn}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={igLogo} className={styles.socialIcon} alt="Instagram" />
            <div className={styles.socialInfo}>
              <span className={styles.socialHandle}>{automation.ig}</span>
              <span className={styles.followText}>Follow</span>
            </div>
          </a>
        )}
        {automation.tiktok && (
          <a
            href={automation.tiktok_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialBtn} ${styles.tiktokBtn}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={tiktokLogo} className={styles.socialIcon} alt="TikTok" />
            <div className={styles.socialInfo}>
              <span className={styles.socialHandle}>{automation.tiktok}</span>
              <span className={styles.followText}>Follow</span>
            </div>
          </a>
        )}
      </div>

      <div className={styles.cardTools}>
        {automation.tools.map((tool) => (
          <span key={tool} className={styles.tool} style={mutedStyle}>{tool}</span>
        ))}
      </div>

      <div className={styles.cardCta}>
        <span className={styles.cardCtaText} style={mutedStyle}>View project</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={mutedStyle}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </article>
  );
}

function AutomationModal({ automation, onClose }) {
  const [igIndex, setIgIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const src = automation.ig_reel?.[0] ?? automation.logo;
    if (src) extractPalette(src, setPalette, 0.82);
  }, [automation]);

  const modalStyle  = palette ? { background: palette.bg, borderColor: 'transparent' } : {};
  const textStyle   = palette ? { color: palette.text } : {};
  const mutedStyle  = palette ? { color: palette.muted } : {};

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          {automation.logo && (
            <img src={automation.logo} alt={automation.title} className={styles.modalLogo} />
          )}
          <div className={styles.modalHeaderText}>
            <div className={styles.modalTitleRow}>
              <h2 className={styles.modalTitle} style={textStyle}>{automation.title}</h2>
              <span className={`${styles.statusBadge} ${styles[`status_${automation.status}`]}`}>
                <span className={styles.statusDot} />
                {STATUS_LABEL[automation.status] ?? automation.status}
              </span>
            </div>
            <p className={styles.modalDesc} style={mutedStyle}>{automation.description}</p>
          </div>
        </div>


        {/* Automation Logic */}
        {(automation.automation_logic) && (
          <div className={styles.logicBlock}>
            <span className={styles.metaLabel} style={mutedStyle}>Automation Logic</span>
            <div className={styles.logicInner}>
              <img src={automationLogicImg} alt="Automation logic diagram" className={styles.logicImg} />
              <p className={styles.logicText} style={mutedStyle}>{highlightTech(automation.automation_logic)}</p>
            </div>
          </div>
        )}

        {/* Meta: Tools + APIs */}
        <div className={styles.modalMeta}>
          <div>
            <span className={styles.metaLabel} style={mutedStyle}>Tools</span>
            <div className={styles.tagRow}>
              {automation.tools.map((t) => (
                <span key={t} className={styles.tool} style={mutedStyle}>{t}</span>
              ))}
            </div>
          </div>
          {automation.external_APIs?.length > 0 && (
            <div>
              <span className={styles.metaLabel} style={mutedStyle}>External APIs</span>
              <div className={styles.tagRow}>
                {automation.external_APIs.map((api) => (
                  <span key={api} className={`${styles.tool} ${styles.apiTag}`} style={mutedStyle}>{api}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Social Content */}
        <span className={styles.metaLabel} style={mutedStyle}>Content</span>
        <div className={styles.modalContent}>

          {/* Instagram Carousel */}
          {automation.ig_reel?.length > 0 && (
            <div className={styles.igSection}>
              <div className={styles.sectionHeader}>
                <img src={igLogo} className={styles.sectionIcon} alt="Instagram" />
                <span className={styles.sectionLabel} style={textStyle}>Instagram</span>
              </div>
              <div className={styles.sectionFollow}>
                <a
                  href={automation.ig_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.followBtn}
                >
                  Follow {automation.ig}
                </a>
              </div>

              <div className={styles.igCarousel}>
                <button
                  className={styles.carouselBtn}
                  onClick={() => setIgIndex((i) => Math.max(0, i - 1))}
                  disabled={igIndex === 0}
                  aria-label="Previous image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className={styles.igFrame}>
                  <img
                    src={automation.ig_reel[igIndex]}
                    alt={`Post ${igIndex + 1}`}
                    className={styles.igImage}
                  />
                  <div className={styles.igCounter}>
                    {igIndex + 1} / {automation.ig_reel.length}
                  </div>
                </div>

                <button
                  className={styles.carouselBtn}
                  onClick={() => setIgIndex((i) => Math.min(automation.ig_reel.length - 1, i + 1))}
                  disabled={igIndex === automation.ig_reel.length - 1}
                  aria-label="Next image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className={styles.igDots}>
                {automation.ig_reel.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.igDot} ${i === igIndex ? styles.igDotActive : ''}`}
                    onClick={() => setIgIndex(i)}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TikTok Video */}
          {automation.tiktok_video && (
            <div className={styles.tiktokSection}>
              <div className={styles.sectionHeader}>
                <img src={tiktokLogo} className={styles.sectionIcon} alt="TikTok" />
                <span className={styles.sectionLabel} style={textStyle}>TikTok</span>
              </div>
              <div className={styles.sectionFollow}>
                <a
                  href={automation.tiktok_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.followBtn} ${styles.followBtnTk}`}
                >
                  Follow {automation.tiktok}
                </a>
              </div>
              <div className={styles.tiktokPhone} onClick={() => setMuted((m) => !m)}>
                <video
                  src={automation.tiktok_video}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className={styles.tiktokVideo}
                />
                <div className={styles.tiktokMuteBtn} aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        {automation.caption && (
          <div className={styles.captionBlock}>
            <span className={styles.metaLabel} style={mutedStyle}>Caption</span>
            <div className={styles.captionCard}>
              <div className={styles.captionHeader}>
                {automation.logo && <img src={automation.logo} alt={automation.title} className={styles.captionAvatar} />}
                <span className={styles.captionHandle} style={textStyle}>{automation.ig}</span>
              </div>
              <p className={styles.captionText} style={textStyle}>{automation.caption}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function Automations() {
  const [selected, setSelected] = useState(null);
  const featured = automations.filter((a) => a.featured);
  const rest = automations.filter((a) => !a.featured);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section className={styles.page} aria-labelledby="automations-heading">
      <div className={styles.hero}>
        <img src={bgGif} className={styles.heroBg} aria-hidden="true" alt="" />
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>Workflow Automation</p>
              <h1 id="automations-heading" className={styles.heroTitle}>Social Medias Automations</h1>
              <p className={styles.heroSubtitle}>
                End-to-end automations for content creation, publishing, and community growth across social media platforms.
              </p>
            </div>
            <div className={styles.heroMedia}>
              <video
                src={automationGif}
                autoPlay
                loop
                muted
                playsInline
                className={styles.heroVideo}
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.content}>
          {featured.length > 0 && (
            <div className={styles.featuredGrid}>
              {featured.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  automation={automation}
                  onClick={() => setSelected(automation)}
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <>
              <h2 className={styles.restHeading}>More Automations</h2>
              <div className={styles.restGrid}>
                {rest.map((automation) => (
                  <AutomationCard
                    key={automation.id}
                    automation={automation}
                    onClick={() => setSelected(automation)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>

      {selected && <AutomationModal automation={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
