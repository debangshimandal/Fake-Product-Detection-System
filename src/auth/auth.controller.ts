import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { signupUserDto } from './dto/signup-user.dto';
import { JWTClaim } from './dto/jwt-claim.dto';
// import { LocalAuthGuard } from './strategies/local.strategy';
import { JwtAuthGuard } from './strategies/jwt.strategy';
import { signinUserDto } from './dto/signin-user.dto';
import { User } from '@prisma/client';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}



    @ApiBody({type: signinUserDto})
    // @UseGuards(LocalAuthGuard)
    @Post('user/signin')
    signin(@Req() req){
        return this.authService.generateAccessToken(req.username);
    }

    @Post('user/signup')
    @ApiBody({type: signupUserDto})
    async signup(@Body() body: signupUserDto){
        const token = await this.authService.singupUser(body);
        return token;
    }

    
}