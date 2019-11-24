import { NextApiRequest, NextApiResponse } from 'next';

import { campaignsBase, Views } from '../../../services/airtable';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await campaignsBase
      .select({ view: Views.grid, sort: [{ field: 'created_at', direction: 'desc' }] })
      .firstPage();
    const campaigns = results.map(({ fields, id }) => ({ ...fields, id })).filter(({ is_active }) => is_active);
    res.send(campaigns);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
