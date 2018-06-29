import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";
import GasPrice from "components/GasPrice";

const UploadPhoto = (props, context) => (
  <div>
    <div className={styles.UploadButton} onClick={props.openUpload}>
      <Ionicon icon="logo-instagram" fontSize="34px" color="white" />
    </div>
    {props.seeingUpload && <UploadDisplay title={"Upload Photo"} {...props} />}
  </div>
);

const UploadDisplay = props => (
  <div className={styles.container}>
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>Upload Photo</h4>
        <span className={styles.close} onClick={props.closeUpload}>
          <Ionicon icon="md-close" fontSize="20px" color="black" />
        </span>
      </header>
      <form className={styles.content} onSubmit={props.handleSubmit}>
        <File handleFileChange={props.handleFileChange} fileName={props.fileName}/>
        <div className={styles.input}>
          <input
            type="text"
            name="location"
            value={props.location}
            onChange={props.handleInputChange}
            placeholder="Where did you take this photo ?"
            className={styles.location}
            required="true"
          />
          <textarea
            type="text"
            name="caption"
            value={props.caption}
            onChange={props.handleInputChange}
            placeholder="Upload your memories"
            className={styles.caption}
            required="true"
          />
        </div>
        <GasPrice
          gas={props.gas}
          dollar={props.dollar}
          handleInputChange={props.handleInputChange}
          className={styles.gas}
        />
        <div className={styles.buttonBox}>
          <input type="submit" value="Upload" className={styles.button} />
        </div>
      </form>
    </div>
  </div>
);

const File = props => (
  <div className={styles.filebox}>
    <input
      id="upload"
      type="file"
      name="file"
      onChange={props.handleFileChange}
      className={styles.hidden}
      required="true"
    />
    <label htmlFor="upload" className={styles.cloud}>
      <img src={require("./upload.png")} alt="upload button" />
    </label>
    <p className={styles.name}>{props.fileName}</p>
  </div>
);

UploadPhoto.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  openUpload: PropTypes.func.isRequired,
  closeUpload: PropTypes.func.isRequired
};


export default UploadPhoto;