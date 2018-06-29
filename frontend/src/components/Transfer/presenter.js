import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";
import GasPrice from "components/GasPrice";

const Transfer = props => (
  <div className={styles.container}>
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>Transfer Copyright</h4>
        <span className={styles.close} onClick={props.closeTransfer}>
          <Ionicon icon="md-close" fontSize="20px" color="black" />
        </span>
      </header>
      <form className={styles.form} onSubmit={props.handleSubmit}>
        <div className={styles.copyright}>
          <span>Copyright No.</span> {props.photoToken}
        </div>
        <div className={styles.from}>
          <span>FROM.</span>
          <input
            type="text"
            name="from"
            placeholder={props.walletAddress}
            className={styles.textInput}
            disabled
          />
        </div>
        <div className={styles.to}>
          <span>TO.</span>
          <input
            type="text"
            name="address"
            value={props.addressValue}
            onChange={props.handleInputChange}
            placeholder="Transfer copyright to..."
            className={styles.textInput}
            required="true"
          />
        </div>
        <GasPrice
          gas={props.gasValue}
          handleInputChange={props.handleInputChange}
        />
        <div className={styles.buttonBox}>
          <input
            type="submit"
            value="Transfer Copyright"
            className={styles.button}
          />
        </div>
      </form>
    </div>
  </div>
);


Transfer.propTypes = {
  // photoToken: PropTypes.number,
  imageId: PropTypes.number.isRequired,
  addressValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Transfer;
