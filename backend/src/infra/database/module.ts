import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/domain/students/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: port,
      username: 'username',
      password: 'password',
      database: 'database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Student]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
