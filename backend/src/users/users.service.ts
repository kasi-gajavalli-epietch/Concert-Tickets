import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from 'src/dto/create-users.dto';
import { IUsers } from 'src/interface/users.interface';
import { Model } from "mongoose";
import { UpdateUsersDto } from 'src/dto/update-users.dto';

@Injectable()
export class UsersService {
constructor(@InjectModel('Users') private usersModel:Model<IUsers>) { }
async createUsers(createUsersDto: CreateUsersDto): Promise<IUsers> {
   const newUsers = await new this.usersModel(createUsersDto);
   return newUsers.save();
}
async updateUsers(usersId: string, updateUsersDto: UpdateUsersDto): Promise<IUsers> {
    const existingUsers = await        this.usersModel.findByIdAndUpdate(usersId, updateUsersDto, { new: true });
   if (!existingUsers) {
     throw new NotFoundException(`Users #${usersId} not found`);
   }
   return existingUsers;
}
async getAllUserss(): Promise<IUsers[]> {
    const usersData = await this.usersModel.find();
    if (!usersData || usersData.length == 0) {
        throw new NotFoundException('Users data not found!');
    }
    return usersData;
}
async getUsers(usersId: string): Promise<IUsers> {
   const existingUsers = await     this.usersModel.findById(usersId).exec();
   if (!existingUsers) {
    throw new NotFoundException(`Users #${usersId} not found`);
   }
   return existingUsers;
}
async deleteUsers(usersId: string): Promise<IUsers> {
    const deletedUsers = await this.usersModel.findByIdAndDelete(usersId);
   if (!deletedUsers) {
     throw new NotFoundException(`Users #${usersId} not found`);
   }
   return deletedUsers;
}
}