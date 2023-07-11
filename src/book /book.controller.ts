// import {  Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put } from '@nestjs/common';
// import { bookDto } from './dto/book.dto';
// import { BookService } from './book.service';
// import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { UpdateBookDto } from './dto/book.dto';

// @ApiTags("Book")
// @Controller('book')
// export class BookController {

//     constructor(
//         private readonly BookService: BookService
//     ){}

//     @Post('/create')
//     @ApiBody({type: bookDto})
//     async createBook(
//         @Body() body: bookDto,
//     ){
//         return this.BookService.createBook(body);
//     }
//     @Get('/searchBook/:text')
//     async findUserWithName(@Param('text') text:string){
//         const SearchBook =  await this.BookService.searchBook(text)
//         return SearchBook;
//     }
//     // @Get('/bookfilter1/:name')
//     // async BookName(    
//     //   @Param('name') name:string) {
//     //     const NameOfBook = await this.BookService.bookName(name)
//     //   return NameOfBook;
//     // }
//     @Put('/updateBook/:id')
//     async updateBookDetails( @Param('id') id : string ,@Body() editBookDetails:UpdateBookDto){
//         const BookDetails=await this.BookService.editBookDetails(id,editBookDetails)
//         return BookDetails
//     }
//     @Delete('/deleteBook/:id')
//     async deleteBookDetails( @Param('id') id : string ){
//         return await this.BookService.deleteBookDetail(id)
//     }
    
// }
