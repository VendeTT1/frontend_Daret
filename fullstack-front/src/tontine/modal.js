import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function AddDaret() {

    const [showModal, setShowModal] = useState(true);
    let navigate = useNavigate();
    const { id } = useParams();
    //  const amountPerPeriod = 0;

    const [money, setMoney] = useState();

    const jwtToken = localStorage.getItem('jwtToken');

    const [daret, setDaret] = useState({});
    const [darets, setDarets] = useState([]);

    useEffect(() => {
        loadDarets();
    }, []);
    const loadDarets = async () => {
        const result = await axios.get(`http://localhost:8082/user/daret/info/${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        setDaret(result.data);
        console.log(result.data);
      
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8082/user/daret/info/${id}`, darets, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        });
        handleCloseModal();

    };

    const handleAddDaret = (e) => {
        // Add the new data to the state
        setMoney({ ...money, [e.target.name]: e.target.value });
    };


    const handleDaret = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/home_daret');
    };


    return (

        <div className="col-md-4 text-end">
            <Button variant="danger" className="add-button btn-lg" onClick={handleDaret}>
                $$
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} onClick={loadDarets} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Daret</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border rounded p-4 mt-2 shadow mb-3">
                        <form /*onSubmit={(e) => onSubmit(e)}*/>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="daret_amountPerPeriod" className="form-label">
                                        Enter Amount :
                                    </label>
                                    <select
                                        className="form-select"
                                        name="amountPerPeriod"
                                        onChange={(e) => handleAddDaret(e)}
                                        required
                                    >
                                      <option value={daret.amountPerPeriod}>{daret.amountPerPeriod/daret.numberOfParticipantsTotal} DHS</option>
                                      {/* <option value={daret.amountPerPeriod}>{daret.amountPerPeriod} DHS</option> */}
                                    </select> </div>
                            </div>
                            <Modal.Footer>
                                <Button type="submit" variant="primary" /*onClick={onSubmit}*/ ><Link style={{ color: 'white' }} to={"/home_daret"}>Pay</Link></Button>
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
