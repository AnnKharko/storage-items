import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { AuthGuard } from './auth/guards/auth.guard';
// import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(` App listen port ${port}`);
  });

  // app.useGlobalGuards(new AuthGuard());
}
bootstrap();
