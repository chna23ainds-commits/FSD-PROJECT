const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const { authMiddleware } = require('../middleware/auth');

// All medicine routes require authentication
router.use(authMiddleware);

/**
 * POST /api/medicines/add-medicine
 * Add a new medicine
 */
router.post('/add-medicine', medicineController.addMedicine);

/**
 * GET /api/medicines/stats
 * Get reminder statistics - must be before :id routes
 */
router.get('/stats', medicineController.getReminderStats);

/**
 * GET /api/medicines/reminders
 * Get all medicine reminders for the user
 */
router.get('/reminders', medicineController.getMedicineReminders);

/**
 * POST /api/medicines/reminders
 * Add a new medicine reminder
 */
router.post('/reminders', medicineController.addMedicineReminder);

/**
 * POST /api/medicines/reminders/:reminderId/taken
 * Mark a reminder as taken
 */
router.post('/reminders/:reminderId/taken', medicineController.markReminderAsTaken);

/**
 * PUT /api/medicines/reminders/:reminderId/taken
 * Mark a reminder as taken (alternative method)
 */
router.put('/reminders/:reminderId/taken', medicineController.markReminderAsTaken);

/**
 * PUT /api/medicines/reminders/:reminderId
 * Update a medicine reminder
 */
router.put('/reminders/:reminderId', medicineController.updateMedicineReminder);

/**
 * DELETE /api/medicines/reminders/:reminderId
 * Delete a medicine reminder
 */
router.delete('/reminders/:reminderId', medicineController.deleteMedicineReminder);

/**
 * GET /api/medicines
 * Get all medicines for the user
 */
router.get('/', medicineController.getMedicines);

/**
 * PUT /api/medicines/:id
 * Update a medicine
 */
router.put('/:id', medicineController.updateMedicine);

/**
 * DELETE /api/medicines/:id
 * Delete a medicine
 */
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
