import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { locationModule } from './location/location.module';
// import { BookModule } from './book /book.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { QRCodeModule } from './qrcode/qrcode.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,PrismaModule,AuthModule,ProductModule,QRCodeModule,locationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
