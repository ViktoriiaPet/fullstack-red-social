import { Model, Optional } from "sequelize";

interface CommentAttributes {
  id: number;
  content: string;
  userId: number;
  borrado: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

export type CommentInstance = Model<CommentAttributes, CommentCreationAttributes> & CommentAttributes;
