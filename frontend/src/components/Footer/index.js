import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>{context.t("About Us")}</li>
          <li className={styles.listItem}>{context.t("Support")}</li>
          <li className={styles.listItem}>{context.t("Blog")}</li>
          <li className={styles.listItem}>{context.t("Press")}</li>
          <li className={styles.listItem}>{context.t("API")}</li>
          <li className={styles.listItem}>{context.t("Jobs")}</li>
          <li className={styles.listItem}>{context.t("Privacy")}</li>
          <li className={styles.listItem}>{context.t("Terms")}</li>
          <li className={styles.listItem}>{context.t("Directory")}</li>
          <li className={styles.listItem}>{context.t("Profiles")}</li>
          <li className={styles.listItem}>{context.t("Hashtags")}</li>
          <li className={styles.listItem}>{context.t("Language")}</li>
        </ul>
      </nav>
      <span className={styles.copyright}>&copy; 2018 Bongstagram</span>
    </div>
  </footer>
);

Footer.contextTypes = {
  t: PropTypes.func.isRequired // --- 1. context의 t함수 불러오기
};

export default Footer;