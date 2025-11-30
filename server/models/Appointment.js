const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String },
    status: { type: String, default: 'Pending' }, // Pending, Approved, Declined, RescheduleRequested
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
