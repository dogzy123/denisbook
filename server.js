const path      = require('path');
const express   = require('express');
const server    = express();
const config    = require('./server.config');

// make static url to access scripts through html templates like 'src="./scripts/test.js"'
server.use('/src', express.static(path.join(__dirname + '/src')));

// load index.html on 127.0.0.1:8080/
server.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
} );

server.listen(config.port, () => {
    console.log(`server is running on ${config.port} port!`);
});