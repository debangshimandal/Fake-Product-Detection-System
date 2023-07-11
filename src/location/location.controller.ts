import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service'
import { createLocationDto } from './dto/create.location';
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(@Body() dto: createLocationDto): Promise<Location> {
    let ipAddress
    const axios = require('axios');
    await axios.get('https://api.ipify.org?format=json').then(async (response: { data: { ip: any; }; }) => {
    ipAddress = response.data.ip;
    console.log(ipAddress)
  })
    return this.locationService.createLocation(dto, ipAddress);
  }
}