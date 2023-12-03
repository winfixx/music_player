import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    SequelizeModule.forFeature([
      
    ])
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
