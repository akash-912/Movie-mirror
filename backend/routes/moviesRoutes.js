import express from "express";

const router = express.Router();

// Controllers

import { 
    createMovie,
    getAllMovies,
    getSpecificMovies,
    updateMovie,
    movieReview
} from "../controllers/movieController.js";

// Middlewares

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/CheckId.js";

// Public Routes
router.get('/all-movies',getAllMovies);
router.get('/specific-movie/:id',getSpecificMovies);

// Restricted Routes
router.post('/:id/reviews',authenticate,checkId,movieReview);

// Admin

router.post('/create-movie',authenticate,authorizeAdmin, createMovie);
router.put('/update-movie/:id',authenticate,authorizeAdmin,updateMovie);


export default router;