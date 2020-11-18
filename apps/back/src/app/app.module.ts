import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
