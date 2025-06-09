import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { Post } from '@nestjs/common';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true }) // make auto created at and updated
export class Comment {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  @Prop({ required: true, trim: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
