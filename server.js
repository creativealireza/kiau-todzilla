require("dotenv").config();
const express = require("express");
const routes = require("./routes/api/api");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", routes);
app.use("/admin", routes);
app.use("/tasks", routes);
app.use("/history", routes);
app.use("/login", routes);

const PORT = process.env.PORT || 5000;


// start();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, console.log(`server is running on port ${PORT} 😃`))
  )
  .catch((err) => console.log(err));
