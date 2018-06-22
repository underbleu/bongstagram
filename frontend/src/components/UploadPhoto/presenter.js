import React from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";


const UploadPhoto = (props, context) => (
  <div>
    <div className={styles.UploadButton} onClick={props.openUpload}>
      <Ionicon icon="logo-instagram" fontSize="32px" color="white" />;
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
        <input
          type="file"
          name="file"
          onChange={props.handleFileChange}
          placeholder="Upload your memories"
          className={styles.file}
          required="true"
        />
        <input
          type="text"
          name="location"
          value={props.location}
          onChange={props.handleInputChange}
          placeholder="Where did you take this photo ?"
          className={styles.location}
          required="true"
        />
        <Textarea
          type="text"
          name="caption"
          value={props.caption}
          onChange={props.handleInputChange}
          placeholder="Upload your memories"
          className={styles.caption}
          required="true"
        />
        <div className={styles.buttonBox}>
          <input type="submit" value="Upload" className={styles.button} />
        </div>
      </form>
    </div>
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