import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
