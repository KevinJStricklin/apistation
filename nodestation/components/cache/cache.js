

var Cache = function (options) {
    var self = {};
    self.options = options;

    var redis = require("redis");
    self.client = redis.createClient(); // future put a redis options object
    
    // Cache System Error reporting 
    self.client.on("error", function (err) {
        console.log("/redis/error/" + new Date() + " " + err);
    });
    
    self.Get = function (path, result_callback) {
        self.client.set(req.path, JSON.stringify(req.body), function (err, reply) {
            var result = {};

            // Handle Error
            if (err) {
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }
            
            if (value) {
                result = value;
            }

            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Set = function (path, value, result_callback) {
        self.client.get(path + "", function (err, value) {
            var result = {};

            // Handle Error
            if (err) {
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }
            
            if (value) {
                result = value;
            }
            
            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    return self;
};

module.exports.Package = Cache;