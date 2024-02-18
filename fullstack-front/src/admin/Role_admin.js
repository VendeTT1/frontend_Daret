import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Role_admin() {
    // const [showModal, setShowModal] = useState(false);
    // let navigate = useNavigate();
    const { id } = useParams();
   /* const [daret, setDaret] = useState({
        name:"",  
        numberOfParticipants:"",
        numberOfParticipantsTotal:"",
        amountPerPeriod:"",
        periodicity:"",
        startDate:""
    
     });*/

    const jwtToken = localStorage.getItem('jwtToken');
    const [darets, setDarets] = useState([]);
    useEffect(() => {
   loadDarets();
 }, []);
 const loadDarets = async () =>{
try {
        const result = await axios.get(`http://localhost:8082/admin/daret/info/${id}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
        setDarets(result.data);
      }
      catch(error){
          console.error("Error loading data:", error);
      }
    };
    return (
        
        <div className="container " >
<div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" style={{ position: 'absolute', top:636, right:25 }}>
    <div className="card">
            <div className="card-header">
                Turn Details:
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Current Turn: </b>
                        Achraf Dari
                    </li>
                    </ul>
        </div>
    </div>
</div>

                
 </div>
 

    )
}
