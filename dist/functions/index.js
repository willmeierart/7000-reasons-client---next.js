"use strict";

const functions = require("firebase-functions");
const nextApp = require("next");

var dev = process.env.NODE_ENV !== "production";
var app = nextApp({ dev, conf: { distDir: "next" } });
var handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});
// const functions = require("firebase-functions")

// const express = require('express')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev, conf: { distDir: 'next' } })
// const port = process.env.PORT || 3000
// const handle = app.getRequestHandler()

// exports.next = functions.https.onRequest((req, res) => {
//   console.log('file: ' + req.originalUrl)
//   return app.prepare()
//     .then(() => {
//       const server = express()
//       server.use('/static', express.static('static'))

//       server.get('/artists/:slug', (req, res) => {
//         return app.render(req, res, '/artist', { slug: req.params.slug })
//       })

//       server.get('/about', (req, res) => {
//         return app.render(req, res, '/about')
//       })

//       server.get('/shop', (req, res) => {
//         return app.render(req, res, '/shop')
//       })

//       server.get('*', (req, res) => {
//         return handle(req, res)
//         // return app.render(req, res, '/', req.query)
//       })

//       server.listen(port, (err) => {
//         if (err) throw err
//         console.log(`> Ready on http://localhost:${port}`)
//       })
//     })
// })