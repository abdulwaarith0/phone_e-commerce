import { Handler, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import Stripe from 'stripe';

const stripe = new Stripe("pk_test_51PgltaKwA1hJgAYJVN6qa5sOAWJ7oBaweR98WdE5uiF7tK9LLgPOCVBqXtp6l4QXN0utaORu1BvaN5pofC0tdyCW00gJbOupMz");

const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'POST') {
    try {
      const { products } = JSON.parse(event.body || '{}');
      const totalAmount = products.reduce((total, product) => total + product.total, 0);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'usd',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred while creating the payment intent' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }
};

export { handler };