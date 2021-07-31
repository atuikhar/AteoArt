import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getArts,
  getArtById,
  deleteArt,
  updateArt,
  createArt,
  createArtReview,
} from "../controllers/artController.js";

const router = express.Router();

router.route("/").get(getArts).post(protect, admin, createArt);
router.route("/:id/reviews").post(protect, createArtReview);
router
  .route("/:id")
  .get(getArtById)
  .delete(protect, admin, deleteArt)
  .put(protect, admin, updateArt);

export default router;
