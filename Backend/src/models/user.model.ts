import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String
    }
  }
);

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash);
}

userSchema.pre('save', async function (next) {
  if(!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch(e: any) {
    next(e);
  }
});

// const User = mongoose.model<IUser>('User', userSchema);
// export default User;

export default model<IUser>('User', userSchema)