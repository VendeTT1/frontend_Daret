import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from "axios";

export default function Participer() {

  const jwtToken = localStorage.getItem('jwtToken');
  const amount = 100;
  const { id } = useParams();
  const [darets, setDarets] = useState([]);

  
  useEffect(() => {
    loadDarets();
  }, []);
console.log(darets.id);
console.log(id);
  const loadDarets = async () => {
    try {
      const result = await axios.post(`http://localhost:8082/user/participation/${id}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setDarets(result.data);
    } catch (error) {
      console.error('Error loading darets:', error.message);
    }
  };

  return (
    <div>
      <h1>Participer Component</h1>
      <button onClick={loadDarets}>Payer amount</button>
      <Link to="/home_daret">Click me!</Link>
    </div>
  );
}
