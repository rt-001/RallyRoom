const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const authRoutes = require("./routes /authRoute");
app.use("/api/auth", authRoutes);
app.use(cors());
app.listen(PORT, () => {
  console.log(`Backend is up at port ${PORT}.`);
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Established a connection with the database"))
    .catch((err) => console.log("Error connecting to database", err));
});
