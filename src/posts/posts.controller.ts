
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.postsService.create(body.user_id, body.title, body.body);
  }

  @Get()
  async list() {
    return this.postsService.findAll();
  }

  @Get('with-authors')
  async withAuthors() {
    return this.postsService.findAllWithAuthors();
  }
}
