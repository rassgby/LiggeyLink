require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const candidatRoute = require("./src/routes/candidatRoutes");
const recruteurRoute = require("./src/routes/recruteurRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const candidatureRoutes = require("./src/routes/candidatureRoutes");


const app = express();

// Connexion à MongoDB
connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users/candidats", candidatRoute);
app.use("/api/users/recruteurs", recruteurRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidatures", candidatureRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

