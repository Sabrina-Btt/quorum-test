import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome!</h1>
        <ul>
          <li className={styles.listItem}>
            <a className={styles.link} href="/bills">
              <span>Bills</span>
            </a>
          </li>
          <li className={styles.listItem}>
            <a className={styles.link} href="/legislators">
              <span>Legislators</span>
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}
