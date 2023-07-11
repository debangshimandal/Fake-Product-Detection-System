// import { Injectable } from '@nestjs/common';
// import { nanoid } from 'nanoid';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { bookDto, UpdateBookDto } from './dto/book.dto';


// @Injectable()
// export class BookService {
// 	constructor(
// 		private readonly prisma: PrismaService,
// 	){}
	
// 	async createBook(dto: bookDto){

// 		const book = {
// 			name: dto.name,
// 			author: dto.author,
// 			publisher: dto.publisher,
// 		}
// 		console.log(book);
		
// 		const bookDetails = await this.prisma.book.create({
// 			data: book,
// 		  });

// 		return {bookDetails};
// 	}
	
// 	async searchBook(text : string) {
// 		const BookName = await this.prisma.book.findMany({
// 			where: {
// 				OR:[
// 					{name:{contains:text, mode:'insensitive'}},
// 					{author:{contains:text, mode:'insensitive'}},
// 					{publisher:{contains:text, mode:'insensitive'}}
// 				]
// 			}
// 		});
		
// 		return BookName;
// 	}
// 	async editBookDetails(id : string ,editBookDetails:UpdateBookDto){ 			
// 			if(editBookDetails.name){
// 				const NameOfBook = await this.prisma.book.update({
// 					where:{
// 						id:id
// 					},
// 					data:{
// 						name: editBookDetails.name,
// 					}
// 				})
// 			}
// 			if(editBookDetails.author){
// 				const AuthorOfBook = await this.prisma.book.update({
// 					where:{
// 						id:id
// 					},
// 					data:{
// 						author: editBookDetails.author,
// 					}
// 				})
// 			}
// 			if(editBookDetails.publisher){
// 				const PublisherOfBook = await this.prisma.book.update({
// 					where:{
// 						id:id
// 					},
// 					data:{
// 						publisher: editBookDetails.publisher,
// 					}
// 				})
// 			}
// 	  }
  
// 	  async deleteBookDetail(id : string ){ 			
// 		{
// 			const name=await this.prisma.book.delete({
// 			  where: {
// 				  id: id
// 			  },
				
// 			})			
// 		}
// 	}
// }
