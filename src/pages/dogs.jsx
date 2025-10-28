import React, { useState, useEffect } from 'react';
import '/src/css/dogs.css';
import { Link } from 'react-router-dom';

const Dogs = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultDogImage = 'https://g.petango.com/shared/Photo-Not-Available-dog.gif';

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch('https://cie2sudoih.execute-api.eu-north-1.amazonaws.com/dog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('API Response:', data);
                
                // DITT API RETURNERAR EN ARRAY DIREKT
                if (Array.isArray(data)) {
                    setDogs(data);
                } else {
                    console.warn('Unexpected API response format:', data);
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

    // I din Dogs.js komponent
return (
    <div className="dogs-container">
        <h1>Våra Hundar</h1>
        <div className="dogs-grid">
            {dogs.map((dog) => (
                <div key={dog.chipNumber} className="dog-card">
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
                        {dog.present && <div className="present-badge">Är här nu</div>}
                    </div>
                    <div className="dog-card-content">
                        <h3>{dog.name}</h3>
                        <p>Ras: {dog.breed}</p>
                        <p>Kön: {dog.sex === 'female' ? 'Tik' : 'Hane'}</p>
                        <p>Ålder: {dog.age} år</p>
                        <p>Ägare: {dog.owner.name} {dog.owner.lastName}</p>
                        <Link to={`/dogs/${dog.chipNumber}`}>
                            <button className="details-btn">Se detaljer</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}


//     return (
//         <div className="dogs-container">
//             <h1>Våra Hundar</h1>
//             <div className="dogs-grid">
//                 {dogs.map((dog) => (
//                     <div key={dog.id} className="dog-card">  {/* Ändra till dog.id */}
//                         <div className="dog-image-container">
//                             <img 
//                                 src={dog.img || defaultDogImage}
//                                 alt={dog.name || `Hund ${dog.id}`} 
//                                 className="dog-image"
//                                 onError={(e) => {
//                                     e.target.src = defaultDogImage;
//                                     e.target.alt = 'Bild saknas';
//                                 }}
//                             />
//                         </div>
//                         <div className="dog-card-content">
//                             <h3>{dog.name || `Hund ${dog.id}`}</h3>  {/* Lägg till namn-fallback */}
//                             <p>Ras: {dog.breed}</p>
//                             <p>Ålder: {dog.age} år</p>
//                             <p>Färg: {dog.color}</p>  {/* Lägg till färg */}
//                             <p>Vikt: {dog.weight} kg</p>  {/* Lägg till vikt */}
//                             <Link to={`/dogs/${dog.id}`}>  {/* Ändra till dog.id */}
//                                 <button className="details-btn">Se detaljer</button>
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

export default Dogs;