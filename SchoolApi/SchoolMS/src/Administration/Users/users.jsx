import axios from "axios";
import { useEffect, useState } from "react";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios.get("https://localhost:7189/api/Users")   
     /* axios.get("https://192.168.1.2:7189/api/Users")  */
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  }, []);

  return (
    <div className="register-user-page">
      <h2 className="babloki">Perdoruesit e regjistruar</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name / Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
