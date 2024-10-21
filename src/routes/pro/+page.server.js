import { STRIPE_PUBLISHABLE_KEY } from '$env/static/private'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  STRIPE_PUBLISHABLE_KEY
);
