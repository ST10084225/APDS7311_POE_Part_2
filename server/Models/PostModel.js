//Setup dependencies
const mongoose = require('mongoose');

//set-up post mongo schema
const postschema = mongoose.Schema(
    {
        caption: {type: String, required:true},
        createdAt: {type: Date, default: new Date()}
    }
);

module.exports = mongoose.model('Post', postschema); //export user object to mongo Cluster