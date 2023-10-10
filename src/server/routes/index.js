// global
const fs = require('fs');
const Path = require('path');

/**
 * Wrapper for including all files under this folder that will be root for each individual path.
 *
 * @param  {Object} app      ExpressJS object.
 */
module.exports = app => {
    let rootPath = __dirname;
    // read all files from this directory
    let files = fs.readdirSync(rootPath);
    // remove this file
    files = files.filter(file => file !== 'index.js');
    // import each file
    files.forEach(file => {
        let path = Path.resolve(rootPath, file);
        let module = require(path);
        app.use(module.path, module.router);
    });
};
