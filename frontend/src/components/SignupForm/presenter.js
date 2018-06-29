import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h2 className={formStyles.signupHeading}>
      {context.t("Sign up to see photos and videos from your friends")}.
    </h2>
    <div className={formStyles.buttonBox}>
      <FacebookLogin
        appId="1748996755157174"
        autoLoad={false}
        callback={props.handleFacebookLogin}
        cssClass={formStyles.button}
        icon="fa-facebook-official"
        textButton={context.t("Log in with Facebook")}
      />
    </div>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      {/* <input
        type="text"
        name="walletAddress"
        value={props.walletAddressValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Login with Metamask")}
        className={formStyles.textInput}
        required="true"
      /> */}
      <div className={formStyles.wallet}>
        <Ionicon icon="md-mail-open" fontSize="28px" color="#999" />
        {props.walletAddressValue ? props.walletAddressValue : "Login with MethMask !"}
      </div>
      <input
        type="text"
        name="email"
        value={props.emailValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Mobile Number or Email")}
        className={formStyles.textInput}
        required="true"
      />
      <input
        type="text"
        name="name"
        value={props.nameValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Full Name")}
        className={formStyles.textInput}
        required="true"
      />
      <input
        type="text"
        name="username"
        value={props.usernameValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Username")}
        className={formStyles.textInput}
        required="true"
      />
      <input
        type="password"
        name="password"
        value={props.passwordValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        required="true"
      />
      <div className={formStyles.buttonBox}>
        <input
          type="submit"
          value={context.t("Sign up")}
          className={formStyles.button}
        />
      </div>
    </form>
    <p className={formStyles.terms}>
      {context.t("By signing up, you agree to our")}
      <span className={formStyles.newLine}>
        <span>{context.t("Terms &")}</span>{" "}
        <span>{context.t(" Privacy Policy")}</span>
        .
      </span>
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;