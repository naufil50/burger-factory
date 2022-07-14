import React, { Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import ContactData from "./Checkout/ContactData/ContactData";

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkout/contact-data" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
