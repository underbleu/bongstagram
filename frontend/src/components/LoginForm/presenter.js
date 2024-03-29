import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <div className={formStyles.wallet}>
        <Ionicon icon="md-mail-open" fontSize="28px" color="#999" />
        {props.walletAddressValue ? props.walletAddressValue : "Login with MethMask !"}
      </div>
      
      <input
        type="text"
        name="username"
        value={props.usernameValue}
        onChange={props.handleInputChange}
        placeholder={context.t("Phone number, username, or email")}
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
          value={context.t("Log in")}
          className={formStyles.button}
        />
      </div>
    </form>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <FacebookLogin
      appId="1748996755157174"
      autoLoad={false}
      callback={props.handleFacebookLogin}
      cssClass={formStyles.facebookLink}
      icon="fa-facebook-official"
      textButton={context.t("Log in with Facebook")}
    />
    <span className={formStyles.forgotLink}>
      {context.t("Forgot password?")}
    </span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;