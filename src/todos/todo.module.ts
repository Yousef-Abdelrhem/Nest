import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])], // ?
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('todos');
  }
}
// ask why the middle ware don't works