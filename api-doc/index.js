const fs = require('fs');
const path = require('path');
const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');

const options = {};

try {
  const filename = path.join(__dirname, 'swagger.yaml');
  const contents = fs.readFileSync(filename, 'utf8');
  const swaggerDocument = yaml.load(contents);
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
} catch (err) {
  console.log(err.stack || String(err));
}

const port = process.env.SWAGGER_PORT || 3003;
console.log(`Open swagger docs at http://localhost:${port}/`);
app.listen(port);