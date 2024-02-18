import React, { useEffect, useState } from 'react';
import {  Table, } from 'react-bootstrap';
import { Link,useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Modal from "./modal";


export default function HomeDaret() {

  const [buttonClicked, setButtonClicked] = useState(false);
 let navigate = useNavigate();
const { id } = useParams(); 

  const [amount, setAmount] = useState({});
  const [darets, setDarets] = useState([]);
  useEffect(() => {
    loadDarets();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken');

  const loadDarets = async () => {
    const result = await axios.get("http://localhost:8082/user/daret/all", {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    setDarets(result.data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const send = await axios.post(`http://localhost:8082/user/participation/${id}`, amount,{
        Authorization: `Bearer ${jwtToken}`
      }
    );
    setDarets(send.data);
  }

 const participateInDaret = async (id) => {
  // Check if the button has already been clicked
  if (buttonClicked) {
    console.log('Button has already been clicked.');
    // Optionally, you can display a message to the user
    // setMessage('You have already participated in this daret.');
    return;
  }

  // Check if the user has already participated in this daret
  // const hasParticipated = localStorage.getItem(`participation_${id}`) === 'true';
  // if (hasParticipated) {
  //   console.log('You have already participated in this daret.');
  //   // Optionally, you can display a message to the user
  //   // setMessage('You have already participated in this daret.');
  //   return;
  // }

  // Find the daret by id and increment the numberOfParticipants locally
  const updatedDaretts = darets.map(async (daret) => {
    if (daret.id === id && daret.numberOfParticipants < daret.numberOfParticipantsTotal) {
      try {
        // Increment the numberOfParticipants locally
        const updatedDaret = { ...daret, numberOfParticipants: daret.numberOfParticipants + 1 };

        // Send a PUT request to update the numberOfParticipants on the server
        await axios.put(`http://localhost:8082/user/daret/edit/participant_number/${id}`, { numberOfParticipants: updatedDaret.numberOfParticipants }, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        ;

        console.log('PUT request successful');

        // Set the buttonClicked state to true after successfully participating
        setButtonClicked(true);

        // Optionally, you can display a message to the user
        // setMessage('You have successfully participated in this daret.');

        // Update the local storage to indicate that the user has participated in this daret
        // localStorage.setItem(`participation_${id}`, 'true');

        return updatedDaret;
      } catch (error) {
        console.error('Error updating numberOfParticipants:', error);
        alert(error);
        // You may want to handle the error accordingly (e.g., show a message to the user)
        return daret; // Return the original daret if the PUT request fails
      }
    } else {
      alert('Cannot participate, reached the total limit of participants.');
    
      // Optionally, you can set a state to track whether the button should be disabled
      // setButtonDisabled(true);
    }

    return daret;
  });

  // Wait for all promises to resolve and then update the state with the new darets array
  setDarets(await Promise.all(updatedDaretts));

  // Navigate to the desired page after participating
  // navigate(`/participer/${darets.id}`);
};
  
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="row shadow-lg">
        <div className="col-md-12">
          <div className="border rounded p-4 mt-2 shadow mb-3">
            <div className="row mb-3">
              <div className="col-md-8">
                {/* Table */}
                <div className="table border shadow" style={{ width: '152%', minWidth: '1000px', height:'100%' }}>
                  <Table >
                    <thead>
                      <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Nom Daret</th>
                        {/* <th scope="col">Start Date</th> */}
                        <th scope="col">Membre Number</th>
                        {/* <th scope="col">Periode</th> */}
                        <th scope="col">Amount Per Period</th>
                        <th scope="col ">Action</th>
                        <th scope="col">Participer</th>
                        <th scope="col">Payer ici</th>
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
                          {/* <td>{darets.period}</td> */}
                          <td>{darets.amountPerPeriod} DH</td>
                          <td>
                            <Link className="btn btn-primary mx-2" to={`/daret_view/${darets.id}`}>View</Link>
                          </td>
                          <td><button className="btn btn-success mx-2" onClick={() => participateInDaret(darets.id)} >Participer</button></td> 
                          {/* <Link to={`/daret_view/${darets.id}`}></Link> */}
                          <td> <Link style={{ color: 'red' }}to={`/modal/${darets.id}`}>$$</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
