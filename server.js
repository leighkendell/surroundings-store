const express = require('express');
const next = require('next');
const { join } = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/product/:id', (req, res) => {
      const actualPage = '/product';
      const queryParams = { handle: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/product', (req, res) => {
      res.redirect(301, '/');
    });

    // Serve the service-worker.js required for workbox
    server.get('/service-worker.js', ServiceWorker());

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) { throw err }
    });
  })
  .catch(() => {
    process.exit(1);
  });

const ServiceWorker = () => (req, res) => {
  const filePath = join(__dirname, '.next', 'service-worker.js');
  app.serveStatic(req, res, filePath);
};
