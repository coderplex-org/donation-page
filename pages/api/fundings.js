import { fundingsBase } from '../../services/airtable';

async function getFundings(slug, res) {
  var result = [];
  await fundingsBase
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, nextPage) {
        if (!slug) {
          const err = new Error('Slug required to fetch the fundings');
          console.error(err);
          res.send({ error: true, message: err.message });
        }
        records = records
          .map(({ _rawJson: { id, createdTime, fields } }) => ({
            id,
            createdTime,
            ...fields,
          }))
          .filter(record => record.campaign_slug === slug);
        result = result.concat(records);
        nextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.send({ error: true, message: err.message });
        } else {
          res.send({ fundings: result });
        }
      }
    );
}

async function postFunding(fields, res) {
  fundingsBase.create([{ fields }], function(err, records) {
    if (err) {
      console.error(err);
      res.send({ error: true, message: err });
      return;
    }
    res.send({ created: records });
  });
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        getFundings(req.query.slug, res);
        break;
      case 'POST':
        postFunding(req.body, res);
        break;
      default:
        res.send({ error: `${req.method} operation not allowed` });
    }
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}
