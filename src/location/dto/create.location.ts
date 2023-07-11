import { ApiProperty } from "@nestjs/swagger";

export class createLocationDto{

    @ApiProperty({type: String})
    productId: string;

}