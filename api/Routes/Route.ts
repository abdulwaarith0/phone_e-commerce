import express from 'express';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe('sk_test_51PgltaKwA1hJgAYJrtaFFTUs3scQLatSGHCyCLg8Si81gC4SrPe1OWKFsK9InU3yBJ3dl0Z5WbREKHf3o4ZzFLr400jI48Mzty');

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { products } = req.body;
    const totalAmount = products.reduce((total, product) => total + product.price, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe requires the amount in cents
      currency: 'usd',
    });

    console.log('Client secret:', paymentIntent.client_secret);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'An error occurred while creating the payment intent' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});