const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const addCategoriesToDb = require("./categoryInit");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin || "*");
    },
    credentials: true,
  })
);


app.use("/api/auth",userRoutes); 
app.use("/api/category",categoryRoutes);

// addCategoriesToDb();


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
