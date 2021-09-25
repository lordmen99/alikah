import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import db from '../../../lib/mongodb'
import { signToken } from '../../../utils/auth'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = nc()

handler.post(async (req:NextApiRequest,res:NextApiResponse) => {
  await db.dbConnect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber:user.phoneNumber,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

export default handler;
