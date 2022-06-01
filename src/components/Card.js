import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Card = () => {

  const onToken = (token) => {
      console.log(token);
  }
      
  return (
    <div>
        <h1 className='page-header'>Card Payment</h1>
        <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51L5kLeIgGjqjiPQ3sVdylSFaKhr0asUDCUq76c4DasTWeDG11OksoWcsLNs9YjTx4btPJxd4md6SUgP7e5WRvAjY00Lz4AQ9vK"
          />
    </div>
  )
}

export default Card;