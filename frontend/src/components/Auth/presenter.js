import React from "react";
import styles from "./styles.scss";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <article className={styles.wrapper}>
      <div className={styles.column}>
        <div className={styles.screen}>
          <img
            src={require("images/screen01.jpg")}
            alt="iphone screen01"
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.whiteBox}>
          <h1 className={styles.authHeading}>Bongstagram</h1>
        </div>
        <div className={styles.whiteBox}>
          {(() => {
            switch (props.action) {
              case "login":
                return (
                  <p>
                    Don't have an account?{" "}
                    <span className={styles.changeLink} onClick={props.changeAction}>Sign up</span>
                  </p>
                );
              case "signup":
                return (
                  <p>
                    Have an account?{" "}
                    <span className={styles.changeLink} onClick={props.changeAction}>Login</span>
                  </p>
                );
              default:
                return null;
            }
          })()}
        </div>
        <div className={styles.appBox}>
          <p>Get the app.</p>
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