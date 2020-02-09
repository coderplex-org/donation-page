import { RZP_KEY, DEFAULT_TITLE, DEFAULT_DESCRIPTION, CODERPLEX_LOGO, THEME_COLOR } from '../constants';
import { RzpResponse } from '../../types/rzp';
import { getFinalAmount } from '../utils';

interface RzpData {
  name: string;
  email: string;
  amount: number;
  phone: string;
  campaign?: string;
  isPayment?: boolean;
}

async function getOrderId(data: RzpData) {
  return fetch(`/api/rzp`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}

async function updateStatus(data) {
  return fetch(`/api/rzp-status`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function openRzp(data: RzpData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, phone, amount } = data;
      const order = await getOrderId(data);
      const options = {
        key: RZP_KEY,
        amount: getFinalAmount(amount) * 100, // in paisa
        order_id: order.id,
        name: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: CODERPLEX_LOGO,
        handler: async (res: RzpResponse) => {
          try {
            await updateStatus({ ...res, status: 'captured', campaign: data.campaign, isPayment: data.isPayment });
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: async () => {
            await updateStatus({
              razorpay_order_id: order.id,
              status: 'failed',
              campaign: data.campaign,
              isPayment: data.isPayment
            });
            reject(new Error(`Payment widget is closed without completing payment. Please try again!`));
          },
        },
        prefill: {
          email,
          contact: phone,
        },
        theme: {
          color: THEME_COLOR,
        },
        method: {
          netbanking: true,
          card: true,
          wallet: true,
          upi: true,
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      reject(error);
    }
  });
}
