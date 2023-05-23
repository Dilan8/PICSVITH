const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user.model");
//Middleware
app.use(cors());
app.use(express.json());
connectDB();

//register -Q8XnemStVHpe4Wll
app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email,
      athar_id: req.body.athar_id,
      phone_number: req.body.phone_number,
      category: req.body.category, // admin, service, rental and normal
      category_dis: req.body.category_dis,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email!" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    user_name: req.body.user_name,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }

  res.json({ status: "User successfully register " });
});
app.listen(1337, () => {
  console.log("server started from 1337");
});
