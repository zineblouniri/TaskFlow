import express from 'express';
import { createProject,getProjects,getProjectById } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',verifyToken,createProject)
router.get('/',verifyToken,getProjects)
router.get('/:id',verifyToken,getProjectById)

export default router;