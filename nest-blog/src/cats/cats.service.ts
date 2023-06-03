import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from 'src/dto/create-cat.dto';
import { Cat } from 'src/schemas/cat.schema';
@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catModel.create(createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).lean().exec();
  }

  async delete(id: string) {
    return await this.catModel
                      .findByIdAndRemove({ _id: id })
                      .exec();
  }

  async deleteAll() {
    return this.catModel.deleteMany({});
  }
}