import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  donationsBase,
  paymentsBase,
  Views,
  fundingsBase,
  campaignsBase,
  PaymentStatus
} from '../../services/airtable';

const RZP_SECRET = process.env.NODE_ENV === 'development' ? process.env.RZP_TEST_SECRET : process.env.RZP_LIVE_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

async function updateStateInAirtable({ razorpay_order_id, razorpay_payment_id, status, campaign, isPayment }) {
  const query = {
    filterByFormula: `{order_id} = "${razorpay_order_id}"`,
    view: Views.grid,
  };

  const data = {
    status: status,
    payment_id: razorpay_payment_id || '',
  };

  if (campaign) {
    const [result] = await campaignsBase
      .select({
        filterByFormula: `{slug} = "${campaign}"`,
        view: Views.grid,
      })
      .firstPage();

    if (!result) {
      if (isPayment) {
        return updatePaymentBase({ razorpay_order_id, ...data });
      }
      return updateDonationBase({ razorpay_order_id, ...data });
    }

    const [record] = await fundingsBase.select(query).firstPage();
    if (!record.id) {
      return;
    }

    if (status !== PaymentStatus.captured) {
      return fundingsBase.update(record.id, data);
    }

    return Promise.all([
      fundingsBase.update(record.id, data),
      campaignsBase.update(result.id, {
        amount_raised: result.fields.amount_raised + record.fields.donated_amount,
        donations_count: result.fields.donations_count + 1,
      }),
    ]);
  } else if(isPayment) {
    return updatePaymentBase({ razorpay_order_id, ...data })
  }

  return updateDonationBase({ razorpay_order_id, ...data });
}

async function updatePaymentBase({ razorpay_order_id, status, payment_id = '' }) {
  const [record] = await paymentsBase
    .select({
      filterByFormula: `{order_id} = "${razorpay_order_id}"`,
      view: Views.grid,
    })
    .firstPage();
  if (!record.id) {
    return;
  }
  return paymentsBase.update(record.id, { status, payment_id });
}


async function updateDonationBase({ razorpay_order_id, status, payment_id = '' }) {
  const [record] = await donationsBase
    .select({
      filterByFormula: `{order_id} = "${razorpay_order_id}"`,
      view: Views.grid,
    })
    .firstPage();
  if (!record.id) {
    return;
  }
  return donationsBase.update(record.id, { status, payment_id });
}
