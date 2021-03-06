import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'



class ContactData extends Component {

  state  = {
    name: '',
    email: '',
    address: {
        street: '',
        postalCode: ''
    },
    loading: false
  }

  orderHandler (event) {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Naufil Kharbe',
        address: {
          street: 'House No 6',
          zipCode: '412302',
          country: 'India'
        },
        email: 'naufil50@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(resp =>
        { this.setState({ loading: false })
        // this.props.history.push('/');
      })
      .catch(err =>
        { this.setState({ loading: false })
      })
  }

  render() {

    let form = (<form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name"  />
      <input className={classes.Input} type="email" name="name" placeholder="Your email"  />
      <input className={classes.Input} type="text" name="street" placeholder="Street"  />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal"  />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
     );
  }
}

export default ContactData;