import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import MyComponent from '../tontine/AddDaret';
import EditComponent from '../tontine/EditDaret';

export default function HomeDaret() {

  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  // let navigate = useNavigate();

  const [daret, setDaret] = useState({
    name: "",
    numberOfParticipants: "",
    numberOfParticipantsTotal: "",
    amountPerPeriod: "",
    period: "",
    //startDate: ""

  });
  
const [darets, setDarets] = useState([]);
  useEffect(() => {
    loadDarets();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken');
  

// Example function to make a GET request with Axios
const loadDarets = async () => {
    try {
      const response = await axios.get('http://localhost:8082/admin/daret/all', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setDarets(response.data);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};


  const deleteDaret = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this daret?');
    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      await axios.delete(`http://localhost:8082/admin/daret/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    //  await axios.delete(`http://localhost:8082/admin/daret/${id}`);
      loadDarets();
    } else {
      // If the user cancels, you can optionally handle this case
      console.log('Deletion canceled by user');
    }
  };

  
  return (
    
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="row shadow-lg">
      <Link className="btn btn-danger mx-2" style={{ left:'50%', right:'50%', width :'160px'}} to="/home_users">Users Managment</Link>
        <div className="col-md-12">
          <div className="border rounded p-4 mt-2 shadow mb-3">
            <div className="row mb-3">
              <div className="col-md-8">
              </div>
              <MyComponent />
            </div>
            {/* <div  style={{ position: 'fixed', top: '20%', left: '35%' }}>  */}
           
            {/* </div> */}

            {/* Table */}
            <div className="table border shadow" style={{ width: '100%', minWidth: '1000px' }}>
              <Table >
                <thead>
                  <tr>
                    <th scope="col">Numéro</th>
                    <th scope="col">Nom Daret</th>
                    {/* <th scope="col">Start Date</th> */}
                    <th scope="col">Membre Number</th>
                    <th scope="col">Periode</th>
                    <th scope="col">Amount Per Period</th>
                    <th scope="col " style={{ width: '250px' }}>Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {darets.map((darets, index) => (
                    <tr>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{darets.name}</td>
                      {/* <td>{darets.startDate}</td> */}
                      <td>{darets.numberOfParticipants} / {darets.numberOfParticipantsTotal}</td>
                      {/* <td>{darets.numberOfParticipants}</td> */}
                      <td>{darets.period}</td>
                      <td>{darets.amountPerPeriod} DH</td>
                      <td>
                        <Link className="btn btn-primary mx-2" to={`/daret_view_admin/${darets.id}`}>View</Link>

                        <Link className="btn btn-outline-primary mx-2" to={`/daret_edit/${darets.id}`}>Edit</Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteDaret(darets.id)}>Delete</button>

                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>

             

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
