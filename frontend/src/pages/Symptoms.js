import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Symptoms.css';

const Symptoms = () => {
    const { t } = useLanguage();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [analysis, setAnalysis] = useState(null);

    const availableSymptoms = [
        'Fever', 'Cough', 'Cold', 'Headache', 'Body Pain',
        'Sore Throat', 'Fatigue', 'Nausea', 'Diarrhea', 'Chills'
    ];

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptom)
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
        setAnalysis(null);
    };

    const analyzeSymptoms = () => {
        if (selectedSymptoms.length === 0) {
            alert('Please select at least one symptom');
            return;
        }

        // Mock AI analysis
        const mockAnalysis = {
            conditions: [
                { name: 'Common Cold', probability: 85 },
                { name: 'Flu', probability: 70 },
                { name: 'COVID-19', probability: 45 }
            ],
            recommendations: [
                'Stay hydrated and rest',
                'Take fever-reducing medication if needed',
                'Consult a doctor if symptoms persist for more than 7 days',
                'Wear mask if you have respiratory symptoms'
            ],
            urgency: 'Low'
        };

        setAnalysis(mockAnalysis);
    };

    const consultDoctor = () => {
        alert('Redirecting to doctor consultation...');
        // Navigate to consult page
    };

    return (
        <div className="symptoms">
            <Header />
            <div className="symptoms-container">
                <h1>Symptom Checker</h1>

                {/* Symptoms Selection */}
                <div className="symptoms-section">
                    <h3>Select Your Symptoms</h3>
                    <div className="symptoms-grid">
                        {availableSymptoms.map((symptom) => (
                            <button
                                key={symptom}
                                className={`symptom-btn ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                                onClick={() => toggleSymptom(symptom)}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Analyze Button */}
                {selectedSymptoms.length > 0 && (
                    <button className="btn btn-primary analyze-btn" onClick={analyzeSymptoms}>
                        Analyze Symptoms
                    </button>
                )}

                {/* Analysis Results */}
                {analysis && (
                    <div className="analysis-section">
                        <div className="urgency-indicator" style={{ borderColor: 'var(--primary, #667eea)' }}>
                            <strong>Urgency Level:</strong> <span className="low">{analysis.urgency}</span>
                        </div>

                        <div className="conditions-section">
                            <h3>Possible Conditions</h3>
                            {analysis.conditions.map((condition, idx) => (
                                <div key={idx} className="condition-card">
                                    <h4>{condition.name}</h4>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${condition.probability}%` }}
                                        ></div>
                                    </div>
                                    <p>{condition.probability}% probability</p>
                                </div>
                            ))}
                        </div>

                        <div className="recommendations-section">
                            <h3>Recommendations</h3>
                            <ul>
                                {analysis.recommendations.map((rec, idx) => (
                                    <li key={idx}>{rec}</li>
                                ))}
                            </ul>
                        </div>

                        <button className="btn btn-primary" onClick={consultDoctor}>
                            Consult a Doctor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Symptoms;
