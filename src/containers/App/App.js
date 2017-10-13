// @flow
// global localStorage, window
import * as React from "react";
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from "components/Header";
import Footer from "components/Footer";
import Menu from "components/Menu";
import Modal from "util/component-utils/Modal";

// import Login from "routes/Login";
// import Signup from "routes/Signup";
import About from "routes/About";
import Faq from "routes/Faq";
import Transfer from "routes/Transfer";
import Transactions from "routes/Transactions";
import Users from "routes/Users";
import Profile from "routes/Profile";
import Permissions from "routes/Permissions";
import Preferences from "routes/Preferences";
import NoMatch from "routes/NoMatch";


import {
  toggleMenu,
  closeMenu,
  routeLoad
} from "./actions";

import "./App.scss";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    /* eslint-disable */
    this.previousLocation = this.unauthLocation = {
      pathname: '/about',
      hash: '',
      search: '',
    };
    /* eslint-enable */
  }

  componentWillUpdate(nextProps) {
    const { auth, location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = auth ? this.props.location : this.unauthLocation;
    }
  }

  handleModalClose() {
    const { history } = this.props;
    history.push(this.previousLocation);
  }

  render() {
    const {
      isModalOpen,
    } = this.props;
    const renderRoute = () => {};
    const handleModalClose = this.handleModalClose.bind(this);
    // const isModal = modalRoutes.some(({ path }) => new RegExp(path).test(location.pathname));

    return (
      <main>
        <Helmet titleTemplate="%s | EOS Wallet" defaultTitle="EOS Wallet" />
    
        <Header />
        
        <section className="columns is-variable is-0">
          <div className="column is-narrow is-hidden-mobile">
            <Menu />
          </div>
    
          <div className="column">
            <div  
              onClick={closeMenu}
              className="menu-closer"
              role="button"
              tabIndex="0" />

            <Switch>
              <Route path="/about" component={About} />
              <Route path="/faq" component={Faq} />
              <Route path="/" exact component={Transfer} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/users" component={Users} />
              <Route path="/user/:id" component={Profile} />
              <Route path="/permissions" component={Permissions} />
              <Route path="/preferences" component={Preferences} />
              <Route path="*" component={NoMatch} />
            </Switch>
    
            <Footer />
          </div>
        </section>
    
        {/* <Route path="/login" exact component={Login} /> */}
        {/* <Route path="/signup" exact component={Signup} /> */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          renderRoute={renderRoute} />
      </main>
    );
  }
}

export default App;
