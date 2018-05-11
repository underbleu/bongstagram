import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h2 className={formStyles.signupHeading}>
      {context.t("Sign up to see photos and videos from your friends")}.
    </h2>
    <button className={formStyles.button}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#fff" />
      {context.t("Log in with Facebook")}
    </button>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input type="text"
        name="email"
        value={props.emailValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Mobile Number or Email")}
        className={formStyles.textInput}
        required="true" />
      <input type="text"
        name="fullname"
        value={props.fullnameValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Full Name")}
        className={formStyles.textInput}
        required="true" />
      <input type="text"
        name="username"
        value={props.usernameValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Username")}
        className={formStyles.textInput}
        required="true" />
      <input type="password"
        name="password"
        value={props.passwordValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        required="true" />
      <input type="submit"
        value={context.t("Sign up")}
        className={formStyles.button} />
    </form>
    <p className={formStyles.terms}>
      {context.t("By signing up, you agree to our")}
      <span className={formStyles.newLine}>
        <span>{context.t("Terms")}</span>
        {" "}{context.t("&amp;")}{" "}
        <span>{context.t("Privacy Policy")}</span>
        .
      </span>
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  fullnameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;