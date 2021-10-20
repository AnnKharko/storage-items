import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const jwtSecret = configService.get('jwtSecret'); // config don't work

export const tokenizer = () => {
  const access_token = jwt.sign({}, jwtSecret.JWT_ACCESS_SECRET, {
    expiresIn: jwtSecret.JWT_ACCESS_LIFETIME,
  });
  const refresh_token = jwt.sign({}, jwtSecret.JWT_REFRESH_SECRET, {
    expiresIn: jwtSecret.JWT_REFRESH_LIFETIME,
  });
  return {
    access_token,
    refresh_token,
  };
};
