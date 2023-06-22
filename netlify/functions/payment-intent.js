import 'dotenv/config'
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async(request) => {
  try {
    let {amount} = JSON.parse(request.body)
    
    let paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // L amount always kndrboh f 100 
      currency:'mad', // Hna kn7ado l currency which could USD MAD li bghina
      payment_method_types:['card']
    })

    return {
      statusCode:200,
      body: JSON.stringify({paymentIntent})
    }

  }

  catch(error) {
    console.log(`Error happend while creating the paymentIntent : ${error.message}`)
    return {
      statusCode:400,
    }
  }
  
}

