import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
  console.log("In error middleware", error);
  res.status(error.statusCode).send(error.message);
});

app.listen(4000, () => console.log(`Running on port 4000`));
