import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <article className={styles.wrapper}>
      <div className={styles.column}>
        <div className={styles.screen}>
          <img src={require("images/screen01.jpg")} alt="iphone screen01" />
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.whiteBox} ${styles.formBox}`}>
          <h1 className={styles.authHeading}>Bongstagram</h1>
          {props.action === "login" && <LoginForm />}
          {props.action === "signup" && <SignupForm />}
        </div>
        <div className={styles.whiteBox}>
          {props.action === "login" && (
            <p className={styles.text}>
              Don't have an account?{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                Sign up
              </span>
            </p>
          )}
          {props.action === "signup" && (
            <p className={styles.text}>
              Have an account?{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                Login
              </span>
            </p>
          )}
        </div>
        <div className={styles.appBox}>
          <p className={styles.text}>Get the app.</p>
          <div className={styles.apps}>
            <img
              src={require("images/ios.png")}
              alt="Download app in Apple Store"
            />
            <img
              src={require("images/android.png")}
              alt="Download app in Google Store"
            />
          </div>
        </div>
      </div>
    </article>
  </main>
);

export default Auth;