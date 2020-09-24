import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import sequelize from "./utils/database";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

sequelize
  .authenticate()
  .then((result) => console.log("Connected to database!"))
  .catch((error) => console.log(error));
