import React, { Component } from 'react';
import Shelf from './Shelf';

class Cart extends Component {

  render() {
    const cartItems = this.props.cart.map((item,index)=>{
      return <li key={index}>{item}</li>;
    });
    return(
      <div>
        <Shelf addItem={this.props.actions.addToCart} />
        <h2> Cart Items </h2>
        {cartItems}
      </div>
    )
  }
}

export default Cart;
