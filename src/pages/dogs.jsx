import React, { useState, useEffect } from 'react';
import '/src/css/dogs.css';

const Dogs = () => {
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
                console.log('API Response:', data);
                
                // Anpassa beroende på datastruktur:
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

    if (loading) {
        return (
            <div className="loading-container">
                <div>Laddar hundar...</div>
            </div>
        );
    }

    return (
        <div className="dogs-container">
            <h1>Våra Hundar</h1>
            <div className="dogs-grid">
                {dogs.map((dog) => (
                    <div key={dog.id} className="dog-card">
                        <div className="dog-image-container">
                            <img 
                                src={dog.img || defaultDogImage}
                                alt={dog.name}
                                className="dog-image"
                                onError={(e) => {
                                    e.target.src = defaultDogImage;
                                    e.target.alt = 'Bild saknas';
                                }}
                            />
                        </div>
                        <div className="dog-card-content">
                            <h3>{dog.name}</h3>
                            <p>Ras: {dog.breed}</p>
                            <p>Ålder: {dog.age} år</p>
                            <button className="details-btn">Se detaljer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dogs;