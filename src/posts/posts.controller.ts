import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

@UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('media', 10, { ... }))
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
    @UploadedFiles( new ParseFilePipe({ ... }) ) files: Array<Express.Multer.File>,
  ) {
    const mediaPaths = files ? files.map(file => file.path) : [];
    return this.postsService.create(createPostDto, req.user.userId, mediaPaths);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}

/// schema post url for video or image
// title
// desc
//
