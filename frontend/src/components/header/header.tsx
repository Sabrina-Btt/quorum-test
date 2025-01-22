import Image from "next/image";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <Image
          src="/images/quorumLogo.svg"
          alt="Logo"
          width={130}
          height={30}
        />
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/bills">
              <span>Bills</span>
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/legislators">
              <span>Legislators</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
