import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Pharmacy.css';

const Pharmacy = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [medicines, setMedicines] = useState([
        { id: 1, name: 'Aspirin', price: 50, stock: 'In Stock', quantity: 100 },
        { id: 2, name: 'Cough Syrup', price: 150, stock: 'In Stock', quantity: 45 },
        { id: 3, name: 'Vitamin C', price: 120, stock: 'Low Stock', quantity: 10 },
        { id: 4, name: 'Paracetamol', price: 45, stock: 'In Stock', quantity: 200 },
        { id: 5, name: 'Antibiotics', price: 350, stock: 'In Stock', quantity: 30 }
    ]);
    const [pharmacies, setPharmacies] = useState([
        { id: 1, name: 'Apollo Pharmacy', distance: 0.8, rating: 4.5 },
        { id: 2, name: 'Life Pharmacy', distance: 1.2, rating: 4.3 },
        { id: 3, name: 'MediCare Pharmacy', distance: 1.5, rating: 4.7 }
    ]);

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const orderMedicine = (medicine) => {
        alert(`${medicine.name} added to cart! Total: ₹${medicine.price}`);
    };

    return (
        <div className="pharmacy">
            <Header />
            <div className="pharmacy-container">
                <h1>{t('pharmacy.title')}</h1>

                {/* Search */}
                <div className="search-section">
                    <input
                        type="text"
                        placeholder={t('pharmacy.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Nearby Pharmacies */}
                <div className="pharmacies-section">
                    <h3>{t('pharmacy.nearbyPharmacies')}</h3>
                    <div className="pharmacies-grid">
                        {pharmacies.map((pharmacy) => (
                            <div key={pharmacy.id} className="pharmacy-card">
                                <h4>{pharmacy.name}</h4>
                                <p>📍 {pharmacy.distance} km away</p>
                                <p>⭐ {pharmacy.rating}</p>
                                <button className="btn btn-primary">View Store</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Medicines */}
                <div className="medicines-section">
                    <h3>Available Medicines</h3>
                    {filteredMedicines.length > 0 ? (
                        <div className="medicines-grid">
                            {filteredMedicines.map((medicine) => (
                                <div key={medicine.id} className="medicine-card">
                                    <h4>{medicine.name}</h4>
                                    <p className="price">₹{medicine.price}</p>
                                    <p className={`stock ${medicine.stock === 'In Stock' ? 'in-stock' : 'low-stock'}`}>
                                        {medicine.stock}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => orderMedicine(medicine)}
                                    >
                                        {t('pharmacy.homeDelivery')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No medicines found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
