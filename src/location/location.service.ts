import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createLocationDto } from './dto/create.location';
import axios from 'axios';

@Injectable()
export class LocationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  async createLocation(dto: createLocationDto, ipAddress: string): Promise<Location> {
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);

    const locationdata= {
        ipAddress,
        productId: dto.productId,
        city: response.data.city,
        country: response.data.country,
        region: response.data.region,
        timezone: response.data.timezone
      };
      const location = await this.prisma.location.create({ data: locationdata });

      return location as unknown as Location;
  }
}