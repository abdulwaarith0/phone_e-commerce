declare module '@stripe/stripe-js' {
  export function loadStripe(
    publishableKey: string,
    options?: {
      stripeAccount?: string;
      locale?: string;
    }
  ): Promise<Stripe | null>;

  export interface Stripe {
    // Stripe API methods
  }

  export interface StripeElementsOptions {
    // Stripe Elements options
  }
}

declare module '@stripe/react-stripe-js' {
  import React, { ComponentProps, ReactNode } from 'react';
  import { Stripe, StripeElementsOptions } from '@stripe/stripe-js';

  export function Elements({
    stripe,
    options,
    children,
  }: {
    stripe: Stripe | Promise<Stripe>;
    options?: StripeElementsOptions;
    children: ReactNode;
  }): React.ReactElement;

  export function useStripe(): Stripe | null;
//   export function useElements(): ReturnType<typeof useElements>;

  export interface CardElementProps extends ComponentProps<'div'> {
    // CardElement props
  }

  export const CardElement: React.FC<CardElementProps>;
}