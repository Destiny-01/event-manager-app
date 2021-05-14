const express = require("express");
const app = express();
const dbSetup = require("./database/setup");
const eventRoutes = require("./routes/eventRoute");

app.use(express.json());
dbSetup();
app.use(eventRoutes);

app.listen(4000, () => console.log("Server is listening on port 4000"));
