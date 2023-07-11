import { Module } from '@nestjs/common';
import { LocationController } from './location.controller'
import { LocationService } from './location.service'
// import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [LocationService]
})
export class locationModule {

}