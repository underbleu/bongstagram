import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Copyright = props => (
  <div className={styles.container}>
    <div className={styles.button} onMouseOver={props.handleMouseOver} onMouseLeave={props.handleMouseLeave} >
      &copy;
    </div>
    {props.seeingCopyright && <CopyrightDisplay {...props} />}
  </div>
);

const CopyrightDisplay = props => (
  <div className={styles.info}>
    <div className={styles.transaction}>트랜젝션 영수증 링크 {props.txHash}</div>
    <div className={styles.photoToken}>copyright No. {props.photoToken}</div>
    <div className={styles.issueDate}>저작권 등록일</div>
    <div className={styles.OriginalOwner}>원작자</div>
    <div className={styles.PrevOwner}>Previous owner</div>
    <div className={styles.CurrentOwner}>Current Owner</div>
  </div>
);

Copyright.propTypes = {
  // photoTokens: PropTypes.number,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
};

export default Copyright;