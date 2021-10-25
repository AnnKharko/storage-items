import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevResolver } from './dev.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dev } from './entities/dev.entity';
import { DevsRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Dev])],
  providers: [DevResolver, DevService],
  exports: [DevService],
})
export class DevModule {}
