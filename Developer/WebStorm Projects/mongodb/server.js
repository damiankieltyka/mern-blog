const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

userSchema.pre('save', function(next) {
    const currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

const User = mongoose.model('User', userSchema);
/
// define user instances
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});

kenny.manify(function(error, name) {
    if(error) throw error;
    console.log('Your new name is: ' + name);
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(error, name) {
    if(error) throw error;
    console.log('Your new name is: ' + name);
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(error, name) {
    if(error) throw error;
    console.log('Your new name is: ' + name);
});

const findAllUsers = function() {
    return User.find({}, function(error, response) {
        if(error) throw error;
        console.log('Present database records are: ' + response);
    });
};

const findSpecificRecord = function() {
    return User.find({username: 'Kenny_the_boy'}, function(error, response) {
        if(error) throw error;
        console.log('User you are looking for is: ' + response);
    });
};

const updateUserPassword = function() {
    return User.findOne({username: 'Kenny_the_boy'})
        .then(function(user) {
            console.log('Old password is: ' + user.password);
            console.log('Name ' + user.name);
            user.password = 'newPassword';
            console.log('New password is: ' + user.password);
            return user.save(function(error) {
                if(error) throw error;
                console.log('User ' + user.name + ' has been successfully updated.');
            });
        })
        .catch(function(error) {
            if(error) throw error;
        });
};

const updateUsername = function() {
    return User.findOneAndUpdate({ username: 'Benny_the_boy' }, { username: 'Benny_the_man' }, { new: true }, function(error, user) {
        if (error) throw error;
        console.log('User name after update is ' + user.username);
    })
};

const findMarkAndDelete = function() {
    return User.findOne({username: 'Mark_the_boy'})
        .then(function(user) {
            return user.remove(function() {
                console.log('User ' + user.username + ' has been successfully deleted');
                console.log('User has been successfully deleted');
            });
        });
};

const findKennyAndDelete = function() {
    return User.findOne({username: 'Kenny_the_boy'})
        .then(function(user) {
            return user.remove(function() {
                console.log('User ' + user.username + ' has been successfully deleted');
                console.log('User has been successfully deleted');
            });
        });
};

const findBennyAndRemove = function() {
    return User.findOneAndRemove({username: 'Benny_the_boy'})
        .then(function(user) {
            return user.remove(function() {
                console.log('User ' + user.username + ' has been successfully deleted');
                console.log('User has been successfully deleted');
            });
        });
};

Promise.all([kenny.save(), mark.save(), benny.save()])
    .then(findAllUsers)
    .then(findSpecificRecord)
    .then(updateUserPassword)
    .then(updateUsername)
    .then(findMarkAndDelete)
    .then(findKennyAndDelete)
    .then(findBennyAndRemove)
    .catch(console.log.bind(console));