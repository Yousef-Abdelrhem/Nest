import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { Comment } from './comment.schema';
export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true }) // make auto created at and updated
export class Post {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ trim: true })
  content: string;

  @Prop([String])
  media: string[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], default: [] })
  likes: Types.ObjectId[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Post' })
  originalPost?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sharedBy?: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
