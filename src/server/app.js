// global
const express = require('express');
const cors = require('cors');
const rfr = require('rfr');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json')

// init the express server
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
// routes
rfr('src/server/routes')(app);

module.exports = app;
