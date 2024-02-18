import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);
console.log("hello this is id my before the request"+ userId);
  const jwtToken = localStorage.getItem('jwtToken');

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8082/admin/user/all", {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    setUsers(result.data);

  };

  const deleteUser = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
  
    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      await axios.delete(`http://localhost:8082/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      console.log('Deletion successful');
      loadUsers();
    } else {
      // If the user cancels, you can optionally handle this case
      console.log('Deletion canceled');
    }
  };

  return (
    <div className="container">
      <div className="py-4">
      <Link className="btn btn-danger mx-2" to="/admin_daret">Daret Managment</Link>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Numéro</th>
              {/* <th scope="col">First Name</th>
              <th scope="col">Last Name</th> */}
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                {/* <td>{user.firstname}</td>
                <td>{user.lastname}</td> */}
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                  {/* <td>date of birth</td> */}
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.userId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.userId}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
