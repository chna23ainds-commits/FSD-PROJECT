const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Mock database for medicines and reminders
const medicines = {};
const medicineReminders = {};

// Lazy initialization of Twilio client
let twilioClient = null;
function getTwilioClient() {
    if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        twilioClient = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }
    return twilioClient;
}

// Email configuration (with fallback if credentials missing)
let emailTransporter = null;
function getEmailTransporter() {
    if (!emailTransporter) {
        emailTransporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'noreply@sehatmitra.com',
                pass: process.env.EMAIL_PASSWORD || 'demo-password'
            }
        });
    }
    return emailTransporter;
}

/**
 * Add a new medicine
 * @route POST /api/medicines/add-medicine
 */
exports.addMedicine = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, dosage, unit, frequency, timing, startDate, endDate, notes, notificationMethod, phoneNumber, email } = req.body;

        if (!name || !dosage || !startDate) {
            return res.status(400).json({ error: 'Missing required fields: name, dosage, startDate' });
        }

        const medicineId = uuidv4();
        const medicine = {
            id: medicineId,
            userId,
            name,
            dosage,
            unit: unit || 'mg',
            frequency: frequency || 'daily',
            timing: timing || ['morning'], // default to morning if not provided
            startDate,
            endDate,
            notes,
            notificationMethod: notificationMethod || 'both',
            phoneNumber,
            email: email || process.env.EMAIL_USER,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        medicines[medicineId] = medicine;

        res.status(201).json({
            success: true,
            message: 'Medicine added successfully',
            medicine
        });
    } catch (error) {
        console.error('Error adding medicine:', error);
        res.status(500).json({ error: 'Failed to add medicine' });
    }
};

/**
 * Get all medicines for a user
 * @route GET /api/medicines
 */
exports.getMedicines = async (req, res) => {
    try {
        const { userId } = req.user;

        const userMedicines = Object.values(medicines).filter(m => m.userId === userId);

        res.json({
            success: true,
            medicines: userMedicines
        });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ error: 'Failed to fetch medicines' });
    }
};

/**
 * Update a medicine
 * @route PUT /api/medicines/:id
 */
exports.updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { name, dosage, unit, frequency, timing, startDate, endDate, notes, notificationMethod, phoneNumber, email } = req.body;

        const medicine = medicines[id];

        if (!medicine || medicine.userId !== userId) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        Object.assign(medicine, {
            name: name || medicine.name,
            dosage: dosage || medicine.dosage,
            unit: unit || medicine.unit,
            frequency: frequency || medicine.frequency,
            timing: timing || medicine.timing,
            startDate: startDate || medicine.startDate,
            endDate: endDate || medicine.endDate,
            notes: notes || medicine.notes,
            notificationMethod: notificationMethod || medicine.notificationMethod,
            phoneNumber: phoneNumber || medicine.phoneNumber,
            email: email || medicine.email,
            updatedAt: new Date()
        });

        res.json({
            success: true,
            message: 'Medicine updated successfully',
            medicine
        });
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({ error: 'Failed to update medicine' });
    }
};

/**
 * Delete a medicine
 * @route DELETE /api/medicines/:id
 */
exports.deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;

        const medicine = medicines[id];

        if (!medicine || medicine.userId !== userId) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        delete medicines[id];

        res.json({
            success: true,
            message: 'Medicine deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({ error: 'Failed to delete medicine' });
    }
};

/**
 * Add a medicine reminder
 * @route POST /api/medicines/reminders
 */
exports.addMedicineReminder = async (req, res) => {
    try {
        const { userId } = req.user;
        const { medicineName, dosage, frequency, startTime, endDate, phoneNumber, email } = req.body;

        if (!medicineName || !dosage || !frequency || !startTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const reminderId = uuidv4();
        const reminder = {
            reminderId,
            userId,
            medicineName,
            dosage,
            frequency, // 'daily', 'twice-daily', 'thrice-daily', 'weekly', 'custom'
            startTime,
            endDate,
            phoneNumber,
            email,
            createdAt: new Date(),
            isActive: true,
            lastReminderSent: null,
            remindersCount: 0
        };

        medicineReminders[reminderId] = reminder;

        res.status(201).json({
            success: true,
            message: 'Medicine reminder added successfully',
            reminder
        });
    } catch (error) {
        console.error('Error adding medicine reminder:', error);
        res.status(500).json({ error: 'Failed to add medicine reminder' });
    }
};

/**
 * Get all medicine reminders for a user
 * @route GET /api/medicines/reminders
 */
exports.getMedicineReminders = async (req, res) => {
    try {
        const { userId } = req.user;

        const userReminders = Object.values(medicineReminders).filter(r => r.userId === userId);

        res.json({
            success: true,
            reminders: userReminders
        });
    } catch (error) {
        console.error('Error fetching medicine reminders:', error);
        res.status(500).json({ error: 'Failed to fetch medicine reminders' });
    }
};

/**
 * Update a medicine reminder
 * @route PUT /api/medicines/reminders/:reminderId
 */
exports.updateMedicineReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const { userId } = req.user;
        const { medicineName, dosage, frequency, startTime, endDate, phoneNumber, email, isActive } = req.body;

        const reminder = medicineReminders[reminderId];

        if (!reminder || reminder.userId !== userId) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        Object.assign(reminder, {
            medicineName: medicineName || reminder.medicineName,
            dosage: dosage || reminder.dosage,
            frequency: frequency || reminder.frequency,
            startTime: startTime || reminder.startTime,
            endDate: endDate || reminder.endDate,
            phoneNumber: phoneNumber || reminder.phoneNumber,
            email: email || reminder.email,
            isActive: isActive !== undefined ? isActive : reminder.isActive
        });

        res.json({
            success: true,
            message: 'Medicine reminder updated successfully',
            reminder
        });
    } catch (error) {
        console.error('Error updating medicine reminder:', error);
        res.status(500).json({ error: 'Failed to update medicine reminder' });
    }
};

/**
 * Delete a medicine reminder
 * @route DELETE /api/medicines/reminders/:reminderId
 */
exports.deleteMedicineReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const { userId } = req.user;

        const reminder = medicineReminders[reminderId];

        if (!reminder || reminder.userId !== userId) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        delete medicineReminders[reminderId];

        res.json({
            success: true,
            message: 'Medicine reminder deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting medicine reminder:', error);
        res.status(500).json({ error: 'Failed to delete medicine reminder' });
    }
};

/**
 * Send medicine reminder notification (Email)
 */
exports.sendEmailReminder = async (reminder) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@sehatmitra.com',
            to: reminder.email,
            subject: `Time to take your medicine: ${reminder.medicineName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #667eea;">Medicine Reminder 💊</h2>
                    <p style="font-size: 16px; color: #333;">
                        It's time to take your medicine!
                    </p>
                    <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Medicine:</strong> ${reminder.medicineName}</p>
                        <p><strong>Dosage:</strong> ${reminder.dosage}</p>
                        <p><strong>Time:</strong> ${reminder.startTime}</p>
                        <p><strong>Frequency:</strong> ${reminder.frequency}</p>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        Please take your medicine as prescribed. If you have any concerns, contact your doctor.
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This is an automated reminder from MediTrack
                    </p>
                </div>
            `
        };

        const transporter = getEmailTransporter();
        await transporter.sendMail(mailOptions);
        console.log(`Email reminder sent to ${reminder.email}`);
        reminder.lastReminderSent = new Date();
        reminder.remindersCount++;
    } catch (error) {
        console.error('Error sending email reminder:', error);
    }
};

/**
 * Send medicine reminder notification (SMS)
 */
exports.sendSmsReminder = async (reminder) => {
    try {
        if (!reminder.phoneNumber) return;

        const client = getTwilioClient();
        if (!client) {
            console.log('Twilio not configured - SMS reminder skipped for', reminder.phoneNumber);
            return;
        }

        const message = `MediTrack 💊 Reminder: Time to take ${reminder.medicineName} (${reminder.dosage}). Frequency: ${reminder.frequency}. Take care!`;

        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: reminder.phoneNumber
        });

        console.log(`SMS reminder sent to ${reminder.phoneNumber}`);
        reminder.lastReminderSent = new Date();
        reminder.remindersCount++;
    } catch (error) {
        console.error('Error sending SMS reminder:', error);
    }
};

/**
 * Send in-app notification
 */
exports.sendInAppReminder = async (io, reminder) => {
    try {
        const notification = {
            type: 'medicine-reminder',
            title: `Time for ${reminder.medicineName}`,
            message: `Dosage: ${reminder.dosage} | Frequency: ${reminder.frequency}`,
            timestamp: new Date(),
            reminderId: reminder.reminderId
        };

        io.to(`user-${reminder.userId}`).emit('medicine-reminder', notification);
        console.log(`In-app reminder sent for user: ${reminder.userId}`);
        reminder.lastReminderSent = new Date();
        reminder.remindersCount++;
    } catch (error) {
        console.error('Error sending in-app reminder:', error);
    }
};

/**
 * Mark reminder as taken
 */
exports.markReminderAsTaken = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const { userId } = req.user;

        const reminder = medicineReminders[reminderId];

        if (!reminder || reminder.userId !== userId) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        reminder.lastTakenAt = new Date();
        reminder.status = 'taken';

        res.json({
            success: true,
            message: 'Reminder marked as taken',
            reminder
        });
    } catch (error) {
        console.error('Error marking reminder as taken:', error);
        res.status(500).json({ error: 'Failed to mark reminder as taken' });
    }
};

/**
 * Get reminder and medicine statistics
 */
exports.getReminderStats = async (req, res) => {
    try {
        const { userId } = req.user;

        const userMedicines = Object.values(medicines).filter(m => m.userId === userId);
        const userReminders = Object.values(medicineReminders).filter(r => r.userId === userId);
        const activeReminders = userReminders.filter(r => r.isActive);
        const completedReminders = userReminders.filter(r => r.status === 'taken');

        const totalMedicines = userMedicines.length;
        const totalReminders = userReminders.length;
        const completedCount = completedReminders.length;
        const complianceRate = totalReminders > 0 ? Math.round((completedCount / totalReminders) * 100) : 0;
        const totalRemindersSent = userReminders.reduce((sum, r) => sum + r.remindersCount, 0);

        res.json({
            success: true,
            totalMedicines,
            totalReminders,
            activeReminders: activeReminders.length,
            completedReminders: completedCount,
            complianceRate,
            totalRemindersSent,
            reminders: userReminders
        });
    } catch (error) {
        console.error('Error fetching reminder statistics:', error);
        res.status(500).json({ error: 'Failed to fetch reminder statistics' });
    }
};
