import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './schema/post.schema';
import { CommentDocument } from './schema/comment.schema';
import { Post } from './schema/post.schema';
import { Comment } from './schema/comment.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    author: string,
    media: string[],
  ): Promise<Post> {
    const newPost = await this.postModel.create({
      ...createPostDto,
      author,
      media,
    });
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('author', 'name')
      .populate('comments')
      .exec();
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'name')
      .populate('comments')
      .exec();
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  async like(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    const index = post?.likes.indexOf(new Types.ObjectId(userId));
    // toggle the like
    if (index != null && index > -1) {
      post?.likes.splice(index, 1);
    } else {
      post?.likes.push(new Types.ObjectId(userId));
    }
    return post?.save();
  }

  async comment(
    postId: string,
    createCommentDto: CreatePostDto,
    author: string,
  ) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    // create comment
    const comment = await this.commentModel.create({
      ...createCommentDto,
      post: new Types.ObjectId(postId),
      author: new Types.ObjectId(author),
    });

    post.comments.push(comment._id);
    await post.save();

    return comment;
  }

  async share(postId: string, userId: string) {
    const sharePost = new this.postModel({
      author: userId,
      originalPost: postId,
      sharedBy: userId,
    });
    return sharePost.save();
  }

  async findForUserProfile(userId: string) {
    return this.postModel
      .find({
        $or: [{ author: userId }, { sharedBy: userId }],
      })
      .populate('author')
      .exec();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
