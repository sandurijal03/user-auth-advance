import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'plase provide username'],
  },
  email: {
    type: String,
    required: [true, 'plase provide email'],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'please add a password'],
    min: 6,
    max: 64,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = model('User', userSchema);

export default User;
