import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const Copyright = props => (
  <div className={styles.container}>
    <div className={styles.button} onMouseOver={props.handleMouseOver} onMouseLeave={props.handleMouseLeave} >
      <Ionicon icon="logo-instagram" fontSize="20px" color="orange" />
    </div>
    {props.seeingCopyright && <CopyrightDisplay {...props} />}
  </div>
);

const CopyrightDisplay = props => (
  <div className={styles.info}>
    <div className={styles.transaction}></div>
    <div className={styles.photoToken}>copyright No. {props.photoToken}</div>
    <div className={styles.issueDate} />
    <div className={styles.OriginalOwner} />
    <div className={styles.PrevOwner} />
    <div className={styles.CurrentOwner} />
  </div>
);

Copyright.propTypes = {
  // photoTokens: PropTypes.number,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
};

export default Copyright;