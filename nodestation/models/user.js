
var UserModel = function (obj){
    var self = {};

    self.id = 0;
    self.username = "";
    self.password = "";
    self.claims = "";

    
    
    // Load from Parameter
    if (obj) {
        for (var i in obj) {
            self[i] = obj[i];
        }
    }

    return self;
}

exports.UserModel = UserModel;