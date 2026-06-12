import express from "express";
import router from "./routes/task.js";
import cors from "cors";

import { addTask, getTask } from "./controller/taskcontroller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
