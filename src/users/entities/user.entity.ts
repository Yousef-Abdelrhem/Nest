import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'ADMIN',
}

@Schema({
  toJSON: { virtuals: true },
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
