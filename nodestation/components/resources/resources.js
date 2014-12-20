

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
	self._db.get(path, function (err,reply){
	   var result = {};
	   
           if(err){
	     result.error = err;
           };

	   result = reply;
	   return result;
	});
        var result = {};

        if (result_callback) {
            result = self._store.getItem(path);
            result_callback(result);
        }
    };
    
    self.Put = function (path, value, result_callback) {
        var result = {};

        self._store.setItem(path, value);

        if (result_callback) {
            result_callback(result);
        }
    };
    
    self.Post = function (path, value, result_callback) {
        var result = {};
        console.log(value);
        self._store.setItem(path, value);
        
        if (result_callback) {
            result_callback(result);
        }
    };
    
    self.Delete = function (path, result_callback) {
        var result = {};
        
        self._store.removeItem(path);
        
        if (result_callback) {
            result_callback(result);
        }
    };


    return self;
};

module.exports.Package = Resources;
