interface RzpOptions {
  key: string;
  amount: number; // in paisa
  order_id: string | number;
  name: string;
  description: string;
  image?: string;
  prefill?: { email?: string; contact?: string };
  theme?: { color?: string };
  method?: { netbanking?: boolean; card?: boolean; wallet?: boolean; upi?: boolean };
  handler?: (res: {
    razorpay_order_id: string | number;
    razorpay_payment_id: string | number;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss: () => void;
  };
}

export class Razorpay {
  constructor(options: RzpOptions);
  open(): void;
}
