const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date,
        default: () => new Date()
    },
    rating: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('shows', showSchema)
