import { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import { Carousel, ProjectCard } from '../../components/ui/RetroCarousel';
import styles from './Experience.module.css';
import { experience, education } from '../../data/experience';
import projects from '../../data/projects';

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
        text: lum > 0.55 ? 'rgba(20,30,40,0.9)' : 'rgba(255,255,255,0.92)',
        muted: lum > 0.55 ? 'rgba(20,30,40,0.5)' : 'rgba(255,255,255,0.55)',
      });
    } catch (_) {}
  };
  img.src = src;
}

function EduCardInner({ edu, isActive, onClick, height }) {
  const [palette, setPalette] = useState(null);
  const compact = height < 110;
  const medium  = height < 160;
  const large   = height >= 260;

  useEffect(() => {
    if (edu.images?.[0]) extractPalette(edu.images[0], setPalette);
  }, [edu.images]);

  const cardStyle = palette ? { backgroundColor: palette.bg, borderColor: 'transparent' } : {};
  const textStyle  = palette ? { color: palette.text } : {};
  const mutedStyle = palette ? { color: palette.muted } : {};

  return (
    <article
      className={`${styles.eduCard} ${isActive ? styles.eduCardActive : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={cardStyle}
    >
      {compact ? (
        <>
          <span className={styles.periodBadge} style={mutedStyle}>
            <CalendarIcon />{edu.period}
          </span>
          <h4 className={styles.degreeCompact} style={textStyle}>{edu.degree}</h4>
        </>
      ) : (
        <>
          <div className={styles.eduCardBadges}>
            <span className={styles.periodBadge} style={mutedStyle}>
              <CalendarIcon />{edu.period}
            </span>
            {!medium && (
              <span className={styles.locationBadge} style={mutedStyle}>
                <LocationIcon />{edu.location}
              </span>
            )}
          </div>
          <h4 className={styles.degree} style={textStyle}>{edu.degree}</h4>
          {!medium && <span className={styles.school} style={mutedStyle}>{edu.school}</span>}
          {large && edu.about && (
            <p className={styles.eduCardAbout} style={mutedStyle}>{edu.about}</p>
          )}
          {large && edu.modules?.length > 0 && (
            <div className={styles.eduCardModules}>
              {edu.modules.slice(0, 8).map((m) => (
                <span key={m} className={styles.eduCardModule} style={mutedStyle}>{m}</span>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  );
}

// ── Date parsing ─────────────────────────────────────────────
const MONTHS = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11 };

function parsePeriod(str) {
  const sides = str.split(/\s*[–—-]\s*/);
  // isEnd: year-only strings default to Dec (11) for end, Jan (0) for start
  const parse = (s, isEnd) => {
    const t = s.trim().toLowerCase().split(/\s+/);
    const year = parseInt(t[t.length - 1]);
    const mon  = t.length > 1 ? (MONTHS[t[0].slice(0, 3)] ?? 0) : (isEnd ? 11 : 0);
    return year * 12 + mon;
  };
  return { startAbs: parse(sides[0], false), endAbs: parse(sides[1] ?? sides[0], true) };
}

function assignLanes(items) {
  const sorted = [...items].sort((a, b) => a.startAbs - b.startAbs);
  const laneEnds = [];
  for (const it of sorted) {
    let l = laneEnds.findIndex(e => e <= it.startAbs);
    if (l === -1) { l = laneEnds.length; laneEnds.push(0); }
    it.lane = l;
    laneEnds[l] = it.endAbs;
  }
  for (const it of items) {
    const concurrent = items.filter(o => o !== it && o.startAbs < it.endAbs && o.endAbs > it.startAbs);
    it.localLanes = Math.max(concurrent.length + 1, 1);
  }
  return items;
}

function prepareItems(rawItems) {
  return assignLanes(rawItems.map(it => ({ ...it, ...parsePeriod(it.visualPeriod ?? it.period) })));
}

// Pre-computed once at module load
const expItems  = prepareItems(experience);
const eduItems  = prepareItems(education);
const allItems  = [...expItems, ...eduItems];
const minAbs    = Math.min(...allItems.map(it => it.startAbs));
const maxAbs    = Math.max(...allItems.map(it => it.endAbs));
const minYear   = Math.floor(minAbs / 12);
const maxYear   = Math.floor(maxAbs / 12);

// ── Timeline constants ────────────────────────────────────────
const PX_PER_MONTH = 7;
const PAD_TOP      = 24;
const PAD_BOTTOM   = 48;
const MIN_SLOT_H   = 0;

const totalH = (maxAbs - minAbs) * PX_PER_MONTH + PAD_TOP + PAD_BOTTOM;

// Reverse-chronological: newest (maxAbs) → top of column
function slotTop(it)    { return (maxAbs - it.endAbs) * PX_PER_MONTH + PAD_TOP; }
function slotHeight(it) { return Math.max((it.endAbs - it.startAbs) * PX_PER_MONTH, MIN_SLOT_H); }

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ExpCardInner({ job, isActive, onClick }) {
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    if (job.images?.[0]) extractPalette(job.images[0], setPalette, job.paletteMix);
  }, [job.images]);

  const cardStyle  = palette ? { backgroundColor: palette.bg, borderColor: 'transparent' } : {};
  const textStyle  = palette ? { color: palette.text } : {};
  const mutedStyle = palette ? { color: palette.muted } : {};

  return (
    <article
      className={`${styles.expCard} ${isActive ? styles.expCardActive : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={cardStyle}
    >
      <div className={styles.cardTop}>
        <span className={styles.periodBadge} style={mutedStyle}>
          <CalendarIcon />{job.period}
        </span>
        <span className={styles.locationBadge} style={mutedStyle}>
          <LocationIcon />{job.location}
        </span>
      </div>
      <div className={styles.cardMeta}>
        <h4 className={styles.role} style={textStyle}>{job.role}</h4>
        <span className={styles.company} style={mutedStyle}>{job.company}</span>
      </div>
      <ul className={styles.bullets} aria-label={`Responsibilities at ${job.company}`}>
        {job.description.map((d, idx) => (
          <li key={idx} className={styles.bullet} style={mutedStyle}>{d}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState(null);

  const projectCards = projects.map((project) => (
    <ProjectCard
      key={project.id}
      card={{
        title: project.title,
        designation: project.subtitle,
        description: project.description,
        profileImage: project.profile_image,
        images: project.images,
        tags: project.tags,
      }}
      compact
    />
  ));

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-heading">
      <Container>
        <SectionTitle
          label="Background"
          title="Experience & Education"
          subtitle="A track record of building impactful systems, combined with a strong academic foundation."
        />

        <a
          href="/AI Engineer Rodrigo Esparza.pdf"
          download="AI Engineer Rodrigo Esparza.pdf"
          className={styles.cvButton}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>

        <div className={styles.columns}>

          {/* ── Row 1: Column headers (grid auto-places these first) ── */}
          <header className={styles.sideHeader}>
            <span className={styles.sideLabel}>Work</span>
            <h3 className={styles.sideTitle}>Professional Experience</h3>
          </header>

          <div className={styles.centerGap} />

          <header className={styles.sideHeaderRight}>
            <span className={styles.sideLabel}>Education</span>
            <h3 className={styles.sideTitle}>Academic Background</h3>
          </header>

          {/* ── Row 2: Timelines — center track is now in the SAME row ── */}
          <div className={`${styles.timeline} ${styles.timelineExp}`} style={{ height: totalH }}>
            {expItems.map((job, i) => (
              <div
                key={job.id}
                className={`${styles.expSlot} ${job.localLanes > 1 ? styles.concurrent : ''}`}
                style={{
                  top:    slotTop(job),
                  height: slotHeight(job),
                  width:  `${100 / job.localLanes}%`,
                  left:   `${(job.lane / job.localLanes) * 100}%`,
                  '--delay': `${job.lane * 0.8}s`,
                }}
              >
                <ExpCardInner
                  job={job}
                  isActive={i === 0}
                  onClick={() => setSelected({ ...job, _type: 'exp' })}
                />
              </div>
            ))}
          </div>

          <div className={styles.centerTrack} style={{ height: totalH }} aria-hidden="true">
            <div className={styles.trackLine} />

            {Array.from({ length: maxYear - minYear + 1 }, (_, k) => {
              const year = minYear + k;
              const y = (maxAbs - year * 12) * PX_PER_MONTH + PAD_TOP;
              return (
                <div key={year} className={styles.yearMark} style={{ top: y }}>
                  <span className={styles.yearLabel}>{year}</span>
                </div>
              );
            })}

            {expItems.map((job, i) => (
              <div
                key={job.id}
                className={`${styles.dot} ${styles.dotExp} ${i === 0 ? styles.dotActive : ''}`}
                style={{ top: slotTop(job) }}
              />
            ))}

            {eduItems.map((edu, i) => (
              <div
                key={edu.degree}
                className={`${styles.dot} ${styles.dotEdu} ${i === 0 ? styles.dotActive : ''}`}
                style={{ top: slotTop(edu) }}
              />
            ))}
          </div>

          <div className={`${styles.timeline} ${styles.timelineEdu}`} style={{ height: totalH }}>
            {eduItems.map((edu, i) => (
              <div
                key={edu.degree}
                className={`${styles.eduSlot} ${edu.localLanes > 1 ? styles.concurrent : ''}`}
                style={{
                  top:    slotTop(edu),
                  height: slotHeight(edu),
                  width:  `${100 / edu.localLanes}%`,
                  left:   `${(edu.lane / edu.localLanes) * 100}%`,
                  '--delay': `${edu.lane * 0.8}s`,
                }}
              >
                <EduCardInner
                  edu={edu}
                  isActive={i === 0}
                  onClick={() => setSelected({ ...edu, _type: 'edu' })}
                  height={slotHeight(edu)}
                />
              </div>
            ))}
          </div>

        </div>
      </Container>

      <div className={styles.projectsArea}>
        <p className={styles.projectsLabel}>Projects</p>
        <Carousel items={projectCards} />
      </div>

      {/* ── Detail modal ─────────────────────────────────── */}
      {selected && (
        <div
          className={styles.overlay}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelected(null)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {selected._type === 'exp' ? (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalHeaderLeft}>
                    <div className={styles.modalTop}>
                      <span className={styles.periodBadge}><CalendarIcon />{selected.period}</span>
                      <span className={styles.locationBadge}><LocationIcon />{selected.location}</span>
                    </div>
                    <h3 className={styles.modalRole}>{selected.role}</h3>
                    <div className={styles.modalSchoolRow}>
                      {selected.url ? (
                        <a href={selected.url} target="_blank" rel="noopener noreferrer" className={styles.modalCompanyLink}>
                          {selected.company}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      ) : (
                        <span className={styles.modalCompany}>{selected.company}</span>
                      )}
                    </div>
                  </div>
                  {selected.images?.length > 0 && (
                    <img src={selected.images[0]} alt={selected.company} className={styles.modalLogo} />
                  )}
                </div>

                {selected.company_description && (
                  <p className={styles.modalAbout}>{selected.company_description}</p>
                )}

                <span className={styles.modalModulesLabel}>Key Responsibilities</span>
                <ul className={styles.modalBullets}>
                  {selected.description.map((d, i) => (
                    <li key={i} className={styles.modalBullet}>{d}</li>
                  ))}
                </ul>

                <div className={styles.modalActions}>
                  {selected.url && (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className={styles.modalTitleLink}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Visit Website
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={styles.modalTop}>
                  <span className={styles.periodBadge}><CalendarIcon />{selected.period}</span>
                  <span className={styles.locationBadge}><LocationIcon />{selected.location}</span>
                </div>
                <h3 className={styles.modalRole}>{selected.degree}</h3>
                <div className={styles.modalSchoolRow}>
                  {selected.url ? (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className={styles.modalCompanyLink}>
                      {selected.school}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  ) : (
                    <span className={styles.modalCompany}>{selected.school}</span>
                  )}
                </div>

                {selected.images?.length > 0 && (
                  <div className={styles.modalImages}>
                    {selected.images.map((src, i) => (
                      <img key={i} src={src} alt="" className={styles.modalImage} />
                    ))}
                  </div>
                )}

                {selected.about && (
                  <p className={styles.modalAbout}>{selected.about}</p>
                )}

                {selected.modules?.length > 0 && (
                  <div className={styles.modalModulesBlock}>
                    <span className={styles.modalModulesLabel}>Modules</span>
                    <div className={styles.modalModules}>
                      {selected.modules.map((m) => (
                        <span key={m} className={styles.modalModule}>{m}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.modalActions}>
                  {selected.url && (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" className={styles.modalTitleLink}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Visit Website
                    </a>
                  )}
                  {selected.title && (
                    <a href={selected.title} download className={styles.modalTitleLink}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download Certificate
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
