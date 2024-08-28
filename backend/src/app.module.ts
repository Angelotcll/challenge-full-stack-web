import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/module';
import { StudentModule } from './domain/students/module';

@Module({
  imports: [DatabaseModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
