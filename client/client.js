/// <reference path="bower_components/jquery/dist/jquery.js" />


var Client = {};


function Resource(Path) {
    this.path = Path;
    this.publicId = 0;
}

Resource.prototype.getIdentifier = function () {
    return this.publicId + ":" + this.path;
}

Resource.prototype.Get = function (complete_callback) {
    if (complete_callback) {
        complete_callback(this);
    }
};

Resource.prototype.Post = function (complete_callback) {
    if (complete_callback) {
        complete_callback(this);
    }
};

Resource.prototype.Put = function (complete_callback) {
    if (complete_callback) {
        complete_callback(this);
    }
};

Resource.prototype.Delete = function (complete_callback) {
    if (complete_callback) {
        complete_callback(this);
    }
};


Client.Resource = Resource;

var t = new Client.Resource("/");