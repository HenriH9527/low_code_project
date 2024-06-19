import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/comm/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
