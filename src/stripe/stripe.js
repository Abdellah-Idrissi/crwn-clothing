import { loadStripe } from "@stripe/stripe-js";

export let stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)