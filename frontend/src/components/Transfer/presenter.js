import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

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
        <div>
          <span>Copyright No.</span> {props.photoToken}
        </div>
        <div>
          <span>FROM.</span> {props.walletAddress}
        </div>
        <input
          type="text"
          name="address"
          value={props.addressValue}
          onChange={props.handleInputChange}
          placeholder="Who do you want to transfer your Copyright?"
          className={styles.textInput}
          required="true"
        />
        <input
          type="text"
          name="gas"
          value={props.gasValue}
          onChange={props.handleInputChange}
          placeholder="Gas?"
          className={styles.textInput}
          required="true"
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
