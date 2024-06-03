import { Module } from '@nestjs/common';
import { AuthModule } from 'core/auth/auth.module';
import { PokemonsModule } from 'modules/pokemons/pokemons.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './core/health/health.module';
import { configOptions } from 'config/options/app.option';
import { NotesModule } from './modules/notes/notes.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MikroOrmModule.forRoot(),
    AuthModule,
    HealthModule,
    PokemonsModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
