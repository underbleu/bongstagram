import React from "react";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

export const LoginForm = props => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input type="text" placeholder="Username" className={styles.textInput} required="true" />
      <input type="password" placeholder="Password" className={styles.textInput} required="true" />
      <input type="submit" value="Log in" className={styles.button} />
    </form>
      <span className={styles.divider}>or</span>
      <span className={styles.facebookLink}>
        <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
        Log in with Facebook
      </span>
      <span className={styles.forgotLink}>Forgot password?</span>
  </div>
);

export const SignupForm = props => (
  <div className={styles.formComponent}>
    <h2 className={styles.signupHeading}>Sign up to see photos and videos from your friends.</h2>
    <button className={styles.button}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#fff" />
      Log in with Facebook
    </button>
    <span className={styles.divider}>or</span>
    <form className={styles.form}>
      <input type="text" placeholder="Email" className={styles.textInput} required="true" />
      <input type="text" placeholder="Full Name" className={styles.textInput} required="true" />
      <input type="text" placeholder="Username" className={styles.textInput} required="true" />
      <input type="password" placeholder="Password" className={styles.textInput} required="true" />
      <input type="submit" value="Sign up" className={styles.button} />
    </form>
    <p className={styles.terms}>
      By signing up, you agree to our
      <span className={styles.newLine}>
        <span>Terms</span>
        {" "}&amp;{" "}
        <span>Privacy Policy</span>
        .
      </span>
    </p>
  </div>
);