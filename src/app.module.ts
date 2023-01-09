import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@config/data-source';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
		}),
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
