import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const GasPrice = (props, context) => (
  <div className={styles.container}>
    <div className={styles.header}>
      Gas Price
      <Ionicon icon="ios-help-circle-outline" fontSize="16px" color="#333" />
    </div>
    <input
      type="range"
      name="gas"
      min="0"
      max="10"
      value={props.gas}
      onChange={props.handleInputChange}
      className={styles.input}
      required="true"
    />
    <p className={styles.gwei}>
      {props.gas} <span>Gwei</span>
    </p>
    <p className={styles.dollar}>
      {props.dollar} <span>&dollar;</span>
    </p>
  </div>
);

GasPrice.propTypes = {
};

export default GasPrice;