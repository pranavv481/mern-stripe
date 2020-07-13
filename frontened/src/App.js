import React, { useState } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
function App() {
  const [product, setProduct] = useState({
    name: 'React from FB',
    price: 10,
    productBy: 'facebook',
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch(`http://localhost:5000/payment`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('Response', response);
        const { status } = response;
        console.log('status', status);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          token={makePayment}
          stripeKey="pk_test_51H4NclGVlmlKnZnYif1ujboHyCufE6bIRsRQlWA5H9sE6wEZLxxxke4kNww8NdFhcVVXXV038VmmS3Pp9oMstGeM00CcW4cbFU"
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large blue">
            Buy ticket is just {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
