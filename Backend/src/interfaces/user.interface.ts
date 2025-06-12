import { Document } from 'mongoose';

// export interface IUser {
//   username: string;
//   email: string;
//   password: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface IUserDocument extends IUser, Document {
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}