var request = require('request');
var EventEmitter = require('events').EventEmitter;

//Helper function
function first(p) {
	for (var i in p)
		return p[i];
}

class RequestHandler extends EventEmitter{
    constructor(){super();}

    getDescription(desc, name) {
        if (desc == null) {
            var self = this;
            var URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles&titles=" + name;
            request(URL, function(error, response, body) {
                var json = JSON.parse(body);
                var pages = json.query.pages;
                if (first(pages) && first(pages).extract) {
                    self.emit('gotDesc', first(pages).extract);
                }
                else {
                    self.emit('gotDesc', "Description not found.");
                }
            });
        }
        else {
            self.emit('gotDesc', desc);
        }
    }
}

exports.RequestHandler = RequestHandler;