import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose, ObjectId, Types, mongo } from 'mongoose';
import { Owner } from './owner.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {  

  _id: mongoose.Types.ObjectId

  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner : Owner
  
}

export const CatSchema = SchemaFactory.createForClass(Cat);