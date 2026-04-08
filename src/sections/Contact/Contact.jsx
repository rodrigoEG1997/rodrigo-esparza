import { useState } from 'react';
import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import styles from './Contact.module.css';
import personalInfo from '../../data/personalInfo';

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
      <Container>
        <div className={styles.inner}>
          <div className={styles.textSide}>
            <SectionTitle
              label="Get in touch"
              title="Let's work together."
              align="left"
            />
            <p className={styles.description}>
              Whether you have a project in mind, an opportunity to explore, or just want to say hello — I'm always open to a conversation.
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>LinkedIn</span>
                  <span className={styles.contactValue}>rodrigoesparza</span>
                </div>
              </a>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Location</span>
                  <span className={styles.contactValue}>{personalInfo.location}</span>
                </div>
              </div>
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

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
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
