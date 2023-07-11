import { ApiProperty } from "@nestjs/swagger";

export class createProductDto{

    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    material: string;
    
    @ApiProperty({type: String})
    type: string;

    @ApiProperty({type: String})
    highlights: string;

    @ApiProperty({type: String})
    ratings: string;
}

