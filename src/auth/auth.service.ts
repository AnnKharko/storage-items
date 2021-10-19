import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { passwordHasher } from '../../helper/passwordHasher';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

// const tokenizer = () => {
//   const access_token = jwt.sign({}, 'JWT_SECRET_ACCESS', { expiresIn: '10m' });
//   const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {
//     expiresIn: '30d',
//   });
//   return {
//     access_token,
//     refresh_token,
//   };
// };
//
// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UserService,
//     @InjectRepository(Auth) private authRepository: Repository<Auth>,
//   ) {}
//
//   async createTokens(login: LoginDto) {
//     const user = await this.usersService.findUserByEmail(login.email);
//     if (!user) {
//       throw new GraphQLError('Wrong email or password');
//     }
//
//     await passwordHasher.compare(login.password, user.password);
//
//     const { access_token, refresh_token } = tokenizer();
//     const auth = await this.authRepository.create({
//       access_token,
//       refresh_token,
//       userId: user.id,
//     });
//     return await this.authRepository.save(auth);
//   }
//
//   async refreshTokens(refresh_token: string) {
//     if (!refresh_token) {
//       throw new GraphQLError('Refresh token is required');
//     }
//
//     jwt.verify(refresh_token, 'JWT_REFRESH_SECRET', (err) => {
//       if (err) {
//         throw new GraphQLError('NOT VALID REFRESH TOKEN');
//       }
//     });
//
//     const oldTokens = await this.authRepository.findOne({ refresh_token });
//     if (!oldTokens) {
//       throw new GraphQLError('Wrong token');
//     }
//
//     const tokens = tokenizer();
//     return await this.authRepository.update(
//       { userId: oldTokens.userId },
//       tokens,
//     );
//   }
//
//   async getTokens(refresh_token: string) {
//     return await this.authRepository.findOne({ refresh_token });
//   }
// }
// ==============second way=============
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async validateUser(login: LoginDto): Promise<User> | null {
    const user = await this.userService.findUserByEmail(login.email);
    // if (!user) {
    //   throw new HttpException(
    //     'Wrong email or password',
    //     HttpStatus.BAD_REQUEST,
    //   );
    //   await passwordHasher.compare(login.password, user.password);
    const isPasswordMatched = await bcrypt.compare(
      login.password,
      user.password,
    );

    if (user && isPasswordMatched) {
      return user;
    }
    return null;
  }
  login(loginDto: LoginDto): { access_token: string; refresh_token: string } {
    const access_token = jwt.sign({}, 'JWT_SECRET_ACCESS', {
      expiresIn: '10m',
    });
    const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {
      expiresIn: '30d',
    });
    return {
      access_token,
      refresh_token,
    };
  }

  verifyAccessToken(token: string) {
    jwt.verify(token, 'JWT_ACCESS_SECRET', (err) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
    return true;
  }

  verifyRefreshToken(token: string) {
    jwt.verify(token, 'JWT_REFRESH_SECRET', (err) => {
      if (err) {
        throw new UnauthorizedException();
      }
    });
    return true;
  }
}
