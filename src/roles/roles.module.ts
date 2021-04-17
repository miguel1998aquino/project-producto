import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from './schema/rol.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rol', schema: RolSchema }])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
