import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already in use' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isMatch = user ? await user.comparePassword(password) : false;

    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
}

export async function me(req, res) {
  res.status(200).json({ user: req.user });
}
