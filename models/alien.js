const mongoose = require('mongoose');
const alienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    technology: {

        type: String,
        required: true,
        
    },
    sub: {
        type: Boolean,
        required: true,
        default: false,
    }

});
var alienmodel = mongoose.model("alien" , alienSchema)

module.exports = alienmodel