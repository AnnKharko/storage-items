import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';
import { passwordHasher } from '../../helper/passwordHasher';
import { TokenService } from './token/token.service';
import { CreateUserDto } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { SendDto } from '../send.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private tokensService: TokenService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new GraphQLError('User with such email not exist');
    }
    await passwordHasher.compare(loginDto.password, user.password);

    const tokens = this.tokensService.createTokens();

    const auth = await this.authRepository.create({
      ...tokens,
      userId: user.id,
    });
    return await this.authRepository.save(auth);
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const tokens = this.tokensService.createTokens();
    const auth = await this.authRepository.create({
      ...tokens,
      userId: user.id,
    });
    return await this.authRepository.save(auth);
  }

  async refreshTokens(tokenId: string, user: User) {
    const newTokens = await this.tokensService.createTokens();
    await this.authRepository.update(tokenId, {
      // access_token: newTokens.access_token,
      // refresh_token: newTokens.refresh_token,
      ...newTokens,
    });
    return await this.authRepository.findOne(tokenId);
  }

  async tokensExist(token: string, type: string) {
    let existToken: Auth;

    switch (type) {
      case 'access_token':
        existToken = await this.authRepository.findOne({ access_token: token });
        break;
      case 'refresh_token':
        existToken = await this.authRepository.findOne({
          where: {
            refresh_token: token,
          },
        });
        break;
      default:
        console.log('Something went wrong');
    }

    if (!existToken) {
      throw new UnauthorizedException();
    }

    return existToken;
  }

  async logout(id: string): Promise<SendDto> {
    await this.authRepository.delete(id);
    return {
      message: 'Logout successful',
      status: 200,
    };
  }

  // create(CreateAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  //
  // findAll() {
  //   return `This action returns all auth`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
