const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxWatchingId: {type:Number, required:true}
})

module.exports = mongoose.model('Sequence', sequenceSchema);