import User from '../models/userModel.js';
import Post from '../models/postModel.js';

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img, tags } = req.body;

    if (!postedBy || !text || !img) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(postedBy);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'User cant post ' });
    }

    const newPost = new Post({ postedBy, text, img, tags });

    await newPost.save();

    return res.status(200).json({ message: 'Post is created', newPost });
  } catch (er) {
    res.status(400).json({ message: er.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: 'Not Authorized to perform delete post' });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const likeUnLikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'post not found' });

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({ message: 'Un liked successfully' });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'liked successfully' });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message, m: 'err' });
  }
};

const replyToPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { text } = req.body;
    const { _id: userId, username, profilePic } = req.user;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'post not found' });

    if (!text) {
      return res.status(404).json({ message: ' TextFilled is required' });
    }

    const reply = { userId, username, profilePic, text };

    await Post.updateOne({ _id: postId }, { $push: { replies: reply } });

    return res.status(200).json({ message: 'Commented successfully' });
  } catch (err) {}
};

const getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnLikePost,
  replyToPost,
  getFeedPost,
};
