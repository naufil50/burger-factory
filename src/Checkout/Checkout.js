import React, { Component } from 'react';
import CheckoutSummary from '../components/CheckoutSummary/CheckoutSummary';

class checkout extends Component {
  state = {
    ingredients: null
  }


  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}/>
      </div>
     );
  }
}

export default checkout;