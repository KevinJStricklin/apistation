
/// ------------------------------------------------------
/// API Controller 
/// ------------------------------------------------------
var express = require('express');

// Component Packages
var components = require('../../components/index.js').Components({ 

});


var Api = function () {
    var self = express.Router();

    var path = "/*";
    
    self.db = components.resources({ db_path: "./api" });
    self.cache = components.cache({});

    /// PATH: GET  /[path]/*
    self.get(path, function (req, res) {
      
        self.db.Get(path, function (result) {
            var result = {};
            var status_code = 200;
            result.__time_stamp = new Date();
            
            if (result) {
                if (result.error) {
                    res.status(500).json({ "error" : result.error });
                }
            } else {
                res.status(404).send("Resource at path: " + req.path + " does not exist");
            }
            
            // send response 
            res.type("application/json");
            res.json(result);
            res.end();
        });

    });
    
    self.post(path, function (req, res) {
        self.db.Post(path, req.body, function (result) {
            var result = {};
            var status_code = 200;
            result.__time_stamp = new Date();
    
            if (result) {
                if (result.error) {
                    res.status(500).json({ "error" : result.error });
                }
            } else {
                res.status(404).send("Resource at path: " + req.path + " does not exist");
            }
            
            // send response 
            res.type("application/json");
            res.json(result);
            res.end();
        });
    });
    
    self.put(path, function (req, res) {
        self.db.Put(path, req.body, function (result) {
            var result = {};
            var status_code = 200;
            result.__time_stamp = new Date();
            
            if (result) {
                if (result.error) {
                    res.status(500).json({ "error" : result.error });
                }
            } else {
                res.status(404).send("Resource at path: " + req.path + " does not exist");
            }
            
            // send response 
            res.type("application/json");
            res.json(result);
            res.end();
        });
    });
    
    self.delete(path, function (req, res) {
        self.db.Delete(path, req.body, function (result) {
            var result = {};
            var status_code = 200;
            result.__time_stamp = new Date();
            
            if (result) {
                if (result.error) {
                    res.status(500).json({ "error" : result.error });
                }
            } else {
                res.status(404).send("Resource at path: " + req.path + " does not exist");
            }
            
            // send response 
            res.type("application/json");
            res.json(result);
            res.end();
        });
    });

    return self;
}

module.exports.Package = Api;