// ---------------------------------------------------------------
 //      __________________
 //     /\  ______________ \
 //    /::\ \ZZZZZZZZZZZZ/\ \
 //   /:/\.\ \        /:/\:\ \
 //  /:/Z/\:\ \      /:/Z/\:\ \
 // /:/Z/__\:\ \____/:/Z/  \:\ \
 ///:/Z/____\:\ \___\/Z/    \:\ \
 //\:\ \ZZZZZ\:\ \ZZ/\ \     \:\ \
 // \:\ \     \:\ \ \:\ \     \:\ \
 //  \:\ \     \:\ \_\;\_\_____\;\ \
 //   \:\ \     \:\_________________\
 //    \:\ \    /:/ZZZZZZZZZZZZZZZZZ/
 //     \:\ \  /:/Z/    \:\ \  /:/Z/
 //      \:\ \/:/Z/      \:\ \/:/Z/
 //       \:\/:/Z/________\;\/:/Z/
 //        \::/Z/_______itz__\/Z/
 //         \/ZZZZZZZZZZZZZZZZZ/

// ---------------------------------------------------------------
// Api Controller Base Reference Type 
// ---------------------------------------------------------------
var express = require('express');

var Controller = function (path, options) {
    var self = express.Router();

    // Controller Members
    self.options = options;
    self.REST_PATH = path + "/*";

    // Cache System
    var redis = require("redis");
    self.client = redis.createClient(); // future put a redis options object
    
    // Cache System Error reporting 
    self.client.on("error", function (err) {
        console.log("/redis/error/" + new Date() + " " + err);
    });  

    /// PATH: POST  /[path]/*
    self.get(path + "/*", function (req, res) {
        // Load from Redis
        self.client.get(req.path + "", function (err, value) {
            // Handle Error
            if (err) {
                model.err = err;
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }
            
            // Build the response
            res.type('application/json');
            res.json(JSON.parse(value));
            res.end();
        });
    });
    
    /// PATH: POST  /[path]/*
    self.post(path + "/*", function (req, res) {
        // Save to Redis
        self.client.set(req.path, JSON.stringify(req.body), function (err, reply) {
            // Handle Error
            if (err) {
                model.err = err;
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }
            
            console.log("POST COMPLETE");
            // Build the response
            res.type('application/json');
            res.json(req.body);
            res.end();
        });
    });
    
    // TODO: PUT, DELETE Methods
    // TODO:  DISK PERSISTENCE
    return self;
}

// Register the Type 
module.exports.Type = Controller;