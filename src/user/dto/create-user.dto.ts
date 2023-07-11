import { ApiProperty } from "@nestjs/swagger";

export class createUserDto{

    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    email: string;
    
    @ApiProperty({type: String})
    phone: any;

    @ApiProperty({type: String})
    password: string;
}
