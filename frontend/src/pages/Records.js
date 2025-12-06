import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Records.css';

const Records = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('history');
    const [medicalHistory] = useState([
        {
            id: 1,
            date: '2024-11-15',
            condition: 'Common Cold',
            doctor: 'Dr. Smith',
            notes: 'Rest and fluids recommended'
        },
        {
            id: 2,
            date: '2024-10-20',
            condition: 'Hypertension',
            doctor: 'Dr. Johnson',
            notes: 'Blood pressure monitoring required'
        }
    ]);
    const [prescriptions] = useState([
        {
            id: 1,
            date: '2024-11-15',
            doctor: 'Dr. Smith',
            medicines: ['Aspirin 100mg', 'Cough Syrup 10ml'],
            refills: 2
        },
        {
            id: 2,
            date: '2024-10-20',
            doctor: 'Dr. Johnson',
            medicines: ['Blood Pressure Monitor', 'Medication X 5mg'],
            refills: 1
        }
    ]);
    const [labTests] = useState([
        { id: 1, date: '2024-11-10', test: 'Blood Test', status: 'Completed', result: 'Normal' },
        { id: 2, date: '2024-10-15', test: 'Cholesterol', status: 'Completed', result: 'High' }
    ]);
    const [vaccines] = useState([
        { id: 1, date: '2024-06-01', vaccine: 'COVID-19 (Dose 3)', status: 'Completed' },
        { id: 2, date: '2024-01-15', vaccine: 'Tetanus', status: 'Completed' }
    ]);

    return (
        <div className="records">
            <Header />
            <div className="records-container">
                <h1>{t('records.title')}</h1>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        {t('records.history')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'prescriptions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prescriptions')}
                    >
                        {t('records.prescriptions')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tests')}
                    >
                        {t('records.tests')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'vaccines' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vaccines')}
                    >
                        {t('records.vaccines')}
                    </button>
                </div>

                {/* Medical History */}
                {activeTab === 'history' && (
                    <div className="tab-content">
                        {medicalHistory.map((record) => (
                            <div key={record.id} className="record-card">
                                <div className="record-header">
                                    <h3>{record.condition}</h3>
                                    <span className="date">{new Date(record.date).toLocaleDateString()}</span>
                                </div>
                                <p><strong>Doctor:</strong> {record.doctor}</p>
                                <p><strong>Notes:</strong> {record.notes}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Prescriptions */}
                {activeTab === 'prescriptions' && (
                    <div className="tab-content">
                        {prescriptions.map((prescription) => (
                            <div key={prescription.id} className="record-card">
                                <div className="record-header">
                                    <h3>Prescription from {prescription.doctor}</h3>
                                    <span className="date">{new Date(prescription.date).toLocaleDateString()}</span>
                                </div>
                                <div className="medicines-list">
                                    <strong>Medicines:</strong>
                                    <ul>
                                        {prescription.medicines.map((med, idx) => (
                                            <li key={idx}>{med}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p><strong>Refills Available:</strong> {prescription.refills}</p>
                                <button className="btn btn-primary">Download PDF</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Lab Tests */}
                {activeTab === 'tests' && (
                    <div className="tab-content">
                        {labTests.map((test) => (
                            <div key={test.id} className="record-card">
                                <div className="record-header">
                                    <h3>{test.test}</h3>
                                    <span className="date">{new Date(test.date).toLocaleDateString()}</span>
                                </div>
                                <p><strong>Status:</strong> {test.status}</p>
                                <p><strong>Result:</strong> <span className="result-badge">{test.result}</span></p>
                                <button className="btn btn-secondary">View Details</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Vaccines */}
                {activeTab === 'vaccines' && (
                    <div className="tab-content">
                        {vaccines.map((vaccine) => (
                            <div key={vaccine.id} className="record-card">
                                <div className="record-header">
                                    <h3>{vaccine.vaccine}</h3>
                                    <span className="date">{new Date(vaccine.date).toLocaleDateString()}</span>
                                </div>
                                <p><strong>Status:</strong> {vaccine.status}</p>
                                <button className="btn btn-secondary">Certificate</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Records;
