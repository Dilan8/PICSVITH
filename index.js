const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//Middleware
app.use(cors());
app.use(express.json());
connectDB();

//register -Q8XnemStVHpe4Wll
app.post("/api/register", async (req, res) => {
  try {
    const password = req.body.password
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      password: hashedPassword,
      email: req.body.email,
      athar_id: req.body.athar_id,
      phone_number: req.body.phone_number,
      category: req.body.category, // admin, service, rental and normal
      category_dis: req.body.category_dis,
    });
    res.json({ status: "Registration successful" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email!" });
  }
});

app.post("/api/login", async (req, res) => {
  // const token = req.headers['x-access-token']
  // try{
  //   const decoded = jwt.verify(token, 'hdfsajkfhlsdkja')
  //   const email = decoded.email
  // }catch(err){
  //   console.log(err)
  //   res.json({status: 'error', error:'invalid token'})
  // }
  const user = await User.findOne({
    user_name: req.body.user_name,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user._id,
        email: user.email,
      },
      'hdfsajkfhlsdkja'
    );
     // persist the token as 't' in cookie with expiry date
     res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({ status: "User Successfully login", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }

});

app.listen(1337, () => {
  console.log("server started from 1337");
});
