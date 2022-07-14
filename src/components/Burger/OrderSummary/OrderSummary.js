import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    })
  return (
    <div>
      <h3>Your Order</h3>
      <p>Delicious Burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
    </div>
   );
}

export default orderSummary;