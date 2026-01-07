const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: "Akshit", email: "akshit@gmail.com" },
  { id: 2, name: "Nisha", email: "nisha@gmail.com" }
];

// 1️⃣ Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// 2️⃣ Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.json(user);
});

// 3️⃣ Add new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.json(newUser);
});

// 4️⃣ Update full user
app.put("/users/:id", (req, res) => {
  users = users.map(u =>
    u.id == req.params.id ? req.body : u
  );
  res.json({ message: "User updated" });
});

// 5️⃣ Update only email
app.patch("/users/:id/email", (req, res) => {
  users = users.map(u =>
    u.id == req.params.id ? { ...u, email: req.body.email } : u
  );
  res.json({ message: "Email updated" });
});

// 6️⃣ Delete user
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
