import { getMovieController ,getMovieByIdController,addMovieController, getSeriesController, getFilmsController, updateMovieController, deleteMovieController} from "../controllers/movie.js";
import express from 'express'

const router = express.Router()

router.get('/',getMovieController)
router.get('/:id',getMovieByIdController)
router.get('/series',getSeriesController)
router.get('/films',getFilmsController)
router.patch('/:id',updateMovieController)
router.delete('/:id',deleteMovieController)
router.post('/',addMovieController)

export default router

