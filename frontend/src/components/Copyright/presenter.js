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
    <div className={styles.txHash}>트랜젝션 영수증 링크 {props.txHash}</div>
    <div className={styles.photoToken}>copyright No. {props.photoToken}</div>
    <div className={styles.copyrightIssue}>{`Copyright Issue. ${props.issueDate}`}</div>
    <div className={styles.originalOwner}>{`Original Owner. ${props.originOwner}`}</div>
    <div className={styles.prevOwner}>{!!Number(props.oldOwner) && (`Previous owner. ${props.oldOwner}`)}</div>
    <div className={styles.currentOwner}>{`Current Owner. ${props.newOwner}`}</div>
  </div>
);

Copyright.propTypes = {
  // photoTokens: PropTypes.number,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
};

export default Copyright;