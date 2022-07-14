import React, { Component } from "react";
import Burger from '../Burger/Burger'
import BuildControls from '../Burger/BuildControls/BuildControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 40,
  cheese: 20,
  meat: 80
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 50,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    axios.get('ingredients.json')
      .then(resp => {
        this.setState({ingredients: resp.data});
      })
      .catch(err => {
        this.setState({error: true});
      });
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      },0)
    this.setState({purchasable: sum > 0})
  }

  addedIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removedIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount == 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinue = () => {
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] == 0
    }

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <div>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addedIngredientHandler}
            ingredientRemoved={this.removedIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </div>
      )
      orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinue}
      price={this.state.totalPrice.toFixed(2)} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
