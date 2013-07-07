var app     = require('express')(),
    sermons = require('./sermons'),
    config  = require('./config');

sermons.init();    
 
app.get('/sermons', function(req, res) {
    sermons.fetch(req.query.hash, function(data) {
       res.type('application/json').send(200, data); 
    });
});

app.get('/', function(req, res) {
    res.type('application/json').send(200, {
        "ccsj":true, 
        date: new Date().toISOString()
    }); 
});
 
app.listen(config.port);
console.dir("Started App to listen on port " + config.port);