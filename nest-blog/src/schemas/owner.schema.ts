import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose, mongo } from 'mongoose';

export type OwnerDocument = HydratedDocument<Owner>;

@Schema()
export class Owner {

    _id : mongoose.Types.ObjectId
    
    @Prop({ required : true })
    firstName: string
    
    @Prop({ required : true })
    lastName : string

    @Prop()
    address : string

    @Prop()
    phone : string
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);