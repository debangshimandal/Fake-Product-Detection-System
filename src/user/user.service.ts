import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';
import { log } from 'console';
import * as fs from 'fs';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async createUser(dto: createUserDto){

      const user = {
        name: dto.name,
        email:dto.email,
        phone: dto.phone,
        password:dto.password
      }
      console.log(user);
      
      const userDetails = await this.prisma.user.create({
        data: user,
        });
  
      return {userDetails};
    }

    async getByUsername(username:string):Promise<User>{
        
      const user = await this.prisma.user.findFirst({
          where:{
              OR:[
                  { email: username },
                  { phone: username} 
              ]
          }
      })        
      return user
  }

}
