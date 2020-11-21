const mongoose = require('mongoose');

const commissionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true,
    },
    month: {
        type: String,
        require: true
    },
    profit: {
        type: Number,
        require: true
    },
    commission: {
        type: Number,
        require: true
    }
});



module.exports = mongoose.model('Commission', commissionSchema);

