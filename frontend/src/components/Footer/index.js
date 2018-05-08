import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

class Footer extends React.Component {
  
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.listItem}>{this.context.t("About Us")}</li>
              <li className={styles.listItem}>{this.context.t("Support")}</li>
              <li className={styles.listItem}>{this.context.t("Blog")}</li>
              <li className={styles.listItem}>{this.context.t("Press")}</li>
              <li className={styles.listItem}>{this.context.t("API")}</li>
              <li className={styles.listItem}>{this.context.t("Jobs")}</li>
              <li className={styles.listItem}>{this.context.t("Privacy")}</li>
              <li className={styles.listItem}>{this.context.t("Terms")}</li>
              <li className={styles.listItem}>{this.context.t("Directory")}</li>
              <li className={styles.listItem}>{this.context.t("Profiles")}</li>
              <li className={styles.listItem}>{this.context.t("Hashtags")}</li>
              <li className={styles.listItem}>{this.context.t("Language")}</li>
            </ul>
          </nav>
          <span className={styles.copyright}>&copy; 2018 Bongstagram</span>
        </div>
      </footer>
    );
  }
} 


export default Footer;