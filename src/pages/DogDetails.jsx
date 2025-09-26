import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '/src/css/DogDetails.css';

const DogDetails = () => {
    const { chipNumber } = useParams();
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultDogImage = 'https://g.petango.com/shared/Photo-Not-Available-dog.gif';

    
    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch('https://api.jsonbin.io/v3/b/68d39fbfae596e708ff9a30e', {
                    headers: {
                        'X-Master-Key': '$2a$10$MsR/CgyzuiAwuLqMs0iNu.taMP4K46.tdN4tiUIyfglRDd2d.TY9i'
                    }
                });
                const data = await response.json();
                
                if (data.record && data.record.dogs) {
                    setDogs(data.record.dogs);
                } else if (data.record) {
                    setDogs(data.record);
                } else {
                    setDogs([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dogs:', error);
                setLoading(false);
            }
        };

        fetchDogs();
    }, []);

    // Hitta den specifika hunden
    const dog = dogs.find(d => d.chipNumber === chipNumber);

    if (loading) {
        return (
            <div className="loading-container">
                <div>Laddar hundinformation...</div>
            </div>
        );
    }

    if (!dog) {
        return (
            <div className="error-container">
                <h2>Hund med chipnummer {chipNumber} hittades inte</h2>
            </div>
        );
    }

    return (
        <div className="dog-details-container">
            <div className="dog-details-content">
                <div>
                    <img 
                        src={dog.img || defaultDogImage}
                        alt={dog.name}
                        className="dog-image-large"
                        onError={(e) => {
                            e.target.src = defaultDogImage;
                            e.target.alt = 'Bild saknas';
                        }}
                    />
                </div>

                <div className="info-grid">
                    <div className="dog-info-section">
                        <h2>Hundinformation</h2>
                        <div className="info-item">
                            <span className="info-label">Namn:</span>
                            <span className="info-value">{dog.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Kön:</span>
                            <span className="info-value">
                                {dog.sex === 'female' ? 'Tik 🐕‍🦺' : 'Hane 🐶'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Ras:</span>
                            <span className="info-value">{dog.breed}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Ålder:</span>
                            <span className="info-value">{dog.age} år</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Chipnummer:</span>
                            <span className="info-value">{dog.chipNumber}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Närvarande:</span>
                            <span className={`info-value ${dog.present ? 'present-true' : 'present-false'}`}>
                                {dog.present ? 'Ja ✅' : 'Nej ❌'}
                            </span>
                        </div>
                    </div>

                    <div className="dog-info-section owner-info">
                        <h2>Ägarinformation</h2>
                        <div className="info-item">
                            <span className="info-label">Namn:</span>
                            <span className="info-value">{dog.owner.name} {dog.owner.lastName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Telefon:</span>
                            <span className="info-value">{dog.owner.phoneNumber}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DogDetails;
