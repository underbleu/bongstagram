import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import formStyles from "shared/formStyles.scss";


const SignupForm = props => (
  <div className={formStyles.formComponent}>
    <h2 className={formStyles.signupHeading}>Sign up to see photos and videos from your friends.</h2>
    <button className={formStyles.button}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#fff" />
      Log in with Facebook
    </button>
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form}>
      <input type="text" placeholder="Email" className={formStyles.textInput} required="true" />
      <input type="text" placeholder="Full Name" className={formStyles.textInput} required="true" />
      <input type="text" placeholder="Username" className={formStyles.textInput} required="true" />
      <input type="password" placeholder="Password" className={formStyles.textInput} required="true" />
      <input type="submit" value="Sign up" className={formStyles.button} />
    </form>
    <p className={formStyles.terms}>
      By signing up, you agree to our
      <span className={formStyles.newLine}>
        <span>Terms</span>
        {" "}&amp;{" "}
        <span>Privacy Policy</span>
        .
      </span>
    </p>
  </div>
);

export default SignupForm;