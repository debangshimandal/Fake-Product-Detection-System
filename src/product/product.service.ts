import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import {  createProductDto } from './dto/product.dto';
import { log } from 'console';
import * as fs from 'fs';
import { Product } from '@prisma/client';
import { JWTClaim } from 'src/auth/dto/jwt-claim.dto';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import * as QRCode from 'qrcode';
import axios from 'axios';
import { type } from 'os';

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async generateQRCode(product){
      var temp= this.prisma.product.findMany({
        where:{
          highlights:product.highlights
        },
        select:{
          locations:{
            select:{
              city:true,
              country:true,
              region:true,
              timezone:true
            }
          }
        }
      })
      const QRCodeData ={
        material:product.material,
        name:product.name,
        type:product.type,
        highlights:product.highlights,
        rating:product.ratings
      }

      
      //   const QrString = QRCodeData.toString();
      const QrString = JSON.stringify([QRCodeData,temp])
      
      try {
        const qrCodeData = await QRCode.toDataURL(QrString);
              return qrCodeData;
      }catch (error) {
          throw new Error('Failed to generate QR code');
      }
  
    } 

    async createProduct(dto: createProductDto){

      const product = {
        name: dto.name,
        material:dto.material,
        highlights: dto.highlights,
        type:dto.type,
        ratings:dto.ratings,
        // uid:claim.uid
      }

      let x = await this.generateQRCode(product);  
      
      const ProductDetails = await this.prisma.product.create({
        data: {
          ...product,
          QRcode: {
            value: x,
          }
        }
      });

      return ProductDetails;
    }

    async getByProductByID(pID:string){
        
      const product = await this.prisma.product.findFirst({
          where:{
              id:pID
          },
          select:{
            name:true,
            type:true,
            highlights:true,
            material:true,
            ratings:true,
            QRcode:true
          }
      }); 
      return product;
  }
  
  async getLocation(ipAddress: string): Promise<any> {
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
    return response.data;
  }




}