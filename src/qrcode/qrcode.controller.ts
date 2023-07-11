import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createProductDto } from 'src/product/dto/product.dto';
//import { createUserDto } from './dto/create-user.dto';
//import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QRCodeService } from './qrcode.service';

@ApiTags('Product')
@Controller('product')
export class QRCodeController {
    constructor(
        private readonly QRcodeservice: QRCodeService
    ){}
 
}
