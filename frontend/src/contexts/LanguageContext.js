import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const translations = {
    en: {
        dashboard: {
            welcome: 'Welcome to MediTrack',
            consultations: 'Consultations',
            consultationsDesc: 'Connect with healthcare professionals',
            medicalRecords: 'Medical Records',
            medicalRecordsDesc: 'View and manage your medical records',
            emergency: 'Emergency',
            emergencyDesc: 'Access emergency services and SOS features',
            pharmacy: 'Pharmacy',
            pharmacyDesc: 'Find and order medicines',
            symptoms: 'Symptoms',
            symptomsDesc: 'Check your symptoms with AI analysis',
            medicines: 'Medicines',
            medicinesDesc: 'Manage your medicines and dosages',
            reminders: 'Reminders',
            remindersDesc: 'Get medicine reminders via email and SMS'
        },
        emergency: {
            title: 'Emergency Services',
            sosButton: 'SOS',
            sosDesc: 'Press SOS for emergency assistance',
            volunteers: 'Nearby Volunteers',
            rideBooking: 'Book Emergency Ride',
            myContacts: 'Emergency Contacts',
            gpsSharing: 'Share Location'
        },
        pharmacy: {
            title: 'Pharmacy Services',
            search: 'Search medicines',
            nearbyPharmacies: 'Nearby Pharmacies',
            homeDelivery: 'Home Delivery',
            stockStatus: 'Stock Status'
        },
        records: {
            title: 'Medical Records',
            history: 'Medical History',
            prescriptions: 'Digital Prescriptions',
            tests: 'Lab Tests',
            vaccines: 'Vaccination Records'
        },
        consult: {
            title: 'Consultations',
            availableDoctors: 'Available Doctors',
            schedule: 'Schedule Appointment',
            myAppointments: 'My Appointments'
        },
        medicines: {
            title: 'Medicines',
            addMedicine: 'Add New Medicine',
            medicineName: 'Medicine Name',
            dosage: 'Dosage',
            frequency: 'Frequency',
            timing: 'Timing of Intake',
            startDate: 'Start Date',
            endDate: 'End Date',
            notes: 'Notes',
            notificationMethod: 'Notification Method',
            emailReminder: 'Email Reminder',
            smsReminder: 'SMS Reminder',
            both: 'Both Email & SMS',
            edit: 'Edit',
            delete: 'Delete',
            markAsTaken: 'Mark as Taken',
            morning: 'Morning',
            afternoon: 'Afternoon',
            evening: 'Evening',
            night: 'Night'
        },
        reminders: {
            title: 'Medicine Reminders',
            totalReminders: 'Total Reminders',
            activeReminders: 'Active Reminders',
            remindersSent: 'Reminders Sent',
            addReminder: 'Add New Reminder',
            upcoming: 'Upcoming Reminders',
            history: 'Reminder History',
            markTaken: 'Mark as Taken'
        },
        common: {
            logout: 'Logout',
            settings: 'Settings',
            help: 'Help',
            language: 'Language',
            theme: 'Theme',
            darkMode: 'Dark Mode'
        }
    },
    kn: {
        dashboard: {
            welcome: 'ಮೆಡಿಟ್ರ್ಯಾಕ್‌ಗೆ ಸ್ವಾಗತ',
            consultations: 'ಸಲಹೆ',
            consultationsDesc: 'ಆರೋಗ್ಯಸೇವೆ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ',
            medicalRecords: 'ವೈದ್ಯಕೀಯ ಪ್ರಕಾರ',
            medicalRecordsDesc: 'ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ಪ್ರಕಾರವನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ',
            emergency: 'ತುರ್ತು',
            emergencyDesc: 'ತುರ್ತು ಸೇವೆಗಳು ಮತ್ತು SOS ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಿ',
            pharmacy: 'ಔಷಧಾಲೆ',
            pharmacyDesc: 'ಹತ್ತಿರದ ಔಷಧಾಲೆಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅಗತ್ಯವಿರುವ ಔಷಧಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            symptoms: 'ರೋಗ ಲಕ್ಷಣಗಳು',
            symptomsDesc: 'AI ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ ನಿಮ್ಮ ರೋಗ ಲಕ್ಷಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ',
            medicines: 'ಔಷಧಗಳು',
            medicinesDesc: 'ನಿಮ್ಮ ಔಷಧಗಳು ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ನಿರ್ವಹಿಸಿ',
            reminders: 'ನೆನಪಿಸುವಿಕೆಗಳು',
            remindersDesc: 'ಇಮೇಲ್ ಮತ್ತು SMS ಮೂಲಕ ಔಷಧ ನೆನಪಿಸುವಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ'
        },
        emergency: {
            title: 'ತುರ್ತು ಸೇವೆಗಳು',
            sosButton: 'SOS',
            sosDesc: 'ತುರ್ತು ಸಹಾಯತೆಗಾಗಿ SOS ಒತ್ತಿರಿ',
            volunteers: 'ಹತ್ತಿರದ ಸ್ವಯಂಸೇವಕರು',
            rideBooking: 'ತುರ್ತು ರೈಡ್ ಬುಕ್ ಮಾಡಿ',
            myContacts: 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
            gpsSharing: 'ಸ್ಥಳ ಹಂಚಿಕೆ'
        },
        pharmacy: {
            title: 'ಔಷಧಾಲೆ ಸೇವೆಗಳು',
            search: 'ಔಷಧಗಳನ್ನು ಹುಡುಕಿ',
            nearbyPharmacies: 'ಹತ್ತಿರದ ಔಷಧಾಲೆಗಳು',
            homeDelivery: 'ಮನೆ ಡೆಲಿವರಿ',
            stockStatus: 'ಸ್ಟಾಕ್ ಸ್ಥಿತಿ'
        },
        records: {
            title: 'ವೈದ್ಯಕೀಯ ಪ್ರಕಾರ',
            history: 'ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ',
            prescriptions: 'ಡಿಜಿಟಲ್ ಪ್ರತಿಬಂಧನೆಗಳು',
            tests: 'ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳು',
            vaccines: 'ಲಸಿಕರಣ ರೆಕಾರ್ಡ್'
        },
        consult: {
            title: 'ಸಲಹೆ',
            availableDoctors: 'ಲಭ್ಯವಿರುವ ವೈದ್ಯರು',
            schedule: 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಿಗದಿ ಮಾಡಿ',
            myAppointments: 'ನನ್ನ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು'
        },
        medicines: {
            title: 'ಔಷಧಗಳು',
            addMedicine: 'ಹೊಸ ಔಷಧ ಸೇರಿಸಿ',
            medicineName: 'ಔಷಧದ ಹೆಸರು',
            dosage: 'ಪ್ರಮಾಣ',
            frequency: 'ವಾರ್ತಾವಲಿ',
            timing: 'ಸೇವನ ಸಮಯ',
            startDate: 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
            endDate: 'ಅಂತಿಮ ದಿನಾಂಕ',
            notes: 'ಟಿಪ್ಪಣಿ',
            notificationMethod: 'ಸೂಚನೆ ವಿಧಾನ',
            emailReminder: 'ಇಮೇಲ್ ನೆನಪಿಸುವಿಕೆ',
            smsReminder: 'SMS ನೆನಪಿಸುವಿಕೆ',
            both: 'ಇಮೇಲ್ ಮತ್ತು SMS ಎರಡೂ',
            edit: 'ಸಂಪಾದಿಸಿ',
            delete: 'ಅಳಿಸಿ',
            markAsTaken: 'ತೆಗೆದುಕೊಂಡಿದ್ದು ಎಂದು ಗುರುತಿಸಿ',
            morning: 'ಬೆಳಿಗ್ಗೆ',
            afternoon: 'ಮಧ್ಯಾಹ್ನ',
            evening: 'ಸಂಜೆ',
            night: 'ರಾತ್ರಿ'
        },
        reminders: {
            title: 'ಔಷಧ ನೆನಪಿಸುವಿಕೆಗಳು',
            totalReminders: 'ಒಟ್ಟು ನೆನಪಿಸುವಿಕೆಗಳು',
            activeReminders: 'ಸಕ್ರಿಯ ನೆನಪಿಸುವಿಕೆಗಳು',
            remindersSent: 'ಪಠಿಸಿದ ನೆನಪಿಸುವಿಕೆಗಳು',
            addReminder: 'ಹೊಸ ನೆನಪಿಸುವಿಕೆ ಸೇರಿಸಿ',
            upcoming: 'ಮುಂದಿನ ನೆನಪಿಸುವಿಕೆಗಳು',
            history: 'ನೆನಪಿಸುವಿಕೆಗಳ ಇತಿಹಾಸ',
            markTaken: 'ತೆಗೆದುಕೊಂಡಿದ್ದು ಎಂದು ಗುರುತಿಸಿ'
        },
        common: {
            logout: 'ನಿರ್ಗಮನ',
            settings: 'ಸಿದ್ಧತೆಗಳು',
            help: 'ಸಹಾಯ',
            language: 'ಭಾಷೆ',
            theme: 'ಥೀಮ್',
            darkMode: 'ಡಾರ್ಕ್ ಮೋಡ್'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const saved = localStorage.getItem('language');
        if (saved) setLanguage(saved);
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (path) => {
        const keys = path.split('.');
        let value = translations[language];
        for (let key of keys) {
            value = value?.[key];
        }
        return value || path;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = React.useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
