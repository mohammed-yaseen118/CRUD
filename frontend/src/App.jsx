// import React, { useState, useEffect } from "react";
// import UserForm from "./components/userForm.jsx";
// import "./App.css";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/users");
//       const data = await res.json();
//       setUsers(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>CRUD Internship App</h1>

//       <UserForm
//         editingUser={editingUser}
//         setEditingUser={setEditingUser}
//         onUserSaved={fetchUsers}
//       />

//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>Photo</th>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>
//                 {user.photo && (
//                   <img
//                     src={`http://localhost:5000${user.photo}`}
//                     alt="profile"
//                     className="user-photo"
//                   />
//                 )}
//               </td>
//               <td>{user.name}</td>
//               <td>{new Date(user.dob).toLocaleDateString()}</td>
//               <td>{user.email}</td>
//               <td>{user.mobile}</td>
//               <td>
//                 <button onClick={() => setEditingUser(user)}>Edit</button>
//                 <button
//                   className="delete-btn"
//                   onClick={async () => {
//                     if (confirm("Delete?")) {
//                       await fetch(
//                         `http://localhost:5000/api/users/${user._id}`,
//                         { method: "DELETE" }
//                       );
//                       fetchUsers();
//                     }
//                   }}
//                   style={{ marginLeft: "8px" }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
//                 No records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;






import React, { useState, useEffect } from "react";
import UserForm from "./components/userForm.jsx";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">Intern Panel</div>
        <nav>
          <ul>
            <li className="active">Users</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>CRUD Internship Dashboard</h1>
          <span className="badge">Total Users: {users.length}</span>
        </header>

        <section className="content">
          <div className="cards">
            <div className="card">
              <h3>Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="card">
              <h3>Today</h3>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="panel">
            <h2>Add / Edit User</h2>
            <UserForm
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              onUserSaved={fetchUsers}
            />
          </div>

          <div className="panel">
            <h2>Users List</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.photo && (
                        <img
                          src={`http://localhost:5000${user.photo}`}
                          alt="profile"
                          className="user-photo"
                        />
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{new Date(user.dob).toLocaleDateString()}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button onClick={() => setEditingUser(user)}>Edit</button>
                      <button
                        className="delete-btn"
                        onClick={async () => {
                          if (confirm("Delete?")) {
                            await fetch(
                              `http://localhost:5000/api/users/${user._id}`,
                              { method: "DELETE" }
                            );
                            fetchUsers();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
