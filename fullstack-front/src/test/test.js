import axios from "axios";
import React, { useEffect, useState } from "react";

const DynamicDataDisplay = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken');

  const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:8082/admin/user/all", {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
          console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData directly in useEffect to fetch data when component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

  return (

    <div className="card">
    <div className="card-header">
      Participants List:
      <ul className="list-group list-group-flush">
      <table className="table border shadow">
        <thead>
          <tr>
            <th>Number</th>
            <th>Participant Name</th>
          </tr>
        </thead>
        <tbody>
  {users.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td> 
      <td>{item.username}</td>
    </tr>
  ))}
</tbody>
      </table>
      </ul>
    </div>
    </div>

  );
};

export default DynamicDataDisplay;