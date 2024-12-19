import express from 'express';

import protectRoute from '../middlewares/protectRoute.js';
import {
  sendMessage,
  getMessages,
  getConversation,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/conversations', protectRoute, getConversation);
router.post('/', protectRoute, sendMessage);
router.get('/:otherUserId', protectRoute, getMessages);

export default router;
