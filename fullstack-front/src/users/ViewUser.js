import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

 const { id }= useParams();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);
  const jwtToken = localStorage.getItem('jwtToken');
  console.log("hello this is id my before the request"+id);
  
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8082/admin/user/info/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      console.log("hello this is my id after the request: " + id);
      setUsers(result.data);
    } catch (error) {
      console.error('Error loading user:', error.message);
    }

};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {users.userId}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {users.name}
                </li>
                <li className="list-group-item">
                  <b>UserName:</b>
                  {users.username}
                </li>
                <li className="list-group-item">
                  <b>Email:</b>
                  {users.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/home_users"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


