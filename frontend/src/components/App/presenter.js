import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";

const App = props => [
  // 1. Nav
  // 2. Routes
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  // 3. Footer
  <Footer key={3} />
];

App.PropTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" render={() => "feed"} />
    <Route path="/explore" render={() => "explore "} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route path="/" component={Auth} />
    <Route path="/forget" render={() => "password"} />
  </Switch>
);

export default App;