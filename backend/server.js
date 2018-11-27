let http = require('http');
var querystring = require('querystring');

let server = http.createServer((req, res) => {
    let main = require('./main.js');
    let postStr = '';
    req.on('data', (data) => {
        postStr += data;
        if (postStr.length > 2 * 1024 * 1024) {
            req.connection.destroy();
        }
    });
    req.on('end', function () {
        let queryStr = req.url.split('?')[1] || '';
        postStr = postStr || queryStr;
        let requestData;
        try {
            requestData = JSON.parse(postStr);
        } catch (exc) {
            requestData = querystring.parse(postStr);
        }
        res.setHeader('Content-Type', 'application/json');

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        main.processRequest(requestData)
            .then(responseData => {
                res.statusCode = 200;
                res.end(JSON.stringify(Object.assign({message: 'ok'}, responseData)));
            }).catch(error => {
            res.statusCode = req.method === 'OPTIONS' ? 200 : 500; // preflight OPTIONS request, damn it
            res.end(JSON.stringify({error: error + '', errorClass: error.constructor.name, stack: error.stack || null}));
        });
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log(`Server running`);
});