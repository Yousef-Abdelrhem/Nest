import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  isCompleted: boolean;

  @Prop({ required: false ,types: mongoose.Schema.Types.ObjectId, ref: User.name })
  user?: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
