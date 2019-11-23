import Razorpay from 'razorpay';
import cuid from 'cuid';

import { donationsBase } from '../../services/airtable';

const RZP_KEY = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_KEY : process.env.RZP_LIVE_KEY;

const RZP_SECRET = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_SECRET : process.env.RZP_LIVE_SECRET;

const rzpCredentials = {
  key_id: RZP_KEY,
  key_secret: RZP_SECRET,
};

const razorpay = new Razorpay(rzpCredentials);

export default async function handler(req, res) {
  try {
    const { email, amount, phone, paymentMethod = 'Razorpay' } = req.body;
    const id = cuid();
    const data = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: id,
      payment_capture: true,
      notes: {
        email,
        phone,
      },
    });
    if (req.query.donate) {
      await donationsBase.create({
        id,
        Email: email,
        Phone: phone,
        'Donated Amount': Number(amount),
        'Payment Method': paymentMethod,
        Date: new Date(),
        OrderId: data.id,
        Status: data.status,
      });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}
