import styles from "./style.module.scss";

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h3>Автоматизация построения контрольных карт</h3>
      </div>
    </div>
  );
};
