import express from "express";
import cors from "cors";
import exercisesController from "./controllers/exercises.controller";

export const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/exercises", exercisesController);

app.listen(4000, () => console.log("Server is now running on port 4000"));
