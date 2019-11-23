const crypto = require('crypto');
import { donationsBase } from '../../services/airtable';

const RZP_SECRET = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_SECRET : process.env.RZP_LIVE_SECRET;

export default async function handler(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, status } = req.body;
    if (status !== 'captured') {
      await updateStateInAirtable(req.body);
      return res.send({ success: true });
    }

    const generatedSignature = crypto
      .createHmac('SHA256', RZP_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (razorpay_signature !== generatedSignature) {
      await updateStateInAirtable({ ...req.body, status: 'failed' });
      return res.send({ success: true });
    }

    await updateStateInAirtable(req.body);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}

async function updateStateInAirtable({ razorpay_order_id, razorpay_payment_id, status }) {
  const [record] = await donationsBase
    .select({
      filterByFormula: `{OrderId} = "${razorpay_order_id}"`,
      view: 'table',
    })
    .firstPage();
  if (!record.id) {
    return;
  }
  return donationsBase.update(record.id, {
    Status: status,
    'Payment Id': razorpay_payment_id || '',
  });
}
