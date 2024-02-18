import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Test from "../test/test";

export default function Periodicite_admin() {
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();
    const counter = 0;
    const [daret, setDaret] = useState({
        name:"",  
        numberOfParticipants:"",
        numberOfParticipantsTotal:"",
        amountPerPeriod:"",
        periodicity:"",
        startDate:""
    
     });

     const jwtToken = localStorage.getItem('jwtToken');
    const [darets, setDarets] = useState([]);
    useEffect(() => {
   loadDarets();
 }, []);

    const loadDarets = async () => {
        const result = await axios.get(`http://localhost:8082/admin/daret/info/${id}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
        setDarets(result.data);
    
      };
    return (
        
        <div className="container " >
<div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{ position: 'absolute', top: "20%", left:"23%" }}>
    <div className="card">
            <div className="card-header">
                Periodicity Details:
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Previous Period: </b>
                        {darets.numberOfParticipantsTotal}
                    </li>
                    <li className="list-group-item">
                        <b>Remaining Period: </b>
                        5
                    </li>
                <li className="list-group-item">
                <b>Who Paid in ongoing Period: </b>
                </li>
                <br></br>
                <Test/>
                    </ul>
        </div>
    </div>
</div>
</div>
 
    )
}
