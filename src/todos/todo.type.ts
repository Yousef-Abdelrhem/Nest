import { Types } from "mongoose";

export interface Todo {
  id: Types.ObjectId;
  title: string;
  isCompleted: boolean;
}
