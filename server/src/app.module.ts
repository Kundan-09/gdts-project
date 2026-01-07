import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Pkundan@090',
      database: 'gdts_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
