// global
const JWT = require('jsonwebtoken');
const rfr = require('rfr');
// local
const Errors = rfr('src/server/lib/errors');
const Config = rfr('src/server/config');

/**
 * create must:
 * - generate a jwt with an expire date.
 */
exports.create = (data, expiresIn = `${Config.jwt.expires.time}${Config.jwt.expires.format}`) => {
    console.log('lib - JWT - create');
    // json web token options
    const options = {
        algorithm: 'HS512',
        expiresIn: expiresIn,
    };

    return JWT.sign(data, Config.jwt.token, options);
};

/**
 * verify must:
 * - check if a token is valid using the default config.
 * - also check if the token expired
 * - throw an UNAUTHORIZED error if it's not.
 */
exports.verify = token => {
    console.log('lib - JWT - verify');
    try {
        JWT.verify(token, Config.jwt.token);
    } catch (err) {
        throw Errors.UNAUTHORIZED();
    }
};
