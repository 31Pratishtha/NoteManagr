import express from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

export default router;
