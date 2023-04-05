import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "test",
        database: "test",
        synchronize: true,
        logging: false,
        entities: [Users],
        migrations: [],
        subscribers: [],
    })]
})
export class DatabaseModule {}
