import { useState } from "react";

import Screw from "@assets/screw.webp";

import styles from "./style.module.scss";

export const Plan = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <section className={styles.plan__container}>
        <div className={styles.plan__title}>
          <h3>Чертеж детали</h3>
        </div>
        <div className={styles.plan}>
          <img
            src={Screw}
            alt="Чертеж детали"
            onClick={handleToggle}
            className={styles.plan__image}
          />
        </div>
      </section>

      {isOpen && (
        <div onClick={handleToggle} className={styles.plan__modal}>
          <img src={Screw} alt="Чертеж детали" />
        </div>
      )}
    </>
  );
};
