import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Copyright = props => (
  <div className={styles.container}>
    <div className={styles.button} onMouseOver={props.handleMouseOver} onMouseLeave={props.handleMouseLeave}>
      &copy;
    </div>
    {props.seeingCopyright && <CopyrightDisplay {...props} />}
  </div>
);

const CopyrightDisplay = props => (
  <div className={styles.info}>
    <div className={styles.photoToken}>copyright No. {props.photoToken}</div>
    {/* <div className={styles.txHash}>{props.txHash}</div> */}
    <div className={styles.tx}>
      <span>Issue Date</span> {props.issueDate}
    </div>
    <div className={styles.tx}>
      <span>Original Owner</span>
      {props.originOwner}
    </div>
    <div className={styles.tx}>
      <span>Previous Owner</span>
      {!!Number(props.oldOwner) && `${props.oldOwner}`}
    </div>
    <div className={styles.tx}>
      <span>Current Owner</span>
      {props.newOwner}
    </div>
  </div>
);

Copyright.propTypes = {
  // photoTokens: PropTypes.number,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
};

export default Copyright;