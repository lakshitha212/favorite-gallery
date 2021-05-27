module.exports = function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        'Authorization': req.get('Authorization')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        // here you can define period in second, this one is 5 minutes
        const period = 60 * 5
        if (req.method == 'GET') {
          res.set('Cache-control', `public, max-age=${period}`)
        } else {
          // for the other requests set strict no caching parameters
          res.set('Cache-control', `no-store`)
        }

        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(e => res.status(500).send({ error: 'An unkown error occurred.' }))
  }
}