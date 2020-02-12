import Razorpay from 'razorpay';
import cuid from 'cuid';
import { NextApiRequest, NextApiResponse } from 'next';

import { donationsBase, PaymentStatus, fundingsBase, paymentsBase } from '../../services/airtable';
import { getFinalAmount } from '../../utils';

const RZP_KEY = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_KEY : process.env.RZP_LIVE_KEY;

const RZP_SECRET = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_SECRET : process.env.RZP_LIVE_SECRET;

const rzpCredentials = {
  key_id: RZP_KEY,
  key_secret: RZP_SECRET,
};

const razorpay = new Razorpay(rzpCredentials);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      email,
      name,
      amount,
      hours_spent,
      hours_spent_cost,
      tip,
      phone,
      paymentMethod = 'Razorpay',
      campaign,
      isPayment,
    } = req.body;
    const id = cuid();
    const data: { id: string; status: PaymentStatus } = await razorpay.orders.create({
      amount: getFinalAmount(Number(amount)) * 100, // in paise
      currency: 'INR',
      receipt: id,
      payment_capture: true,
      notes: {
        email,
        phone,
        name,
        campaign,
        isPayment,
      },
    });
    if (campaign) {
      await fundingsBase.create(
        {
          id,
          name,
          email,
          phone,
          campaign,
          donated_amount: Number(amount),
          payment_method: paymentMethod,
          status: PaymentStatus.created,
          order_id: data.id,
          created_at: Date.now(),
        },
        { typecast: true }
      );
    } else if (isPayment) {
      await paymentsBase.create(
        {
          id,
          name,
          email,
          phone,
          hours_spent: Number(hours_spent),
          hours_spent_cost: Number(hours_spent_cost),
          tip: Number(tip),
          paid_amount: Number(amount),
          payment_method: paymentMethod,
          status: PaymentStatus.created,
          order_id: data.id,
          created_at: new Date().toISOString(),
        },
        { typecast: true }
      );
    } else {
      await donationsBase.create(
        {
          id,
          name,
          email,
          phone,
          donated_amount: Number(amount),
          payment_method: paymentMethod,
          status: PaymentStatus.created,
          order_id: data.id,
          created_at: Date.now(),
        },
        { typecast: true }
      );
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}
