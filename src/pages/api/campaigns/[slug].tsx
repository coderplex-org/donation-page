import { NextApiRequest, NextApiResponse } from 'next';

import { campaignsBase, fundingsBase, Views, PaymentStatus } from '../../../services/airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug: _slug } = req.query;
    if (!_slug) {
      throw new Error(`Campaign not found`);
    }

    const [result] = await campaignsBase
      .select({ view: Views.grid, filterByFormula: `{slug} = "${_slug}"` })
      .firstPage();
    if (!result) {
      throw new Error(`Campaign not found`);
    }
    const campaign = { id: result.id, ...result.fields };
    const fundingResults = await fundingsBase
      .select({ view: Views.grid, sort: [{ field: 'created_at', direction: 'desc' }] })
      .firstPage();
    const fundings = fundingResults
      .map(({ fields: { name, donated_amount, created_at, campaign, status }, id }) => ({
        name,
        donated_amount,
        created_at,
        campaign,
        status,
        id,
      }))
      .filter(({ campaign, status }) => campaign === _slug && status === PaymentStatus.captured);

    res.send({ ...campaign, fundings });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
