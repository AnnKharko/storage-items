import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
  static getJwtConfig(configureService: ConfigService) {
    return {
      secret: configureService.get('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: configureService.get('JWT_ACCESS_LIFETIME'),
      },
    };
  }
}

export const jwtConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    JwtConfig.getJwtConfig(configService),
  inject: [ConfigService],
};
