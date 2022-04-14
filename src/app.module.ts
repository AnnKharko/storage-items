import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UserModule } from './user/user.module';
import { typeOrmConfigAsync } from '../configs';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ItemWarehouseModule } from './item-warehouse/item-warehouse.module';
// import { JwtModule } from "@nestjs/jwt";
import { DevModule } from './dev/dev.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { MailModule } from './mail/mail.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ItemModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ ...req }),
      // context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      // load: [config],
    }),
    WarehouseModule,
    UserModule,
    AuthModule,
    ItemWarehouseModule,
    UserModule,
    AuthModule,
    DevModule,
    AuthorizationModule,
    MailModule,
    ChatModule,
    NotificationModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
