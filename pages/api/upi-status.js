import { donationsBase } from '../../services/airtable';
import cuid from 'cuid';

export default async function handler(req, res) {
  try {
    const { email, amount, phone, paymentMethod = 'UPI' } = req.body;
    const id = cuid();
    await donationsBase.create({
      id,
      Email: email,
      Phone: phone,
      'Donated Amount': Number(amount),
      'Payment Method': paymentMethod,
      Date: new Date(),
      Status: 'unknown',
    });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}
