

var Resources = function (options) {
    var self = {};

    self.options = options;	    

    // Dependencies 
    var levelup = require('levelup');
    self._db = levelup('./default');

    if (options.db_path) {
       self._db = levelup(options.db_path);
    }
    
    self.Get = function (path, result_callback) {
	    self._db.get(path, function (err,reply) {
            var result = {};
            
            if (err) {
                result.error = err;
            }
            
            if (reply) {
                result = reply;
            }
            
            if (result_callback) {
                result_callback(result);
            }
	    });     
    };
    
    self.Put = function (path, value, result_callback) {
        self._db.set(path, value, function (err, reply) {
            var result = {};
            
            if (err) {
                result.error = err;
            }
            
            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Post = function (path, value, result_callback) {
        self._db.set(path, value, function (err, reply) {
            var result = {};
            
            if (err) {
                result.error = err;
            }
            
            if (result_callback) {
                result_callback(result);
            }
        });
    };
    
    self.Delete = function (path, result_callback) {
        self._db.del(path, function (err) {
            var result = {};
            
            if (err) {
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
