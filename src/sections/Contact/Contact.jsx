import { useState } from 'react';
import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import styles from './Contact.module.css';
import personalInfo from '../../data/personalInfo';
import bgGif from '../../assets/videos/background.gif';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens default email client with pre-filled content
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <img src={bgGif} className={styles.bgGif} aria-hidden="true" alt="" />
      <Container>
        <div className={styles.inner}>
          <div className={styles.textSide}>
            <SectionTitle
              label="Get in touch"
              title="Let's work together."
              align="left"
              light
            />
            <p className={styles.description}>
              Whether you have a project in mind, an opportunity to explore, or just want to say hello, I'm always open to a conversation.
            </p>

            <div className={styles.contactItems}>
              <a href={`mailto:${personalInfo.email}`} className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>{personalInfo.email}</span>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <span className={styles.contactValue}>www.linkedin.com/in/rodrigoesparza</span>
                </div>
              </a>

              <a href="tel:+353834160019" className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  📞
                </div>
                <div>
                  <span className={styles.contactLabel}>Phone Number</span>
                  <span className={styles.contactValue}>+353 83 416 0019</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.formSide}>

            <form onSubmit={handleSubmit} className={styles.form} aria-label="Contact form" noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={`${styles.field} ${styles.messageField}`}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <Button type="submit" variant="primary" className={styles.submitBtn}>
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </Button>

              {status === 'sent' && (
                <p className={styles.successMsg} role="status">
                  Your email client should have opened. Looking forward to connecting!
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
