const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// Create a new reminder
router.post('/',reminderController.createReminder);

// Get all reminders
router.get('/all', reminderController.getReminders);

// Get a single reminder by ID
router.get('/reminders/:id', reminderController.getReminderById);

// Update reminder
router.patch('/reminders/:id', reminderController.updateReminder);

// Delete reminder
router.delete('/reminders/:id', reminderController.deleteReminder);

module.exports = router;
