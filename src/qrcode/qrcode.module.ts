import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { QRCodeController } from "./qrcode.controller";
import { QRCodeService } from "./qrcode.service";

@Module({
    imports: [AuthModule,],
  controllers: [QRCodeController],
  providers: [QRCodeService],
  exports:[QRCodeService]
})
export class QRCodeModule{}