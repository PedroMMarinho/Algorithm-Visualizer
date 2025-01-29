import { useState, useEffect } from 'react';

function About() {

  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    // Substitua pela URL do seu endpoint
    fetch(apiUrl + '/weatherforecast')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div>
      <h1>Dados do Backend:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.date} - {item.temperatureC}°C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;