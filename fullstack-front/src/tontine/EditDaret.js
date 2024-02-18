import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();


  const jwtToken = localStorage.getItem('jwtToken');

  const [daret, setDaret] = useState({
    name:"",  
    numberOfParticipants:0,
   numberOfParticipantsTotal:"",
    amountPerPeriod:"",
    periodicity:"",
    //startDate:""

 });

  const { name,
   numberOfParticipantsTotal,
   numberOfParticipants,
   amountPerPeriod,
   periodicity,
   //startDate
  } = daret;
   
  useEffect(() => {
    loadDarets(); }, []);

  const loadDarets = async () => {
    try {
      const result = await axios.get(`http://localhost:8082/admin/daret/info/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      setDaret(result.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };


  const handleEditDaret = (e) => {
    // Add the new data to the state
    setDaret({ ...daret, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const request = await axios.put(`http://localhost:8082/admin/daret/edit/${id}`, daret , {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    console.log(request.data);
    navigate("/admin_daret");
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Daret</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Daret Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your daret name"
                name="name"
                value={name}
                onChange={(e) => handleEditDaret(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numberOfParticipantsTotal" className="form-label">
                Number Of Participants
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your numberOfParticipantsTotal"
                name="numberOfParticipantsTotal"
                value={numberOfParticipantsTotal}
                onChange={(e) => handleEditDaret(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amountPerPeriod" className="form-label">
                Amount Per Period
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter amount per period"
                name="amountPerPeriod"
                value={amountPerPeriod}
                onChange={(e) => handleEditDaret(e)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor=" startDate" className="form-label">
              Enter a date for Daret:
              </label>
              <input
                type={"datetime-local"}
                className="form-control"
                placeholder="Enter a date for Daret"
                name=" startDate"
                value={startDate}
                onChange={(e) => handleEditDaret(e)}
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="periodicity" className="form-label">
                periodicity
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter periodicity"
                name="periodicity"
                value={periodicity}
                onChange={(e) => handleEditDaret(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin_daret">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
