import { URL } from 'url';
import { Razorpay } from './rzp';

declare global {
  namespace NodeJS {
    interface Global {
      URL: typeof URL;
    }
  }
  interface Window {
    Razorpay: typeof Razorpay;
  }
}
