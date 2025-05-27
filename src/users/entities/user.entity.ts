import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'ADMIN',
}

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      delete ret.password;
    },
  },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('todos', {
  ref: 'todo',
  localField: '_id',
  foreignField: 'user',
});

export { UserSchema };
