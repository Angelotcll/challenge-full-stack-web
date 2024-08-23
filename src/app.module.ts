import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infra/database/module';
import { StudentModule } from './domain/students/module';
import { HttpExceptionFilter } from './infra/exception_filter/http-exception-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, StudentModule],
  controllers: [AppController],
  providers: [
//    {
//    provide:APP_FILTER,
//    useClass: HttpExceptionFilter,
//  },
AppService],
})
export class AppModule {}
