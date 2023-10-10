// global
const rfr = require('rfr');
const app = require('./app');
// local
const { backend } = rfr('src/server/config');

// start the expresse server
app.listen(backend.port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server running http://${backend.host}:${backend.port}/`);
    }
});
