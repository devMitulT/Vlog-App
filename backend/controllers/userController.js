import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import { v2 as cloudinary } from 'cloudinary';

const signupUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePicture: newUser.profilePic,
        followers: newUser.followers,
        following: newUser.following,
      });
    } else {
      res.status(400).json({ error: 'Invalid user Data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('er', error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid email or password' });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      name: user.name,
      username: user.username,
      email: user.email,
      id: user._id,
      bio: user.bio,
      profilePicture: user.profilePic,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in signupUser: ', err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: 'User Can not follow your self' });
    }

    if (!userToModify || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //unFollow user

      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: 'User UnFollowed successfully' });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: 'User Followed successfully', id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'No user Found' });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split('/').pop().split('.')[0]
        );
      }

      const uplodedProfilePic = await cloudinary.uploader.upload(profilePic);
      profilePic = uplodedProfilePic.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: 'Profile Updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.messagem);
  }
};

const getUserProfile = async (req, res) => {
  const { query } = req.params;

  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(query);

    const queryObj = isObjectId ? { _id: query } : { username: query };

    const user = await User.findOne(queryObj).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};

const serachUserFromInitals = async (req, res) => {
  const { query } = req.params;

  try {
    const search = query || '';
    const users = await User.find({
      username: { $regex: search, $options: 'i' },
    });

    if (!users) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};

export {
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  followUnFollowUser,
  serachUserFromInitals,
};
