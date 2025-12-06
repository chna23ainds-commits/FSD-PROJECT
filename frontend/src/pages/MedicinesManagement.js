import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import '../styles/MedicinesManagement.css';

const MedicinesManagement = () => {
    const { auth } = useContext(AuthContext);
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('medicines');
    const [medicines, setMedicines] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [showMedicineForm, setShowMedicineForm] = useState(false);
    const [showReminderForm, setShowReminderForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingMedicineId, setEditingMedicineId] = useState(null);
    const [stats, setStats] = useState(null);
    const [showChatBot, setShowChatBot] = useState(false);
    const [medicineFormData, setMedicineFormData] = useState({
        name: '',
        dosage: '',
        unit: 'mg',
        frequency: 'daily',
        timing: [],
        startDate: '',
        endDate: '',
        notes: '',
        notificationMethod: 'both',
        phoneNumber: '',
        email: auth?.email || ''
    });
    const [reminderFormData, setReminderFormData] = useState({
        medicineName: '',
        dosage: '',
        frequency: 'daily',
        startTime: '08:00',
        endDate: '',
        phoneNumber: '',
        email: auth?.email || ''
    });

    const timingOptions = ['morning', 'afternoon', 'evening', 'night'];
    const frequencyOptions = [
        { value: 'daily', label: 'Daily' },
        { value: 'twice-daily', label: 'Twice Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'as-needed', label: 'As Needed' }
    ];
    const unitOptions = ['mg', 'ml', 'tablet', 'capsule', 'drop', 'spray'];

    // Fetch medicines and reminders on mount
    useEffect(() => {
        fetchMedicines();
        fetchReminders();
        fetchStats();
    }, []);

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/medicines`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setMedicines(data.medicines || []);
            } else {
                setMedicines([]);
            }
        } catch (error) {
            console.error('Error fetching medicines:', error);
            setMedicines([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchReminders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/medicines/reminders`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setReminders(data.reminders || []);
            } else {
                setReminders([]);
            }
        } catch (error) {
            console.error('Error fetching reminders:', error);
            setReminders([]);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/medicines/stats`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                const userMedicines = Object.values(medicines).length;
                const userReminders = Object.values(reminders).length;
                const completedReminders = reminders.filter(r => r.status === 'taken').length;

                setStats({
                    totalMedicines: userMedicines,
                    totalReminders: userReminders,
                    completedReminders: completedReminders,
                    complianceRate: userReminders > 0 ? Math.round((completedReminders / userReminders) * 100) : 0
                });
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            setStats({
                totalMedicines: medicines.length || 0,
                totalReminders: reminders.length || 0,
                completedReminders: reminders.filter(r => r.status === 'taken').length || 0,
                complianceRate: 0
            });
        }
    };

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/medicines/add-medicine`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medicineFormData)
            });

            if (response.ok) {
                setShowMedicineForm(false);
                setMedicineFormData({
                    name: '',
                    dosage: '',
                    unit: 'mg',
                    frequency: 'daily',
                    timing: [],
                    startDate: '',
                    endDate: '',
                    notes: '',
                    notificationMethod: 'both',
                    phoneNumber: '',
                    email: auth?.email || ''
                });
                fetchMedicines();
                fetchStats();
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddReminder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/medicines/reminders`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reminderFormData)
            });

            if (response.ok) {
                setShowReminderForm(false);
                setReminderFormData({
                    medicineName: '',
                    dosage: '',
                    frequency: 'daily',
                    startTime: '08:00',
                    endDate: '',
                    phoneNumber: '',
                    email: auth?.email || ''
                });
                fetchReminders();
                fetchStats();
            }
        } catch (error) {
            console.error('Error adding reminder:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMedicine = async (id) => {
        if (window.confirm('Delete this medicine?')) {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/medicines/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                fetchMedicines();
                fetchStats();
            } catch (error) {
                console.error('Error deleting medicine:', error);
            }
        }
    };

    const handleDeleteReminder = async (id) => {
        if (window.confirm('Delete this reminder?')) {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/medicines/reminders/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                fetchReminders();
                fetchStats();
            } catch (error) {
                console.error('Error deleting reminder:', error);
            }
        }
    };

    const handleMarkAsTaken = async (reminderId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/medicines/reminders/${reminderId}/taken`, {
                method: 'PUT',
                credentials: 'include'
            });
            fetchReminders();
            fetchStats();
        } catch (error) {
            console.error('Error marking reminder as taken:', error);
        }
    };

    return (
        <>
            <div className="medicines-management">
                <Header />
                <div className="medicines-container">
                    <div className="page-header">
                        <div className="header-content">
                            <h1>💊 Medicines & Reminders</h1>
                            <p>Manage your medications and set reminders for timely intake</p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    {stats && (
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">💊</div>
                                <div className="stat-content">
                                    <div className="stat-label">Total Medicines</div>
                                    <div className="stat-value">{stats.totalMedicines || 0}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">🔔</div>
                                <div className="stat-content">
                                    <div className="stat-label">Active Reminders</div>
                                    <div className="stat-value">{stats.totalReminders || 0}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">✅</div>
                                <div className="stat-content">
                                    <div className="stat-label">Doses Taken</div>
                                    <div className="stat-value">{stats.completedReminders || 0}</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">📊</div>
                                <div className="stat-content">
                                    <div className="stat-label">Compliance Rate</div>
                                    <div className="stat-value">{stats.complianceRate || 0}%</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="tab-navigation">
                        <button
                            className={`tab-button ${activeTab === 'medicines' ? 'active' : ''}`}
                            onClick={() => setActiveTab('medicines')}
                        >
                            💊 Medicines
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'reminders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reminders')}
                        >
                            🔔 Reminders
                        </button>
                    </div>

                    {/* Medicines Tab */}
                    {activeTab === 'medicines' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Your Medicines</h2>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowMedicineForm(!showMedicineForm)}
                                >
                                    {showMedicineForm ? '✕ Cancel' : '+ Add Medicine'}
                                </button>
                            </div>

                            {showMedicineForm && (
                                <form onSubmit={handleAddMedicine} className="medicine-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Medicine Name *</label>
                                            <input
                                                type="text"
                                                value={medicineFormData.name}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, name: e.target.value })}
                                                required
                                                placeholder="e.g., Aspirin"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Dosage *</label>
                                            <input
                                                type="text"
                                                value={medicineFormData.dosage}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, dosage: e.target.value })}
                                                required
                                                placeholder="e.g., 500"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Unit</label>
                                            <select
                                                value={medicineFormData.unit}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, unit: e.target.value })}
                                            >
                                                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Frequency</label>
                                            <select
                                                value={medicineFormData.frequency}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, frequency: e.target.value })}
                                            >
                                                {frequencyOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input
                                                type="date"
                                                value={medicineFormData.startDate}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input
                                                type="date"
                                                value={medicineFormData.endDate}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Notes</label>
                                            <textarea
                                                value={medicineFormData.notes}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, notes: e.target.value })}
                                                placeholder="Any special notes..."
                                            />
                                        </div>
                                    </div>

                                    <div className="form-section-title">📱 SMS Notifications</div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Notification Method</label>
                                            <select
                                                value={medicineFormData.notificationMethod}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, notificationMethod: e.target.value })}
                                            >
                                                <option value="email">Email Only</option>
                                                <option value="sms">SMS Only</option>
                                                <option value="both">Both SMS & Email</option>
                                                <option value="none">No Notifications</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number (for SMS)</label>
                                            <input
                                                type="tel"
                                                value={medicineFormData.phoneNumber}
                                                onChange={(e) => setMedicineFormData({ ...medicineFormData, phoneNumber: e.target.value })}
                                                placeholder="e.g., +1234567890"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Medicine'}
                                    </button>
                                </form>
                            )}

                            <div className="medicines-list">
                                {medicines.length === 0 ? (
                                    <div className="empty-state">
                                        <span>💊</span>
                                        <p>No medicines added yet</p>
                                    </div>
                                ) : (
                                    medicines.map(medicine => (
                                        <div key={medicine.id} className="medicine-card">
                                            <div className="medicine-header">
                                                <h3>{medicine.name}</h3>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDeleteMedicine(medicine.id)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <div className="medicine-details">
                                                <p><strong>Dosage:</strong> {medicine.dosage} {medicine.unit}</p>
                                                <p><strong>Frequency:</strong> {medicine.frequency}</p>
                                                {medicine.startDate && <p><strong>Start:</strong> {medicine.startDate}</p>}
                                                {medicine.endDate && <p><strong>End:</strong> {medicine.endDate}</p>}
                                                {medicine.notes && <p><strong>Notes:</strong> {medicine.notes}</p>}
                                                {medicine.notificationMethod && <p><strong>📱 Notifications:</strong> {medicine.notificationMethod === 'both' ? 'SMS & Email' : medicine.notificationMethod}</p>}
                                                {medicine.phoneNumber && <p><strong>SMS:</strong> {medicine.phoneNumber}</p>}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reminders Tab */}
                    {activeTab === 'reminders' && (
                        <div className="tab-content">
                            <div className="content-header">
                                <h2>Medicine Reminders</h2>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowReminderForm(!showReminderForm)}
                                >
                                    {showReminderForm ? '✕ Cancel' : '+ Add Reminder'}
                                </button>
                            </div>

                            {showReminderForm && (
                                <form onSubmit={handleAddReminder} className="reminder-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Medicine Name *</label>
                                            <input
                                                type="text"
                                                value={reminderFormData.medicineName}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, medicineName: e.target.value })}
                                                required
                                                placeholder="e.g., Aspirin"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Dosage *</label>
                                            <input
                                                type="text"
                                                value={reminderFormData.dosage}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, dosage: e.target.value })}
                                                required
                                                placeholder="e.g., 500mg"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Frequency</label>
                                            <select
                                                value={reminderFormData.frequency}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, frequency: e.target.value })}
                                            >
                                                {frequencyOptions.slice(0, -1).map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Time</label>
                                            <input
                                                type="time"
                                                value={reminderFormData.startTime}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, startTime: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input
                                                type="date"
                                                value={reminderFormData.endDate}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, endDate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={reminderFormData.email}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, email: e.target.value })}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone (for SMS)</label>
                                            <input
                                                type="tel"
                                                value={reminderFormData.phoneNumber}
                                                onChange={(e) => setReminderFormData({ ...reminderFormData, phoneNumber: e.target.value })}
                                                placeholder="+1234567890"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Reminder'}
                                    </button>
                                </form>
                            )}

                            <div className="reminders-list">
                                {reminders.length === 0 ? (
                                    <div className="empty-state">
                                        <span>🔔</span>
                                        <p>No reminders set yet</p>
                                    </div>
                                ) : (
                                    reminders.map(reminder => (
                                        <div key={reminder.reminderId} className={`reminder-card ${reminder.status === 'taken' ? 'taken' : ''}`}>
                                            <div className="reminder-header">
                                                <h3>{reminder.medicineName}</h3>
                                                <div className="reminder-actions">
                                                    <button
                                                        className={`btn-taken ${reminder.status === 'taken' ? 'marked' : ''}`}
                                                        onClick={() => handleMarkAsTaken(reminder.reminderId)}
                                                        title="Mark as taken"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleDeleteReminder(reminder.reminderId)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="reminder-details">
                                                <p><strong>Dosage:</strong> {reminder.dosage}</p>
                                                <p><strong>Frequency:</strong> {reminder.frequency}</p>
                                                <p><strong>Time:</strong> {reminder.startTime}</p>
                                                {reminder.phoneNumber && <p><strong>📱 SMS Alert:</strong> {reminder.phoneNumber}</p>}
                                                {reminder.email && <p><strong>📧 Email:</strong> {reminder.email}</p>}
                                                <p><strong>Status:</strong> <span className="status-badge">{reminder.status || 'pending'}</span></p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ChatBot Toggle Button */}
            {!showChatBot && (
                <button
                    className="chatbot-toggle-btn"
                    onClick={() => setShowChatBot(true)}
                    title="Open Help Assistant"
                >
                    💬
                </button>
            )}

            {/* ChatBot Component */}
            {showChatBot && (
                <ChatBot
                    onClose={() => setShowChatBot(false)}
                    context="medicines"
                />
            )}
        </>
    );
};

export default MedicinesManagement;
