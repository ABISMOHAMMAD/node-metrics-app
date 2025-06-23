const express = require('express');
const client = require('prom-client');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: 'my_custom_counter',
  help: 'Example of a custom counter'
});

app.get('/', (req, res) => {
  counter.inc();
  res.send('Hello, world!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});

