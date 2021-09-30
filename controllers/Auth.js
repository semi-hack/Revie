import jwt from 'jsonwebtoken';
import User from '../models/Users.js'
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET


// takes in email and password generate token, returns token
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(404).json({
          error: "user not found",
          success: false,
        });
      }
  
      user.comparePassword(req.body.password, (err, match) => {
        if (!match) {
          return response
            .status(400)
            .send({ message: "The password is invalid" });
        }
      });
  
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '10h' });

      return res.json({
        success: true,
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        err: "error login in",
        success: false,
      });
    }
};


// takes in a token and returns logged in user
const getUser = async (req, res) => {
    try {
      const token = req.headers.token;
  
      const decoded = jwt.verify(token, secret);
      const user = await User.findOne({ _id: decoded._id })
  
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      } else {
        res.status(200).json({
          title: "user granted",
          message: "user is logged in",
          data: user,
        });
      }
    } catch (err) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
};

export default { login, getUser }