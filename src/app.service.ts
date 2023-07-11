import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(){}
  getHello(): string {
    // this.config.get('SECRETKEY')
    return 'Hello World!';
  }
}
