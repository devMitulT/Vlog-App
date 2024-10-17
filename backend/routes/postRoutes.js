import express from 'express';
import {
  createPost,
  getPost,
  deletePost,
  likeUnLikePost,
  replyToPost,
  getFeedPost,
} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();
router.get('/feed', protectRoute, getFeedPost);
router.post('/create', protectRoute, createPost);
router.get('/:id', getPost);
router.delete('/:id', protectRoute, deletePost);
router.post('/like/:id', protectRoute, likeUnLikePost);
router.post('/reply/:id', protectRoute, replyToPost);

export default router;
