const router = require('express').Router();
const Appointment = require('../models/Appointment');

// Create
router.post('/', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const saved = await newAppointment.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1 });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update (Reschedule/Approve/Decline)
router.put('/:id', async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
