import { ApiProperty } from "@nestjs/swagger";

export class signupUserDto{
    [x: string]: any;
    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    email: string;
    
    @ApiProperty({type: String})
    phone: string;

    @ApiProperty({type: String})
    password: string;

    @ApiProperty({type: String})
    confirmPassword: string;
}