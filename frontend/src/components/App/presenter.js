import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";
import Navigation from "components/Navigation";
import Feed from "components/Feed";
import Explore from "components/Explore";
import Search from "components/Search";
import UploadPhoto from "components/UploadPhoto";
import Loading from "components/Loading";

const App = props => {
 
  if (props.walletLoading) return <Loading />;
  
  return [
    props.isLoggedIn ? <Navigation key={1} /> : null,
    props.isLoggedIn ? <UploadPhoto key={3} /> : null,
    props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
    <Footer key={4} />
  ]
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search/:searchTerm" component={Search} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route path="/forget" render={() => "password"} />
    <Route path="/" component={Auth} />
  </Switch>
);

export default App;