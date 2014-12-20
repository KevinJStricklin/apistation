
/// ------------------------------------------------------
/// API Controller 
/// ------------------------------------------------------
var express = require('express');

// Component Packages
var resources = require('.').Package;

var Api = function () {
    var self = express.Router();
    var path = "/*";
    
    var db = new resource({ db_path : "./api" });
    

    /// PATH: POST  /[path]/*
    self.get(path, function (req, res) {
        
        
        var response = {};
        var status_code = 200;
        response.__time_stamp = new Date();
        
        console.log("HTTP GET " + req.path);
        


        // send response 
        res.type("application/json");
        res.json(response);
        res.end();
    });
    
    /// PATH: POST  /[path]/*
    self.post(path, function (req, res) {
        var response = {};
        var status_code = 200;
        response.__time_stamp = new Date();
        
        


        // send response 
        res.type("application/json");
        res.status(status_code).json(response);
        res.end();
    });
    
    self.put(path, function (req, res) {
        var response = {};
        var status_code = 200;
        response.__time_stamp = new Date();
        
        
        // send response 
        res.type("application/json");
        res.json(response);
        res.end();
    });
    
    self.delete(path, function (req, res) {
        var response = {};
        var status_code = 200;
        response.__time_stamp = new Date();
        
        // send response 
        res.type("application/json");
        res.json(response);
        res.end();
    });
    
    
    return self;
}

module.exports.Package = Api;