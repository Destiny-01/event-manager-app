const express = require("express");
const app = express();
const dbSetup = require("./database/setup");
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const { seedAdmin } = require("./seeders/admin");

app.use(express.json());
dbSetup();
app.use(eventRoutes);
app.use("/auth", authRoutes);

app.listen(4000, () => console.log("Server is listening on port 4000"));
