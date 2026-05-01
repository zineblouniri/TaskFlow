import express from 'express';
import { createProject,getProjects,getProjectById, deleteProject, updateProject } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',verifyToken,createProject)
router.get('/',verifyToken,getProjects)
router.get('/:id',verifyToken,getProjectById)
router.delete('/:id',verifyToken,deleteProject)
router.put('/:id',verifyToken,updateProject)

export default router;