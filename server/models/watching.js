const mongoose = require('mongoose');

const watchingSchema = mongoose.Schema({
    id:{type:String, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    url:{type:String}
});

module.exports = mongoose.model('Watching', watchingSchema);