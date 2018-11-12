const path      = require('path');
const express   = require('express');
const server    = express();
const port      = 8080;

// load index.html on 127.0.0.1:8080/
server.get( '/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
} );

// make static url to access scripts through html templates like 'src="./scripts/test.js"'
server.use('/scripts', express.static(path.join(__dirname + '/scripts')));

server.listen(port, () => {
    console.log(`server is running on ${port} port!`);
});