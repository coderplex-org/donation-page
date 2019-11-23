import { getUPIUrl } from '../../utils';

export default (req, res) => {
  try {
    const url = getUPIUrl(req.query);
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
