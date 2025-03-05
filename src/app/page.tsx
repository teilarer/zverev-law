'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from './components/Modal';

interface ContactInfo {
  address: string;
  mobilePhone: string;
}

interface CompanyData {
  employees: any[];
  portfolio: any[];
  companyName: string;
  description: string;
  contactInfo: ContactInfo;
  personalDataAgreement: string;
}

export default function Home() {
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [data, setData] = useState<CompanyData | null>(null);

  useEffect(() => {
    fetch('http://zvereva-law.ru/main')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>{data.companyName}</h1>
            <div className={styles.logo}>
              <img src="/scales.svg" alt="Scales of Justice" />
            </div>
          </header>

          <nav className={styles.nav}>
            <a href="#lawyers" className={styles.navLink}>Наши юристы</a>
            <a href="#projects" className={styles.navLink}>Наши проекты</a>
            <a href="#contacts" className={styles.navLink}>Контакты</a>
          </nav>

          <div className={styles.description}>
            <p>{data.description}</p>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Подробнее о нас</h2>
            <div className={styles.grid}>
              {data.employees.slice(0, 3).map((employee, index) => (
                <div key={index} className={styles.card} />
              ))}
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <button className={styles.button}>
            Оставить заявку
          </button>
          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>
              Политика конфиденциальности
            </a>
            <button 
              onClick={() => setIsAgreementOpen(true)} 
              className={styles.footerLink}
            >
              согласие клиента
            </button>
          </div>
        </footer>
      </main>

      <Modal 
        isOpen={isAgreementOpen} 
        onClose={() => setIsAgreementOpen(false)}
      >
        <h2 className={styles.modalTitle}>Согласие клиента</h2>
        <div className={styles.modalContent}>
          {data.personalDataAgreement}
        </div>
      </Modal>
    </>
  );
} 