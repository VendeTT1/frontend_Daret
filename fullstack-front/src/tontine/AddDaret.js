import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function AddDaret() {

  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();

  const [daret, setDaret] = useState({
    name: "",
    numberOfParticipantsTotal: "",
    numberOfParticipants: 0,
    amountPerPeriod: "",
    period: "",

 });


  const jwtToken = localStorage.getItem('jwtToken');

  const { name,
    numberOfParticipantsTotal,
    amountPerPeriod,
    period,
 } = daret;

  const [darets, setDarets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8082/admin/daret/save", daret, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    handleCloseModal();   
    
  };
  const handleAddDaret = (e) => {
    // Add the new data to the state
    setDaret({ ...daret, [e.target.name]: e.target.value });
  };


  const handleDaret = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (

    <div className="col-md-4 text-end">
      <Button variant="danger" className="add-button btn-lg" onClick={handleDaret}>
        +Add Daret
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} /*onClick ={loadDarets}*/ className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Daret</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-4 mt-2 shadow mb-3">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="daret_name" className="form-label">
                    Enter a name for Daret:
                  </label>
                  <input type={"text"} className="form-control" name="name" value={name} onChange={(e) => handleAddDaret(e)} placeholder="Enter a name for Daret"  required />
                </div>
                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="daret_date" className="form-label">
                    Enter a date for Daret:
                  </label>
                  <input type={"datetime-local"} className="form-control" name="startDate" value={startDate} onChange={(e) => handleAddDaret(e)}  placeholder="Enter a date for Daret"  required/>
                </div> */}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="daret_member_number" className="form-label">
                    Enter the number of members for Daret:
                  </label>
                  <input type={"number"} className="form-control" name="numberOfParticipantsTotal" value={numberOfParticipantsTotal} onChange={(e) => handleAddDaret(e)}  placeholder="Enter the number of members for Daret" required/>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="daret_amountPerPeriod" className="form-label">
                    Enter amount Per Period for Daret:
                  </label>
                  <input type={"number"} className="form-control" name="amountPerPeriod" value={amountPerPeriod} onChange={(e) => handleAddDaret(e)}  placeholder="Enter amount Per Period for Daret" required/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="daret_period" className="form-label">
                    Enter the period for Daret:
                  </label>
                  <input type={"text"} className="form-control" name="period" value={period} onChange={(e) => handleAddDaret(e)} placeholder="Enter the period (month or week)" required/>
                </div>
              </div>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={onSubmit}>Add</Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  );

};
