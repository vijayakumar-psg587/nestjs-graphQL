import { Module } from '@nestjs/common';
import { HealhCheckService } from './services/healh-check/healh-check.service';
import { HealhCheckController } from './controllers/healh-check/healh-check.controller';
import {AssociateSkillModule} from "../associate-skill/associate-skill.module";

@Module({
    providers: [HealhCheckService],
    controllers: [HealhCheckController],
    imports: [AssociateSkillModule]
})
export class TerminusModule {}
