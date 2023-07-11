import { ApiProperty } from "@nestjs/swagger";

export class signinUserDto{
    @ApiProperty({type: String, default: "email/phone"})
    username: string;

    @ApiProperty({type: String, default: "*******"})
    password: string;
}