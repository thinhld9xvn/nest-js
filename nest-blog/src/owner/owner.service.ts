import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOwnerDto } from 'src/dto/create-owner.dto';
import { Owner } from 'src/schemas/owner.schema';

@Injectable()
export class OwnerService {
    constructor(@InjectModel(Owner.name) private readonly ownerModel: Model<Owner>) {}

    async create(createCatDto: CreateOwnerDto): Promise<Owner> {
        return await this.ownerModel.create(createCatDto);
    }

    async findAll(): Promise<Owner[]> {
        return this.ownerModel.find().lean().exec();
    }

    async findOne(id: string): Promise<Owner> {
        return this.ownerModel.findOne({ _id: id }).lean().exec();
    }

    async delete(id: string) {
        return await this.ownerModel
                        .findByIdAndRemove({ _id: id })
                        .exec();
    }

    async deleteAll() {
        return this.ownerModel.deleteMany({});
    }
}
