import express from "express";
import cors from "cors";
import constatnt from "./config/constant.js";
import indexRoutes from "./routes/indexRoutes.js";
import db from "./config/db.js";

const app = express();
const port = constatnt.PORT;
 
// cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create server
app.listen(port, () => {
  console.log(`server in running on port ${port}`);
  db();
});

// routing
app.use("/api", indexRoutes);

