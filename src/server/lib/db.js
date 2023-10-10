// global
const Knex = require('knex');
const rfr = require('rfr');
// local
const Config = rfr('src/server/config');
// init the database connection
module.exports = Knex(Config.database);
