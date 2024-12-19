import express from 'express';

import {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  serachUserFromInitals,
} from '../controllers/userController.js';

import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/follow/:id', protectRoute, followUnFollowUser);
router.put('/update/:id', protectRoute, updateUser);
router.get('/profile/:query', getUserProfile);
router.get('/people/:query', serachUserFromInitals);
export default router;
