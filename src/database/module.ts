import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'edtech',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([Student])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
