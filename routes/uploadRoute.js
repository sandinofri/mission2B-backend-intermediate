import express from 'express';
import upload from '../utils/upload.js'
import { uploadController } from '../controllers/uploadGambar.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadController);

export default router;
