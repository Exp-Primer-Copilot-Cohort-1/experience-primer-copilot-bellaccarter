//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 8080;
var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname, query = url.parse(req.url).query;
    var query = qs.parse(query);
    //console.log(uri);
    //console.log(query);
    if (uri == '/comments.json') {
        var comments = [];
        fs.readFile('comments.json', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                comments = JSON.parse(data);
                //console.log(comments);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(comments));
                res.end();
            }
        });
    }
    else if (uri == '/addComment') {
        var comments = [];
        fs.readFile('comments.json', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                comments = JSON.parse(data);
                comments.push(query);
                //console.log(comments);
                fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify(comments));
                        res.end();
                    }
                });
            }
        });
    }
    else {
        fs.readFile('index.html', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    }
});
server.listen(port);
console.log('Server running at http://localhost:' + port);