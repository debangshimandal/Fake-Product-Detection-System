import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    HttpStatus,
    HttpException,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { CredentialTypeEnum, User} from '@prisma/client';
  import { nanoid } from 'nanoid';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { UserService } from 'src/user/user.service';
  
  import { JWTClaim } from './dto/jwt-claim.dto';
  import { signupUserDto } from './dto/signup-user.dto';
  import { NotFoundError } from 'rxjs';
import { signinUserDto } from './dto/signin-user.dto';
  @Injectable()
  export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly userService: UserService,
      private jwtService: JwtService,
    ) {}
  
    async singupUser(payload: signupUserDto) {
      
      if (payload.password !== payload.confirmPassword)
        throw new BadRequestException('Password does not match');
      const userPayload = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
      };
  
      const emailExists = await this.prisma.user.findFirst({
        where: {email : userPayload.email}
      })
    
      const phoneExists = await this.prisma.user.findFirst({
        where: {phone : userPayload.phone}
      })
    
  
      if(emailExists) throw new BadRequestException("Email Already Exists");
      if(phoneExists) throw new BadRequestException("Phone Number Already Exists");
      
  
      const user = await this.userService.createUser(userPayload);
  
  
      const passwordPayload = {
        type: CredentialTypeEnum.User,
        algo: "text/plain",
        digest: payload.password,
        encrypted: payload.password
      }
      await this.prisma.credential.create({
        data:{
          id:user.userDetails.id,
          ...passwordPayload
        }
      })
  
      return user;
  }

    async generateAccessToken(userEmail: string) {
      
        const canName = await this.prisma.user.findFirst({
          where: {
            email:userEmail
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          },
        });
        
        const payload: JWTClaim = {
          uid: canName.id,
          name: canName.name,
          userEmail: canName.email,
          phone: canName.phone
        };
        
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      async signinUser(payload: signinUserDto): Promise<User> {
        const userStatus= await this.prisma.user.findFirst({
          where:{email:payload.username},
        })
        
          const user = await this.userService.getByUsername(payload.username);
          if (!user) throw new BadRequestException('Username or password is wrong');
          const validPassword = await this.validateCredential(
            user.id,
            payload.password,
          );
          return user;
      }

      async validateCredential(id: string, password: string) {
        const credential = await this.prisma.credential.findFirst({
          where: {
            id: id,
          },
        });

        if(credential) return true;
        else return false;
        // switch (credential.algo) {
        //   case 'text/plain': {
        //     const digest = credential.digest; // Calculate the digest of the encrypted value
        //     return digest === password;
        //   }
        //   default: {
        //     throw new InternalServerErrorException(
        //       'Validation method is not implemented',
        //     );
        //   }
        // }

      }


}