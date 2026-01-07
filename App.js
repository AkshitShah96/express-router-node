import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  function addUser() {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).then(() => fetchUsers());
  }

  function deleteUser(id) {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE"
    }).then(() => fetchUsers());
  }

  return (
    <div>
      <h2>User List</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <table border="1">
        <tr>
          <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
        </tr>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <button onClick={() => deleteUser(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
