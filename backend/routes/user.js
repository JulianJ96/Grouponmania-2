import express from 'express';
import { signup, login, addpostreaduser, getuser, deleteuser } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.post('/add',  addpostreaduser); 
router.get('/user/:id', getuser); 
router.delete('/deleteuser/:id', deleteuser); 

export default router;
