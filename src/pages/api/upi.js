import { getURL } from '../../utils';

export default (req, res) => {
  try {
    const url = getURL(req.query);
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
