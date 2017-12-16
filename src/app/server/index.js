const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use('/static', express.static('static'))

    server.get('/artists/:slug', (req, res) => {
      return app.render(req, res, '/artist', { slug: req.params.slug })
    })

    server.get('/about', (req, res) => {
      return app.render(req, res, '/about')
    })

    server.get('/shop', (req, res) => {
      return app.render(req, res, '/shop')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
      // return app.render(req, res, '/', req.query)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
