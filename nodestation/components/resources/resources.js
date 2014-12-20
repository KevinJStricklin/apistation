

var Resources = function (options) {
    var self = {};
    
    // Dependencies 
    var Storage = require('fs-storage');
    self._store =  new Storage('./default/');

    if (options.db_path) {
        self._store = new Storage(options.db_path);
    }
    
    self.Get = function (path, result_callback) {
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