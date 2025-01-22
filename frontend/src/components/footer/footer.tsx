import styles from "./styles.module.css";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.legalText}>
        © 2024 Quorum Analytics LLC. All Rights Reserved. Quorum Analytics is
        not affiliated with, licensed, endorsed, or sponsored by Leidos
        Innovations Technology or its affiliates.
        <a href="https://www.quorum.us/privacy-policy">Privacy Policy</a>
      </p>
    </div>
  );
}
