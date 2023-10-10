// global
const fs = require('fs');
const rfr = require('rfr');
const Path = require('path');

/**
 * capitalize should return the string passed with the first letter uppercased.
 */
function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

module.exports = dir => {
    // Root path to the directory
    const root = Path.resolve(dir);
    // read the files dir
    let files = fs.readdirSync(root);
    // filter some files
    files = files.filter(file => file !== 'index.js');
    const methods = {};
    const constants = {};
    // import each file
    files.forEach(file => {
        const path = Path.resolve(root, file);
        const include = require(path);
        if (typeof include === 'function') {
            // if the imported file is a method
            methods[include.name] = include;
        } else if (typeof include === 'object') {
            // if the imported file is a set of constants
            Object.keys(include).forEach(key => {
                constants[key] = include[key];
            });
        }
    });
    /**
     * Api builder.
     */
    class Api {
        /**
         * Constructor used to creat an API object with the database object.
         * - If the database object is not received, it will create one.
         * @param {DatabaseObject} knex Used to make database queries.
         * @param {Account} account Used to identify the current user.
         */
        constructor(knex = null, currentUser = null) {
            // if there is no database create
            if (!knex) {
                knex = rfr('server/lib/db');
            }
            // set the connection to the API
            this.knex = knex;
            this.currentUser = currentUser;

            // add each constants to the Api as class properties
            Object.keys(constants).forEach(key => (this[key] = constants[key]));
        }
    }
    // add each constants to the Api as static caller
    Object.keys(constants).forEach(key => (Api[key] = constants[key]));
    // add each method to the Api
    Object.keys(methods).forEach(key => (Api.prototype[key] = methods[key]));
    // Force name to be writable
    Object.defineProperty(Api, 'name', { writable: true });
    // Update object name
    Api.name = capitalize(Path.basename(dir));
    return Api;
};
