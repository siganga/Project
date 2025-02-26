const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UnitOne' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserThree', required: true }, // Reference to the User model
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserThree' }] // Array of users with access
});

module.exports = mongoose.model('ClassroomOne', classroomSchema);