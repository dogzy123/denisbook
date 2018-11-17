let http = require('http');

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
    let requestData;
    try {
      requestData = JSON.parse(postStr);
    } catch (exc) {
      requestData = {};
    }
    res.setHeader('Content-Type', 'application/json');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://midiana.lv');

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
        res.end(JSON.stringify(responseData));
      }).catch(error => {
        res.statusCode = 200; // preflight OPTIONS request, damn it
        res.end(JSON.stringify({error: error}));
      });
  });
});

server.listen(8080, '0.0.0.0', () => {
  console.log(`Server running`);
});