import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTClaim } from 'src/auth/dto/jwt-claim.dto';
import { Authorized, AuthorizedClaim } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';
import {  createProductDto } from './dto/product.dto';
import { ProductService } from './product.service';


@ApiTags('Product')
@Controller('Product')
export class ProductController {
    constructor(
        private readonly ProductService: ProductService
    ){}

    @Post('/create')
    @ApiBody({type: createProductDto})
    async createProduct(
        @Body() body: createProductDto,
    ){
        return this.ProductService.createProduct(body);
    }

  @Get('/deviceId')
  async getLocationByIP(): Promise<any>{
    let ipAddress;
      const axios = require('axios');
      await axios.get('https://api.ipify.org?format=json').then(async (response: { data: { ip: any; }; }) => {
      ipAddress = response.data.ip;
      console.log(ipAddress)
    })
    return this.ProductService.getLocation(ipAddress);
  }
  
}
