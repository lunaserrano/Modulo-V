import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DepositoService } from './deposito.service';
import { DepositoController } from './deposito.controller';

@Module({
  imports: [PrismaModule],
controllers: [DepositoController],
  providers: [DepositoService],
})
export class DepositoModule {}