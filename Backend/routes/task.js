import express from "express"
import { addTask, deleteTask, getTask, updateTask } from "../controller/taskcontroller.js"

const router = express.Router()


router.post("/addTask",addTask)
router.get("/getTask",getTask)
router.put("/:id", updateTask)
router.delete("/delete", deleteTask)

export default router;