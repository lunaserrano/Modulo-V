import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
  //ejecutar en la terminal npm install --save @nestjs/swagger
  // http://localhost:3000/api
  // *** tarea. configurar la documentacion para poder hacer peticiones usando el token ***
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Ingrese su JWT token',
    in: 'header',
  },
  'JWT-auth', // Mismo nombre a usar en el controlador cuando usemos el decorador @ApiBearerAuth() !
  )
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
