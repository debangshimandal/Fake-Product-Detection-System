import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    @Post('/create')
    @ApiBody({type: createUserDto})
    async createUser(
        @Body() body: createUserDto,
    ){
        return this.userService.createUser(body);
    }
  
}
