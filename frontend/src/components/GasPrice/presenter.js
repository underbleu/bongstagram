import React from "react";
import Ionicon from "react-ionicons";
import classNames from "classnames";
import styles from "./styles.scss";


const GasPrice = (props, context) => {
  const speedStyle = {
    left: `${props.gas}%`
  };
  
  const pointerStyle = {
    transform: `rotate(${(props.gas * 2) - 100 }deg)`
  }
  
  return <div className={styles.container}>
      <div className={styles.header}>
        Gas Price
        <Ionicon icon="ios-help-circle-outline" fontSize="16px" color="#333" />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>
          <p className={styles.gwei}>
            {props.gas} <span>Gwei</span>
          </p>
          <p className={styles.dollar}>
            {(props.gas * 0.000000433 * 400000).toFixed(2)}
            <span>&#36;</span>
          </p>
        </div>
        <div className={styles.speed}>
          {props.gas > 70 ? "Fast" : props.gas > 30 ? "Medium" : "Slow"}
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.speedBox}>
          <div className={classNames(styles.speedometer, styles[`speedometerSpeed${props.gas}`])} style={speedStyle}>
            <img className={styles.bg} src={require("images/bg.svg")} alt="pointer" />
            <img className={styles.pointer} style={pointerStyle} src={require("images/pointer.svg")} alt="pointer" />
          </div>
        </div>
        <input className={styles.range} type="range" name="gas" min="0" max="100" value={props.gas} required="true" onChange={props.handleInputChange} />
      </div>
    </div>;
};

GasPrice.propTypes = {
};

export default GasPrice;