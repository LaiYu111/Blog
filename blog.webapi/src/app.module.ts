import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { TagsModule } from './tags/tags.module';
import { CaslModule } from './casl/casl.module';
import { StatisticModule } from '../statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),

    // 数据库模块
    // MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STR),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME_DEPLOYMENT
        // process.env.NODE_ENV !== 'production'
        //   ? process.env.MONGODB_DB_NAME
        //   : process.env.MONGODB_DB_NAME_DEPLOYMENT,
    }),

    // 业务模块
    ArticlesModule,
    UsersModule,
    AuthModule,
    CommonModule,
    TagsModule,
    CaslModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
