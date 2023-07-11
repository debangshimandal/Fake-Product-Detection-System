import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDto } from 'src/product/dto/product.dto';
import { log } from 'console';
import * as fs from 'fs';
import { User } from '@prisma/client';
import * as QRCode from 'qrcode';


@Injectable()
export class QRCodeService {
    static generateQRCode(product: {
      name: string; material: string; 
      highlights: string; type: string; ratings: string;
    }): any {
      throw new Error('Method not implemented.');
    }
    constructor(
    ){}

}