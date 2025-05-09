import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>; 

@Schema()
export class Todo{
  @Prop()
  title: string

  @Prop()
  isCompleted: boolean
  
}

export const TodoSchema = SchemaFactory.createForClass(Todo); // ???
