import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const Card = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const price = location.state?.price;
  const user_id = location.state?.user_id;
  const course_id = location.state?.course_id;

  const onToken = (token) => {

    var today = new Date();
    var enrollment_date = today.getDate()+ '-' + (today.getMonth()+1)+'-' + today.getFullYear();
    var status = 'incomplete';

    const enrollment_info = {
        user_id,
        course_id,
        enrollment_date,
        status
    };

    fetch(`http://localhost:4000/Courses/${course_id}/Payment`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(enrollment_info)
    }).then(response => response.json()).then(status => {
    navigate(-1);
    });

}
      
  return (
    <div>
        <h1 className='page-header'>Card Payment</h1>
        <StripeCheckout
            token={onToken}
            currency="USD"
            amount={parseFloat(price+"00")}
            stripeKey="pk_test_51L5kLeIgGjqjiPQ3sVdylSFaKhr0asUDCUq76c4DasTWeDG11OksoWcsLNs9YjTx4btPJxd4md6SUgP7e5WRvAjY00Lz4AQ9vK"
        />
    </div>
  )
}

export default Card;