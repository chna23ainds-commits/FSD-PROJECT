import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Emergency.css';

const Emergency = () => {
    const { t } = useLanguage();
    const [sosActive, setSosActive] = useState(false);
    const [volunteers, setVolunteers] = useState([]);
    const [location, setLocation] = useState(null);
    const [emergencyContacts] = useState([
        { name: 'Police', number: '100' },
        { name: 'Ambulance', number: '102' },
        { name: 'Fire', number: '101' }
    ]);

    useEffect(() => {
        // Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    loadNearbyVolunteers();
                },
                (error) => console.error('Location error:', error)
            );
        }
    }, []);

    const loadNearbyVolunteers = () => {
        const mockVolunteers = [
            {
                id: 1,
                name: 'Raj Kumar',
                rating: 4.8,
                distance: 0.5,
                eta: 5,
                phone: '+91-9876543210',
                vehicle: 'Bike',
                available: true
            },
            {
                id: 2,
                name: 'Priya Singh',
                rating: 4.9,
                distance: 1.2,
                eta: 8,
                phone: '+91-9876543211',
                vehicle: 'Car',
                available: true
            },
            {
                id: 3,
                name: 'Arun Patel',
                rating: 4.7,
                distance: 1.8,
                eta: 12,
                phone: '+91-9876543212',
                vehicle: 'Auto',
                available: true
            }
        ];
        setVolunteers(mockVolunteers);
    };

    const activateSOS = () => {
        setSosActive(true);
        if (location) {
            console.log('SOS Activated! Location:', location);
        }
        alert('SOS Activated! Emergency services have been notified of your location.');
    };

    const deactivateSOS = () => {
        setSosActive(false);
    };

    const bookRide = (volunteer) => {
        if (window.confirm(`Book ride with ${volunteer.name}? They will arrive in ~${volunteer.eta} minutes.`)) {
            console.log('Booking ride with:', volunteer);
            alert(`Ride booked with ${volunteer.name}! They will contact you shortly.`);
        }
    };

    const callVolunteer = (volunteer) => {
        if (window.confirm(`Call ${volunteer.name} at ${volunteer.phone}?`)) {
            window.location.href = `tel:${volunteer.phone}`;
        }
    };

    const emergencyCall = (number, name) => {
        if (window.confirm(`Call ${name} (${number})?`)) {
            window.location.href = `tel:${number}`;
        }
    };

    return (
        <div className="emergency">
            <Header />
            <div className="emergency-container">
                <h1>{t('emergency.title')}</h1>

                {/* SOS Button */}
                <div className="sos-section">
                    <button
                        className={`sos-button ${sosActive ? 'active' : ''}`}
                        onClick={sosActive ? deactivateSOS : activateSOS}
                    >
                        {sosActive ? 'SOS ACTIVE' : 'SOS'}
                    </button>
                    {sosActive && <div className="sos-pulse"></div>}
                    <p className="sos-text">{t('emergency.sosDesc')}</p>
                </div>

                {/* Emergency Contacts */}
                <div className="emergency-contacts-section">
                    <h3>Emergency Numbers</h3>
                    <div className="contacts-grid">
                        {emergencyContacts.map((contact) => (
                            <button
                                key={contact.number}
                                className="contact-btn"
                                onClick={() => emergencyCall(contact.number, contact.name)}
                            >
                                <span className="contact-name">{contact.name}</span>
                                <span className="contact-number">{contact.number}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nearby Volunteers */}
                <div className="volunteers-section">
                    <h3>{t('emergency.volunteers')}</h3>
                    {volunteers.length > 0 ? (
                        <div className="volunteers-grid">
                            {volunteers.map((volunteer) => (
                                <div key={volunteer.id} className="volunteer-card">
                                    <div className="volunteer-header">
                                        <h4>{volunteer.name}</h4>
                                        <span className="rating">⭐ {volunteer.rating}</span>
                                    </div>
                                    <div className="volunteer-info">
                                        <p>📍 {volunteer.distance} km away</p>
                                        <p>⏱️ ~{volunteer.eta} min ETA</p>
                                        <p>🚗 {volunteer.vehicle}</p>
                                    </div>
                                    <div className="volunteer-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => bookRide(volunteer)}
                                        >
                                            Book Ride
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => callVolunteer(volunteer)}
                                        >
                                            Call
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading nearby volunteers...</p>
                    )}
                </div>

                {/* GPS Sharing */}
                <div className="gps-section">
                    <h3>{t('emergency.gpsSharing')}</h3>
                    {location ? (
                        <div className="location-info">
                            <p>Latitude: {location.lat.toFixed(4)}</p>
                            <p>Longitude: {location.lng.toFixed(4)}</p>
                            <button className="btn btn-primary">
                                Share Location with Emergency Contacts
                            </button>
                        </div>
                    ) : (
                        <p>Detecting location...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Emergency;
