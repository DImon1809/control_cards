import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import Pin from "@assets/pin.webp";
import Screw from "@assets/screw.webp";

import styles from "./style.module.scss";

type Props = {
  planName: "screw" | "pin";
  setPlanName: Dispatch<SetStateAction<"screw" | "pin">>;
};

export const Plan = ({ planName, setPlanName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <section className={styles.plan__container}>
        <div className={styles.plan__introduction}>
          {planName === "pin" && (
            <div
              className={`${styles.plan__direction} ${styles.plan__left}`}
              onClick={() => setPlanName("screw")}
            >
              <MdOutlineArrowBackIos size={19} />
            </div>
          )}
          <div className={styles.plan__title}>
            <h3>{`${planName === "screw" ? "Чертёж гайки" : "Чертёж штифта"}`}</h3>
          </div>
          {planName === "screw" && (
            <div
              className={`${styles.plan__direction} ${styles.plan__right}`}
              onClick={() => setPlanName("pin")}
            >
              <MdOutlineArrowForwardIos size={19} />
            </div>
          )}
        </div>
        <div className={`${styles.plan} ${planName === "pin" ? styles.pin : ""}`}>
          <img
            src={planName === "screw" ? Screw : Pin}
            alt="#"
            onClick={handleToggle}
            className={styles.plan__image}
          />
        </div>
      </section>

      {isOpen && (
        <div onClick={handleToggle} className={styles.plan__modal}>
          {planName === "screw" ? <img src={Screw} alt="#" /> : <img src={Pin} alt="#" />}
        </div>
      )}
    </>
  );
};
