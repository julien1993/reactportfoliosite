const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({



});


const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
