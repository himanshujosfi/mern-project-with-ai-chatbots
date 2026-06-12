import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { createTaskModel } from "../model/Task.js";
import { success } from "zod";

export const addTask = async (req, res) => {
  try {
    const { topic, description } = req.body;
    const errors = {};

    if (!topic || typeof topic !== "string") {
      errors.topic = "Topic is required and must be a string";
    }

    if (!description || typeof description !== "string") {
      errors.description = "Description is required and must be a string";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    const taskData = createTaskModel({ topic, description });

    const docRef = await addDoc(collection(db, "tasks"), taskData);

    return res.status(201).json({
      success: true,
      data: taskData,
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { search = "" } = req.query;
    let q;
    if (search) {
      q = query(collection(db, "task"), where("topic", "==", search));
    } else {
      q = query(collection(db, "tasks"));
    }
    const snapshot = await getDocs(q);
    // console.log(snapshot);
    const tasks = snapshot?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = doc(db, "tasks", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({
        success: false,
        message: "No data found for this id",
      });
    }

    const task = {
      // id: docSnap.id,
      ...docSnap.data(),
    };

    if (req.body && Object.keys(req.body).length > 0) {
      await updateDoc(docRef, req.body);

      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        previousData: task,
        updatedData: req.body,
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    if(!id){
      return res.status(404).json({
        success:false,
        message:"Task id is required "
      })
    }

    const docRef = doc(db, "tasks", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({
        success: false,
        message: "No data found for this id",
      });
    }

    const task = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    await deleteDoc(docRef)

    // if (req.body && Object.keys(req.body).length > 0) {
    //   await updateDoc(docRef, req.body);


    return res.status(200).json({
      success: true,
      data:task,
      message:"Task deleted sucessfully "
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
