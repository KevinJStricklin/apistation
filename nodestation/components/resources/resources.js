

var Resources = function (options) {
    var self = {};
    
    // Dependencies 
    var levelup = require('levelup');
    
    self.db = levelup('./default');
    
    if (options.db_path) {
        self.db = levelup(options.db_path);
    }
    
    self.Get = function (path, result_callback) {
        self.db.get(path, function (err, value) {
            var result = {};
            
            if (err) {
                console.log("[leveldb] [error] " + err);
                result.error = err;
            }
            
            if (value) {
                result = value;
            }

            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Put = function (path, value, result_callback) {
        self.db.put(path, value, function (err) {
            var result = {};
            
            if (err) {
                console.log("[leveldb] [error] " + err);
                result.error = err;
            }

            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Post = function (path, value, result_callback) {
        self.db.put(path, value, function (err) {
            var result = {};
            
            if (err) {
                console.log("[leveldb] [error] " + err);
                result.error = err;
            }
            
            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Delete = function (path, result_callback) {
        self.db.del(path, function (err) {
            var result = {};
            
            if (err) {
                console.log("[leveldb] [error] " + err);
                result.error = err;
            }
            
            if (result_callback) {
                result_callback(result);
            }
        });
    };


    return self;
};

module.exports.Package = Resources;