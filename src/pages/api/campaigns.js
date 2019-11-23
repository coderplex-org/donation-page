import { campaignsBase } from '../../services/airtable';

async function getCampaigns(slug, res) {
  campaignsBase
    .select({
      view: 'Grid view',
    })
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
        res.send({ error: true });
      }
      records = records
        .map(({ _rawJson: { id, createdTime, fields } }) => ({ id, createdTime, ...fields }))
        .filter(campaign => campaign.active);
      if (slug) {
        records = records.filter(record => record.slug === slug);
        res.send({ campaign: records[0] });
      } else {
        res.send({ campaigns: records });
      }
    });
}

async function postCampaign(fields, res) {
  campaignsBase.create([{ fields }], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(record => {
      //TODO do something here
    });
  });
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        getCampaigns(req.query.slug, res);
        break;
      case 'POST':
        postCampaign(res);
        break;
      default:
        res.send({ error: `${req.method} operation not allowed` });
    }
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}
