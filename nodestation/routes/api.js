var express = require('express');

/// API Controller 
var Api = function () {
    var controller = express.Router();
    controller.path = "/api";
    
    // Cache System ( Powered by Redis)
    var redis = require("redis"),
        client = redis.createClient();
    
    client.on("error", function (err) {
        console.log("/redis/error/" + new Date() + " " + err);
    });

    controller.get("/*", function (req, res) {
        client.S
        // Load from Redis
        client.get(req.path + "*", function (err, value) {
            
            // Handle Error
            if (err) {
                model.err = err;
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }

            // Build the response
            res.type('application/json');
            res.json(JSON.parse(value));
        });
    });
    
    controller.post("/*", function (req, res) {
        // Save to Redis
        client.set(req.path, JSON.stringify(req.body), function (err, reply) {
           
            // Handle Error
            if (err) {
                model.err = err;
                console.log('/redis/error/' + req.path + "/" + new Date() + " : " + err);
            }
            
            res.type('application/json');
            res.json(req.body);
        });
    });
  
    return controller;
}

module.exports.Api = Api;