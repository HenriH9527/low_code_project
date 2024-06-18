import { Module } from '@nestjs/common';
import { CommService } from './comm.service';
import { DataSource } from 'typeorm';
import { getConfig } from '../../utils/index';

@Module({
  providers: [CommService],
  exports: [CommService],
})
export class CommModule {}
