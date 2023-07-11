import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Book Swagger Documentation')
    .setDescription('It is a swagger documentation for Book management.')
    .addBearerAuth({type: 'http'}, 'jwt')
    .setVersion('1.0')
    .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  
  const PORT = 3333
  await app.listen(PORT, ()=>console.log("Server is running on port", PORT));
  app.enableCors();

}
bootstrap();
