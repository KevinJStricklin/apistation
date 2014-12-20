/// <reference path="bower_components/jquery/dist/jquery.js" />

/// Base Server Path
function Client(Path) {
    this.Path = Path;
    
    /// Run AJAX Client Setup Here 
    $.ajaxSetup({
        url: this.Path,
        contentType: "application/json",
        crossDomain: true,
        dataType: 'json',
        statusCode: {
            404: function () {
                console.log("Resource Client: 404");
            },
            500: function () {
                console.log("Resource Client: 500");
            }
        }
    });
}


// Resource Object Client 
function Resource(Path) {
    this.path = Path;
    this.Value = {};

    /// Run AJAX Client Setup Here 
    $.ajaxSetup({
        url: "http://localhost:3020" + this.path,
        contentType: "application/json",
        crossDomain: true,
        dataType: 'json',
        statusCode: {
            404: function () {
                console.log("Resource Client: 404");
            },
            500: function () {
                console.log("Resource Client: 500");
            }
        }
    });


}


// HTTP Methods
Resource.prototype.Get = function (complete_callback) {
    var self = this;

    $.ajax({
        type: "GET"
    }).done(function (data) {
        self.Value = data;
        // Callback
        if (complete_callback) {
            complete_callback(self);
        }
        return self;
    });
};

Resource.prototype.Post = function (complete_callback) {
    var self = this;

    $.ajax({
        type: "POST",
        data : self.Value
    }).done(function (data) {
        // Callback
        if (complete_callback) {
            complete_callback(self);
        }
    });

    return self;
};

Resource.prototype.Put = function (complete_callback) {
    $.ajax({
        type: "PUT"
    });

};

Resource.prototype.Delete = function (complete_callback) {
    $.ajax({
        type: "DELETE"
    });
};

