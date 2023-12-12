const express = require("express");
const connectDB = require("./mongoDb/dbConnect");
require("dotenv").config();
const { errorHandler } = require("./err/errorHandler");
connectDB();
let app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

//routes
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);


app.listen(process.env.PORT, () =>
  console.log(`Server Running on PORT ${process.env.PORT}`)
);
