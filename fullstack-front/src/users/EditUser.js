import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();
  const jwtToken = localStorage.getItem('jwtToken');


  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const { name, username, email } = user;
const userdata = {name,username,email} ;


  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8082/admin/user/info/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      
      setUser(result.data);
    } catch (error) {
      console.error('Error loading user:', error.message);
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    
      console.log(user);
      
      const result = await axios.put(`http://localhost:8082/admin/user/edit/${id}`, userdata, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        
      }
    });
      console.log(result.data);
      console.log('Update successful');
      navigate("/home_users");
    };
    // } catch (error) {
      
    //   console.error('Error submitting form:', error.response.data);
    //   console.error('Response:', error.response);
    // }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter your Name" name="name" value={user.name} onChange={(e) => onInputChange(e)} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter your username" name="username" value={user.username} onChange={(e) => onInputChange(e)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input type="text" className="form-control" placeholder="Enter your e-mail address" name="email" value={user.email} onChange={(e) => onInputChange(e)} />
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/home_users">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

