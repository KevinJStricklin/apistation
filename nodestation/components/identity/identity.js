
var Identity = function (options) {
    var self = {};
    self.options = options;
    
    self.users = [
        { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
      , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
    ];
    
    self.findById = function(id, fn) {
        var idx = id - 1;
        if (self.users[idx]) {
            fn(null, self.users[idx]);
        } else {
            fn(new Error('User ' + id + ' does not exist'));
        }
    }
    
    self.findByUsername = function(username, fn) {
        for (var i = 0, len = self.users.length; i < len; i++) {
            var user = self.users[i];
            if (user.username === username) {
                return fn(null, user);
            }
        }
        return fn(null, null);
    }
    
    return self;
};

module.exports.Package = Identity;