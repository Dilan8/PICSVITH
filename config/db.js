const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://rental_admin:Q8XnemStVHpe4Wll@cluster0.hrowj6m.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn}`);
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};

module.exports = connectDB;
