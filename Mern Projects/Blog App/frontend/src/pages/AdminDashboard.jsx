import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/App.css"
import "../styles/AdminDashboard.css"
function AdminDashboard() {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        alert(data.error || "Failed to fetch users");
      }
    } catch (err) {
      alert("Something went wrong fetching users");
    }
  };

  // ✅ Promote user to admin
  const makeAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/auth/make-admin/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert("User promoted to admin!");
        fetchUsers();
      } else {
        alert(data.error || "Failed to promote user");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:3000/auth/delete-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully!");
        fetchUsers();
      } else {
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (user?.role === "superadmin") {
      fetchUsers();
    }
  }, [user]);

  if (!user || user.role !== "superadmin") {
    return <h2>⛔ Access Denied. Superadmin only.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Superadmin Dashboard</h1>
      <h3>Manage Users</h3>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Promote</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "user" && (
                  <button onClick={() => makeAdmin(u._id)}>Make Admin</button>
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteUser(u._id)}
                
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
