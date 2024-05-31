import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [databaseModule, UsersModule, RolesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PostsService],
})
export class AppModule {}
