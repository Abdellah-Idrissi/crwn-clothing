/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Button from "./Button"
import { toast } from "react-toastify"
import { useState } from "react"

function PaymentForm({amount}) {

  let stripe = useStripe()
  let elements = useElements()
  let [isPaymentProccessing,setIsPaymentProccessing] = useState(false)
  
  let handlePayment = async ()=> {
    if (!stripe || !elements) {
      return;
    }

    const options = {
      method:'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({amount})
    }

    setIsPaymentProccessing(true)
    let response = await fetch('/.netlify/functions/payment-intent',options).then(resp=> resp.json())

    let client_secret = response.paymentIntent.client_secret

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'abdo',
        },
      }
    })

    if(result.error) {
      toast.error(result.error.message)
    }
    else if(result.paymentIntent.status === 'succeeded') {
      toast.success('payment succeedd')
    }

    setIsPaymentProccessing(false)

  }


  return (
    <div  className="max-w-[400px] mx-auto my-7 flex flex-col gap-y-5">
      <CardElement/>
      <Button btnType='first' loadingState={isPaymentProccessing} onClick={handlePayment}>
        {isPaymentProccessing ? 'PAYING...' : 'PAY'}
      </Button>
    </div>
  )
}

export default PaymentForm