const crypto = require('crypto');
import { donationsBase } from '../../services/airtable';

const rzpCredentials = {
  key_id: `rzp_live_NNM9DbPxGLCoNV`,
  key_secret: `b3LcIImih14EGfELhgUZGWom`,
};

const rzpTestCredentials = {
  key_id: `rzp_test_FEPb74blpXOIIf`,
  key_secret: `fguOShIqgV49u6ewLZBf29Q4`,
};

export default async function handler(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, status } = req.body;
    if (status !== 'captured') {
      updateStateInAirtable(req.body);
      return res.send({ success: true });
    }

    const generatedSignature = crypto
      .createHmac('SHA256', rzpTestCredentials.key_secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (razorpay_signature !== generatedSignature) {
      updateStateInAirtable({ ...req.body, status: 'failed' });
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
  return donationsBase.update(record.id, {
    Status: status,
    'Payment Id': razorpay_payment_id || '',
  });
}
